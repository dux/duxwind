// ===================================================================
// DuxWind - Real-time CSS Generator (ES Module)
// ===================================================================

// ===================================================================
// CONFIGURATION & STATE
// ===================================================================

let config = loadFullDefaultConfig();
const processedClasses = new Set();
let styleElement = null;
let debugMode = false;

function createDefaultConfig() {
  return {
    breakpoints: {
      'm': '(max-width: 640px)',
      't': '(max-width: 768px)', 
      'd': '(min-width: 1024px)',
      'lg': '(min-width: 1280px)',
      'xl': '(min-width: 1536px)'
    },
    pixelMultiplier: 4,
    properties: {},
    keywords: {},
    shortcuts: {}
  };
}

function loadFullDefaultConfig() {
  return {
    breakpoints: {
      'm': '(max-width: 767px)',
      'd': '(min-width: 768px)'
    },
    pixelMultiplier: 4,
    properties: createDefaultProperties(),
    keywords: createDefaultKeywords(),
    shortcuts: {}
  };
}

function getConfig() {
  return config;
}

// ===================================================================
// CLASS EXPANSION & TRANSFORMATION
// ===================================================================

function cleanClassName(className) {
  // Handle @ notation: p-10@m -> m:p-10
  let cleaned = className.replace(/^([^@]+)@([a-z]+)$/, '$2:$1');
  
  // Handle bracket syntax: w-[200px] -> w-200px
  return cleaned.replace(/\[([^\]]+)\]/g, (match, value) => {
    if (value.endsWith('px') || value.startsWith('#')) {
      return value; // Keep px and # values as-is
    }
    return value; // Keep other values like calc, %, etc.
  });
}

function expandClass(className) {
  const cleanClass = cleanClassName(className);
  const currentConfig = getConfig();

  // 1. Expand shortcuts first
  if (currentConfig.shortcuts?.[className]) {
    const shortcutClasses = currentConfig.shortcuts[className].split(/\s+/).filter(Boolean);
    const allExpanded = [];
    shortcutClasses.forEach(cls => {
      allExpanded.push(...expandClass(cls));
    });
    return allExpanded;
  }

  // 2. Expand pipe notation
  if (cleanClass.includes('|')) {
    return expandPipeNotation(cleanClass);
  }

  // 3. Return cleaned class
  return [cleanClass];
}

function expandPipeNotation(className) {
  // Handle modifiers like "hover:p-10|20"
  const { prefix, baseClass } = extractModifierPrefix(className);
  
  // Parse the base class pattern: "p-10|20" -> {base: "p", values: ["10", "20"]}
  const parsed = parseClassPattern(baseClass);
  if (!parsed) return [className];

  const { negative, base, values } = parsed;
  const breakpoints = Object.keys(getConfig().breakpoints);

  // Validate value count matches breakpoint count
  if (values.length !== breakpoints.length) {
    return [className];
  }

  // Generate breakpoint-specific classes
  return breakpoints.map((breakpoint, index) => {
    const classValue = `${negative}${base}-${values[index]}`;
    return prefix ? `${breakpoint}:${prefix}${classValue}` : `${breakpoint}:${classValue}`;
  });
}

function extractModifierPrefix(className) {
  if (className.startsWith('hover:')) {
    return {
      prefix: 'hover:',
      baseClass: className.substring(6)
    };
  }
  return { prefix: '', baseClass: className };
}

function parseClassPattern(className) {
  const match = className.match(/^(-?)([a-z-]+)-(.+)$/);
  if (!match) return null;

  const [, negative, base, valuesStr] = match;
  if (!valuesStr.includes('|')) return null;

  // Clean brackets from values: "10|[200px]" -> "10|200px"
  const cleanValues = valuesStr.replace(/\[([^\]]+)\]/g, '$1');
  const values = cleanValues.split('|');

  return { negative, base, values };
}

// ===================================================================
// CSS GENERATION & PARSING
// ===================================================================

function generateCSSForClass(className) {
  const cssRule = parseAndGenerateCSS(className);
  if (cssRule) {
    injectCSS(cssRule);
  }
}

function parseAndGenerateCSS(className) {
  const parsed = parseClassModifiers(className);
  const { actualClass, breakpoint, modifiers } = parsed;

  // 1. Check for keyword classes (flex, hidden, etc.)
  const keywordCSS = tryParseKeyword(actualClass, className, modifiers, breakpoint);
  if (keywordCSS) return keywordCSS;

  // 2. Try numeric classes (p-4, m-10px, opacity-50)
  const numericCSS = tryParseNumeric(actualClass, className, modifiers, breakpoint);
  if (numericCSS) return numericCSS;

  // 3. Try arbitrary values (w-200px, bg-#123)
  const arbitraryCSS = tryParseArbitrary(actualClass, className, modifiers, breakpoint);
  if (arbitraryCSS) return arbitraryCSS;

  return null;
}

