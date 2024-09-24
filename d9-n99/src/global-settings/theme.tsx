import {createCssVars as createN2CssVars, CssConstants as N2CssConstants, IntlLabel} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import DarkIcon from '../assets/dark-theme.svg?react';
import LightIcon from '../assets/light-theme.svg?react';

export type ThemeCode = string;

export enum ThemeKind {
	LIGHT = 'light',
	DARK = 'dark',
}

const createCss = (theme: Record<string, string | number>) => {
	return Object.keys(theme)
		.filter(key => typeof theme[key] === 'string' && (theme[key] as string).startsWith('var('))
		.map(key => {
			const parts = (theme[key] as string).split(',');
			return [parts[0], parts.slice(1).join(',').trim()];
		})
		.map(([p1, p2]) => [p1.substring(4), p2.slice(0, -1)])
		.map(([key, value]) => `${key}: ${value};`).join('\n');
};
const createN2ThemeStyles = () => {
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
		n2Light: createCss({ACTIVE_COLOR: 'var(--d9-active-color, rgb(218,223,232))', ...N2LightTheme}),
		n2Dark: createCss({ACTIVE_COLOR: 'var(--d9-active-color, rgb(118,123,132))', ...N2DarkTheme})
	};
};
const createAppThemeStyles = () => {
	const AppCssConstants = {
		bannerBackground: 'rgb(255, 255, 255)',
		bannerShadow: 'rgba(82, 63, 105, 0.05) 0px 10px 30px 0px)',
		bannerButtonHoverColor: 'var(--d9-primary-color)',
		bannerButtonHoverBackground: 'var(--d9-hover-color)',
		bannerButtonMenuBackground: 'rgb(255, 255, 255)',
		bannerButtonMenuShadow: 'rgba(82, 63, 105, 0.2) 0 10px 30px 5px',
		buttonMenuItemActiveColor: 'var(--d9-primary-color)',
		buttonMenuItemActiveBackground: 'var(--d9-active-color)',
		buttonMenuItemHoverColor: 'var(--d9-primary-color)',
		buttonMenuItemHoverBackground: 'var(--d9-hover-color)',
		sideMenuShadow: '0px 0px 35px 0px rgba(154, 161, 171, 0.15)',
		sideMenuBackground: 'rgb(32, 43, 70)',
		sideMenuHeaderTextColor: 'rgb(255, 255, 255)',
		sideMenuHeaderBottomBorderColor: 'rgb(51, 68, 108)',
		sideMenuHeaderFoldButtonBackground: 'rgb(50, 60, 85)',
		sideMenuHeaderFoldButtonColor: 'rgb(255, 255, 255)',
		sideMenuHeaderFoldButtonHoverColor: 'var(--d9-primary-color)',
		sideMenuGroupLabelColor: 'rgb(141,152,175)',
		sideMenuGroupLabelHoverColor: 'rgb(255,255,255)',
		sideMenuGroupLabelHoverBackground: 'var(--d9-primary-color)',
		sideMenuItemLabelColor: 'rgb(141,152,175)',
		sideMenuItemLabelHoverColor: 'rgb(255,255,255)',
		sideMenuItemLabelHoverBackground: 'var(--d9-primary-color)',
		logoColor: 'rgb(0, 0, 0)',
		logoColor2: 'rgb(62, 151, 255)',
		logoColor3: 'rgb(222, 30, 14)'
	};
	const createAppCssVars = (variables: typeof AppCssConstants) => {
		return {
			'banner-height': `var(--app-banner-height, 72px)`,
			'banner-padding': `var(--app-banner-padding, 0 32px)`,
			'banner-background': `var(--app-banner-background, ${variables.bannerBackground})`,
			'banner-shadow': `var(--app-banner-shadow, ${variables.bannerShadow}`,
			'banner-z-index': `var(--app-banner-z-index, 10)`,
			'banner-button-size': `var(--app-banner-button-size, 40px)`,
			'banner-button-gap': 'var(--app-banner-button-gap, 4px)',
			'banner-button-border-radius': `var(--app-banner-button-border-radius, 12px)`,
			'banner-button-hover-color': `var(--app-banner-button-hover-color, ${variables.bannerButtonHoverColor})`,
			'banner-button-hover-background': `var(--app-banner-button-hover-background, ${variables.bannerButtonHoverBackground})`,
			'banner-button-lang-emoji-size': 'var(--app-banner-button-lang-emoji-size, 22px)',
			'banner-button-lang-emoji-margin': 'var(--app-banner-button-lang-emoji-margin, 4px 0 0)',
			'banner-menu-min-width': `var(--app-banner-menu-min-width, 150px)`,
			'banner-button-menu-padding': `var(--app-banner-button-menu-padding, 12px 16px)`,
			'banner-button-menu-border-radius': `var(--app-banner-button-menu-border-radius, 8px)`,
			'banner-button-menu-background': `var(--app-banner-button-menu-background, ${variables.bannerButtonMenuBackground})`,
			'banner-button-menu-shadow': `var(--app-banner-button-menu-shadow, ${variables.bannerButtonMenuShadow})`,
			'banner-button-menu-item-height': `var(--app-banner-button-menu-item-height, 32px)`,
			'banner-button-menu-item-padding': `var(--app-banner-button-menu-item-padding, 0 12px)`,
			'banner-button-menu-item-icon-size': `var(--app-banner-button-menu-item-icon-size, 32px)`,
			'banner-button-menu-item-border-radius': `var(--app-banner-button-menu-item-border-radius, 8px)`,
			'banner-button-menu-item-active-color': `var(--app-banner-button-menu-item-active-color, ${variables.buttonMenuItemActiveColor})`,
			'banner-button-menu-item-active-background': `var(--app-banner-button-menu-item-active-background, ${variables.buttonMenuItemActiveBackground})`,
			'banner-button-menu-item-hover-color': `var(--app-banner-button-menu-item-hover-color, ${variables.buttonMenuItemHoverColor})`,
			'banner-button-menu-item-hover-background': `var(--app-banner-button-menu-item-hover-background, ${variables.buttonMenuItemHoverBackground})`,
			'banner-button-menu-item-lang-emoji-size': 'var(--app-banner-button-menu-item-lang-emoji-size, 20px)',
			'banner-button-menu-item-lang-emoji-margin': 'var(--app-banner-button-menu-item-lang-emoji-margin, 0)',

			'side-menu-width': `var(--app-side-menu-width, 320px)`,
			'side-menu-fold-width': `var(--app-side-menu-fold-width, 72px)`,
			'side-menu-shadow': `var(--app-side-menu-shadow, ${variables.sideMenuShadow})`,
			'side-menu-background': `var(--app-side-menu-background, ${variables.sideMenuBackground})`,
			'side-menu-z-index': `var(--app-side-menu-z-index, 10)`,
			'side-menu-header-height': `var(--app-side-menu-header-height, 72px)`,
			'side-menu-header-text-color': `var(--app-side-menu-header-text-color, ${variables.sideMenuHeaderTextColor})`,
			'side-menu-header-font-family': `var(--app-side-menu-header-font-family, "Oswald")`,
			'side-menu-header-font-size': `var(--app-side-menu-header-font-size, 1.6em)`,
			'side-menu-header-font-weight': `var(--app-side-menu-header-font-weight, bold)`,
			'side-menu-header-bottom-border': `var(--app-side-menu-header-bottom-border, 1px solid ${variables.sideMenuHeaderBottomBorderColor})`,
			'side-menu-padding': `var(--app-side-menu-padding, 16px)`,
			'side-menu-header-fold-button-size': `var(--app-side-menu-header-fold-button-size, 32px)`,
			'side-menu-header-fold-button-background': `var(--app-side-menu-header-fold-button-background, ${variables.sideMenuHeaderFoldButtonBackground})`,
			'side-menu-header-fold-button-color': `var(--app-side-menu-header-fold-button-color, ${variables.sideMenuHeaderFoldButtonColor})`,
			'side-menu-header-fold-button-hover-color': `var(--app-side-menu-header-fold-button-hover-color, ${variables.sideMenuHeaderFoldButtonHoverColor})`,
			'side-menu-body-padding': 'var(--app-side-menu-body-padding, 4px 12px)',
			'side-menu-fold-body-padding': 'var(--app-side-menu-fold-body-padding, 4px 12px 4px 18px)',
			'side-menu-icon-size': 'var(--app-side-menu-icon-size, 20px)',
			'side-menu-text-indent': 'var(--app-side-menu-text-indent, 6px)',
			'side-menu-level-indent': 'var(--app-side-menu-level-indent, 8px)',
			'side-menu-group-border-radius': 'var(--app-side-menu-group-border-radius, 8px)',
			'side-menu-group-label-height': 'var(--app-side-menu-group-label-height, 40px)',
			'side-menu-group-label-color': `var(--app-side-menu-group-label-color, ${variables.sideMenuGroupLabelColor})`,
			'side-menu-group-label-font-size': `var(--app-side-menu-group-label-font-size, 1em)`,
			'side-menu-group-label-font-weight': `var(--app-side-menu-group-label-font-weight, 500)`,
			'side-menu-group-label-hover-color': `var(--app-side-menu-group-label-hover-color, ${variables.sideMenuGroupLabelHoverColor})`,
			'side-menu-group-label-hover-background': `var(--app-side-menu-group-label-hover-background, ${variables.sideMenuGroupLabelHoverBackground})`,
			'side-menu-item-border-radius': 'var(--app-side-menu-item-border-radius, 8px)',
			'side-menu-item-label-height': 'var(--app-side-menu-item-label-height, 32px)',
			'side-menu-item-label-color': `var(--app-side-menu-item-label-color, ${variables.sideMenuItemLabelColor})`,
			'side-menu-item-label-font-size': `var(--app-side-menu-item-label-font-size, 1em)`,
			'side-menu-item-label-font-weight': `var(--app-side-menu-item-label-font-weight, 400)`,
			'side-menu-item-label-hover-color': `var(--app-side-menu-item-label-hover-color, ${variables.sideMenuItemLabelHoverColor})`,
			'side-menu-item-label-hover-background': `var(--app-side-menu-item-label-hover-background, ${variables.sideMenuItemLabelHoverBackground})`,

			'logo-color': `var(--app-logo-color, ${variables.logoColor})`,
			'logo-color-2': `var(--app-logo-color-2, ${variables.logoColor2})`,
			'logo-color-3': `var(--app-logo-color-3, ${variables.logoColor3})`
		};
	};
	const AppDarkCssConstants = {
		...AppCssConstants,
		bannerBackground: 'rgb(32, 43, 70)',
		bannerShadow: 'rgba(82, 63, 105, 0.05) 0px 10px 30px 0px)',
		bannerButtonMenuBackground: 'rgb(32, 43, 70)',
		bannerButtonMenuShadow: 'rgba(82, 63, 105, 0.2) 0 10px 30px 5px'
	};
	return {
		appLight: createCss(createAppCssVars(AppCssConstants)),
		appDark: createCss(createAppCssVars(AppDarkCssConstants))
	};
};
export const createThemeStyles = () => {
	const {n2Light, n2Dark} = createN2ThemeStyles();
	const {appLight, appDark} = createAppThemeStyles();

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

export interface AppTheme {
	code: ThemeCode;
	kind: ThemeKind;
	icon: ReactNode;
	text: ReactNode;
	active: (code: ThemeCode, kind: ThemeKind) => boolean;
}

/**
 * available themes, using in theme switcher
 */
export const askAvailableThemes = (): Array<AppTheme> => {
	return [
		{
			code: 'light', kind: ThemeKind.LIGHT,
			icon: <LightIcon/>, text: <IntlLabel keys={['theme.light']} value="Light"/>,
			active: (_code: ThemeCode, kind: ThemeKind) => kind !== ThemeKind.DARK
		},
		{
			code: 'dark', kind: ThemeKind.DARK,
			icon: <DarkIcon/>, text: <IntlLabel keys={['theme.dark']} value="Dark"/>,
			active: (_code: ThemeCode, kind: ThemeKind) => kind === ThemeKind.DARK
		}
	];
};

/**
 * get theme kind from theme code
 */
export const toKind = (code: ThemeCode) => {
	const theme = askAvailableThemes().find(theme => theme.code === code);
	if (theme != null) {
		return theme.kind;
	}
	switch (true) {
		case code.toLowerCase().includes('dark'):
			return ThemeKind.DARK;
		case code.toLowerCase().includes('light'):
		default:
			return ThemeKind.LIGHT;
	}
};
