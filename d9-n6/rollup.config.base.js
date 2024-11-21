import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import {createFilter} from '@rollup/pluginutils';
import fs from 'fs';
import path from 'path';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';
import {fileURLToPath} from 'url';

const manipulateDayJsDts = (id, code) => {
	if (id.endsWith('/dayjs/index.d.ts')) {
		return code
			.replace('export = dayjs;', '// export = dayjs;')
			.replace('/// <reference path="./locale/index.d.ts" />', '/// <reference lib="dayjs.locale" />')
	} else if (id.endsWith('/dayjs/locale/index.d.ts')) {
		return code
			.replace('/// <reference path="./types.d.ts" />', '/// <reference lib="dayjs.locale.types" />');
		// } else if (id.endsWith('/dayjs/locale/types.d.ts')) {
	}
}
const manipulateDecimalJsDts = (id, code) => {
	if (id.endsWith('/decimal.js/decimal.d.ts')) {
		return code
			// remove default export, it is useless
			.replace('export default Decimal;', '// export default Decimal;')
			// modify namespace to declare
			.replace('export namespace Decimal {', 'declare namespace Decimal {')
			// modify class to interface, because construct Decimal is not allowed
			.replace('export declare class Decimal {', 'interface Decimal {')
			// remove constructor
			.replace('constructor(n: Decimal.Value);', '// constructor(n: Decimal.Value);');
	}
}
const manipulateMathJsDts = (id, code) => {
	if (id.endsWith('/mathjs/types/index.d.ts')) {
		code = code
			.replace('import { Decimal } from \'decimal.js\'', '// import { Decimal } from \'decimal.js\'')
			.replace('export as namespace math', 'declare namespace math {');
		code = code + '\n}\n';
		let shouldIgnore = false
		code = code.split('\n').filter(line => {
			if (line === 'export const {') {
				shouldIgnore = true;
				return false;
			} else if (shouldIgnore && (line === '}: MathJsInstance' || line === '}: Record<string, FactoryFunctionMap>')) {
				shouldIgnore = false;
				return false;
			} else {
				return !shouldIgnore;
			}
		}).join('\n');
		return code + 'interface MathJsInstance extends math.MathJsInstance {\n}\n';
	}
}
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
					if (/\.\/dayjs\/.+\?dts$/.test(source)
						|| /\.\/decimal\.js\/.+\?dts$/.test(source)
						|| /\.\/mathjs\/.+\?dts$/.test(source)) {
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

						// to fix the imported d.ts contents
						code = [
							manipulateDayJsDts, manipulateDecimalJsDts, manipulateMathJsDts,
							(_id, code) => code
						].reduce((manipulated, func) => manipulated == null ? func(id, code) : manipulated, (void 0));

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
	const markdownPlugin = createRawFilePlugin(
		'vite:transform-md', id => /\.md$/.test(id), content => `const markdown = ${content};\nexport {markdown};`)
	const dtsPlugin = createRawFilePlugin(
		'vite:transform-dts',
		id => {
			return [
				/\.dts$/,
				/node_modules\/dayjs\/.+/, /node_modules\/decimal\.js\/.+/, /node_modules\/mathjs\/.+/
			].some(re => re.test(id));
		},
		content => `const dts = ${content};\nexport {dts};`)

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
			'nanoid', 'color', 'js-yaml',
			'react-markdown', 'remark-gfm',
			'github-markdown-css/github-markdown.css',
			'react-syntax-highlighter', 'react-syntax-highlighter/dist/esm/styles/prism',
			'@projectstorm/geometry',
			'@projectstorm/react-diagrams-defaults', '@projectstorm/react-diagrams-routing',
			'@projectstorm/react-canvas-core', '@projectstorm/react-diagrams-core', '@projectstorm/react-diagrams',
			'dom-to-image',
			'@codemirror/commands', '@codemirror/lint', '@codemirror/state',
			'@codemirror/view', '@codemirror/autocomplete', 'codemirror',
			'@codemirror/language', '@codemirror/lang-javascript', '@codemirror/lang-sql',
			'@rainbow-d9/n1', '@rainbow-d9/n2', '@rainbow-d9/n3', '@rainbow-d9/ts-vfs'
		],
		strictDeprecations: true
	};
};