function parseClassModifiers(className) {
  const parts = className.split(':');
  const pseudoStates = ['hover', 'focus', 'active', 'disabled', 'visited', 'focus-within', 'focus-visible'];
  
  let breakpoint = null;
  let modifiers = [];
  let classIndex = 0;

  // Parse modifiers from left to right
  for (let i = 0; i < parts.length - 1; i++) {
    if (getConfig().breakpoints[parts[i]]) {
      breakpoint = parts[i];
      classIndex = i + 1;
    } else if (pseudoStates.includes(parts[i])) {
      modifiers.push(parts[i]);
      classIndex = i + 1;
    } else {
      break;
    }
  }

  const actualClass = parts.slice(classIndex).join(':');
  return { actualClass, breakpoint, modifiers };
}

function tryParseKeyword(actualClass, className, modifiers, breakpoint) {
  const keywords = getConfig().keywords;
  if (keywords && keywords[actualClass]) {
    return generateCSSRule(className, 'KEYWORD', keywords[actualClass], modifiers, breakpoint);
  }
  return null;
}

function tryParseNumeric(actualClass, className, modifiers, breakpoint) {
  const match = actualClass.match(/^(-?)([a-z-]+)-(\d+)(px|%)?$/);
  if (!match) return null;

  const [, negative, property, value, unit] = match;
  const cssValue = calculateNumericValue(property, value, unit, negative);
  const cssProperty = getConfig().properties[property];
  
  if (!cssProperty) return null;
  return generateCSSRule(className, cssProperty, cssValue, modifiers, breakpoint);
}

function calculateNumericValue(property, value, unit, negative) {
  const numericValue = parseInt(value);
  const multiplier = negative ? -1 : 1;

  if (property === 'opacity') {
    return numericValue / 100; // opacity-50 = 0.5
  }
  if (unit === '%') {
    return `${numericValue * multiplier}%`;
  }
  if (unit === 'px') {
    return `${numericValue * multiplier}px`;
  }
  // Default: multiply by pixelMultiplier
  return `${numericValue * getConfig().pixelMultiplier * multiplier}px`;
}

function tryParseArbitrary(actualClass, className, modifiers, breakpoint) {
  const match = actualClass.match(/^([a-z-]+)-(.+)$/);
  if (!match) return null;

  const [, property, value] = match;
  const cssProperty = getConfig().properties[property];
  
  if (!cssProperty) return null;
  return generateCSSRule(className, cssProperty, value, modifiers, breakpoint);
}

function generateCSSRule(className, cssProperty, cssValue, modifiers, breakpoint) {
  const selector = buildCSSSelector(className, modifiers);
  const rule = buildCSSDeclaration(selector, cssProperty, cssValue);
  
  return breakpoint 
    ? `@media ${getConfig().breakpoints[breakpoint]} { ${rule} }`
    : rule;
}

function buildCSSSelector(className, modifiers) {
  let selector = `.${className.replace(/:/g, '\\:').replace(/\./g, '\\.')}`;
  
  modifiers.forEach(modifier => {
    const pseudoClass = (modifier === 'focus-within' || modifier === 'focus-visible') 
      ? `:${modifier}` 
      : `:${modifier}`;
    selector += pseudoClass;
  });
  
  return selector;
}

function buildCSSDeclaration(selector, cssProperty, cssValue) {
  if (cssProperty === 'KEYWORD') {
    return `${selector} { ${cssValue} }`;
  }
  
  if (Array.isArray(cssProperty)) {
    const declarations = cssProperty.map(prop => `${prop}: ${cssValue}`).join('; ');
    return `${selector} { ${declarations}; }`;
  }
  
  return `${selector} { ${cssProperty}: ${cssValue}; }`;
}

// ===================================================================
// ELEMENT PROCESSING & DOM HANDLING
// ===================================================================

function processElement(element) {
  if (!element.classList?.length) return;

  const originalClasses = Array.from(element.classList);
  const expandedClasses = expandElementClasses(originalClasses);
  
  // Update element classes if expansions occurred
  if (hasClassExpansions(originalClasses, expandedClasses)) {
    element.className = expandedClasses.join(' ');
    
    if (debugMode) {
      element.setAttribute('data-dw-class', originalClasses.join(' '));
    }
  }

  // Generate CSS for all classes
  expandedClasses.forEach(className => processClassForCSS(className));
}

function expandElementClasses(classes) {
  const expanded = [];
  const explicitClasses = new Set(); // Track explicitly set classes
  
  // First pass: collect explicit (non-shortcut, non-pipe, non-@) classes
  classes.forEach(className => {
    const currentConfig = getConfig();
    const cleanClass = cleanClassName(className);
    
    // Skip shortcuts, pipe notation, and @ notation classes - these need expansion
    const isShortcut = currentConfig.shortcuts?.[className];
    const hasPipe = className.includes('|') || cleanClass.includes('|');
    const hasAtNotation = className.includes('@');
    
    if (!isShortcut && !hasPipe && !hasAtNotation) {
      explicitClasses.add(className);
      if (debugMode) {
        console.log(`DuxWind: Added explicit class: ${className}`);
      }
    } else if (debugMode) {
      console.log(`DuxWind: Skipping expansion class: ${className} (shortcut: ${isShortcut}, pipe: ${hasPipe}, @: ${hasAtNotation})`);
    }
  });
  
  // Second pass: expand all classes
  classes.forEach(className => {
    expanded.push(...expandClass(className));
  });
  
  // Third pass: remove conflicting classes from expansions
  return removeConflictingClasses(expanded, explicitClasses);
}

