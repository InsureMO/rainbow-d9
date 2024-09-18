import {ModelUtilsType, PropertyPathUtilsType, ValueUtilsType} from '@rainbow-d9/n1';

declare module '*.md' {
	const markdown: string;
	export {markdown};
}

declare module '*.d9' {
	const markdown: string;
	export {markdown};
}

declare global {
	interface Window {
		PPUtils: PropertyPathUtilsType;
		VUtils: ValueUtilsType;
		MUtils: ModelUtilsType;
	}
}
