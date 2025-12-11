// PostWind Configuration

/**
 * Constants used throughout PostWind
 */
export const CONSTANTS = {
  DEFAULT_PIXEL_MULTIPLIER: 4,
  DEFAULT_BREAKPOINTS: {
    'm': '(max-width: 768px)',
    't': '(min-width: 769px) and (max-width: 1024px)',
    'd': '(min-width: 1025px)',
    'mobile': '(max-width: 768px)',
    'tablet': '(min-width: 769px) and (max-width: 1024px)',
    'desktop': '(min-width: 1025px)'
  },
  SUPPORTED_PSEUDO_STATES: [
    'hover', 'focus', 'active', 'disabled', 'visited',
    'focus-within', 'focus-visible', 'first', 'last', 'odd', 'even',
    'visible'
  ],
  PSEUDO_SELECTOR_MAPPING: {
    'first': 'first-child',
    'last': 'last-child',
    'odd': 'nth-child(odd)',
    'even': 'nth-child(even)',
    'visible': '.dw-visible'  // Special handling for visibility state
  }
};

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
    'flex': 'flex',

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
    'br': 'border-radius',
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

    // Colors
    'bg': 'background-color',
    'border-color': 'border-color',
    'outline': 'outline-color',
    'decoration': 'text-decoration-color',
    'placeholder': 'placeholder-color',
    'caret': 'caret-color',
    'accent': 'accent-color',
    'fill': 'fill',
    'stroke': 'stroke',

    // Background
    'bg-image': 'background-image',
    'bg-position': 'background-position',
    'bg-size': 'background-size',
    'bg-repeat': 'background-repeat',
    'bg-attachment': 'background-attachment',
    'bg-clip': 'background-clip',
    'bg-origin': 'background-origin',
    'from': '--tw-gradient-from',
    'via': '--tw-gradient-via',
    'to': '--tw-gradient-to',

    // Typography
    'font': 'font-family',
    'font-size': 'font-size',
    'font-weight': 'font-weight',
    'font-style': 'font-style',
    'text-decoration': 'text-decoration',
    'text-decoration-thickness': 'text-decoration-thickness',
    'text-underline-offset': 'text-underline-offset',
    'text-transform': 'text-transform',
    'text-overflow': 'text-overflow',
    'text-align': 'text-align',
    'text-indent': 'text-indent',
    'vertical-align': 'vertical-align',
    'whitespace': 'white-space',
    'word-break': 'word-break',
    'hyphens': 'hyphens',

    // Lists
    'list-image': 'list-style-image',
    'list-position': 'list-style-position',
    'list-type': 'list-style-type',

    // Appearance
    'appearance': 'appearance',
    'columns': 'columns',
    'break-before': 'break-before',
    'break-inside': 'break-inside',
    'break-after': 'break-after',
    'box-decoration': 'box-decoration-break',
    'box-sizing': 'box-sizing',

    // Floats
    'float': 'float',
    'clear': 'clear',

    // Object
    'object': 'object-fit',
    'object-position': 'object-position',

    // Overflow
    'overflow': 'overflow',
    'overflow-x': 'overflow-x',
    'overflow-y': 'overflow-y',
    'overscroll': 'overscroll-behavior',
    'overscroll-x': 'overscroll-behavior-x',
    'overscroll-y': 'overscroll-behavior-y',

    // Position
    'position': 'position',

    // Visibility
    'visibility': 'visibility',

    // Z-Index
    'z': 'z-index',

    // Flexbox
    'flex-direction': 'flex-direction',
    'flex-wrap': 'flex-wrap',
    'flex-grow': 'flex-grow',
    'flex-shrink': 'flex-shrink',
    'flex-basis': 'flex-basis',
    'order': 'order',
    'justify-content': 'justify-content',
    'justify-items': 'justify-items',
    'justify-self': 'justify-self',
    'align-content': 'align-content',
    'align-items': 'align-items',
    'align-self': 'align-self',
    'place-content': 'place-content',
    'place-items': 'place-items',
    'place-self': 'place-self',

    // Grid
    'grid': 'grid',
    'grid-template': 'grid-template',
    'grid-template-columns': 'grid-template-columns',
    'grid-template-rows': 'grid-template-rows',
    'grid-template-areas': 'grid-template-areas',
    'grid-auto-columns': 'grid-auto-columns',
    'grid-auto-rows': 'grid-auto-rows',
    'grid-auto-flow': 'grid-auto-flow',
    'grid-column': 'grid-column',
    'grid-column-start': 'grid-column-start',
    'grid-column-end': 'grid-column-end',
    'grid-row': 'grid-row',
    'grid-row-start': 'grid-row-start',
    'grid-row-end': 'grid-row-end',
    'grid-area': 'grid-area',

    // Spacing
    'space': 'margin',

    // Sizing
    'aspect': 'aspect-ratio',
    'contain': 'contain',
    'container': 'container-type',
    'content': 'content',

    // Transform
    'transform': 'transform',
    'transform-origin': 'transform-origin',
    'translate': 'transform',
    'rotate': 'transform',
    'scale': 'transform',
    'skew': 'transform',

    // Interactivity
    'accent-color': 'accent-color',
    'caret-color': 'caret-color',
    'cursor': 'cursor',
    'outline-width': 'outline-width',
    'outline-style': 'outline-style',
    'outline-offset': 'outline-offset',
    'resize': 'resize',
    'scroll-behavior': 'scroll-behavior',
    'scroll-snap-align': 'scroll-snap-align',
    'scroll-snap-stop': 'scroll-snap-stop',
    'scroll-snap-type': 'scroll-snap-type',
    'touch-action': 'touch-action',
    'user-select': 'user-select',
    'will-change': 'will-change',

    // SVG
    'fill': 'fill',
    'stroke': 'stroke',
    'stroke-width': 'stroke-width',
    'stroke-dasharray': 'stroke-dasharray',
    'stroke-dashoffset': 'stroke-dashoffset',
    'stroke-linecap': 'stroke-linecap',
    'stroke-linejoin': 'stroke-linejoin',

    // Accessibility
    'sr': 'position',
    'not-sr': 'position',
    'forced-color-adjust': 'forced-color-adjust',

    // Tables
    'border-collapse': 'border-collapse',
    'border-spacing': 'border-spacing',
    'table-layout': 'table-layout',
    'caption-side': 'caption-side',
    'empty-cells': 'empty-cells',

    // Others
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