function removeConflictingClasses(expandedClasses, explicitClasses) {
  const explicitProperties = new Map(); // property -> class name
  const processedClasses = new Set(); // track classes we've already processed
  
  // Map explicit classes to their CSS properties
  explicitClasses.forEach(className => {
    const properties = getClassCSSProperties(className);
    properties.forEach(prop => {
      explicitProperties.set(prop, className);
    });
  });
  
  // Filter out conflicting classes, keeping only the first occurrence of each property
  return expandedClasses.filter(className => {
    // Always keep explicit classes
    if (explicitClasses.has(className)) {
      return true;
    }
    
    // Check if this expanded class conflicts with any explicit class
    const properties = getClassCSSProperties(className);
    for (const prop of properties) {
      if (explicitProperties.has(prop)) {
        if (debugMode) {
          console.log(`DuxWind: Removed conflicting class '${className}' (${prop}) in favor of explicit '${explicitProperties.get(prop)}'`);
        }
        return false; // Remove this class due to conflict with explicit class
      }
    }
    
    return true; // Keep this class
  });
}

function getClassCSSProperties(className) {
  const properties = new Set();
  
  // Parse class modifiers to get the actual class
  const parsed = parseClassModifiers(className);
  const { actualClass } = parsed;
  
  // Check if it's a keyword class
  const keywords = getConfig().keywords;
  if (keywords && keywords[actualClass]) {
    // Extract properties from keyword CSS
    const css = keywords[actualClass];
    const propMatches = css.match(/([a-z-]+):/g);
    if (propMatches) {
      propMatches.forEach(match => {
        properties.add(match.slice(0, -1)); // Remove the ':'
      });
    }
    return Array.from(properties);
  }
  
  // Handle common background color pattern (bg-*)
  if (actualClass.startsWith('bg-')) {
    return ['background-color'];
  }
  
  // Try numeric pattern (p-10, m-4px, etc.)
  const numericMatch = actualClass.match(/^(-?)([a-z-]+)-(\d+)(px|%)?$/);
  if (numericMatch) {
    const [, , property] = numericMatch;
    const cssProperty = getConfig().properties[property];
    if (cssProperty) {
      if (Array.isArray(cssProperty)) {
        return cssProperty;
      }
      return [cssProperty];
    }
  }
  
  // Try arbitrary values (w-200px, bg-#123)
  const arbitraryMatch = actualClass.match(/^([a-z-]+)-(.+)$/);
  if (arbitraryMatch) {
    const [, property] = arbitraryMatch;
    const cssProperty = getConfig().properties[property];
    if (cssProperty) {
      if (Array.isArray(cssProperty)) {
        return cssProperty;
      }
      return [cssProperty];
    }
  }
  
  return [];
}

function hasClassExpansions(original, expanded) {
  return expanded.length !== original.length || 
         !original.every((cls, i) => cls === expanded[i]);
}

function processClassForCSS(className) {
  if (processedClasses.has(className)) return;
  processedClasses.add(className);

  // Handle shortcuts by recursive processing
  const currentConfig = getConfig();
  if (currentConfig.shortcuts?.[className]) {
    const shortcutClasses = currentConfig.shortcuts[className].split(/\s+/).filter(Boolean);
    shortcutClasses.forEach(cls => processClassForCSS(cls));
    return;
  }

  // Generate CSS for individual class
  generateCSSForClass(className);
}

function processNodeTree(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  
  processElement(node);
  
  // Process all child elements with classes
  const elementsWithClasses = node.querySelectorAll('[class]');
  elementsWithClasses.forEach(processElement);
}

// ===================================================================
// CSS INJECTION & STYLE MANAGEMENT
// ===================================================================

function injectCSS(css) {
  ensureStyleElement();
  styleElement.textContent += css + '\n';
}

function ensureStyleElement() {
  if (styleElement) return;
  
  styleElement = document.createElement('style');
  styleElement.setAttribute('data-duxwind', 'true');
  document.head.appendChild(styleElement);
  
  // Add animation keyframes
  styleElement.textContent = getAnimationKeyframes();
}

function getAnimationKeyframes() {
  return `@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
@keyframes pulse {
  50% { opacity: 0.5; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
}
`;
}

// ===================================================================
// INITIALIZATION & CONFIGURATION
// ===================================================================

function init(options = {}) {
  const settings = parseInitOptions(options);
  debugMode = settings.debug;
  
  // Set debug flag globally for backward compatibility
  if (typeof window !== 'undefined') {
    window.DuxWindDebug = debugMode;
  }

  if (settings.clearCache) {
    processedClasses.clear();
  }

  // Process existing elements
  const elementsWithClasses = document.querySelectorAll('[class]');
  elementsWithClasses.forEach(processElement);

  // Set up DOM observation
  setupMutationObserver();
}

function parseInitOptions(options) {
  // Handle legacy boolean parameter
  if (typeof options === 'boolean') {
    options = { clearCache: options };
  }

  return {
    clearCache: true,
    debug: options.debug !== undefined ? options.debug : (typeof window !== 'undefined' && window.location.port > 2000),
    ...options
  };
}

