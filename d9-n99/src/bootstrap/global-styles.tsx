import {createGlobalStyle} from 'styled-components';
import '../assets/fonts.css';
import {createThemeStyles} from '../global-settings';

export const AppGlobalStyles = (() => {
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

        ${createThemeStyles()}
        html[data-touchable=true] {
            div[data-w=app-frame] {
                // TODO put responsive styles here
            }
        }
	`;
})();