function createBorderRadiusKeywordMap() {
  const keywords = {};
  const variants = [
    { name: 'none', value: '0px' },
    { name: 'sm', value: '0.125rem' },
    { name: '', value: '0.25rem' },
    { name: 'md', value: '0.375rem' },
    { name: 'lg', value: '0.5rem' },
    { name: 'xl', value: '0.75rem' },
    { name: '2xl', value: '1rem' },
    { name: '3xl', value: '1.5rem' },
    { name: 'full', value: '9999px' }
  ];

  const baseClassName = (variant) => variant.name ? `rounded-${variant.name}` : 'rounded';
  variants.forEach(variant => {
    keywords[baseClassName(variant)] = `border-radius: ${variant.value};`;
  });

  const edgeGroups = {
    't': ['border-top-left-radius', 'border-top-right-radius'],
    'r': ['border-top-right-radius', 'border-bottom-right-radius'],
    'b': ['border-bottom-right-radius', 'border-bottom-left-radius'],
    'l': ['border-top-left-radius', 'border-bottom-left-radius'],
    's': ['border-start-start-radius', 'border-end-start-radius'],
    'e': ['border-start-end-radius', 'border-end-end-radius']
  };

  Object.entries(edgeGroups).forEach(([edge, props]) => {
    variants.forEach(variant => {
      const suffix = variant.name ? `-${variant.name}` : '';
      const className = `rounded-${edge}${suffix}`;
      keywords[className] = props.map(prop => `${prop}: ${variant.value};`).join(' ');
    });
  });

  const cornerGroups = {
    'tl': ['border-top-left-radius'],
    'tr': ['border-top-right-radius'],
    'br': ['border-bottom-right-radius'],
    'bl': ['border-bottom-left-radius'],
    'ss': ['border-start-start-radius'],
    'se': ['border-start-end-radius'],
    'ee': ['border-end-end-radius'],
    'es': ['border-end-start-radius']
  };

  Object.entries(cornerGroups).forEach(([corner, props]) => {
    variants.forEach(variant => {
      const suffix = variant.name ? `-${variant.name}` : '';
      const className = `rounded-${corner}${suffix}`;
      keywords[className] = props.map(prop => `${prop}: ${variant.value};`).join(' ');
    });
  });

  return keywords;
}

const COLOR_PALETTE = {
  black: '0 0 0',
  white: '255 255 255',
  slate: {
    50: '248 250 252',
    100: '241 245 249',
    200: '226 232 240',
    300: '203 213 225',
    400: '148 163 184',
    500: '100 116 139',
    600: '71 85 105',
    700: '51 65 85',
    800: '30 41 59',
    900: '15 23 42'
  },
  gray: {
    50: '249 250 251',
    100: '243 244 246',
    200: '229 231 235',
    300: '209 213 219',
    400: '156 163 175',
    500: '107 114 128',
    600: '75 85 99',
    700: '55 65 81',
    800: '31 41 55',
    900: '17 24 39'
  },
  zinc: {
    50: '250 250 250',
    100: '244 244 245',
    200: '228 228 231',
    300: '212 212 216',
    400: '161 161 170',
    500: '113 113 122',
    600: '82 82 91',
    700: '63 63 70',
    800: '39 39 42',
    900: '24 24 27'
  },
  neutral: {
    50: '250 250 250',
    100: '245 245 245',
    200: '229 229 229',
    300: '212 212 212',
    400: '163 163 163',
    500: '115 115 115',
    600: '82 82 82',
    700: '64 64 64',
    800: '38 38 38',
    900: '23 23 23'
  },
  stone: {
    50: '250 250 249',
    100: '245 245 244',
    200: '231 229 228',
    300: '214 211 209',
    400: '168 162 158',
    500: '120 113 108',
    600: '87 83 78',
    700: '68 64 60',
    800: '41 37 36',
    900: '28 25 23'
  },
  red: {
    50: '254 242 242',
    100: '254 226 226',
    200: '254 202 202',
    300: '252 165 165',
    400: '248 113 113',
    500: '239 68 68',
    600: '220 38 38',
    700: '185 28 28',
    800: '153 27 27',
    900: '127 29 29'
  },
  orange: {
    50: '255 247 237',
    100: '255 237 213',
    200: '254 215 170',
    300: '253 186 116',
    400: '251 146 60',
    500: '249 115 22',
    600: '234 88 12',
    700: '194 65 12',
    800: '154 52 18',
    900: '124 45 18'
  },
  amber: {
    50: '255 251 235',
    100: '254 243 199',
    200: '253 230 138',
    300: '252 211 77',
    400: '251 191 36',
    500: '245 158 11',
    600: '217 119 6',
    700: '180 83 9',
    800: '146 64 14',
    900: '120 53 15'
  },
  yellow: {
    50: '254 252 232',
    100: '254 249 195',
    200: '254 240 138',
    300: '253 224 71',
    400: '250 204 21',
    500: '234 179 8',
    600: '202 138 4',
    700: '161 98 7',
    800: '133 77 14',
    900: '113 63 18'
  },
  lime: {
    50: '247 254 231',
    100: '236 252 203',
    200: '217 249 157',
    300: '190 242 100',
    400: '163 230 53',
    500: '132 204 22',
    600: '101 163 13',
    700: '77 124 15',
    800: '63 98 18',
    900: '54 83 20'
  },
  green: {
    50: '240 253 244',
    100: '220 252 231',
    200: '187 247 208',
    300: '134 239 172',
    400: '74 222 128',
    500: '34 197 94',
    600: '22 163 74',
    700: '21 128 61',
    800: '22 101 52',
    900: '20 83 45'
  },
  emerald: {
    50: '236 253 245',
    100: '209 250 229',
    200: '167 243 208',
    300: '110 231 183',
    400: '52 211 153',
    500: '16 185 129',
    600: '5 150 105',
    700: '4 120 87',
    800: '6 95 70',
    900: '6 78 59'
  },
  teal: {
    50: '240 253 250',
    100: '204 251 241',
    200: '153 246 228',
    300: '94 234 212',
    400: '45 212 191',
    500: '20 184 166',
    600: '13 148 136',
    700: '15 118 110',
    800: '17 94 89',
    900: '19 78 74'
  },
  cyan: {
    50: '236 254 255',
    100: '207 250 254',
    200: '165 243 252',
    300: '103 232 249',
    400: '34 211 238',
    500: '6 182 212',
    600: '8 145 178',
    700: '14 116 144',
    800: '21 94 117',
    900: '22 78 99'
  },
  sky: {
    50: '240 249 255',
    100: '224 242 254',
    200: '186 230 253',
    300: '125 211 252',
    400: '56 189 248',
    500: '14 165 233',
    600: '2 132 199',
    700: '3 105 161',
    800: '7 89 133',
    900: '12 74 110'
  },
  blue: {
    50: '239 246 255',
    100: '219 234 254',
    200: '191 219 254',
    300: '147 197 253',
    400: '96 165 250',
    500: '59 130 246',
    600: '37 99 235',
    700: '29 78 216',
    800: '30 64 175',
    900: '30 58 138'
  },
  indigo: {
    50: '238 242 255',
    100: '224 231 255',
    200: '199 210 254',
    300: '165 180 252',
    400: '129 140 248',
    500: '99 102 241',
    600: '79 70 229',
    700: '67 56 202',
    800: '55 48 163',
    900: '49 46 129'
  },
  violet: {
    50: '245 243 255',
    100: '237 233 254',
    200: '221 214 254',
    300: '196 181 253',
    400: '167 139 250',
    500: '139 92 246',
    600: '124 58 237',
    700: '109 40 217',
    800: '91 33 182',
    900: '76 29 149'
  },
  purple: {
    50: '250 245 255',
    100: '243 232 255',
    200: '233 213 255',
    300: '216 180 254',
    400: '196 144 254',
    500: '168 85 247',
    600: '147 51 234',
    700: '126 34 206',
    800: '107 33 168',
    900: '88 28 135'
  },
  fuchsia: {
    50: '253 244 255',
    100: '250 232 255',
    200: '245 208 254',
    300: '240 171 252',
    400: '232 121 249',
    500: '217 70 239',
    600: '192 38 211',
    700: '162 28 175',
    800: '134 25 143',
    900: '112 26 117'
  },
  pink: {
    50: '253 242 248',
    100: '252 231 243',
    200: '251 207 232',
    300: '249 168 212',
    400: '244 114 182',
    500: '236 72 153',
    600: '219 39 119',
    700: '190 24 93',
    800: '157 23 77',
    900: '131 24 67'
  },
  rose: {
    50: '255 241 242',
    100: '255 228 230',
    200: '254 205 211',
    300: '253 164 175',
    400: '251 113 133',
    500: '244 63 94',
    600: '225 29 72',
    700: '190 18 60',
    800: '159 18 57',
    900: '136 19 55'
  }
};