function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      // Handle newly added elements
      mutation.addedNodes.forEach(node => {
        processNodeTree(node);
      });

      // Handle class attribute changes
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        processElement(mutation.target);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });
}

function resetCSS() {
  const resetRules = getResetCSSRules();
  
  let resetElement = document.querySelector('[data-duxwind-reset]');
  if (!resetElement) {
    resetElement = document.createElement('style');
    resetElement.setAttribute('data-duxwind-reset', 'true');
    document.head.insertBefore(resetElement, document.head.firstChild);
  }
  
  resetElement.textContent = resetRules;
  console.log('DuxWind CSS reset applied');
}

function getResetCSSRules() {
  return `*,*::before,*::after{box-sizing:border-box}
*{margin:0}
html,body{height:100%}
body{line-height:1.5;-webkit-font-smoothing:antialiased}
img,picture,video,canvas,svg{display:block;max-width:100%}
input,button,textarea,select{font:inherit}
p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}
#root,#__next{isolation:isolate}
ul,ol{list-style:none;padding:0}
a{color:inherit;text-decoration:none}
button{background:none;border:none;cursor:pointer}
table{border-collapse:collapse;border-spacing:0}
fieldset{border:none;padding:0}
legend{padding:0}
textarea{resize:vertical}
details summary{cursor:pointer}
:focus-visible{outline:2px solid #2563eb;outline-offset:2px}
@media (prefers-color-scheme:dark){:root{color-scheme:dark}}`;
}

function loadDefaultConfig() {
  config = loadFullDefaultConfig();
}

// ===================================================================
// DEFAULT CONFIGURATION DATA
// ===================================================================

function createDefaultProperties() {
  return {
    // Spacing - Padding
    'p': 'padding',
    'pt': 'padding-top',
    'pr': 'padding-right',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'px': ['padding-left', 'padding-right'],
    'py': ['padding-top', 'padding-bottom'],
    'ps': 'padding-inline-start',
    'pe': 'padding-inline-end',
    
    // Spacing - Margin
    'm': 'margin',
    'mt': 'margin-top',
    'mr': 'margin-right',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mx': ['margin-left', 'margin-right'],
    'my': ['margin-top', 'margin-bottom'],
    'ms': 'margin-inline-start',
    'me': 'margin-inline-end',
    
    // Sizing
    'w': 'width',
    'h': 'height',
    'min-w': 'min-width',
    'min-h': 'min-height',
    'max-w': 'max-width',
    'max-h': 'max-height',
    'size': ['width', 'height'],
    
    // Typography
    'text': 'font-size',
    'leading': 'line-height',
    'tracking': 'letter-spacing',
    'indent': 'text-indent',
    
    // Flexbox & Grid
    'gap': 'gap',
    'gap-x': 'column-gap',
    'gap-y': 'row-gap',
    'space-x': 'margin-left',
    'space-y': 'margin-top',
    
    // Layout
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'inset': ['top', 'right', 'bottom', 'left'],
    'inset-x': ['left', 'right'],
    'inset-y': ['top', 'bottom'],
    'start': 'inset-inline-start',
    'end': 'inset-inline-end',
    
    // Borders
    'border': 'border-width',
    'border-t': 'border-top-width',
    'border-r': 'border-right-width',
    'border-b': 'border-bottom-width',
    'border-l': 'border-left-width',
    'border-x': ['border-left-width', 'border-right-width'],
    'border-y': ['border-top-width', 'border-bottom-width'],
    'border-s': 'border-inline-start-width',
    'border-e': 'border-inline-end-width',
    
    // Border Radius
    'rounded': 'border-radius',
    'rounded-t': ['border-top-left-radius', 'border-top-right-radius'],
    'rounded-r': ['border-top-right-radius', 'border-bottom-right-radius'],
    'rounded-b': ['border-bottom-right-radius', 'border-bottom-left-radius'],
    'rounded-l': ['border-top-left-radius', 'border-bottom-left-radius'],
    'rounded-tl': 'border-top-left-radius',
    'rounded-tr': 'border-top-right-radius',
    'rounded-br': 'border-bottom-right-radius',
    'rounded-bl': 'border-bottom-left-radius',
    'rounded-s': ['border-start-start-radius', 'border-start-end-radius'],
    'rounded-e': ['border-end-start-radius', 'border-end-end-radius'],
    'rounded-ss': 'border-start-start-radius',
    'rounded-se': 'border-start-end-radius',
    'rounded-ee': 'border-end-end-radius',
    'rounded-es': 'border-end-start-radius',
    
    // Effects
    'ring': 'box-shadow',
    'ring-offset': 'box-shadow',
    'shadow': 'box-shadow',
    'opacity': 'opacity',
    'blur': 'filter',
    'brightness': 'filter',
    'contrast': 'filter',
    'grayscale': 'filter',
    'hue-rotate': 'filter',
    'invert': 'filter',
    'saturate': 'filter',
    'sepia': 'filter',
    'backdrop-blur': 'backdrop-filter',
    'backdrop-brightness': 'backdrop-filter',
    'backdrop-contrast': 'backdrop-filter',
    'backdrop-grayscale': 'backdrop-filter',
    'backdrop-hue-rotate': 'backdrop-filter',
    'backdrop-invert': 'backdrop-filter',
    'backdrop-opacity': 'backdrop-filter',
    'backdrop-saturate': 'backdrop-filter',
    'backdrop-sepia': 'backdrop-filter',
    
    // Transform
    'scale': 'transform',
    'scale-x': 'transform',
    'scale-y': 'transform',
    'rotate': 'transform',
    'translate-x': 'transform',
    'translate-y': 'transform',
    'skew-x': 'transform',
    'skew-y': 'transform',
    
    // Transition & Animation
    'duration': 'transition-duration',
    'delay': 'transition-delay',
    'ease': 'transition-timing-function',
    
    // CSS Grid
    'grid-cols': 'grid-template-columns',
    'grid-rows': 'grid-template-rows',
    'col': 'grid-column',
    'col-span': 'grid-column',
    'col-start': 'grid-column-start',
    'col-end': 'grid-column-end',
    'row': 'grid-row',
    'row-span': 'grid-row',
    'row-start': 'grid-row-start',
    'row-end': 'grid-row-end',
    
    // Animation & Transition
    'animate': 'animation',
    
    // Others
    'z': 'z-index',
    'order': 'order',
    'scroll-m': 'scroll-margin',
    'scroll-mt': 'scroll-margin-top',
    'scroll-mr': 'scroll-margin-right',
    'scroll-mb': 'scroll-margin-bottom',
    'scroll-ml': 'scroll-margin-left',
    'scroll-mx': ['scroll-margin-left', 'scroll-margin-right'],
    'scroll-my': ['scroll-margin-top', 'scroll-margin-bottom'],
    'scroll-p': 'scroll-padding',
    'scroll-pt': 'scroll-padding-top',
    'scroll-pr': 'scroll-padding-right',
    'scroll-pb': 'scroll-padding-bottom',
    'scroll-pl': 'scroll-padding-left',
    'scroll-px': ['scroll-padding-left', 'scroll-padding-right'],
    'scroll-py': ['scroll-padding-top', 'scroll-padding-bottom']
  };
}

