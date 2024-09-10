import {CssVars} from '@rainbow-d9/n2';
import {PlaygroundCssVars} from '../widgets';

export const createDisableBadgesForWrapper = () => `> div[data-w=d9-playground-editor-panel] {
    > div.cm-editor div.cm-line {
        span.d9-playground-editor-heading1,
        span.d9-playground-editor-heading2,
        span.d9-playground-editor-heading3,
        span.d9-playground-editor-heading4,
        span.d9-playground-editor-heading5,
        span.d9-playground-editor-heading6,
        span.d9-playground-editor-list {
            & ~ span.d9-playground-editor-widget-declaration-icon {
                &.d9-playground-editor-widget-declaration-type-icon,
                &.d9-playground-editor-widget-declaration-headline-icon,
                &.d9-playground-editor-widget-declaration-property-icon,
                &.d9-playground-editor-widget-declaration-id-icon,
                &.d9-playground-editor-widget-declaration-flag-icon,
                &.d9-playground-editor-widget-declaration-attr-name-icon {
                    width: 0;
                    padding: 0;
                }
            }
        }

        span.d9-playground-editor-list {
            & ~ span.d9-playground-editor-widget-declaration-icon.d9-playground-editor-widget-declaration-attr-name-icon {
                width: 0;
                padding: 0;
            }
        }
    }
}
`;
export const createEditorStyles = (options: { badge: boolean }) => {
	const {badge} = options;

	const EDITOR_BADGES = `& ~ span.d9-playground-editor-widget-declaration-icon {
    width: unset;
    padding: 0 3px;

    &.d9-playground-editor-widget-declaration-type-icon {
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_COLOR};
    }

    &.d9-playground-editor-widget-declaration-headline-icon {
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_HEADLINE_COLOR};
    }

    &.d9-playground-editor-widget-declaration-property-icon {
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_PROPERTY_COLOR};
    }

    &.d9-playground-editor-widget-declaration-id-icon {
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_ID_COLOR};
    }

    &.d9-playground-editor-widget-declaration-flag-icon {
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_FLAG_COLOR};
    }

    /** disable icons for list */

    &.d9-playground-editor-widget-declaration-attr-name-icon {
        width: 0;
        padding: 0;
    }
}
`;
	const BULLET_LIST_BADGES = `& ~ span.d9-playground-editor-widget-declaration-icon {
    /** enable icons for list */

    &.d9-playground-editor-widget-declaration-attr-name-icon {
        width: unset;
        padding: 0 3px;
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_NAME_COLOR};
    }
}
`;

	return `> div.cm-editor {
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
    }

    div.cm-line {
        span.d9-playground-editor-heading-mark {
            color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
            font-weight: 900;
        }

        span.d9-playground-editor-heading1.d9-playground-editor-heading-mark {
            font-size: 24px;
        }

        span.d9-playground-editor-heading2.d9-playground-editor-heading-mark {
            font-size: 20px;
        }

        span.d9-playground-editor-heading3.d9-playground-editor-heading-mark {
            font-size: 18px;
        }

        span.d9-playground-editor-heading4.d9-playground-editor-heading-mark {
            font-size: 16px;
        }

        //span.d9-playground-editor-heading5.d9-playground-editor-heading-mark,
        //span.d9-playground-editor-heading6.d9-playground-editor-heading-mark {
        //    font-size: 16px;
        //}

        span.d9-playground-editor-list.d9-playground-editor-list-mark {
            color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
            font-weight: 600;
            //font-size: 16px;
        }

        span.d9-playground-editor-widget-declaration-icon {
            /** 
             * cannot use display:none, it leads the problem as below,
             * 1. select the word before this declaration, 
             * 2. selection background cannot be calculated correctly.
             * not sure reason of this problem, and use width: 0 to fix this
             * and since inline element prevents width from having an effort (which span default is),
             * change to inline-flex to make sure the width is applied.
             */
            display: inline-flex;
            position: relative;
            align-items: center;
            justify-content: center;
            margin-left: 2px;
            font-weight: 600;
            font-variant: petite-caps;
            color: white;
            border-radius: 4px;
            width: 0;
            height: 16px;
            padding: 0;
            overflow: hidden;
        }

        span.d9-playground-editor-heading1,
        span.d9-playground-editor-heading2,
        span.d9-playground-editor-heading3,
        span.d9-playground-editor-heading4,
        span.d9-playground-editor-heading5,
        span.d9-playground-editor-heading6,
        span.d9-playground-editor-list {
            &.d9-playground-editor-widget-declaration-splitter {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_SPLITTER_COLOR};
                margin: 0 4px;
                font-weight: 600;
                font-variant: all-small-caps;
            }

            &.d9-playground-editor-widget-declaration-type {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_COLOR};
            }

            &.d9-playground-editor-widget-declaration-headline {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_HEADLINE_COLOR};
            }

            &.d9-playground-editor-widget-declaration-property {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_PROPERTY_COLOR};
            }

            &.d9-playground-editor-widget-declaration-id {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_ID_COLOR};
            }

            &.d9-playground-editor-widget-declaration-flag {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_FLAG_COLOR};
            }

            ${badge ? EDITOR_BADGES : ''}
        }

        span.d9-playground-editor-list {
            /** attribute available only in list */

            &.d9-playground-editor-widget-declaration-attr-splitter,
            &.d9-playground-editor-widget-declaration-attr-value-splitter,
            &.d9-playground-editor-widget-declaration-attr-name-joint {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_SPLITTER_COLOR};
                margin: 0 4px;
                font-weight: 600;
                font-variant: all-small-caps;
            }

            &.d9-playground-editor-widget-declaration-attr-name {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_NAME_COLOR};
            }

            &.d9-playground-editor-widget-declaration-attr-value-icon {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR};
            }

            &.d9-playground-editor-widget-declaration-attr-value-str {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR};
            }

            &.d9-playground-editor-widget-declaration-attr-value-ext {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR};
            }

            ${badge ? BULLET_LIST_BADGES : ''}
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
        background-color: ${PlaygroundCssVars.CODE_MIRROR_SEARCH_PANEL_BACKGROUND_COLOR};

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
            background-color: ${PlaygroundCssVars.CODE_MIRROR_SEARCH_PANEL_BUTTON_BACKGROUND_COLOR};
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
}
`;
};
