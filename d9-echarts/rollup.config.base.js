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
			// lint ? tslint({ exclude: ['../node_modules/**', 'node_modules/**'], include: 'src/**/*' }) : null,
			typescript({clean: true}), babel({babelHelpers: 'bundled', presets: ['@babel/preset-react']})
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
			'react', 'styled-components', 'echarts',
			'@rainbow-d9/n1', '@rainbow-d9/n2', '@rainbow-d9/n3'
		],
		strictDeprecations: true
	};
};