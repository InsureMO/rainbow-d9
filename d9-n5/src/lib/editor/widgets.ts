import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

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
// noinspection CssUnusedSymbol
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
            > span.d9-playground-editor-heading:first-child {
                color: rgb(134, 54, 153);
                font-weight: 900;
                font-size: 20px;
            }

            > span.d9-playground-editor-list:first-child {
                color: rgb(134, 54, 153);
                font-weight: 600;
                font-size: 18px;
            }

            span.d9-playground-editor-heading:not(:first-child),
            span.d9-playground-editor-list:not(:first-child) {
                &:after {
                    display: inline-flex;
                    position: relative;
                    align-items: center;
                    justify-content: center;
                    margin-left: 2px;
                    font-weight: 600;
                    font-variant: petite-caps;
                    color: white;
                    border-radius: 4px;
                    height: 16px;
                    padding: 0 3px;
                }

                &.d9-playground-editor-widget-declaration-type {
                    color: rgb(134, 54, 153);

                    &:after {
                        content: 'w';
                        background-color: rgb(134, 54, 153);
                    }
                }

                &.d9-playground-editor-widget-declaration-headline {
                    color: rgb(55, 122, 41);

                    &:after {
                        content: 'l';
                        background-color: rgb(55, 122, 41);
                    }
                }

                &.d9-playground-editor-widget-declaration-property {
                    color: rgb(10, 56, 172);

                    &:after {
                        content: 'p';
                        background-color: rgb(10, 56, 172);
                    }
                }

                &.d9-playground-editor-widget-declaration-id {
                    color: rgb(70, 141, 142);

                    &:after {
                        content: 'id';
                        background-color: rgb(70, 141, 142);
                    }
                }

                &.d9-playground-editor-widget-declaration-flag {
                    color: rgb(114, 113, 64);

                    &:after {
                        content: 'f';
                        background-color: rgb(114, 113, 64);
                    }
                }
            }
        }
    }
`;