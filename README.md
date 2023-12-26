# @vdegenne/rollup-plugin-tailwind

Mini plugin to resolve tailwind declarations in CSS imports.

For instance,

`globals.css`:

```css
@tailwind components;

/* global styles */
```

`index.js`:

```js
import globalStyles from './globals.css' assert {type: 'css'};

document.adoptedStyleSheets.push(globalStyles);

document.body.innerHTML = `<span class="text-9xl">Hello, world!</span>`;
```

`globals.css` after building will become:

```css
.text-9xl {
	/* ... */
}

/* global styles */
```

## Usage

**Important: Import assertions (i.e. `assert {type: 'css'}`) are not well supported in web browsers as of now.\
You will need to convert these imports during the building process too.\
[rollup-plugin-css-modules](https://www.npmjs.com/package/rollup-plugin-css-modules) is the recommended plugin for that.**

### Install

```
npm i -D rollup-plugin-css-modules @vdegenne/rollup-plugin-tailwind
```

### Rollup config

`rollup.config.js`:

```json
import {tailwind} from '@vdegenne/rollup-plugin-tailwind';
import {cssModules} from 'rollup-plugin-css-modules';

export default {
     plugins: [
          // Order matters!
          // 1. Resolve tailwind declarations in CSS files.
          tailwind(),
          // 2. Convert CSS files to modules.
          cssModules(),
     ]
};
```

### @web/dev-server

There is also a port for use during development when coding using [`@web/dev-server`](https://modern-web.dev/docs/dev-server/overview/) tool suite:

`web-dev-server.config.js`:

```js
import {tailwind} from '@vdegenne/rollup-plugin-tailwind/wds.js';

export default {
	plugins: [tailwind()],
};
```

_(During development you can omit the use of `rollup-plugin-css-modules` as far as your browser understands the `assert` statement)._

## License

MIT License
