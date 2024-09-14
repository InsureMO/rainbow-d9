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
			del({targets: 'index.d.ts', hook: 'writeBundle'})
		],
		external(id) {
			return [
				'fs', 'path', 'child_process',
				'chalk', 'fs-extra', 'prompts', 'validate-npm-package-name'
			].includes(id);
		}
	};
};