function createDefaultKeywords() {
  return {
    // Display
    'block': 'display: block',
    'inline-block': 'display: inline-block',
    'inline': 'display: inline',
    'flex': 'display: flex',
    'inline-flex': 'display: inline-flex',
    'grid': 'display: grid',
    'inline-grid': 'display: inline-grid',
    'hidden': 'display: none',
    'table': 'display: table',
    'table-cell': 'display: table-cell',
    'table-row': 'display: table-row',
    
    // Position
    'static': 'position: static',
    'fixed': 'position: fixed',
    'absolute': 'position: absolute',
    'relative': 'position: relative',
    'sticky': 'position: sticky',
    
    // Visibility
    'visible': 'visibility: visible',
    'invisible': 'visibility: hidden',
    
    // Flex direction
    'flex-row': 'flex-direction: row',
    'flex-row-reverse': 'flex-direction: row-reverse',
    'flex-col': 'flex-direction: column',
    'flex-col-reverse': 'flex-direction: column-reverse',
    
    // Flex wrap
    'flex-wrap': 'flex-wrap: wrap',
    'flex-wrap-reverse': 'flex-wrap: wrap-reverse',
    'flex-nowrap': 'flex-wrap: nowrap',
    
    // Justify content
    'justify-start': 'justify-content: flex-start',
    'justify-end': 'justify-content: flex-end',
    'justify-center': 'justify-content: center',
    'justify-between': 'justify-content: space-between',
    'justify-around': 'justify-content: space-around',
    'justify-evenly': 'justify-content: space-evenly',
    
    // Align items
    'items-start': 'align-items: flex-start',
    'items-end': 'align-items: flex-end',
    'items-center': 'align-items: center',
    'items-baseline': 'align-items: baseline',
    'items-stretch': 'align-items: stretch',
    
    // Align self
    'self-auto': 'align-self: auto',
    'self-start': 'align-self: flex-start',
    'self-end': 'align-self: flex-end',
    'self-center': 'align-self: center',
    'self-stretch': 'align-self: stretch',
    'self-baseline': 'align-self: baseline',
    
    // Overflow
    'overflow-auto': 'overflow: auto',
    'overflow-hidden': 'overflow: hidden',
    'overflow-visible': 'overflow: visible',
    'overflow-scroll': 'overflow: scroll',
    'overflow-x-auto': 'overflow-x: auto',
    'overflow-y-auto': 'overflow-y: auto',
    
    // Text alignment
    'text-left': 'text-align: left',
    'text-center': 'text-align: center',
    'text-right': 'text-align: right',
    'text-justify': 'text-align: justify',
    
    // Font weight
    'font-thin': 'font-weight: 100',
    'font-extralight': 'font-weight: 200',
    'font-light': 'font-weight: 300',
    'font-normal': 'font-weight: 400',
    'font-medium': 'font-weight: 500',
    'font-semibold': 'font-weight: 600',
    'font-bold': 'font-weight: 700',
    'font-extrabold': 'font-weight: 800',
    'font-black': 'font-weight: 900',
    
    // Text decoration
    'underline': 'text-decoration: underline',
    'line-through': 'text-decoration: line-through',
    'no-underline': 'text-decoration: none',
    
    // Text transform
    'uppercase': 'text-transform: uppercase',
    'lowercase': 'text-transform: lowercase',
    'capitalize': 'text-transform: capitalize',
    'normal-case': 'text-transform: none',
    
    // Pointer events
    'pointer-events-none': 'pointer-events: none',
    'pointer-events-auto': 'pointer-events: auto',
    
    // Cursor
    'cursor-auto': 'cursor: auto',
    'cursor-default': 'cursor: default',
    'cursor-pointer': 'cursor: pointer',
    'cursor-wait': 'cursor: wait',
    'cursor-text': 'cursor: text',
    'cursor-move': 'cursor: move',
    'cursor-not-allowed': 'cursor: not-allowed',
    
    // Select
    'select-none': 'user-select: none',
    'select-text': 'user-select: text',
    'select-all': 'user-select: all',
    'select-auto': 'user-select: auto',
    
    // Background colors
    'bg-blue-50': 'background-color: #eff6ff',
    'bg-blue-100': 'background-color: #dbeafe',
    'bg-blue-200': 'background-color: #bfdbfe',
    'bg-blue-500': 'background-color: #3b82f6',
    'bg-blue-600': 'background-color: #2563eb',
    'bg-blue-700': 'background-color: #1d4ed8',
    'bg-blue-800': 'background-color: #1e40af',
    'bg-gray-50': 'background-color: #f9fafb',
    'bg-gray-100': 'background-color: #f3f4f6',
    'bg-gray-200': 'background-color: #e5e7eb',
    'bg-red-100': 'background-color: #fee2e2',
    'bg-red-500': 'background-color: #ef4444',
    'bg-green-100': 'background-color: #dcfce7',
    'bg-green-200': 'background-color: #bbf7d0',
    'bg-green-300': 'background-color: #86efac',
    'bg-green-500': 'background-color: #22c55e',
    'bg-yellow-500': 'background-color: #eab308',
    'bg-purple-100': 'background-color: #f3e8ff',
    'bg-purple-500': 'background-color: #a855f7',
    'bg-indigo-500': 'background-color: #6366f1',
    'bg-white': 'background-color: #ffffff',
    'bg-transparent': 'background-color: transparent',
    
    // Text colors
    'text-white': 'color: #ffffff',
    'text-black': 'color: #000000',
    'text-gray-600': 'color: #4b5563',
    'text-blue-500': 'color: #3b82f6',
    
    // Border utilities
    'border': 'border-width: 1px; border-style: solid; border-color: #d1d5db',
    'border-b': 'border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #d1d5db',
    'border-blue-500': 'border-color: #3b82f6',
    
    // Ring utilities
    'ring-2': 'box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5)',
    
    // CSS Grid values
    'grid-cols-1': 'grid-template-columns: repeat(1, minmax(0, 1fr))',
    'grid-cols-2': 'grid-template-columns: repeat(2, minmax(0, 1fr))',
    'grid-cols-3': 'grid-template-columns: repeat(3, minmax(0, 1fr))',
    'grid-cols-4': 'grid-template-columns: repeat(4, minmax(0, 1fr))',
    'grid-cols-6': 'grid-template-columns: repeat(6, minmax(0, 1fr))',
    'grid-cols-12': 'grid-template-columns: repeat(12, minmax(0, 1fr))',
    'grid-rows-1': 'grid-template-rows: repeat(1, minmax(0, 1fr))',
    'grid-rows-2': 'grid-template-rows: repeat(2, minmax(0, 1fr))',
    'grid-rows-3': 'grid-template-rows: repeat(3, minmax(0, 1fr))',
    'col-span-1': 'grid-column: span 1 / span 1',
    'col-span-2': 'grid-column: span 2 / span 2',
    'col-span-3': 'grid-column: span 3 / span 3',
    'col-span-4': 'grid-column: span 4 / span 4',
    'col-span-6': 'grid-column: span 6 / span 6',
    'col-span-full': 'grid-column: 1 / -1',
    'row-span-1': 'grid-row: span 1 / span 1',
    'row-span-2': 'grid-row: span 2 / span 2',
    'row-span-3': 'grid-row: span 3 / span 3',
    'row-span-full': 'grid-row: 1 / -1',
    
    // Animations
    'animate-none': 'animation: none',
    'animate-spin': 'animation: spin 1s linear infinite',
    'animate-ping': 'animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    'animate-pulse': 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'animate-bounce': 'animation: bounce 1s infinite',
    
    // Transitions
    'transition': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    'transition-none': 'transition-property: none',
    'transition-all': 'transition-property: all',
    'transition-colors': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke',
    'transition-opacity': 'transition-property: opacity',
    'transition-shadow': 'transition-property: box-shadow',
    'transition-transform': 'transition-property: transform',
    
    // Duration
    'duration-75': 'transition-duration: 75ms',
    'duration-100': 'transition-duration: 100ms',
    'duration-150': 'transition-duration: 150ms',
    'duration-200': 'transition-duration: 200ms',
    'duration-300': 'transition-duration: 300ms',
    'duration-500': 'transition-duration: 500ms',
    'duration-700': 'transition-duration: 700ms',
    'duration-1000': 'transition-duration: 1000ms',
    
    // Easing
    'ease-linear': 'transition-timing-function: linear',
    'ease-in': 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Line height
    'leading-tight': 'line-height: 1.25',
    'leading-normal': 'line-height: 1.5',
    'leading-relaxed': 'line-height: 1.625',
    
    // Spacing utilities
    'space-y-1': 'margin-top: 0.25rem',
    'space-y-2': 'margin-top: 0.5rem',
    'space-y-4': 'margin-top: 1rem',
    'space-y-6': 'margin-top: 1.5rem',
    
    // Text sizing
    'text-sm': 'font-size: 0.875rem',
    'text-4xl': 'font-size: 2.25rem',
    
    // Width utilities
    'w-full': 'width: 100%',
    'w-12': 'width: 3rem',
    'max-w-6xl': 'max-width: 72rem',
    'max-w-1200px': 'max-width: 1200px',
    
    // Height utilities
    'h-12': 'height: 3rem',
    'h-24': 'height: 6rem',
    'min-h-screen': 'min-height: 100vh',
    
    // Shadow
    'shadow-sm': 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    
    // Border radius
    'rounded': 'border-radius: 0.25rem',
    'rounded-lg': 'border-radius: 0.5rem',
    
    // Custom
    'box': 'border: 2px solid #aaa'
  };
}

