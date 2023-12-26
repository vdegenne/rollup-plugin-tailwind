import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

/**
 * Tailwind transform entry if it's a CSS import.
 *
 * @param {string|unknown} body Content of the file pointed by path.
 * @param {string} path Filepath of the content being transformed.
 * @returns {Promise<string|null>} Modified content
 */
export async function transform(body, path) {
	if (/\.css(\?.*)?$/.test(path)) {
		const processed = await postcss([tailwindcss]).process(body, {
			from: path,
		});
		return processed.css;
	}
	return null;
}
