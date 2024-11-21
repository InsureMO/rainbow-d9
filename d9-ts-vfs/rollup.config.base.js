import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import {createFilter} from '@rollup/pluginutils';
import fs from 'fs';
import path from 'path';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';
import {fileURLToPath} from 'url';

export const buildConfig = (lint) => {
	// noinspection DuplicatedCode
	let isCircularImportFound = false;
	const createRawFilePlugin = (name, test, toCode) => {
		return () => {
			const include = (void 0);
			const exclude = (void 0);
			const filter = createFilter(include, exclude);
			const __dirname = path.dirname(fileURLToPath(import.meta.url));
			return {
				name,
				enforce: 'pre',
				async resolveId(source) {
					// resolve the import "./typescript/lib/*?dts" to the actual file path
					if (/\.\/typescript\/lib\/.+\?dts$/.test(source)) {
						const resolvedPathInProject = path.resolve(__dirname, 'node_modules', source.slice(0, -4));
						if (fs.existsSync(resolvedPathInProject)) {
							return resolvedPathInProject;
						}
						// not found in project, resolve it from workspace
						return path.resolve(__dirname, '../node_modules', source.slice(0, -4));
					}
					return null;
				},
				async transform(code, id) {
					if (test(id)) {
						// Filters the filesystem for files to include/exclude. Includes all files by default.
						if (!filter(id)) {
							return null;
						}
						// fix dts files if needed
						if (id.endsWith('/lib.es5.d.ts')) {
							// remove eval from es5, it is not allowed in any scenario for security reasons
							code = code.replace('declare function eval(x: string): any;', '// declare function eval(x: string): any;')
						}
						// if (id.endsWith('.d.ts')) {
						// 	const index = id.lastIndexOf('/');
						// 	const filename = id.slice(index + 1);
						// 	const copiedFile = path.resolve(__dirname, 'src/lib/vfs/dts-files', filename.replace('.d.ts', '.dts'));
						// 	const copiedContent = fs.readFileSync(copiedFile, 'utf-8');
						// 	if (copiedContent !== code) {
						// 		console.log(`Warning: ${filename} has been changed, please update the original file in src/lib/vfs/dts-files`);
						// 	}
						// }
						return {code: toCode(JSON.stringify(code))}
					}
					return null;
				}
			}
		}
	}
	const dtsPlugin = createRawFilePlugin(
		'vite:transform-dts',
		id => {
			return [
				// /\.dts$/,
				/node_modules\/typescript\/lib\/.+/
			].some(re => re.test(id));
		},
		content => `const dts = ${content};\nexport {dts};`)

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
			'react', 'react-dom',
			'@codemirror/view', '@codemirror/state', '@codemirror/language', '@codemirror/lint', '@codemirror/autocomplete',
			'comlink'
		],
		strictDeprecations: true
	};
};