function normalizeColorValue(value) {
  if (!value) return value;

  const trimmed = `${value}`.trim();
  if (/^(rgb|hsl|#|var\()/i.test(trimmed)) {
    return trimmed;
  }

  if (/^\d/.test(trimmed) && trimmed.includes(' ')) {
    return `rgb(${trimmed})`;
  }

  return trimmed;
}

function createColorKeywordMap(prefix, cssProperty) {
  const entries = {};

  Object.entries(COLOR_PALETTE).forEach(([name, shades]) => {
    if (typeof shades === 'string') {
      entries[`${prefix}-${name}`] = `${cssProperty}: ${normalizeColorValue(shades)}`;
      return;
    }

    Object.entries(shades).forEach(([tone, value]) => {
      entries[`${prefix}-${name}-${tone}`] = `${cssProperty}: ${normalizeColorValue(value)}`;
    });
  });

  return entries;
}

function createDefaultKeywords() {
  const keywords = {
    // Display
    'block': 'display: block',
    'inline-block': 'display: inline-block',
    'inline': 'display: inline',
    'flex': 'display: flex',
    'inline-flex': 'display: inline-flex',
    'table': 'display: table',
    'inline-table': 'display: inline-table',
    'table-caption': 'display: table-caption',
    'table-cell': 'display: table-cell',
    'table-column': 'display: table-column',
    'table-column-group': 'display: table-column-group',
    'table-footer-group': 'display: table-footer-group',
    'table-header-group': 'display: table-header-group',
    'table-row-group': 'display: table-row-group',
    'table-row': 'display: table-row',
    'flow-root': 'display: flow-root',
    'grid': 'display: grid',
    'inline-grid': 'display: inline-grid',
    'contents': 'display: contents',
    'list-item': 'display: list-item',
    'hidden': 'display: none',
    'none': 'display: none',

    // Box Sizing
    'box-border': 'box-sizing: border-box',
    'box-content': 'box-sizing: content-box',

    // Floats
    'float-left': 'float: left',
    'float-right': 'float: right',
    'float-none': 'float: none',

    // Clear
    'clear-left': 'clear: left',
    'clear-right': 'clear: right',
    'clear-both': 'clear: both',
    'clear-none': 'clear: none',

    // Isolation
    'isolate': 'isolation: isolate',
    'isolation-auto': 'isolation: auto',

    // Object Fit
    'object-contain': 'object-fit: contain',
    'object-cover': 'object-fit: cover',
    'object-fill': 'object-fit: fill',
    'object-none': 'object-fit: none',
    'object-scale-down': 'object-fit: scale-down',

    // Object Position
    'object-bottom': 'object-position: bottom',
    'object-center': 'object-position: center',
    'object-left': 'object-position: left',
    'object-left-bottom': 'object-position: left bottom',
    'object-left-top': 'object-position: left top',
    'object-right': 'object-position: right',
    'object-right-bottom': 'object-position: right bottom',
    'object-right-top': 'object-position: right top',
    'object-top': 'object-position: top',

    // Overflow
    'overflow-auto': 'overflow: auto',
    'overflow-hidden': 'overflow: hidden',
    'overflow-clip': 'overflow: clip',
    'overflow-visible': 'overflow: visible',
    'overflow-scroll': 'overflow: scroll',
    'overflow-x-auto': 'overflow-x: auto',
    'overflow-y-auto': 'overflow-y: auto',
    'overflow-x-hidden': 'overflow-x: hidden',
    'overflow-y-hidden': 'overflow-y: hidden',
    'overflow-x-clip': 'overflow-x: clip',
    'overflow-y-clip': 'overflow-y: clip',
    'overflow-x-visible': 'overflow-x: visible',
    'overflow-y-visible': 'overflow-y: visible',
    'overflow-x-scroll': 'overflow-x: scroll',
    'overflow-y-scroll': 'overflow-y: scroll',

    // Overscroll Behavior
    'overscroll-auto': 'overscroll-behavior: auto',
    'overscroll-contain': 'overscroll-behavior: contain',
    'overscroll-none': 'overscroll-behavior: none',
    'overscroll-y-auto': 'overscroll-behavior-y: auto',
    'overscroll-y-contain': 'overscroll-behavior-y: contain',
    'overscroll-y-none': 'overscroll-behavior-y: none',
    'overscroll-x-auto': 'overscroll-behavior-x: auto',
    'overscroll-x-contain': 'overscroll-behavior-x: contain',
    'overscroll-x-none': 'overscroll-behavior-x: none',

    // Position
    'static': 'position: static',
    'fixed': 'position: fixed',
    'absolute': 'position: absolute',
    'relative': 'position: relative',
    'sticky': 'position: sticky',

    // Visibility
    'visible': 'visibility: visible',
    'invisible': 'visibility: hidden',
    'collapse': 'visibility: collapse',

    // Z-Index
    'z-0': 'z-index: 0',
    'z-10': 'z-index: 10',
    'z-20': 'z-index: 20',
    'z-30': 'z-index: 30',
    'z-40': 'z-index: 40',
    'z-50': 'z-index: 50',
    'z-auto': 'z-index: auto',

    // Flex direction
    'flex-row': 'flex-direction: row',
    'flex-row-reverse': 'flex-direction: row-reverse',
    'flex-col': 'flex-direction: column',
    'flex-col-reverse': 'flex-direction: column-reverse',

    // Flex wrap
    'flex-wrap': 'flex-wrap: wrap',
    'flex-wrap-reverse': 'flex-wrap: wrap-reverse',
    'flex-nowrap': 'flex-wrap: nowrap',

    // Flex
    'flex-1': 'flex: 1 1 0%',
    'flex-2': 'flex: 2 2 0%',
    'flex-3': 'flex: 3 3 0%',
    'flex-auto': 'flex: 1 1 auto',
    'flex-initial': 'flex: 0 1 auto',
    'flex-none': 'flex: none',

    // Flex Grow
    'grow': 'flex-grow: 1',
    'grow-0': 'flex-grow: 0',

    // Flex Shrink
    'shrink': 'flex-shrink: 1',
    'shrink-0': 'flex-shrink: 0',

    // Order
    'order-1': 'order: 1',
    'order-2': 'order: 2',
    'order-3': 'order: 3',
    'order-4': 'order: 4',
    'order-5': 'order: 5',
    'order-6': 'order: 6',
    'order-7': 'order: 7',
    'order-8': 'order: 8',
    'order-9': 'order: 9',
    'order-10': 'order: 10',
    'order-11': 'order: 11',
    'order-12': 'order: 12',
    'order-first': 'order: -9999',
    'order-last': 'order: 9999',
    'order-none': 'order: 0',

    // Justify content
    'justify-normal': 'justify-content: normal',
    'justify-start': 'justify-content: flex-start',
    'justify-end': 'justify-content: flex-end',
    'justify-center': 'justify-content: center',
    'justify-between': 'justify-content: space-between',
    'justify-around': 'justify-content: space-around',
    'justify-evenly': 'justify-content: space-evenly',
    'justify-stretch': 'justify-content: stretch',

    // Justify Items
    'justify-items-start': 'justify-items: start',
    'justify-items-end': 'justify-items: end',
    'justify-items-center': 'justify-items: center',
    'justify-items-stretch': 'justify-items: stretch',

    // Justify Self
    'justify-self-auto': 'justify-self: auto',
    'justify-self-start': 'justify-self: start',
    'justify-self-end': 'justify-self: end',
    'justify-self-center': 'justify-self: center',
    'justify-self-stretch': 'justify-self: stretch',

    // Align Content
    'content-normal': 'align-content: normal',
    'content-center': 'align-content: center',
    'content-start': 'align-content: flex-start',
    'content-end': 'align-content: flex-end',
    'content-between': 'align-content: space-between',
    'content-around': 'align-content: space-around',
    'content-evenly': 'align-content: space-evenly',
    'content-baseline': 'align-content: baseline',
    'content-stretch': 'align-content: stretch',

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

    // Place Content
    'place-content-center': 'place-content: center',
    'place-content-start': 'place-content: start',
    'place-content-end': 'place-content: end',
    'place-content-between': 'place-content: space-between',
    'place-content-around': 'place-content: space-around',
    'place-content-evenly': 'place-content: space-evenly',
    'place-content-baseline': 'place-content: baseline',
    'place-content-stretch': 'place-content: stretch',

    // Place Items
    'place-items-start': 'place-items: start',
    'place-items-end': 'place-items: end',
    'place-items-center': 'place-items: center',
    'place-items-baseline': 'place-items: baseline',
    'place-items-stretch': 'place-items: stretch',

    // Place Self
    'place-self-auto': 'place-self: auto',
    'place-self-start': 'place-self: start',
    'place-self-end': 'place-self: end',
    'place-self-center': 'place-self: center',
    'place-self-stretch': 'place-self: stretch',


    // Text Align
    'text-left': 'text-align: left',
    'text-center': 'text-align: center',
    'text-right': 'text-align: right',
    'text-justify': 'text-align: justify',
    'text-start': 'text-align: start',
    'text-end': 'text-align: end',

    // Text Color (duplicates)
    'text-inherit': 'color: inherit',
    'text-current': 'color: currentColor',
    'text-transparent': 'color: transparent',

    // Vertical Align
    'align-baseline': 'vertical-align: baseline',
    'align-top': 'vertical-align: top',
    'align-middle': 'vertical-align: middle',
    'align-bottom': 'vertical-align: bottom',
    'align-text-top': 'vertical-align: text-top',
    'align-text-bottom': 'vertical-align: text-bottom',
    'align-sub': 'vertical-align: sub',
    'align-super': 'vertical-align: super',

    // Whitespace
    'whitespace-normal': 'white-space: normal',
    'whitespace-nowrap': 'white-space: nowrap',
    'whitespace-pre': 'white-space: pre',
    'whitespace-pre-line': 'white-space: pre-line',
    'whitespace-pre-wrap': 'white-space: pre-wrap',
    'whitespace-break-spaces': 'white-space: break-spaces',

    // Word Break
    'break-normal': 'overflow-wrap: normal; word-break: normal',
    'break-words': 'overflow-wrap: break-word',
    'break-all': 'word-break: break-all',
    'break-keep': 'word-break: keep-all',

    // Hyphens
    'hyphens-none': 'hyphens: none',
    'hyphens-manual': 'hyphens: manual',
    'hyphens-auto': 'hyphens: auto',

    // Content
    'content-none': 'content: none',

    // Font Family
    'font-sans': 'font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    'font-serif': 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    'font-mono': 'font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

    // Font Size
    'text-xs': 'font-size: 0.75rem; line-height: 1rem',
    'text-sm': 'font-size: 0.875rem; line-height: 1.25rem',
    'text-base': 'font-size: 1rem; line-height: 1.5rem',
    'text-lg': 'font-size: 1.125rem; line-height: 1.75rem',
    'text-xl': 'font-size: 1.25rem; line-height: 1.75rem',
    'text-2xl': 'font-size: 1.5rem; line-height: 2rem',
    'text-3xl': 'font-size: 1.875rem; line-height: 2.25rem',
    'text-4xl': 'font-size: 2.25rem; line-height: 2.5rem',
    'text-5xl': 'font-size: 3rem; line-height: 1',
    'text-6xl': 'font-size: 3.75rem; line-height: 1',
    'text-7xl': 'font-size: 4.5rem; line-height: 1',
    'text-8xl': 'font-size: 6rem; line-height: 1',
    'text-9xl': 'font-size: 8rem; line-height: 1',

    // Font Style
    'italic': 'font-style: italic',
    'not-italic': 'font-style: normal',

    // Font Weight
    'font-thin': 'font-weight: 100',
    'font-extralight': 'font-weight: 200',
    'font-light': 'font-weight: 300',
    'font-normal': 'font-weight: 400',
    'font-medium': 'font-weight: 500',
    'font-semibold': 'font-weight: 600',
    'font-bold': 'font-weight: 700',
    'font-extrabold': 'font-weight: 800',
    'font-black': 'font-weight: 900',

    // Font Variant Numeric
    'normal-nums': 'font-variant-numeric: normal',
    'ordinal': 'font-variant-numeric: ordinal',
    'slashed-zero': 'font-variant-numeric: slashed-zero',
    'lining-nums': 'font-variant-numeric: lining-nums',
    'oldstyle-nums': 'font-variant-numeric: oldstyle-nums',
    'proportional-nums': 'font-variant-numeric: proportional-nums',
    'tabular-nums': 'font-variant-numeric: tabular-nums',
    'diagonal-fractions': 'font-variant-numeric: diagonal-fractions',
    'stacked-fractions': 'font-variant-numeric: stacked-fractions',

    // Text Decoration
    'underline': 'text-decoration-line: underline',
    'overline': 'text-decoration-line: overline',
    'line-through': 'text-decoration-line: line-through',
    'no-underline': 'text-decoration-line: none',

    // Text Decoration Style
    'decoration-solid': 'text-decoration-style: solid',
    'decoration-double': 'text-decoration-style: double',
    'decoration-dotted': 'text-decoration-style: dotted',
    'decoration-dashed': 'text-decoration-style: dashed',
    'decoration-wavy': 'text-decoration-style: wavy',

    // Text Decoration Thickness
    'decoration-auto': 'text-decoration-thickness: auto',
    'decoration-from-font': 'text-decoration-thickness: from-font',
    'decoration-0': 'text-decoration-thickness: 0px',
    'decoration-1': 'text-decoration-thickness: 1px',
    'decoration-2': 'text-decoration-thickness: 2px',
    'decoration-4': 'text-decoration-thickness: 4px',
    'decoration-8': 'text-decoration-thickness: 8px',

    // Text Underline Offset
    'underline-offset-auto': 'text-underline-offset: auto',
    'underline-offset-0': 'text-underline-offset: 0px',
    'underline-offset-1': 'text-underline-offset: 1px',
    'underline-offset-2': 'text-underline-offset: 2px',
    'underline-offset-4': 'text-underline-offset: 4px',
    'underline-offset-8': 'text-underline-offset: 8px',

    // Text Transform
    'uppercase': 'text-transform: uppercase',
    'lowercase': 'text-transform: lowercase',
    'capitalize': 'text-transform: capitalize',
    'normal-case': 'text-transform: none',

    // Text Overflow
    'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap',
    'text-ellipsis': 'text-overflow: ellipsis',
    'text-clip': 'text-overflow: clip',

    // Text Indent
    'indent-0': 'text-indent: 0px',
    'indent-px': 'text-indent: 1px',
    'indent-0.5': 'text-indent: 0.125rem',
    'indent-1': 'text-indent: 0.25rem',
    'indent-1.5': 'text-indent: 0.375rem',
    'indent-2': 'text-indent: 0.5rem',
    'indent-2.5': 'text-indent: 0.625rem',
    'indent-3': 'text-indent: 0.75rem',
    'indent-3.5': 'text-indent: 0.875rem',
    'indent-4': 'text-indent: 1rem',
    'indent-5': 'text-indent: 1.25rem',
    'indent-6': 'text-indent: 1.5rem',
    'indent-7': 'text-indent: 1.75rem',
    'indent-8': 'text-indent: 2rem',
    'indent-9': 'text-indent: 2.25rem',
    'indent-10': 'text-indent: 2.5rem',
    'indent-11': 'text-indent: 2.75rem',
    'indent-12': 'text-indent: 3rem',
    'indent-14': 'text-indent: 3.5rem',
    'indent-16': 'text-indent: 4rem',
    'indent-20': 'text-indent: 5rem',
    'indent-24': 'text-indent: 6rem',
    'indent-28': 'text-indent: 7rem',
    'indent-32': 'text-indent: 8rem',
    'indent-36': 'text-indent: 9rem',
    'indent-40': 'text-indent: 10rem',
    'indent-44': 'text-indent: 11rem',
    'indent-48': 'text-indent: 12rem',
    'indent-52': 'text-indent: 13rem',
    'indent-56': 'text-indent: 14rem',
    'indent-60': 'text-indent: 15rem',
    'indent-64': 'text-indent: 16rem',
    'indent-72': 'text-indent: 18rem',
    'indent-80': 'text-indent: 20rem',
    'indent-96': 'text-indent: 24rem',

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

    // Background Attachment
    'bg-fixed': 'background-attachment: fixed',
    'bg-local': 'background-attachment: local',
    'bg-scroll': 'background-attachment: scroll',

    // Background Clip
    'bg-clip-border': 'background-clip: border-box',
    'bg-clip-padding': 'background-clip: padding-box',
    'bg-clip-content': 'background-clip: content-box',
    'bg-clip-text': 'background-clip: text',

    // Background Color (extended)
    'bg-inherit': 'background-color: inherit',
    'bg-current': 'background-color: currentColor',
    'bg-transparent': 'background-color: transparent',

    // Background Origin
    'bg-origin-border': 'background-origin: border-box',
    'bg-origin-padding': 'background-origin: padding-box',
    'bg-origin-content': 'background-origin: content-box',

    // Background Position
    'bg-bottom': 'background-position: bottom',
    'bg-center': 'background-position: center',
    'bg-left': 'background-position: left',
    'bg-left-bottom': 'background-position: left bottom',
    'bg-left-top': 'background-position: left top',
    'bg-right': 'background-position: right',
    'bg-right-bottom': 'background-position: right bottom',
    'bg-right-top': 'background-position: right top',
    'bg-top': 'background-position: top',

    // Background Repeat
    'bg-repeat': 'background-repeat: repeat',
    'bg-no-repeat': 'background-repeat: no-repeat',
    'bg-repeat-x': 'background-repeat: repeat-x',
    'bg-repeat-y': 'background-repeat: repeat-y',
    'bg-repeat-round': 'background-repeat: round',
    'bg-repeat-space': 'background-repeat: space',

    // Background Size
    'bg-auto': 'background-size: auto',
    'bg-cover': 'background-size: cover',
    'bg-contain': 'background-size: contain',

    // Text colors (using duplicates as requested)
    'text-inherit': 'color: inherit',
    'text-current': 'color: currentColor',
    'text-transparent': 'color: transparent',

    // Border utilities
    'border': 'border-width: 1px; border-style: solid; border-color: #d1d5db',
    'border-b': 'border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #d1d5db',
    'border-blue-500': 'border-color: #3b82f6',

    // Ring utilities
    'ring-2': 'box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5)',
    'ring-4': 'box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5)',
    'ring-indigo-200': 'box-shadow: 0 0 0 3px rgba(199, 210, 254, 0.5)',

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

    // Grid positioning
    'col-start-1': 'grid-column-start: 1',
    'col-start-2': 'grid-column-start: 2',
    'col-start-3': 'grid-column-start: 3',
    'col-start-4': 'grid-column-start: 4',
    'col-start-5': 'grid-column-start: 5',
    'col-start-6': 'grid-column-start: 6',
    'col-end-1': 'grid-column-end: 1',
    'col-end-2': 'grid-column-end: 2',
    'col-end-3': 'grid-column-end: 3',
    'col-end-4': 'grid-column-end: 4',
    'col-end-5': 'grid-column-end: 5',
    'col-end-6': 'grid-column-end: 6',
    'row-start-1': 'grid-row-start: 1',
    'row-start-2': 'grid-row-start: 2',
    'row-start-3': 'grid-row-start: 3',
    'row-start-4': 'grid-row-start: 4',
    'row-end-1': 'grid-row-end: 1',
    'row-end-2': 'grid-row-end: 2',
    'row-end-3': 'grid-row-end: 3',
    'row-end-4': 'grid-row-end: 4',

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

    // Line Height
    'leading-3': 'line-height: 0.75rem',
    'leading-4': 'line-height: 1rem',
    'leading-5': 'line-height: 1.25rem',
    'leading-6': 'line-height: 1.5rem',
    'leading-7': 'line-height: 1.75rem',
    'leading-8': 'line-height: 2rem',
    'leading-9': 'line-height: 2.25rem',
    'leading-10': 'line-height: 2.5rem',
    'leading-none': 'line-height: 1',
    'leading-tight': 'line-height: 1.25',
    'leading-snug': 'line-height: 1.375',
    'leading-normal': 'line-height: 1.5',
    'leading-relaxed': 'line-height: 1.625',
    'leading-loose': 'line-height: 2',

    // List Style Image
    'list-image-none': 'list-style-image: none',

    // List Style Position
    'list-inside': 'list-style-position: inside',
    'list-outside': 'list-style-position: outside',

    // List Style Type
    'list-none': 'list-style-type: none',
    'list-disc': 'list-style-type: disc',
    'list-decimal': 'list-style-type: decimal',

    // Spacing utilities
    'space-y-1': 'margin-top: 0.25rem',
    'space-y-2': 'margin-top: 0.5rem',
    'space-y-4': 'margin-top: 1rem',
    'space-y-6': 'margin-top: 1.5rem',


    // Appearance
    'appearance-none': 'appearance: none',
    'appearance-auto': 'appearance: auto',

    // Columns
    'columns-1': 'columns: 1',
    'columns-2': 'columns: 2',
    'columns-3': 'columns: 3',
    'columns-4': 'columns: 4',
    'columns-5': 'columns: 5',
    'columns-6': 'columns: 6',
    'columns-7': 'columns: 7',
    'columns-8': 'columns: 8',
    'columns-9': 'columns: 9',
    'columns-10': 'columns: 10',
    'columns-11': 'columns: 11',
    'columns-12': 'columns: 12',
    'columns-auto': 'columns: auto',
    'columns-3xs': 'columns: 16rem',
    'columns-2xs': 'columns: 18rem',
    'columns-xs': 'columns: 20rem',
    'columns-sm': 'columns: 24rem',
    'columns-md': 'columns: 28rem',
    'columns-lg': 'columns: 32rem',
    'columns-xl': 'columns: 36rem',
    'columns-2xl': 'columns: 42rem',
    'columns-3xl': 'columns: 48rem',
    'columns-4xl': 'columns: 56rem',
    'columns-5xl': 'columns: 64rem',
    'columns-6xl': 'columns: 72rem',
    'columns-7xl': 'columns: 80rem',

    // Break Before
    'break-before-auto': 'break-before: auto',
    'break-before-avoid': 'break-before: avoid',
    'break-before-all': 'break-before: all',
    'break-before-avoid-page': 'break-before: avoid-page',
    'break-before-page': 'break-before: page',
    'break-before-left': 'break-before: left',
    'break-before-right': 'break-before: right',
    'break-before-column': 'break-before: column',

    // Break Inside
    'break-inside-auto': 'break-inside: auto',
    'break-inside-avoid': 'break-inside: avoid',
    'break-inside-avoid-page': 'break-inside: avoid-page',
    'break-inside-avoid-column': 'break-inside: avoid-column',

    // Break After
    'break-after-auto': 'break-after: auto',
    'break-after-avoid': 'break-after: avoid',
    'break-after-all': 'break-after: all',
    'break-after-avoid-page': 'break-after: avoid-page',
    'break-after-page': 'break-after: page',
    'break-after-left': 'break-after: left',
    'break-after-right': 'break-after: right',
    'break-after-column': 'break-after: column',

    // Box Decoration Break
    'box-decoration-clone': 'box-decoration-break: clone',
    'box-decoration-slice': 'box-decoration-break: slice',

    // Box Sizing (duplicate)
    'box-border': 'box-sizing: border-box',
    'box-content': 'box-sizing: content-box',

    // Width
    'w-0': 'width: 0px',
    'w-px': 'width: 1px',
    'w-0.5': 'width: 0.125rem',
    'w-1': 'width: 0.25rem',
    'w-1.5': 'width: 0.375rem',
    'w-2': 'width: 0.5rem',
    'w-2.5': 'width: 0.625rem',
    'w-3': 'width: 0.75rem',
    'w-3.5': 'width: 0.875rem',
    'w-4': 'width: 1rem',
    'w-5': 'width: 1.25rem',
    'w-6': 'width: 1.5rem',
    'w-7': 'width: 1.75rem',
    'w-8': 'width: 2rem',
    'w-9': 'width: 2.25rem',
    'w-10': 'width: 2.5rem',
    'w-11': 'width: 2.75rem',
    'w-12': 'width: 3rem',
    'w-14': 'width: 3.5rem',
    'w-16': 'width: 4rem',
    'w-20': 'width: 5rem',
    'w-24': 'width: 6rem',
    'w-28': 'width: 7rem',
    'w-32': 'width: 8rem',
    'w-36': 'width: 9rem',
    'w-40': 'width: 10rem',
    'w-44': 'width: 11rem',
    'w-48': 'width: 12rem',
    'w-52': 'width: 13rem',
    'w-56': 'width: 14rem',
    'w-60': 'width: 15rem',
    'w-64': 'width: 16rem',
    'w-72': 'width: 18rem',
    'w-80': 'width: 20rem',
    'w-96': 'width: 24rem',
    'w-auto': 'width: auto',
    'w-1/2': 'width: 50%',
    'w-1/3': 'width: 33.333333%',
    'w-2/3': 'width: 66.666667%',
    'w-1/4': 'width: 25%',
    'w-2/4': 'width: 50%',
    'w-3/4': 'width: 75%',
    'w-1/5': 'width: 20%',
    'w-2/5': 'width: 40%',
    'w-3/5': 'width: 60%',
    'w-4/5': 'width: 80%',
    'w-1/6': 'width: 16.666667%',
    'w-2/6': 'width: 33.333333%',
    'w-3/6': 'width: 50%',
    'w-4/6': 'width: 66.666667%',
    'w-5/6': 'width: 83.333333%',
    'w-1/12': 'width: 8.333333%',
    'w-2/12': 'width: 16.666667%',
    'w-3/12': 'width: 25%',
    'w-4/12': 'width: 33.333333%',
    'w-5/12': 'width: 41.666667%',
    'w-6/12': 'width: 50%',
    'w-7/12': 'width: 58.333333%',
    'w-8/12': 'width: 66.666667%',
    'w-9/12': 'width: 75%',
    'w-10/12': 'width: 83.333333%',
    'w-11/12': 'width: 91.666667%',
    'w-full': 'width: 100%',
    'w-screen': 'width: 100vw',
    'w-svw': 'width: 100svw',
    'w-lvw': 'width: 100lvw',
    'w-dvw': 'width: 100dvw',
    'w-min': 'width: min-content',
    'w-max': 'width: max-content',
    'w-fit': 'width: fit-content',

    // Min-Width
    'min-w-0': 'min-width: 0px',
    'min-w-1': 'min-width: 0.25rem',
    'min-w-2': 'min-width: 0.5rem',
    'min-w-3': 'min-width: 0.75rem',
    'min-w-4': 'min-width: 1rem',
    'min-w-5': 'min-width: 1.25rem',
    'min-w-6': 'min-width: 1.5rem',
    'min-w-7': 'min-width: 1.75rem',
    'min-w-8': 'min-width: 2rem',
    'min-w-9': 'min-width: 2.25rem',
    'min-w-10': 'min-width: 2.5rem',
    'min-w-11': 'min-width: 2.75rem',
    'min-w-12': 'min-width: 3rem',
    'min-w-14': 'min-width: 3.5rem',
    'min-w-16': 'min-width: 4rem',
    'min-w-20': 'min-width: 5rem',
    'min-w-24': 'min-width: 6rem',
    'min-w-28': 'min-width: 7rem',
    'min-w-32': 'min-width: 8rem',
    'min-w-36': 'min-width: 9rem',
    'min-w-40': 'min-width: 10rem',
    'min-w-44': 'min-width: 11rem',
    'min-w-48': 'min-width: 12rem',
    'min-w-52': 'min-width: 13rem',
    'min-w-56': 'min-width: 14rem',
    'min-w-60': 'min-width: 15rem',
    'min-w-64': 'min-width: 16rem',
    'min-w-72': 'min-width: 18rem',
    'min-w-80': 'min-width: 20rem',
    'min-w-96': 'min-width: 24rem',
    'min-w-px': 'min-width: 1px',
    'min-w-0.5': 'min-width: 0.125rem',
    'min-w-1.5': 'min-width: 0.375rem',
    'min-w-2.5': 'min-width: 0.625rem',
    'min-w-3.5': 'min-width: 0.875rem',
    'min-w-full': 'min-width: 100%',
    'min-w-min': 'min-width: min-content',
    'min-w-max': 'min-width: max-content',
    'min-w-fit': 'min-width: fit-content',

    // Max-Width
    'max-w-0': 'max-width: 0rem',
    'max-w-none': 'max-width: none',
    'max-w-xs': 'max-width: 20rem',
    'max-w-sm': 'max-width: 24rem',
    'max-w-md': 'max-width: 28rem',
    'max-w-lg': 'max-width: 32rem',
    'max-w-xl': 'max-width: 36rem',
    'max-w-2xl': 'max-width: 42rem',
    'max-w-3xl': 'max-width: 48rem',
    'max-w-4xl': 'max-width: 56rem',
    'max-w-5xl': 'max-width: 64rem',
    'max-w-6xl': 'max-width: 72rem',
    'max-w-7xl': 'max-width: 80rem',
    'max-w-full': 'max-width: 100%',
    'max-w-min': 'max-width: min-content',
    'max-w-max': 'max-width: max-content',
    'max-w-fit': 'max-width: fit-content',
    'max-w-prose': 'max-width: 65ch',
    'max-w-screen-sm': 'max-width: 640px',
    'max-w-screen-md': 'max-width: 768px',
    'max-w-screen-lg': 'max-width: 1024px',
    'max-w-screen-xl': 'max-width: 1280px',
    'max-w-screen-2xl': 'max-width: 1536px',

    // Height
    'h-0': 'height: 0px',
    'h-px': 'height: 1px',
    'h-0.5': 'height: 0.125rem',
    'h-1': 'height: 0.25rem',
    'h-1.5': 'height: 0.375rem',
    'h-2': 'height: 0.5rem',
    'h-2.5': 'height: 0.625rem',
    'h-3': 'height: 0.75rem',
    'h-3.5': 'height: 0.875rem',
    'h-4': 'height: 1rem',
    'h-5': 'height: 1.25rem',
    'h-6': 'height: 1.5rem',
    'h-7': 'height: 1.75rem',
    'h-8': 'height: 2rem',
    'h-9': 'height: 2.25rem',
    'h-10': 'height: 2.5rem',
    'h-11': 'height: 2.75rem',
    'h-12': 'height: 3rem',
    'h-14': 'height: 3.5rem',
    'h-16': 'height: 4rem',
    'h-20': 'height: 5rem',
    'h-24': 'height: 6rem',
    'h-28': 'height: 7rem',
    'h-32': 'height: 8rem',
    'h-36': 'height: 9rem',
    'h-40': 'height: 10rem',
    'h-44': 'height: 11rem',
    'h-48': 'height: 12rem',
    'h-52': 'height: 13rem',
    'h-56': 'height: 14rem',
    'h-60': 'height: 15rem',
    'h-64': 'height: 16rem',
    'h-72': 'height: 18rem',
    'h-80': 'height: 20rem',
    'h-96': 'height: 24rem',
    'h-auto': 'height: auto',
    'h-1/2': 'height: 50%',
    'h-1/3': 'height: 33.333333%',
    'h-2/3': 'height: 66.666667%',
    'h-1/4': 'height: 25%',
    'h-2/4': 'height: 50%',
    'h-3/4': 'height: 75%',
    'h-1/5': 'height: 20%',
    'h-2/5': 'height: 40%',
    'h-3/5': 'height: 60%',
    'h-4/5': 'height: 80%',
    'h-1/6': 'height: 16.666667%',
    'h-2/6': 'height: 33.333333%',
    'h-3/6': 'height: 50%',
    'h-4/6': 'height: 66.666667%',
    'h-5/6': 'height: 83.333333%',
    'h-full': 'height: 100%',
    'h-screen': 'height: 100vh',
    'h-svh': 'height: 100svh',
    'h-lvh': 'height: 100lvh',
    'h-dvh': 'height: 100dvh',
    'h-min': 'height: min-content',
    'h-max': 'height: max-content',
    'h-fit': 'height: fit-content',

    // Min-Height
    'min-h-0': 'min-height: 0px',
    'min-h-1': 'min-height: 0.25rem',
    'min-h-2': 'min-height: 0.5rem',
    'min-h-3': 'min-height: 0.75rem',
    'min-h-4': 'min-height: 1rem',
    'min-h-5': 'min-height: 1.25rem',
    'min-h-6': 'min-height: 1.5rem',
    'min-h-7': 'min-height: 1.75rem',
    'min-h-8': 'min-height: 2rem',
    'min-h-9': 'min-height: 2.25rem',
    'min-h-10': 'min-height: 2.5rem',
    'min-h-11': 'min-height: 2.75rem',
    'min-h-12': 'min-height: 3rem',
    'min-h-14': 'min-height: 3.5rem',
    'min-h-16': 'min-height: 4rem',
    'min-h-20': 'min-height: 5rem',
    'min-h-24': 'min-height: 6rem',
    'min-h-28': 'min-height: 7rem',
    'min-h-32': 'min-height: 8rem',
    'min-h-36': 'min-height: 9rem',
    'min-h-40': 'min-height: 10rem',
    'min-h-44': 'min-height: 11rem',
    'min-h-48': 'min-height: 12rem',
    'min-h-52': 'min-height: 13rem',
    'min-h-56': 'min-height: 14rem',
    'min-h-60': 'min-height: 15rem',
    'min-h-64': 'min-height: 16rem',
    'min-h-72': 'min-height: 18rem',
    'min-h-80': 'min-height: 20rem',
    'min-h-96': 'min-height: 24rem',
    'min-h-px': 'min-height: 1px',
    'min-h-0.5': 'min-height: 0.125rem',
    'min-h-1.5': 'min-height: 0.375rem',
    'min-h-2.5': 'min-height: 0.625rem',
    'min-h-3.5': 'min-height: 0.875rem',
    'min-h-full': 'min-height: 100%',
    'min-h-screen': 'min-height: 100vh',
    'min-h-svh': 'min-height: 100svh',
    'min-h-lvh': 'min-height: 100lvh',
    'min-h-dvh': 'min-height: 100dvh',
    'min-h-min': 'min-height: min-content',
    'min-h-max': 'min-height: max-content',
    'min-h-fit': 'min-height: fit-content',

    // Max-Height
    'max-h-0': 'max-height: 0px',
    'max-h-px': 'max-height: 1px',
    'max-h-0.5': 'max-height: 0.125rem',
    'max-h-1': 'max-height: 0.25rem',
    'max-h-1.5': 'max-height: 0.375rem',
    'max-h-2': 'max-height: 0.5rem',
    'max-h-2.5': 'max-height: 0.625rem',
    'max-h-3': 'max-height: 0.75rem',
    'max-h-3.5': 'max-height: 0.875rem',
    'max-h-4': 'max-height: 1rem',
    'max-h-5': 'max-height: 1.25rem',
    'max-h-6': 'max-height: 1.5rem',
    'max-h-7': 'max-height: 1.75rem',
    'max-h-8': 'max-height: 2rem',
    'max-h-9': 'max-height: 2.25rem',
    'max-h-10': 'max-height: 2.5rem',
    'max-h-11': 'max-height: 2.75rem',
    'max-h-12': 'max-height: 3rem',
    'max-h-14': 'max-height: 3.5rem',
    'max-h-16': 'max-height: 4rem',
    'max-h-20': 'max-height: 5rem',
    'max-h-24': 'max-height: 6rem',
    'max-h-28': 'max-height: 7rem',
    'max-h-32': 'max-height: 8rem',
    'max-h-36': 'max-height: 9rem',
    'max-h-40': 'max-height: 10rem',
    'max-h-44': 'max-height: 11rem',
    'max-h-48': 'max-height: 12rem',
    'max-h-52': 'max-height: 13rem',
    'max-h-56': 'max-height: 14rem',
    'max-h-60': 'max-height: 15rem',
    'max-h-64': 'max-height: 16rem',
    'max-h-72': 'max-height: 18rem',
    'max-h-80': 'max-height: 20rem',
    'max-h-96': 'max-height: 24rem',
    'max-h-none': 'max-height: none',
    'max-h-full': 'max-height: 100%',
    'max-h-screen': 'max-height: 100vh',
    'max-h-svh': 'max-height: 100svh',
    'max-h-lvh': 'max-height: 100lvh',
    'max-h-dvh': 'max-height: 100dvh',
    'max-h-min': 'max-height: min-content',
    'max-h-max': 'max-height: max-content',
    'max-h-fit': 'max-height: fit-content',

    // Shadow
    'shadow-sm': 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)',

    // Interactivity
    'resize-none': 'resize: none',
    'resize-y': 'resize: vertical',
    'resize-x': 'resize: horizontal',
    'resize': 'resize: both',

    // Scroll Behavior
    'scroll-auto': 'scroll-behavior: auto',
    'scroll-smooth': 'scroll-behavior: smooth',

    // Scroll Snap Align
    'snap-start': 'scroll-snap-align: start',
    'snap-end': 'scroll-snap-align: end',
    'snap-center': 'scroll-snap-align: center',
    'snap-align-none': 'scroll-snap-align: none',

    // Scroll Snap Stop
    'snap-normal': 'scroll-snap-stop: normal',
    'snap-always': 'scroll-snap-stop: always',

    // Scroll Snap Type
    'snap-none': 'scroll-snap-type: none',
    'snap-x': 'scroll-snap-type: x var(--tw-scroll-snap-strictness)',
    'snap-y': 'scroll-snap-type: y var(--tw-scroll-snap-strictness)',
    'snap-both': 'scroll-snap-type: both var(--tw-scroll-snap-strictness)',
    'snap-mandatory': '--tw-scroll-snap-strictness: mandatory',
    'snap-proximity': '--tw-scroll-snap-strictness: proximity',

    // Touch Action
    'touch-auto': 'touch-action: auto',
    'touch-none': 'touch-action: none',
    'touch-pan-x': 'touch-action: pan-x',
    'touch-pan-left': 'touch-action: pan-left',
    'touch-pan-right': 'touch-action: pan-right',
    'touch-pan-y': 'touch-action: pan-y',
    'touch-pan-up': 'touch-action: pan-up',
    'touch-pan-down': 'touch-action: pan-down',
    'touch-pinch-zoom': 'touch-action: pinch-zoom',
    'touch-manipulation': 'touch-action: manipulation',

    // Will Change
    'will-change-auto': 'will-change: auto',
    'will-change-scroll': 'will-change: scroll-position',
    'will-change-contents': 'will-change: contents',
    'will-change-transform': 'will-change: transform',

    // Screen Readers
    'sr-only': 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0',
    'not-sr-only': 'position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal',

    // Forced Color Adjust
    'forced-color-adjust-auto': 'forced-color-adjust: auto',
    'forced-color-adjust-none': 'forced-color-adjust: none',
  };

  Object.assign(keywords, createColorKeywordMap('bg', 'background-color'));
  Object.assign(keywords, createColorKeywordMap('text', 'color'));
  Object.assign(keywords, createColorKeywordMap('border', 'border-color'));
  Object.assign(keywords, createBorderRadiusKeywordMap());
  return keywords;
}

