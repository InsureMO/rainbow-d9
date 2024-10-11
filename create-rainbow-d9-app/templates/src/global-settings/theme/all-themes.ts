import {createAppThemeStyles} from './app-theme';
import {createN2ThemeStyles} from './n2-theme';

export const createThemeStyles = () => {
	const {light: n2Light, dark: n2Dark} = createN2ThemeStyles();
	const {light: appLight, dark: appDark} = createAppThemeStyles();

	const createStyles = (tag: string, n2: string, app: string) => {
		return `
div${tag} ~ * {
	${n2};
	font-family: var(--d9-font-family);
	font-size: var(--d9-font-size);
	color: var(--d9-font-color);
	// div[data-h-scroll],
	// div[data-v-scroll] {
	// 	&::-webkit-scrollbar {
	// 		background-color: transparent;
	// 		height: var(--d9-scroll-height);
	// 		width: var(--d9-scroll-width)
	// 	}
	// 	&::-webkit-scrollbar-track {
	// 		background-color: var(--d9-scroll-track-color);
	// 		border-radius: var(--d9-scroll-border-radius);
	// 	}
	// 	&::-webkit-scrollbar-thumb {
	// 		background-color: var(--d9-scroll-thumb-color);
	// 		border-radius: var(--d9-scroll-border-radius);
	// 	}
	// }
	svg[data-icon=dark-theme] {
		transform: scale(0.85);
		transform-origin: center;
	}
	svg[data-icon=system-theme] {
		transform: scale(0.9);
		transform-origin: center;
	}
	svg[data-icon=theme] {
		transform: scale(0.9) translateY(-2px);
		transform-origin: center;
	}
	svg[data-icon=search] {
		transform: scale(0.8);
		transform-origin: center;
	}
}
div${tag} ~ div[data-w=app-frame] {
	${app};
}`;
	};
	/**
	 * default light and dark themes are provided, you can
	 * 1. to change light and dark styles by modifying above,
	 * 2. or add more themes by using [data-theme-code=xxx] tag
	 */
	return [
		createStyles('[data-theme-kind=light]', n2Light, appLight),
		createStyles('[data-theme-kind=dark]', n2Dark, appDark)
	].join('\n');
};