// ===================================================================
// DOCUMENTATION GENERATION
// ===================================================================

function generateDoc() {
  const sections = [
    generateDocHeader(),
    generateBreakpointsDoc(),
    generatePropertiesDoc(),
    generateKeywordsDoc(),
    generateShortcutsDoc(),
    generateFeaturesDoc(),
    generateExamplesDoc(),
    generateDocStyles()
  ];
  
  return `<div class="duxwind-doc">${sections.join('')}</div>`;
}

function generateDocHeader() {
  return '<h2>DuxWind CSS Generator Documentation</h2>';
}

function generateBreakpointsDoc() {
  const rows = Object.entries(getConfig().breakpoints)
    .map(([key, value]) => `<tr><td><code>${key}:</code></td><td><code>${value}</code></td><td><code>${key}:p-4</code></td></tr>`)
    .join('');
  
  return `<h3>Breakpoints</h3>
<table class="doc-table">
<tr><th>Prefix</th><th>Media Query</th><th>Example</th></tr>
${rows}
</table>`;
}

function generatePropertiesDoc() {
  const rows = Object.entries(getConfig().properties)
    .map(([key, value]) => {
      const cssProps = Array.isArray(value) ? value.join(', ') : value;
      const example = `${key}-4`;
      const result = Array.isArray(value) 
        ? value.map(v => `${v}: 16px`).join('; ')
        : `${value}: 16px`;
      return `<tr><td><code>${key}-[n]</code></td><td>${cssProps}</td><td><code>${example}</code></td><td><code>${result}</code></td></tr>`;
    })
    .join('');
  
  return `<h3>Numeric Properties (multiply by 4px)</h3>
<table class="doc-table">
<tr><th>Class</th><th>CSS Property</th><th>Example</th><th>Result</th></tr>
${rows}
</table>`;
}

