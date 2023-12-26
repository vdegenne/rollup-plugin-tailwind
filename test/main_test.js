import test from 'node:test';
import assert from 'node:assert';

import {rollup} from 'rollup';
import {cssModules} from 'rollup-plugin-css-modules';
import {tailwind} from '../lib/index.js';
import virtual from '@rollup/plugin-virtual';

test('transform tailwind', async () => {
	const bundle = await rollup({
		input: 'index.js',
		plugins: [
			tailwind(),
			virtual({
				'index.js': `
                         import styles from './styles.css' with {type:'css'};

                         document.adoptedStyleSheets.push(styles);
                         document.body.innerHTML = '<div class="text-9xl">test</div>';
               `,
				'styles.css': `
                         @tailwind utilities;

                         :host {
                              @apply text-xl;
                         }

                         .foo { color: red; }
               `,
			}),
			// Needed for now to convert CSS imports to modules
			cssModules(),
		],
	});

	const {output} = await bundle.generate({
		format: 'es',
		exports: 'named',
	});

	assert(output[0].code.includes('.text-9xl'));
});
