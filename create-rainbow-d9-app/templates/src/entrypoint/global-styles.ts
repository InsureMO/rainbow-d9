import {createGlobalStyle} from 'styled-components';

// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
export const GlobalStyles: any = createGlobalStyle`
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

    html[data-touchable=true] {
        // TODO put responsive styles here
    }
`;