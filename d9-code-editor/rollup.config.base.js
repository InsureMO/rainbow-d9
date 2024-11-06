import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import {createFilter} from '@rollup/pluginutils';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';

export const buildConfig = (lint) => {
	let isCircularImportFound = false;
	const createRawFilePlugin = (name, test, toCode) => {
		return () => {
			const include = (void 0);
			const exclude = (void 0);
			const filter = createFilter(include, exclude);
			return {
				name,
				enforce: 'pre',
				async transform(code, id) {
					if (test(id)) {
						// Filters the filesystem for files to include/exclude. Includes all files by default.

						if (!filter(id)) {
							return null;
						}
						return {code: toCode(JSON.stringify(code))}
					}
					return null;
				}
			}
		}
	}
	const markdownPlugin = createRawFilePlugin(
		'vite:transform-md', id => /\.md$/.test(id), content => `const markdown = ${content};\nexport {markdown};`)
	const dtsPlugin = createRawFilePlugin(
		'vite:transform-dts', id => /\.dts$/.test(id), content => `const dts = ${content};\nexport {dts};`)

	return {
		input: './src/index.tsx',
		output: [
			{format: 'es', dir: '.'},
			{format: 'cjs', file: './index.cjs.js'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**', 'src/**/*.md', 'src/**/*.dts']}) : null,
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			typescript({clean: true}), babel({babelHelpers: "bundled"}),
			markdownPlugin(),
			dtsPlugin()
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
			'typescript',
			'react', 'react-dom', 'styled-components',
			'@codemirror/commands', '@codemirror/lint', '@codemirror/state',
			'@codemirror/view', '@codemirror/autocomplete', 'codemirror',
			'@codemirror/language', '@codemirror/lang-javascript',
			'@rainbow-d9/n1', '@rainbow-d9/n2', '@rainbow-d9/n3', '@rainbow-d9/ts-vfs'
		]
	};
};