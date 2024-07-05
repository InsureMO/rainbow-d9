import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';
import * as md from 'vite-plugin-markdown';

export const buildConfig = (lint) => {
	let isCircularImportFound = false;
	return {
		input: './src/index.tsx',
		output: [
			{format: 'es', dir: '.'},
			{format: 'cjs', file: './index.cjs.js'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**', 'src/**/*.md']}) : null,
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			typescript({clean: true}), babel({babelHelpers: "bundled"}),
			md.plugin({mode: [md.Mode.MARKDOWN]})
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
			'nanoid', 'color', 'js-yaml',
			'react-markdown', 'remark-gfm',
			'github-markdown-css/github-markdown.css',
			'react-syntax-highlighter', 'react-syntax-highlighter/dist/esm/styles/prism',
			'@projectstorm/geometry',
			'@projectstorm/react-canvas-core', '@projectstorm/react-diagrams-core', '@projectstorm/react-diagrams',
			'dom-to-image',
			'@codemirror/commands', '@codemirror/lang-javascript', '@codemirror/lint', '@codemirror/state',
			'@codemirror/view', 'codemirror',
			'@rainbow-d9/n1', '@rainbow-d9/n2', '@rainbow-d9/n3'
		]
	};
};