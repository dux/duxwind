# DuxWind – AI Contributor Guide

Use this guide whenever you (or another AI assistant) need quick context on DuxWind before touching the codebase.

## TL;DR

- **100% Tailwind-compatible runtime** — every core utility, keyword, pseudo-class, and responsive prefix behaves exactly like Tailwind.
- **Zero build setup** — include a single script tag, call `DuxWind.init()`, and start writing classes. Everything compiles in real time.
- **Focus on the extras** — shortcuts, inline container queries, packed responsive syntax, viewport-triggered pseudos, and runtime-configurable keywords make this project unique.

## Core Concepts

| Capability | Why it matters |
| --- | --- |
| Real-time utility resolver | Classes become CSS instantly during runtime; perfect for demos, CodePens, and apps without build tooling. |
| Tailwind parity + enhancements | Existing knowledge transfers directly (spacing, colors, flex, grid, etc.), while DuxWind adds new syntaxes (`p-4|8`, `text-lg@m`). |
| Configurable runtime | `DuxWind.init()` accepts breakpoints, debug/reset flags, and lets you hot-swap props & keyword maps. |
| Shortcut & keyword overrides | `DuxWind.define()` registers reusable shortcuts **or** low-level CSS keywords without mutating config manually. |
| Inline container queries | `min-480:flex-col` / `max-640:g-4` style classes use per-node `ResizeObserver` support. |
| Visibility pseudo | `visible:` prefix toggles any utility once an element enters the viewport—no extra JS. |

## Quick Start

```html
<script src="https://cdn.jsdelivr.net/npm/duxwind@latest/dist/lib.min.js"></script>
<script>
  DuxWind.init({
    debug: true,               // logs cache + class translations
    breakpoints: {
      m: '(max-width: 640px)',
      t: '(min-width: 641px) and (max-width: 1023px)',
      d: '(min-width: 1024px)'
    }
  });

  DuxWind.define({
    btn: 'px-4 py-2 rounded-xl font-medium transition-all duration-200 border border-transparent',
    'btn-primary': 'btn bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-200',
    'text-brand': 'color: #2563eb; font-weight: 600;'
  });
</script>
```

- Script path can be local (`src/lib.js`) or hosted (GitHub Pages/CDN).
- Breakpoints default to `m`, `t`, `d` plus friendly aliases; override them via `init()` only.
- `debug: true` is smart about dev ports (`localhost`, `:3000`, etc.).

## Configuration Checklist

1. **Default payload** — `DuxWind.loadDefaultConfig()` auto registers ~100 CSS properties and 200 keyword utilities (flex/grid/shadows/rounded/etc.).
2. **Runtime overrides** — pass partial objects into `DuxWind.init({ props, keywords, breakpoints })` to merge/replace defaults.
3. **Cache control** — `clearCache: true` inside `init()` wipes the memoized class map; `DuxWind.resetCss()` reapplies the base reset.
4. **Breakpoints** — stored as media query strings. Keys power:
   - Prefix syntax (`d:items-center`)
   - Pipe notation order (`p-4|8|12` → `m|t|d`)
   - Property-first notation (`text-lg@d`)

## Shortcuts vs. Keyword Utilities (`DuxWind.define`)

`DuxWind.define()` inspects each value to decide whether you are creating a shortcut or a raw CSS keyword:

- **Shortcut (class list)** — any string *without* both `:` and `;`. Example: `'btn': 'px-4 py-2 rounded'`.
- **Keyword utility (CSS declaration)** — string that includes both `:` and `;`, or an object map. Example: `'text-brand': 'color: #2563eb; font-weight: 600;'`.
- Supports nested shortcuts (`btn-primary` can re-use `btn`).
- Automatically flushes memoized class output so overrides take effect immediately.

## Responsive Syntax Buffet

| Style | Example | Notes |
| --- | --- | --- |
| Prefix | `d:text-2xl` | Matches Tailwind’s `sm/md/lg` pattern but uses project-defined keys (`m`, `t`, `d`, `mobile`, etc.). |
| Property-first | `text-lg@m text-xl@d` | Reads like CSS (`property@breakpoint`). |
| Pipe notation | `p-4|8|12` | Values map to breakpoint order; can omit trailing positions (`p-4|8` → mobile/desktop). |
| Inline container queries | `max-480:flex-col`, `min-640:grid-cols-3` | Observes the element’s width (px only) and toggles utilities without media queries. |
| State combos | `hover:d:bg-blue-600`, `visible:opacity-100` | Pseudos stack with breakpoints and custom syntaxes. |

## Advanced Utilities to Call Out

- **`visible:` pseudo:** Works like `:isVisible`—DuxWind uses `IntersectionObserver` to add/remove the target utility. Great for scroll animations (`visible:translate-y-0 opacity-100`).
- **Logical radius/edges:** Keyword map covers the entire Tailwind rounded family (`rounded-s-xl`, `rounded-ee-3xl`, etc.), showcased in `example/index.html`.
- **Border helpers:** All border widths, styles (`dashed`, `dotted`, `double`), directional keywords (`border-y-4`, `border-s`), and new logical helpers mirror Tailwind.
- **Inline gradients & arbitrary values:** Bracket notation (`bg-[hsl(240,100%,80%)]`, `shadow-[0_10px_40px_rgba(0,0,0,0.2)]`) works everywhere.
- **Docs generator:** `src/gen-doc.js` scrapes config and emits markdown; run via `bun gen-doc` (see package scripts) when config changes.

## Common Workflows for Contributors

1. **Update config** (`src/config.js`)
   - Extend `props` or `keywords` maps.
   - Keep helpers (e.g., rounded keyword generator) in sync with tests.
2. **Runtime logic** (`src/core.js`)
   - `DuxWind.init`, memo cache, parser rules, and pseudo handling live here.
3. **Shortcuts/demo** (`example/index.html`, `README.md`)
   - Showcase new utilities in the demo tabs so users can see them instantly.
4. **Testing** (`bun test`)
   - Tests live under `src/*.test.js` and cover parser rules, config generators, and shortcut behavior.

## Tips for AI Edits

- **Prefer `DuxWind.define` for runtime additions**; edit `config.js` only when adding default utilities.
- **When you touch `config.js`, update or add tests** (see `src/duxwind.test.js`, `src/styler.test.js`).
- **Demo parity matters** — if you add a new keyword family, showcase it inside `example/index.html`.
- **Maintain ASCII** and avoid removing user edits unless asked.
- **Commands:** run `bun test` before shipping changes that touch JS logic.

With these guardrails, you can confidently highlight what makes DuxWind special without re-documenting every Tailwind utility. Focus on the runtime perks, config surface area, and the hands-on demo files.
