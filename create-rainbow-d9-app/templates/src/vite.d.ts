declare module '*.md' {
	// When "Mode.MARKDOWN" is requested
	const markdown: string;
	export {markdown};
}

declare module '*.yaml' {
	const yaml: string;
	export {yaml};
}

declare module '*.yml' {
	const yaml: string;
	export {yaml};
}
