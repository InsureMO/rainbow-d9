import {CssVars, DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

// noinspection CssUnusedSymbol
export const EditorWrapper = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-editor', 'data-v-scroll': '', 'data-h-scroll': ''
})`
    display: block;
    position: relative;
    align-self: stretch;
    background-image: ${PlaygroundCssVars.EDITOR_BACKGROUND_IMAGE};
    background-size: ${PlaygroundCssVars.EDITOR_BACKGROUND_SIZE};
    background-position: ${PlaygroundCssVars.EDITOR_BACKGROUND_POSITION};
    overflow: auto;

    &[data-diagram-status=paint],
    &[data-diagram-status=paint-on-position] {
        > div[data-w=o23-playground-canvas] > div.o23-playground-editor-content {
            //opacity: 0;
            user-select: none;
            pointer-events: none;

            div.node, div.node * {
                user-select: none;
                pointer-events: none;
                cursor: default;
            }
        }
    }

    &[data-diagram-locked=true] {
        > div[data-w=o23-playground-canvas] > div.o23-playground-editor-content {
            cursor: default;

            div.node {
                cursor: pointer;
            }
        }
    }

    > div.o23-playground-editor-content-backend {
        position: absolute;
        left: 100%;
        // Width is necessary; 
        // otherwise, it will cause the node width to be rendered incorrectly,
        // ultimately resulting in the connections not being straight.
        min-width: 100%;
        //opacity: 0;
        user-select: none;
        pointer-events: none;
    }
`;
export const BackendCanvasWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-backend-canvas'})`
    display: block;
    position: absolute;
    width: 100%;
    pointer-events: none;
    opacity: 0;
`;
// noinspection CssUnresolvedCustomProperty, CssUnusedSymbol
export const EditorCanvasWrapper = styled.div.attrs<{
	canvasWidth?: number | string; canvasHeight?: number | string; canvasZoom?: number
}>(({canvasWidth, canvasHeight, canvasZoom}) => {
	return {
		[DOM_KEY_WIDGET]: 'o23-playground-canvas',
		style: {
			'--canvas-width': Utils.toCssSize(canvasWidth),
			'--canvas-height': Utils.toCssSize(canvasHeight),
			'--canvas-zoom': canvasZoom
		}
	};
})<{ canvasWidth?: number | string; canvasHeight?: number | string; canvasZoom?: number }>`
    display: block;
    position: relative;
    min-width: 100%;
    min-height: 100%;
    width: calc(var(--canvas-width) * var(--canvas-zoom));
    height: calc(var(--canvas-height) * var(--canvas-zoom));
    overflow: hidden;

    > div.o23-playground-editor-content {
        width: var(--canvas-width, 0);
        height: var(--canvas-height, 0);
        //> svg, > div {
        //    transform-origin: top left;
        //}
    }
`;
export const EditorToolbar = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar'})`
    display: flex;
    position: absolute;
    align-items: center;
    top: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    right: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_HEIGHT};
    border-radius: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS};
    border: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    background-color: ${CssVars.BACKGROUND_COLOR};
    overflow: hidden;
    transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        border-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};

        > span[data-w=o23-playground-editor-toolbar-button]:not(:hover) {
            color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
        }
    }
`;
export const EditorToolbarButton = styled.span.attrs({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT};
    color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_COLOR};
    cursor: pointer;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:not(:last-child) {
        border-right: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    }

    &:hover {
        color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR};
        background-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
    }

    > svg {
        height: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT} / 3 * 2);

        &[data-icon=o23-origin-size] {
            height: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT} / 3 * 2 - 2px);
            margin-top: 2px;
        }
    }
`;
export const ParseError = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.EDITOR_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;
