const copy = require('rollup-plugin-copy');
const del = require('rollup-plugin-delete');
const eslint = require('@rollup/plugin-eslint');
const typescript = require('rollup-plugin-typescript2');
const {babel} = require('@rollup/plugin-babel');

exports.buildConfig = (lint) => {
	return {
		input: './src/index.ts',
		output: [
			{format: 'cjs', dir: '.', banner: '#!/usr/bin/env node'}
		],
		plugins: [
			lint ? eslint({exclude: ['../node_modules/**', 'node_modules/**']}) : null,
			// lint ? tslint({exclude: ['../node_modules/**', 'node_modules/**']}) : null,
			typescript({clean: true}),
			babel({babelHelpers: 'bundled'}),
			del({targets: 'lib', hook: 'writeBundle'}),
			del({targets: 'index.d.ts', hook: 'writeBundle'}),
			copy({
				targets: [
					{src: '../d9-n99/public/*', dest: 'templates/envs'},
					{src: '../d9-n99/src/*', dest: 'templates/src'},
					{src: '../d9-n99/.eslintrc.cjs', dest: 'templates'},
					{src: '../d9-n99/index.html', dest: 'templates'},
					{src: '../d9-n99/package.json', dest: 'templates'},
					{src: '../d9-n99/tsconfig.node.json', dest: 'templates'},
					{src: '../d9-n99/tsconfig.json', dest: 'templates'},
					{src: '../d9-n99/vite.config.js', dest: 'templates'},
					{src: '../d9-n99/README.md', dest: 'templates'}
				], hook: 'buildEnd'
			})
		].filter(x => x != null),
		external(id) {
			return [
				'fs', 'path', 'child_process',
				'chalk', 'fs-extra', 'prompts', 'validate-npm-package-name'
			].includes(id);
		}
	};
};