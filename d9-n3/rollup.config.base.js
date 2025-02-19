import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import typescript from 'rollup-plugin-typescript2';

export const buildConfig = (lint) => {
	let isCircularImportFound = false;

	return {
		input: './src/index.ts',
		output: [
			{format: 'es', dir: '.'},
			{format: 'cjs', file: './index.cjs.js'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**']}) : null,
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			typescript({clean: true}), babel({babelHelpers: "bundled"})
		].filter(x => x != null),
		onwarn(warning, defaultHandler) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				if (!isCircularImportFound) {
					isCircularImportFound = true;
					defaultHandler(`Warning: 1+ circular dependencies found.`);
				}
			} else {
				defaultHandler(warning);
			}
		},
		external: [
			'react', 'react-dom',
			'mdast-util-from-markdown', 'mdast-util-frontmatter', 'mdast-util-gfm-footnote', 'mdast-util-gfm-strikethrough',
			'mdast-util-gfm-table', 'mdast-util-gfm-task-list-item',
			'micromark-extension-frontmatter', 'micromark-extension-gfm-footnote', 'micromark-extension-gfm-strikethrough',
			'micromark-extension-gfm-table', 'micromark-extension-gfm-task-list-item',
			'@rainbow-d9/n1', '@rainbow-d9/n2'
		],
		strictDeprecations: true
	};
};