import {createGlobalStyle, css} from 'styled-components';
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

        ${createThemeStyles().map(([tag, n2, app]) => {
            // noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
            return css`
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
                }
            `;
        })}
	`;
})();
