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
            > span.d9-playground-editor-heading.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading1.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading2.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading3.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading4.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading5.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading6.d9-playground-editor-processing-instruction {
                color: rgb(134, 54, 153);
                font-weight: 900;
                font-size: 20px;
            }

            > span.d9-playground-editor-list.d9-playground-editor-processing-instruction {
                color: rgb(134, 54, 153);
                font-weight: 600;
                font-size: 18px;
            }

            span.d9-playground-editor-widget-declaration-icon {
                display: none;
            }

            span.d9-playground-editor-heading.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading,
            span.d9-playground-editor-heading1.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading1,
            span.d9-playground-editor-heading2.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading2,
            span.d9-playground-editor-heading3.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading3,
            span.d9-playground-editor-heading4.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading4,
            span.d9-playground-editor-heading5.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading5,
            span.d9-playground-editor-heading6.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading6,
            span.d9-playground-editor-list.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-list {
                &.d9-playground-editor-widget-declaration-splitter,
                &.d9-playground-editor-widget-declaration-attr-splitter {
                    color: rgb(85, 85, 85, 0.7);
                    margin: 0 4px;
                    font-weight: 600;
                    font-variant: all-small-caps;
                }

                &.d9-playground-editor-widget-declaration-type {
                    color: rgb(134, 54, 153);
                }

                &.d9-playground-editor-widget-declaration-headline {
                    color: rgb(55, 122, 41);
                }

                &.d9-playground-editor-widget-declaration-property {
                    color: rgb(10, 56, 172);
                }

                &.d9-playground-editor-widget-declaration-id {
                    color: rgb(70, 141, 142);
                }

                &.d9-playground-editor-widget-declaration-flag {
                    color: rgb(114, 113, 64);
                }

                &.d9-playground-editor-widget-declaration-attr-name {
                    color: rgb(79, 148, 149);
                }

                & ~ span.d9-playground-editor-widget-declaration-icon {
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

                    &.d9-playground-editor-widget-declaration-type-icon {
                        background-color: rgb(134, 54, 153);
                    }

                    &.d9-playground-editor-widget-declaration-headline-icon {
                        background-color: rgb(55, 122, 41);
                    }

                    &.d9-playground-editor-widget-declaration-property-icon {
                        background-color: rgb(10, 56, 172);
                    }

                    &.d9-playground-editor-widget-declaration-id-icon {
                        background-color: rgb(70, 141, 142);
                    }

                    &.d9-playground-editor-widget-declaration-flag-icon {
                        background-color: rgb(114, 113, 64);
                    }

                    &.d9-playground-editor-widget-declaration-attr-name-icon {
                        background-color: rgb(79, 148, 149);
                    }
                }
            }
        }

        div.cm-panels.cm-panels-bottom {
            border-top: ${CssVars.BORDER};
            border-right: ${CssVars.BORDER};
        }

        div.cm-search.cm-panel {
            /** beautify search panel */
            display: grid;
            position: relative;
            grid-template-columns: auto auto 1fr auto auto auto;
            grid-column-gap: 8px;
            grid-template-rows: auto auto auto;
            grid-row-gap: 8px;

            > * {
                margin: 0;
            }

            > input {
                grid-column: span 3;

                &:not(:first-child) {
                    grid-row: 3;

                    ~ * {
                        grid-row: 3;
                    }
                }
            }

            > button {
                background-image: none;
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                text-transform: capitalize;
                cursor: pointer;

                &:last-child {
                    padding: 0 8px;
                }
            }

            > label {
                display: flex;
                position: relative;
                align-items: center;
                text-transform: capitalize;

                &:nth-child(7) {
                    grid-column: span 4;
                }

                > input {
                    margin: 0 4px 0 0;
                }
            }

            > br {
                display: none;
            }
        }
    }
`;