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
	const dtsPlugin = createRawFilePlugin(
		'vite:transform-dts', id => /\.dts$/.test(id), content => `const dts = ${content};\nexport {dts};`)

	return {
		input: './src/index.ts',
		output: [
			{format: 'es', dir: '.'},
			{format: 'cjs', file: './index.cjs.js'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**', 'src/**/*.dts']}) : null,
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			typescript({clean: true}), babel({babelHelpers: "bundled"}),
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
			'@codemirror/view', '@codemirror/state', '@codemirror/language', '@codemirror/lint', '@codemirror/autocomplete',
			'comlink'
		],
		strictDeprecations: true
	};
};