import {transform} from './transform.js';

/**
 * @returns {import('@web/dev-server-core').Plugin}
 */
export function tailwind() {
	return {
		name: 'tailwind',
		async transform(context) {
			const transformed = await transform(context.body, context.path);
			if (transformed) {
				return transformed;
			}
		},
	};
}