function generateKeywordsDoc() {
  const rows = Object.entries(getConfig().keywords)
    .map(([key, value]) => `<tr><td><code>${key}</code></td><td><code>${value}</code></td></tr>`)
    .join('');
  
  return `<h3>Keyword Classes</h3>
<table class="doc-table">
<tr><th>Class</th><th>CSS</th></tr>
${rows}
</table>`;
}

function generateShortcutsDoc() {
  const shortcuts = getConfig().shortcuts;
  if (!shortcuts || Object.keys(shortcuts).length === 0) {
    return '';
  }
  
  const rows = Object.entries(shortcuts)
    .map(([key, value]) => `<tr><td><code>${key}</code></td><td><code>${value}</code></td></tr>`)
    .join('');
  
  return `<h3>Shortcut Classes</h3>
<table class="doc-table">
<tr><th>Shortcut</th><th>Expands To</th></tr>
${rows}
</table>`;
}

function generateFeaturesDoc() {
  return `<h3>Special Features</h3>
<ul>
<li><strong>Negative values:</strong> Use <code>-</code> prefix (e.g., <code>-mt-4</code> → <code>margin-top: -16px</code>)</li>
<li><strong>Pixel values:</strong> Use <code>px</code> suffix (e.g., <code>p-20px</code> → <code>padding: 20px</code>)</li>
<li><strong>Arbitrary values:</strong> Use <code>[value]</code> syntax (e.g., <code>w-[250px]</code>, <code>bg-[#ff6b6b]</code>)</li>
<li><strong>Opacity utilities:</strong> <code>opacity-1</code> through <code>opacity-100</code> (e.g., <code>opacity-50</code> → <code>opacity: 0.5</code>)</li>
<li><strong>CSS Grid:</strong> <code>grid</code>, <code>grid-cols-*</code>, <code>col-span-*</code>, <code>row-span-*</code></li>
<li><strong>Animations:</strong> <code>animate-spin</code>, <code>animate-pulse</code>, <code>animate-bounce</code>, <code>animate-ping</code></li>
<li><strong>Transitions:</strong> <code>transition</code>, <code>duration-*</code>, <code>ease-*</code> utilities</li>
<li><strong>All pseudo-states:</strong> <code>hover:</code>, <code>focus:</code>, <code>active:</code>, <code>disabled:</code>, <code>visited:</code>, <code>focus-within:</code>, <code>focus-visible:</code></li>
<li><strong>Shortcut classes:</strong> Predefined combinations (e.g., <code>btn-primary</code> → multiple classes)</li>
<li><strong>Pipe notation:</strong> Use <code>|</code> for responsive (e.g., <code>p-10|20</code> → <code>m:p-10 d:p-20</code>)</li>
<li><strong>Stackable modifiers:</strong> Combine states (e.g., <code>m:hover:focus:p-4</code>, <code>hover:p-4|8</code>)</li>
<li><strong>Custom properties:</strong> <code>DuxWind.config.properties.fs = 'font-size'</code></li>
<li><strong>Custom shortcuts:</strong> <code>DuxWind.config.shortcuts.myBtn = 'p-4 bg-red-500'</code></li>
</ul>`;
}

