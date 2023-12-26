import {transform} from './transform.js';

/** @type {import('rollup').PluginImpl} */
export function tailwind() {
	return {
		name: 'tailwind',
		async transform(code, id) {
			const result = await transform(code, id);
			if (result) {
				return {code: result};
			}
			return null;
		},
	};
}
