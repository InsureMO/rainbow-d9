import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';

export const ATabs = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-tabs',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;
    flex-direction: column;

    &[data-visible=false] {
        display: none;
    }
`;

export const TabsHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tabs-header'})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    column-gap: calc(${CssVars.TAB_TITLE_PADDING} / 2);
    row-gap: calc(${CssVars.TAB_TITLE_PADDING} / 2);
    padding: calc(${CssVars.TAB_TITLE_PADDING} / 2) 0;
    border-radius: calc(${CssVars.BORDER_RADIUS} * 2);
`;
export const ATabTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tab-title'})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.TAB_TITLE_FONT_FAMILY};
    font-size: ${CssVars.TAB_TITLE_FONT_SIZE};
    font-weight: ${CssVars.TAB_TITLE_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    fill: ${CssVars.CAPTION_FONT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.TAB_TITLE_HEIGHT};
    padding: ${CssVars.TAB_TITLE_OFFSET} ${CssVars.TAB_TITLE_PADDING} 0;
    margin-top: -1px;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-active=true] {
        background-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
        border-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
        color: ${CssVars.INVERT_COLOR};

        &:hover {
            background-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
            border-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
            box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        }

        > span[data-w=d9-caption] {
            color: ${CssVars.INVERT_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INVERT_COLOR};
                fill: ${CssVars.INVERT_COLOR};
            }
        }
    }

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
        border-color: ${CssVars.HOVER_COLOR};
        box-shadow: ${CssVars.HOVER_SHADOW};
    }
`;
export const TabsBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tabs-body'})`
    display: block;
    position: relative;
    border-top: ${CssVars.BORDER};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
    margin-top: -1px;
`;
export const ATabBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tab-body'})`
    display: block;
    position: relative;

    &[data-visible=false] {
        display: none;
    }
`;