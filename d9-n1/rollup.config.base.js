import eslint from '@rollup/plugin-eslint';
import babel from 'rollup-plugin-babel';
// import tslint from 'rollup-plugin-tslint';
import typescript from 'rollup-plugin-typescript2';

export const buildConfig = (lint) => {
	return {
		input: './src/index.tsx',
		output: [
			{ format: 'es', dir: '.' },
			{ format: 'cjs', file: './index.cjs.js' }
		],
		plugins: [
			lint ? eslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'] }) : null,
			typescript({ clean: true }), babel()
		].filter(x => x != null),
		external: ['react', 'react-dom', 'events', 'nanoid', 'buffer']
	};
};