import {CssVars, DOM_KEY_WIDGET, SDP, Utils} from '@rainbow-d9/n2';
import {CSSProperties} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

// noinspection CssUnusedSymbol
export const EditorWrapper = styled.div.attrs<SDP>({
	[DOM_KEY_WIDGET]: 'o23-playground-editor', 'data-v-scroll': '', 'data-h-scroll': ''
})`
    display: block;
    position: relative;
    align-self: stretch;
    background-image: ${PlaygroundCssVars.EDITOR_BACKGROUND_IMAGE};
    background-size: ${PlaygroundCssVars.EDITOR_BACKGROUND_SIZE};
    background-position: ${PlaygroundCssVars.EDITOR_BACKGROUND_POSITION};
    overflow: auto;


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
// noinspection CssUnusedSymbol
export const BackendCanvasWrapper = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-backend-canvas'})`
    display: block;
    position: absolute;
    width: 100%;
    pointer-events: none;
    opacity: 0;

    &[data-diagram-status=paint],
    &[data-diagram-status=paint-on-position] {
        + div[data-w=o23-playground-canvas] > div.o23-playground-editor-content {
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
`;
// noinspection CssUnresolvedCustomProperty, CssUnusedSymbol
export const FrontendCanvasWrapper = styled.div.attrs<{
	canvasWidth?: number | string; canvasHeight?: number | string; canvasZoom?: number
}>(({canvasWidth, canvasHeight, canvasZoom}) => {
	return {
		[DOM_KEY_WIDGET]: 'o23-playground-canvas',
		style: {
			'--canvas-width': Utils.toCssSize(canvasWidth),
			'--canvas-height': Utils.toCssSize(canvasHeight),
			'--canvas-zoom': canvasZoom ?? 1
		} as CSSProperties
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
        width: 100%;
        height: 100%;
    }
`;
export const NodeLocatorNeedle = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-editor-node-locator'})`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none;
`;
// noinspection CssUnresolvedCustomProperty
export const EditorToolbar = styled.div.attrs<{ columns: number }>(({columns}) => {
	return {
		[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar',
		style: {
			'--grid-columns': columns
		} as CSSProperties
	};
})<{ columns: number }>`
    display: grid;
    position: absolute;
    align-items: center;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    top: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    right: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_HEIGHT};
    border-radius: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS};
    border: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    background-color: ${CssVars.BACKGROUND_COLOR};
    overflow: visible;
    opacity: 0.7;
    transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        opacity: 1;
        border-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};

        > span[data-w=o23-playground-editor-toolbar-button] {
            &:not(:first-child) {
                border-left-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
            }

            &:not(:hover) {
                color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
            }
        }

        > div[data-w=o23-playground-editor-toolbar-toc] {
            > span[data-w=o23-playground-editor-toolbar-toc-button]:not(:hover) {
                color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
            }
        }
    }

    > div[data-w=o23-playground-editor-toolbar-toc] {
        grid-column: 1 / span var(--grid-columns);
    }
`;
export const EditorToolbarButton = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT};
    color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_COLOR};
    border-bottom: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    cursor: pointer;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:not(:first-child) {
        border-left: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
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
export const EditorToolbarToc = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-toc'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_TOC_HEIGHT};
    border-radius: 0 0 ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS} ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS};
    transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    overflow: hidden;
`;
export const EditorToolbarTocButton = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-toc-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR};
        background-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
    }

    > svg {
        height: ${PlaygroundCssVars.EDITOR_TOOLBAR_TOC_HEIGHT};
    }
`;
// noinspection CssUnresolvedCustomProperty
export const EditorToolbarTocContainer = styled.div.attrs<{ buttons: number }>(({buttons}) => {
	return {
		[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-toc-container',
		'data-v-scroll': '',
		'data-h-scroll': '',
		style: {
			'--buttons': buttons
		} as CSSProperties
	};
})<{ buttons: number }>`
    display: flex;
    position: absolute;
    flex-direction: column;
    top: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_HEIGHT} + ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE} * 2);
    right: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    min-width: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH} * var(--buttons) + 2px);
    max-width: max(33%, calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH} * 6 + 2px));
    max-height: calc(100% - ${PlaygroundCssVars.EDITOR_TOOLBAR_HEIGHT} - ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE} * 3);
    border: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    border-radius: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS};
    overflow: auto;
    transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, max-height ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-first-paint=true] {
        max-width: 0;
        border: 0;
    }

    &:hover {
        border-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};

        div[data-w=o23-playground-editor-toolbar-toc-item] {
            opacity: 1;
        }
    }
`;
export const EditorToolbarTocItem = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-editor-toolbar-toc-item'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDITOR_TOOLBAR_TOC_HEIGHT};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_TOC_HEIGHT};
    background-color: ${CssVars.BACKGROUND_COLOR};
    opacity: 0.5;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    > span {
        display: inline-flex;
        position: relative;
        align-items: center;
        height: ${PlaygroundCssVars.EDITOR_TOOLBAR_TOC_HEIGHT};
        transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }

    > span:first-child {
        font-size: 0.8em;
        opacity: 0.8;
        padding-right: 6px;
        padding-left: ${CssVars.INPUT_INDENT};
    }

    > span:last-child {
        flex-grow: 1;
        padding-right: ${CssVars.INPUT_INDENT};
    }

    &:hover {
        > span {
            background-color: ${CssVars.HOVER_COLOR};
        }
    }
`;
export const ParseError = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.EDITOR_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;
