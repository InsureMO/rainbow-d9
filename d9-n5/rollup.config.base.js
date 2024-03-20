import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';

export const buildConfig = (lint) => {
	let isCircularImportFound = false;
	return {
		input: './src/index.tsx',
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
			'react', 'react-dom', 'styled-components',
			'nanoid',
			'codemirror', '@codemirror/view', '@codemirror/state',
			'@codemirror/commands', '@codemirror/autocomplete',
			'@codemirror/language', '@codemirror/lang-markdown', '@codemirror/lang-javascript',
			'@lezer/common', '@lezer/highlight', '@lezer/markdown',
			'@rainbow-d9/n1', '@rainbow-d9/n2', '@rainbow-d9/n3'
		]
	};
};