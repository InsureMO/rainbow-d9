import {createFilter} from '@rollup/pluginutils';
import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import svgr from 'vite-plugin-svgr'

export default ({mode}) => {
	const markdownPlugin = () => {
		const include = (void 0);
		const exclude = (void 0);
		const filter = createFilter(include, exclude);
		return {
			name: 'vite:transform-md',
			enforce: 'pre',
			async transform(code, id) {
				if (/\.md$/.test(id)) {
					// Filters the filesystem for files to include/exclude. Includes all files by default.

					if (!filter(id)) {
						return null;
					}
					return {code: `const markdown = ${JSON.stringify(code)};\nexport {markdown};`}
				}
				return null;
			}
		}
	};
	const d9MarkdownPlugin = () => {
		const include = (void 0);
		const exclude = (void 0);
		const filter = createFilter(include, exclude);
		return {
			name: 'vite:transform-d9',
			enforce: 'pre',
			async transform(code, id) {
				if (/\.d9$/.test(id)) {
					// Filters the filesystem for files to include/exclude. Includes all files by default.

					if (!filter(id)) {
						return null;
					}
					return {code: `const markdown = ${JSON.stringify(code)};\nexport {markdown};`}
				}
				return null;
			}
		}
	};

	return defineConfig({
		define: {
			'process.env': {...process.env, ...loadEnv(mode, process.cwd())}
		},
		plugins: [
			markdownPlugin(), d9MarkdownPlugin(),
			react(),
			svgr()
		],
		preview: {host: true, port: 3399, strictPort: true, open: '/'},
		server: {host: true, port: 3399, strictPort: true, open: '/'},
		base: '/n99/',
		build: {
			minify: false,
			// sourcemap: true,
			// chunkSizeWarningLimit: 600,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						return [
							[
								// {name: 'react-markdown', includes: ['react-markdown']},
								// {name: 'react-syntax-highlighter', includes: ['react-syntax-highlighter']},
								{name: 'babel', includes: ['@babel']},
								// emotion must in same bundle with react, otherwise it leads incorrect imports, don't know why
								{name: 'react-base', includes: ['react', 'react-dom', 'styled-components', '@emotion']},
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
								// {name: 'rainbow-d9-n5', includes: ['@rainbow-d9/n5']},
								// {name: 'rainbow-d9-n6', includes: ['@rainbow-d9/n6']},
								{name: 'rainbow-d9-echarts', includes: ['@rainbow-d9/echarts']}
							].find(({includes}) => {
								return id.includes('node_modules') && includes.some((include) => id.includes(include));
							}),
							[
								{name: 'rainbow-d9-n1', includes: ['d9-n1']},
								{name: 'rainbow-d9-n2', includes: ['d9-n2']},
								{name: 'rainbow-d9-n3', includes: ['d9-n3']},
								// {name: 'rainbow-d9-n5', includes: ['d9-n5']},
								// {name: 'rainbow-d9-n6', includes: ['d9-n6']},
								{name: 'rainbow-d9-echarts', includes: ['d9-echarts']}
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