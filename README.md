@pagedjs/paged-layout
===========

Extracted from [Paged.js](https://pagedjs.org), this library can be used independently to lay out content across pages, or any bounded container.

## NPM Module
```sh
$ npm install @pagedjs/paged-layout
```

## How It Works

Source content is laid out into **pages** one at a time. When content exceeds the remaining page extent, the engine selects a break point and produces a **break token**. The break token captures the position in the content and carries any extracted overflow. The next page receives this break token and resumes layout where the previous one left off.

- **Layout is per-page** -- a new `Layout` instance is created for each page. It reads the page element's `getBoundingClientRect()` as bounds.
- **Break tokens carry overflow** -- `BreakToken.overflow[]` holds `Overflow` objects containing DOM content extracted from the previous page.
- **Overflow transfer is built-in** -- `renderTo()` automatically transfers overflow from the incoming break token before continuing the content walk.
- **Dynamic page creation** -- the consumer creates new pages as needed when a break token is returned.

```js
import { Layout, ContentParser } from '@pagedjs/paged-layout';

const source = new ContentParser(document.getElementById('content'));
const container = document.getElementById('container');
let breakToken;
let prevWrapper;

// Pages are created dynamically as content overflows
while (true) {
  // Create a new page with defined bounds
  const page = document.createElement('div');
  page.style.width = '600px';
  page.style.height = '400px';
  page.style.overflow = 'hidden';
  container.appendChild(page);

  const wrapper = document.createElement('div');
  page.appendChild(wrapper);

  // Layout is instantiated per-page (not reused)
  const layout = new Layout(page);
  const result = await layout.renderTo(wrapper, source, breakToken, prevWrapper);
  breakToken = result.breakToken;
  prevWrapper = wrapper;

  // No more content -- layout is complete
  if (!breakToken) break;
}
```

## API

### Layout

The core layout engine. Takes a page element and lays out content into it.

```js
import { Layout } from '@pagedjs/paged-layout';

const layout = new Layout(element, hooks, options);
const result = await layout.renderTo(wrapper, source, breakToken, prevWrapper);
```

**Constructor:**
- `element` -- the page DOM element (bounds are read from its `getBoundingClientRect()`)
- `hooks` -- optional Hook objects for plugin integration
- `options` -- optional settings (`hyphenGlyph`, `maxChars`)

**`renderTo(wrapper, source, breakToken, prevWrapper)`** -- renders content into the wrapper, returns a `RenderResult` containing the next `BreakToken` (or `undefined` if complete).

### BreakToken

Carries state between pages: the current node position and overflow content.

```js
import { BreakToken } from '@pagedjs/paged-layout';
```

### ContentParser

Prepares source content by adding `data-ref` UUIDs for element tracking across pages.

```js
import { ContentParser } from '@pagedjs/paged-layout';

const source = new ContentParser(document.getElementById('content'));
```

### Hook

The plugin registration and callback system. Allows consumers to hook into layout events.

```js
import { Hook } from '@pagedjs/paged-layout';

const onOverflow = new Hook();
onOverflow.register((overflow, rendered, bounds) => {
  console.log('Overflow detected:', overflow);
});
```

### Layout Hooks

When `Layout` is constructed without hooks, it creates its own set:

```js
onPageLayout   // Fired at the start of renderTo
layoutNode     // Fired for each node during the layout walk
renderNode     // Fired when rendering a cloned node
layout         // Fired after completing a top-level element
beforeOverflow // Fired before overflow detection
onOverflow     // Fired when overflow is detected
onBreakToken   // Fired when a break token is created
onNamedPage    // Fired when a named page node is encountered
afterOverflowRemoved  // Fired after overflow content is extracted
afterOverflowAdded    // Fired after overflow content is added to a new page
beforeRenderResult    // Fired before returning the final result
```

Consumers can pass shared hooks to coordinate behavior across pages.

### Events

```js
const layout = new Layout(element);

layout.addEventListener('overflow', (e) => {
  console.log('Overflow detected:', e.detail);
});

layout.addEventListener('breaktoken', (e) => {
  console.log('Break token created:', e.detail);
});
```

### DOM Utilities

Helper functions for DOM traversal, node classification, and tree rebuilding:

```js
import { walk, rebuildTree, needsBreakBefore, isContainer, words, letters } from '@pagedjs/paged-layout';
```

## Setup
Install dependencies
```sh
$ npm install
```

## Development
Build the `dist` output
```sh
$ npm run build
```

## Testing
```sh
$ npm test
```

## License

MIT License (MIT)
