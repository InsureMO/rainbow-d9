const {addBeforeLoader, loaderByName} = require('@craco/craco');

// Additional configuration for Typerequireript users: add `declare module '*.md'` to your `index.d.ts` file.
module.exports = {
	// typescript: {
	// 	enableTypeChecking: true /* (default value) */
	// },
	webpack: {
		configure: (webpackConfig) => {
			// console.log(webpackConfig)
			webpackConfig.resolve.extensions.push('.md');

			const markdownLoader = {
				test: /\.md$/, exclude: /node_modules/, use: [{loader: require.resolve('raw-loader')}]
			};

			addBeforeLoader(webpackConfig, loaderByName('babel-loader'), markdownLoader);

			return webpackConfig;
		}
	}
};