function generateExamplesDoc() {
  return `<h3>Examples</h3>
<pre class="doc-code">// Basic utilities
&lt;div class="p-4"&gt;                    → padding: 16px;
&lt;div class="opacity-50"&gt;             → opacity: 0.5;
&lt;div class="flex gap-4"&gt;             → display: flex; gap: 16px;

// Breakpoints
&lt;div class="m:text-16px d:text-24px"&gt; → responsive font sizes
&lt;div class="m:p-4 d:p-8"&gt;            → responsive padding

// Arbitrary values
&lt;div class="w-[250px]"&gt;              → width: 250px;
&lt;div class="bg-[#ff6b6b]"&gt;           → background-color: #ff6b6b;

// Pseudo-states
&lt;button class="hover:bg-blue-600 focus:ring-2 active:scale-95"&gt;
&lt;input class="focus:border-blue-500 disabled:opacity-50"&gt;

// Responsive &amp; Shortcuts
&lt;div class="p-10|20"&gt;               → mobile: 40px, desktop: 80px padding
&lt;button class="btn-primary"&gt;        → expands to multiple utilities
&lt;div class="m:hover:p-4 d:focus:p-8"&gt; → stacked responsive + pseudo-states
</pre>`;
}

function generateDocStyles() {
  return `<style>
.duxwind-doc { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
.duxwind-doc h2 { color: #111; border-bottom: 2px solid #e5e5e5; padding-bottom: 0.5em; }
.duxwind-doc h3 { color: #333; margin-top: 1.5em; }
.doc-table { width: 100%; border-collapse: collapse; margin: 1em 0; }
.doc-table th, .doc-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
.doc-table th { background: #f5f5f5; font-weight: bold; }
.doc-table tr:nth-child(even) { background: #f9f9f9; }
.doc-table code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-size: 0.9em; }
.duxwind-doc code { background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
.doc-code { background: #f5f5f5; padding: 1em; border-radius: 4px; overflow-x: auto; }
.duxwind-doc ul { margin: 1em 0; padding-left: 1.5em; }
.duxwind-doc li { margin: 0.5em 0; }
</style>`;
}

// ===================================================================
// CONFIGURATION OBJECT (for compatibility)
// ===================================================================

const DuxWindConfig = {
  get breakpoints() { return config.breakpoints; },
  set breakpoints(value) { config.breakpoints = value; },
  
  get pixelMultiplier() { return config.pixelMultiplier; },
  set pixelMultiplier(value) { config.pixelMultiplier = value; },
  
  get properties() { return config.properties; },
  set properties(value) { config.properties = value; },
  
  get keywords() { return config.keywords; },
  set keywords(value) { config.keywords = value; },
  
  get shortcuts() { return config.shortcuts; },
  set shortcuts(value) { config.shortcuts = value; }
};

// ===================================================================
// MODULE EXPORTS
// ===================================================================

export {
  // Core API
  init,
  resetCSS,
  loadDefaultConfig,
  generateDoc,
  
  // Processing
  processClassForCSS as loadClass,
  
  // Configuration access
  config,
  DuxWindConfig,
  
  // Utilities (for advanced usage)
  expandClass,
  cleanClassName,
  parseAndGenerateCSS
};

// Default export for convenience
export default {
  init,
  resetCSS,
  loadDefaultConfig,
  generateDoc,
  loadClass: processClassForCSS,
  config,
  DuxWindConfig
};

// ===================================================================
// GLOBAL EXPORT (for backward compatibility when loaded as script)
// ===================================================================

if (typeof window !== 'undefined') {
  window.DuxWind = {
    init,
    resetCss: resetCSS,
    loadDefaultConfig,
    generateDoc,
    loadClass: processClassForCSS,
    config,
    DuxWindConfig
  };
}