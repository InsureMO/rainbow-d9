import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import mdPlugin, {Mode} from 'vite-plugin-markdown';

export default ({mode}) => {
	return defineConfig({
		define: {
			'process.env': {...process.env, ...loadEnv(mode, process.cwd())}
		},
		plugins: [react(), mdPlugin({mode: [Mode.MARKDOWN]})],
		server: {host: true, port: 3000, strictPort: true},
		base: '/rainbow-d9/',
		build: {
			minify: false,
			// sourcemap: true,
			// chunkSizeWarningLimit: 600,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						return [
							[
								{name: 'react-markdown', includes: ['react-markdown']},
								{name: 'react-syntax-highlighter', includes: ['react-syntax-highlighter']},
								{name: 'babel', includes: ['@babel']},
								{name: 'property-information', includes: ['property-information']},
								{name: 'react', includes: ['react', 'react-dom']},
								{name: 'styled-components', includes: ['styled-components']},
								{name: 'emotion', includes: ['@emotion']},
								{name: 'refractor', includes: ['refractor']},
								{name: 'dayjs', includes: ['dayjs']},
								{name: 'zrender', includes: ['zrender']},
								{name: 'echarts', includes: ['echarts']},
								{name: 'unist', includes: ['unist']},
								{name: 'mdast', includes: ['mdast-']},
								{name: 'micromark', includes: ['micromark']},
								{name: 'remark', includes: ['remark-']},
								{name: 'hastscript', includes: ['hastscript']},
								{name: 'rainbow-d9-n1', includes: ['@rainbow-d9/n1']},
								{name: 'rainbow-d9-n2', includes: ['@rainbow-d9/n2']},
								{name: 'rainbow-d9-n3', includes: ['@rainbow-d9/n3']},
								{name: 'rainbow-d9-echarts', includes: ['@rainbow-d9/echarts']},
								{name: 'rainbow-d9-thai-plan-selection', includes: ['@rainbow-d9/thai-plan-selection']}
							].find(({includes}) => {
								return id.includes('node_modules') && includes.some((include) => id.includes(include));
							}),
							[
								{name: 'rainbow-d9-n1', includes: ['d9-n1']},
								{name: 'rainbow-d9-n2', includes: ['d9-n2']},
								{name: 'rainbow-d9-n3', includes: ['d9-n3']},
								{name: 'rainbow-d9-echarts', includes: ['d9-echarts']},
								{name: 'rainbow-d9-thai-plan-selection', includes: ['thai-plan-selection']}
							].find(({includes}) => {
								return includes.some((include) => id.includes(`/${include}/`));
							}),
							id.includes('node_modules') ? {name: 'vendor'} : null
						].filter(found => found != null)[0]?.name;
					}
				}
			}
		}
	})
}