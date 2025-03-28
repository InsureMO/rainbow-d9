import {CssVars} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const CodeEditorCssVars = {
	ACTIVE_LINE_BACKGROUND_COLOR: `var(--d9-ce-active-line-background-color, rgba(0,0,0,0.06))`,
	SEARCH_PANEL_BACKGROUND_COLOR: `var(--d9-ce-search-panel-background-color, ${CssVars.BACKGROUND_COLOR})`,
	SEARCH_PANEL_BUTTON_BACKGROUND_COLOR: `var(--d9-search-panel-button-background-color, transparent)`
};

// noinspection CssUnresolvedCustomProperty,CssUnusedSymbol
export const EditorContainer = styled.div`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: var(--height);
    min-height: var(--height);
    max-height: var(--height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }

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
                width: ${CssVars.SCROLL_WIDTH};
            }

            &::-webkit-scrollbar-track {
                background-color: ${CssVars.SCROLL_TRACK_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${CssVars.SCROLL_THUMB_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            > div.cm-gutters {
                border-right: ${CssVars.BORDER};
            }

            > div.cm-content {
                > div.cm-line.cm-activeLine {
                    background-color: ${CodeEditorCssVars.ACTIVE_LINE_BACKGROUND_COLOR};
                }
            }
        }

        div.cm-line {
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
            background-color: ${CodeEditorCssVars.SEARCH_PANEL_BACKGROUND_COLOR};

            > * {
                margin: 0;

                &:first-child, &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                    grid-row: 1;
                }

                &:nth-child(5), &:nth-child(6), &:nth-child(7) {
                    grid-row: 2;
                }

                &:nth-child(9), &:nth-child(10), &:nth-child(11), &:nth-child(12) {
                    grid-row: 3;
                }
            }

            > input {
                grid-column: span 3;
                color: ${CssVars.FONT_COLOR};
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
            }

            > button {
                background-image: none;
                background-color: ${CodeEditorCssVars.SEARCH_PANEL_BUTTON_BACKGROUND_COLOR};
                color: ${CssVars.FONT_COLOR};
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
                color: ${CssVars.FONT_COLOR};
                text-transform: capitalize;
                justify-self: start;

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

        div.cm-tooltip-autocomplete {
            > ul {
                &::-webkit-scrollbar {
                    background-color: transparent;
                    height: ${CssVars.SCROLL_HEIGHT};
                    width: ${CssVars.SCROLL_WIDTH};
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

            span.cm-completionLabel {
                font-weight: 600;
                margin-right: 16px;
            }
        }

        .cm-completionIcon-class:after {
            content: '𝐶'
        }

        .cm-completionIcon-interface :after {
            content: '𝑖'
        }

        .cm-completionIcon-variable:after {
            content: '𝑥'
        }

        .cm-completionIcon-constant:after {
            content: '𝑐'
        }

        .cm-completionIcon-type:after {
            content: '𝑡'
        }

        .cm-completionIcon-enum:after {
            content: '𝑒'
        }

        .cm-completionIcon-property:after {
            content: '𝑝'
        }

        .cm-completionIcon-keyword:after {
            content: '𝑘'
        }

        .cm-completionIcon-namespace:after {
            content: '𝑛'
        }
    }
`;
