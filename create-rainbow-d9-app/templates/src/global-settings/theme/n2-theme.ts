import {createCssVars as createN2CssVars, CssConstants as N2CssConstants} from '@rainbow-d9/n2';
import {AppThemeStyle} from './types';
import {createCss} from './utils';

export const createN2ThemeStyles = (): AppThemeStyle => {
	const N2LightConstants = {
		...N2CssConstants,
		FONT_FAMILY: '"Roboto"',
		BG_COLOR: 'rgb(250, 251, 254)',
		PRIMARY_COLOR: 'rgb(78, 103, 217)',
		DANGER_COLOR: 'rgb(255, 91, 91)',
		SUCCESS_COLOR: 'rgb(16, 196, 105)',
		WARN_COLOR: 'rgb(249, 200, 81)',
		INFO_COLOR: 'rgb(53, 184, 224)'
	};
	// @ts-ignore
	const N2LightTheme = createN2CssVars(N2LightConstants);
	const N2DarkConstants = {
		...N2LightConstants,
		FONT_COLOR: 'rgb(204,204,204)',
		BG_COLOR: 'rgb(34,34,34)',
		PRIMARY_COLOR: 'rgb(102,165,255)',
		DANGER_COLOR: 'rgb(255,87,92)',
		SUCCESS_COLOR: 'rgb(40,167,69)',
		WARN_COLOR: 'rgb(255,193,7)',
		INFO_COLOR: 'rgb(85,183,194)',
		WAIVE_COLOR: 'rgb(102,102,102)',
		HOVER_COLOR: 'rgb(78,83,92)',
		INVERT_COLOR: 'rgb(34,34,34)',
		DISABLE_COLOR: 'rgb(51,51,51)',
		PLACEHOLDER_COLOR: 'rgb(128,128,128)',
		BORDER_COLOR: 'rgb(77,77,77)',
		SHADOW_COLOR: 'rgb(0,0,0)',
		WAIVE_SHADOW_COLOR: 'rgb(0,0,0)',
		// for widgets
		CAPTION_FONT_COLOR: 'rgb(153,153,153)',
		TAB_ACTIVE_COLOR: 'rgb(102,165,255)',
		WIZARD_STEP_DONE_COLOR: 'rgb(64,74,82)',
		WIZARD_STEP_ACTIVE_COLOR: 'rgb(102,165,255)',
		RIB_COLOR: 'rgb(51,53,56)',
		TREE_LINE_COLOR: 'rgb(77,77,77)',
		SCROLL_THUMB_COLOR: 'rgb(128,128,128)',
		SCROLL_TRACK_COLOR: 'rgba(51,51,51,0.5)'
	};
	// @ts-ignore
	const N2DarkTheme = createN2CssVars(N2DarkConstants);

	return {
		light: createCss({
			ACTIVE_COLOR: 'var(--d9-active-color, rgb(218,223,232))',
			...N2LightTheme,
			FONT_VARIANT: 'var(--d9-font-variant, none)'
		}),
		dark: createCss({
			ACTIVE_COLOR: 'var(--d9-active-color, rgb(118,123,132))',
			...N2DarkTheme,
			FONT_VARIANT: 'var(--d9-font-variant, none)'
		})
	};
};
