import {createCssVars as createN2CssVars, CssConstants as N2CssConstants} from '@rainbow-d9/n2';
import {createGlobalStyle} from 'styled-components';
import '../assets/fonts.css';

const createThemeStyles = () => {
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
		HOVER_COLOR: 'rgb(51,51,51)',
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
	const N2DarkTheme = createN2CssVars(N2DarkConstants);

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

	return {
		n2Light: createCss(N2LightTheme),
		n2Dark: createCss(N2DarkTheme)
	};
};

export const AppGlobalStyles = (() => {
	const {n2Light, n2Dark} = createThemeStyles();

	const themeStyles = `
       div[data-theme-kind=light] ~ * {
            ${n2Light};
            font-family: var(--d9-font-family);
            font-size: var(--d9-font-size);
            color: var(--d9-font-color);
        }
        div[data-theme-kind=dark] ~ * {
            ${n2Dark};
            font-family: var(--d9-font-family);
            font-size: var(--d9-font-size);
            color: var(--d9-font-color);
        }
	`;

	// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
	return createGlobalStyle`
        *, *:before, *:after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        *:focus-visible {
            outline: none;
        }

        html {
            width: 100%;
        }

        body {
            margin: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            position: relative;
            overflow-x: hidden;
            width: 100%;
        }

        *, *:before, *:after {
            box-sizing: border-box;
        }

        ${themeStyles}
        html[data-touchable=true] {
            div[data-w=app-frame] {
                // TODO put responsive styles here
            }
        }

        div[data-w=app-frame] {
            --app-banner-height: 72px;
            --app-banner-background: rgb(255, 255, 255);
            --app-banner-shadow: rgba(82, 63, 105, 0.05) 0px 10px 30px 0px;
            --app-banner-z-index: 10;

            --app-side-menu-width: 320px;
            --app-side-menu-fold-width: 72px;
            --app-side-menu-shadow: 0px 0px 35px 0px rgba(154, 161, 171, 0.15);
            --app-side-menu-background: rgb(32, 43, 70);
            --app-side-menu-z-index: 10;
            --app-side-menu-header-height: 72px;
            --app-side-menu-header-text-color: rgb(255, 255, 255);
            --app-side-menu-header-font-family: "Oswald";
            --app-side-menu-header-font-size: 1.6em;
            --app-side-menu-header-font-weight: bold;
            --app-side-menu-header-bottom-border: 1px solid rgb(51, 68, 108);
            --app-side-menu-padding: 16px;
            --app-side-menu-header-fold-button-size: 32px;
            --app-side-menu-header-fold-button-background: rgb(50, 60, 85);
            --app-side-menu-header-fold-button-color: white;
            --app-side-menu-header-fold-button-hover-color: var(--d9-primary-color);

            --app-logo-color: rgb(0, 0, 0);
            --app-logo-color-2: rgb(62, 151, 255);
            --app-logo-color-3: rgb(222, 30, 14);
        }
	`;
})();
