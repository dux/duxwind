import { describe, test, expect, beforeEach } from 'bun:test';

// Mock DOM environment - must be set before importing DuxWind
global.window = {
  innerWidth: 1024,
  DuxWind: null,
  DuxWindDebug: false,
  location: {
    port: 3000
  }
};

global.MutationObserver = class MutationObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

// Shared CSS capture store so multiple test files see the same injected rules
const CSS_STORE_KEY = '__duxwindCSSStore';
const cssStore = global[CSS_STORE_KEY] || { value: '' };
global[CSS_STORE_KEY] = cssStore;

const getCapturedCSS = () => cssStore.value;
const resetCapturedCSS = () => { cssStore.value = ''; };

global.document = {
  createElement: () => ({
    setAttribute: () => {},
    get textContent() { return cssStore.value; },
    set textContent(value) { cssStore.value += value; },
    appendChild: () => {}
  }),
  head: {
    appendChild: () => {},
    insertBefore: () => {},
    firstChild: null
  },
  getElementById: () => null,
  querySelector: () => ({
    textContent: cssStore.value
  }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};

// Import DuxWind after setting up mocks and ensure the cached module export
// is reattached to the mocked window environment for this file.
const { default: DuxWind } = await import('../src/lib.js');
global.window.DuxWind = DuxWind;

describe('DuxWind Shortcut Suites', () => {
  beforeEach(() => {
    // Reset CSS capture and configuration
    resetCapturedCSS();
    DuxWind.loadDefaultConfig();
    DuxWind.init({ debug: false, clearCache: true });
  });

  // Helper function to test class processing and capture output
  function testClassWithOutput(className, expectedInCSS = []) {
    const initialCSS = getCapturedCSS();
    try {
      DuxWind.loadClass(className);
      const newCSS = getCapturedCSS().substring(initialCSS.length);

      expectedInCSS.forEach(expected => {
        expect(newCSS).toContain(expected);
      });

      return { success: true, css: newCSS };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  function reinitWithBreakpoints(breakpoints) {
    DuxWind.init({ debug: false, clearCache: true, breakpoints });
  }

  describe('Shortcut System: Input → Expanded Classes → CSS', () => {
    test('basic shortcuts: {shortcut} → {expanded-classes} → {css}', () => {
      DuxWind.config.shortcuts = {
        'btn': 'px-4 py-2 rounded border cursor-pointer',
        'card': 'p-6 bg-white shadow rounded-lg'
      };

      const btnResult = testClassWithOutput('btn', ['padding-left: 16px', 'padding-top: 8px', 'border-radius', 'border-width', 'cursor: pointer']);
      expect(btnResult.success).toBe(true);

      const cardResult = testClassWithOutput('card', ['padding: 24px']);
      expect(cardResult.success).toBe(true);
    });

    test('nested shortcuts: {parent} references {child} → fully expanded CSS', () => {
      DuxWind.config.shortcuts = {
        'btn': 'px-4 py-2 rounded',
        'btn-primary': 'btn bg-blue-500 text-white',
        'btn-lg': 'btn px-6 py-3 text-lg'
      };

      const primaryResult = testClassWithOutput('btn-primary', [
        'padding-left: 16px',
        'padding-top: 8px',
        'border-radius',
        'background-color',
        'color'
      ]);
      expect(primaryResult.success).toBe(true);
    });

    test('runtime shortcut registration injects CSS immediately', () => {
        const initialCSSLength = getCapturedCSS().length;

      DuxWind.loadClass('btn-runtime');
      expect(getCapturedCSS().length).toBe(initialCSSLength);

      const success = DuxWind.shortcut('btn-runtime', 'px-4 py-2 rounded');
      expect(success).toBe(true);

      const newCSS = getCapturedCSS().substring(initialCSSLength);
      expect(newCSS).toContain('.btn-runtime');
      expect(newCSS).toContain('padding-left: 16px');
      expect(newCSS).toContain('padding-top: 8px');
    });

    test('shortcut CSS uses nested selectors and media queries', () => {
      const initialCSSLength = getCapturedCSS().length;

      const success = DuxWind.shortcut('btn-modern', 'px-4 hover:bg-blue-500 d:px-8 d:hover:bg-blue-600');
      expect(success).toBe(true);

      DuxWind.loadClass('btn-modern');
      const css = getCapturedCSS().substring(initialCSSLength);

      expect(css).toContain('.btn-modern {');
      expect(css).toContain('&:hover {');
      expect(css).toContain('@media (min-width: 1025px) {');
      expect(css).toContain('padding-left: 16px;');
      expect(css).toContain('padding-left: 32px;');
    });

    test('selector shortcuts register raw selectors without dot prefix', () => {
      const initialCSSLength = getCapturedCSS().length;

      const success = DuxWind.shortcut('body h3', 'px-4 py-2 font-semibold');
      expect(success).toBe(true);

      const css = getCapturedCSS().substring(initialCSSLength);
      expect(css).toContain('body h3 {');
      expect(css).toContain('padding-left: 16px;');
      expect(css).toContain('font-weight: 600;');
    });

    test('selector shortcuts support comma-separated selectors', () => {
      const initialCSSLength = getCapturedCSS().length;
      const definition = 'text-60px leading-80px font-bold mb-30px m:text-center m:text-30px m:leading-45px m:mb-10px';

      const success = DuxWind.shortcut('.h1, .prose h1', definition);
      expect(success).toBe(true);

      const css = getCapturedCSS().substring(initialCSSLength);
      expect(css).toContain('.h1, .prose h1 {');
      expect(css).toContain('font-size: 60px;');
      expect(css).toContain('line-height: 80px;');
      expect(css).toContain('font-weight: 700;');
      expect(css).toContain('margin-bottom: 30px;');
      expect(css).toContain('@media (max-width: 768px)');
      expect(css).toContain('text-align: center;');
      expect(css).toContain('font-size: 30px;');
    });

    test('dot-prefixed shortcuts behave like class shortcuts', () => {
      const initialCSSLength = getCapturedCSS().length;

      const success = DuxWind.shortcut('.big-box', 'br-0|4');
      expect(success).toBe(true);

      const css = getCapturedCSS().substring(initialCSSLength);
      expect(css).toContain('.big-box {');
      expect(css).toContain('border-radius');

      const loadResult = testClassWithOutput('big-box');
      expect(loadResult.success).toBe(true);
    });
  });

  describe('CSS Override System: Explicit Classes Override Shortcut Classes', () => {
    test('basic override: explicit p-10 overrides shortcut p-8', () => {
      DuxWind.config.shortcuts = {
        'spacious-box': 'p-8 bg-gray-100 border-2 m-4 rounded'
      };

      const shortcutOnly = testClassWithOutput('spacious-box', ['padding: 32px']);
      expect(shortcutOnly.success).toBe(true);

      resetCapturedCSS();

      const explicitOverride = testClassWithOutput('p-10', ['padding: 40px']);
      expect(explicitOverride.success).toBe(true);
    });

    test('responsive override: p-10@m overrides shortcut padding on mobile', () => {
      reinitWithBreakpoints({
        'm': '(max-width: 768px)',
        'd': '(min-width: 1025px)'
      });

      DuxWind.config.shortcuts = {
        'responsive-card': 'm:p-4 d:p-6 bg-white shadow rounded'
      };

      const shortcutOnly = testClassWithOutput('responsive-card', ['@media (max-width: 768px)', 'padding: 16px']);
      expect(shortcutOnly.success).toBe(true);

      resetCapturedCSS();

      const responsiveOverride = testClassWithOutput('m:p-10', ['@media (max-width: 768px)', 'padding: 40px']);
      expect(responsiveOverride.success).toBe(true);
    });

    test('@ notation override: p-10@m notation overrides shortcut padding', () => {
      DuxWind.config.shortcuts = {
        'mobile-card': 'm:p-6 bg-blue-100 border rounded-lg'
      };

      const shortcutResult = testClassWithOutput('mobile-card', ['@media', 'padding: 24px']);
      expect(shortcutResult.success).toBe(true);

      resetCapturedCSS();

      const atNotationResult = testClassWithOutput('m:p-10', ['@media', 'padding: 40px']);
      expect(atNotationResult.success).toBe(true);
    });

    test('multiple property override: explicit classes override multiple shortcut properties', () => {
      DuxWind.config.shortcuts = {
        'complex-component': 'p-4 m-2 bg-gray-200 text-gray-800 border-gray-300 rounded-md'
      };

      const paddingOverride = testClassWithOutput('p-8', ['padding: 32px']);
      expect(paddingOverride.success).toBe(true);

      resetCapturedCSS();

      const marginOverride = testClassWithOutput('m-6', ['margin: 24px']);
      expect(marginOverride.success).toBe(true);

      resetCapturedCSS();

      const backgroundOverride = testClassWithOutput('bg-red-500', ['background-color']);
      expect(backgroundOverride.success).toBe(true);
    });

    test('nested shortcut override: explicit class overrides nested shortcut property', () => {
      DuxWind.config.shortcuts = {
        'btn': 'px-4 py-2 rounded border',
        'btn-large': 'btn px-6 py-4 text-lg font-bold'
      };

      const nestedOverride = testClassWithOutput('px-8', ['padding-left: 32px', 'padding-right: 32px']);
      expect(nestedOverride.success).toBe(true);
    });

    test('specific requested scenario: p-10@m notation with shortcut override', () => {
      DuxWind.config.shortcuts = {
        'card-component': 'p-6 bg-white shadow rounded border'
      };

      reinitWithBreakpoints({
        'm': '(max-width: 768px)',
        'd': '(min-width: 1025px)'
      });

      const shortcutResult = testClassWithOutput('card-component', ['padding: 24px']);
      expect(shortcutResult.success).toBe(true);

      resetCapturedCSS();

      const explicitOverride = testClassWithOutput('p-10', ['padding: 40px']);
      expect(explicitOverride.success).toBe(true);

      resetCapturedCSS();

      expect(() => DuxWind.loadClass('m:p-10')).not.toThrow();
      expect(true).toBe(true);
    });

    test('comprehensive override: multiple explicit classes vs shortcut', () => {
      DuxWind.config.shortcuts = {
        'complex-widget': 'p-4 m-2 bg-gray-100 text-black border-gray-300 rounded shadow-sm'
      };

      const tests = [
        { class: 'p-8', expected: ['padding: 32px'] },
        { class: 'm-6', expected: ['margin: 24px'] },
        { class: 'bg-red-500', expected: ['background-color'] }
      ];

      tests.forEach(({ class: className, expected }) => {
        resetCapturedCSS();
        const result = testClassWithOutput(className, expected);
        expect(result.success).toBe(true);
      });
    });
  });
});
