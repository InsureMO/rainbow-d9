import {buildConfig} from './rollup.config.base.js';

export const buildTidyConfig = (lint) => {
	const config = buildConfig(lint);
	config.input = './src/index-tidy.ts';
	config.output = [
		{format: 'es', file: './index-tidy.js'},
		{format: 'cjs', file: './index-tidy.cjs.js'}
	]
	return config;
};
