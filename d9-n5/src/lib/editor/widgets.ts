import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

export const EditorWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-editor',
		style: {}
	};
})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-column: 2;
    grid-template-columns: 1fr;
    overflow: hidden;
`;
export const EditorPanel = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-editor-panel'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;

        &.cm-focused {
            outline: none;
        }

        > div.cm-scroller {
            overflow-x: auto;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                background-color: transparent;
                height: ${CssVars.SCROLL_HEIGHT};
                width: ${CssVars.SCROLL_WEIGHT};
            }

            &::-webkit-scrollbar-track {
                background-color: ${CssVars.SCROLL_TRACK_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${CssVars.SCROLL_THUMB_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }
        }

        div.cm-line {
            span.cm-widget-declaration {
                > span.cm-widget-declaration-symbol {
                    font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H6};

                    &.cm-widget-declaration-symbol-1 {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H1};

                        & ~ span.cm-widget-declaration-type {
                            font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H1};
                        }
                    }

                    &.cm-widget-declaration-symbol-2 {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H2};

                        & ~ span.cm-widget-declaration-type {
                            font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H2};
                        }
                    }

                    &.cm-widget-declaration-symbol-3 {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H3};

                        & ~ span.cm-widget-declaration-type {
                            font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H3};
                        }
                    }

                    &.cm-widget-declaration-symbol-4 {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H4};

                        & ~ span.cm-widget-declaration-type {
                            font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H4};
                        }
                    }

                    &.cm-widget-declaration-symbol-5 {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_FONT_SIZE_H5};

                        & ~ span.cm-widget-declaration-type {
                            font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H5};
                        }
                    }

                    & ~ span.cm-widget-declaration-type {
                        font-size: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_SIZE_H6};
                    }
                }

                > span.cm-widget-declaration-type {
                    font-family: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_FAMILY};
                    font-weight: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_FONT_WEIGHT};
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_COLOR};
                    background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_BACKGROUND_COLOR};
                    padding: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_PADDING};
                    border: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_BORDER};
                    border-radius: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_BORDER_RADIUS};

                    &:not(:empty) {
                    }
                }
            }
        }
    }
`;