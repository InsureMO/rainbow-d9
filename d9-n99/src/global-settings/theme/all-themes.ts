import {createAppThemeStyles} from './app-theme';
import {createN2ThemeStyles} from './n2-theme';

export const createThemeStyles = () => {
	const {light: n2Light, dark: n2Dark} = createN2ThemeStyles();
	const {light: appLight, dark: appDark} = createAppThemeStyles();

	/**
	 * default light and dark themes are provided, you can
	 * 1. to change light and dark styles by modifying above,
	 * 2. or add more themes by using [data-theme-code=xxx] tag
	 */
	return [
		['[data-theme-kind=light]', n2Light, appLight],
		['[data-theme-kind=dark]', n2Dark, appDark]
	];
};