export const CONFIG = {
  breakpoints: CONSTANTS.DEFAULT_BREAKPOINTS,
  pixelMultiplier: CONSTANTS.DEFAULT_PIXEL_MULTIPLIER,
  props: createDefaultProperties(),
  keywords: createDefaultKeywords(),
  shortcuts: {}
};

/**
 * Validate configuration object
 * @param {object} config
 * @returns {object} Validation result
 */
export function validateConfig(config) {
  const errors = [];

  if (!config) {
    errors.push('Config object is required');
    return { valid: false, errors };
  }

  // Validate breakpoints
  if (config.breakpoints) {
    Object.entries(config.breakpoints).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        errors.push(`Breakpoint "${key}" must be a string`);
      }
      if (!value.includes('width') && !value.includes('height')) {
        errors.push(`Breakpoint "${key}" should contain width or height media query`);
      }
    });
  }

  // Validate pixelMultiplier
  if (config.pixelMultiplier !== undefined) {
    if (typeof config.pixelMultiplier !== 'number' || config.pixelMultiplier <= 0) {
      errors.push('pixelMultiplier must be a positive number');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function createDefaultConfig() {
  const config = {
    breakpoints: CONSTANTS.DEFAULT_BREAKPOINTS,
    pixelMultiplier: CONSTANTS.DEFAULT_PIXEL_MULTIPLIER,
    props: createDefaultProperties(),
    keywords: createDefaultKeywords(),
    shortcuts: {}
  };

  // Validate the default configuration
  const validation = validateConfig(config);
  if (!validation.valid) {
    console.warn('PostWind: Default configuration validation errors:', validation.errors);
  }

  return config;
}
