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
    border-top-left-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    border-top-right-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.TAB_TITLE_HEIGHT};
    padding: ${CssVars.TAB_TITLE_OFFSET} ${CssVars.TAB_TITLE_PADDING} 0;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &:hover {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        z-index: 1;
    }
`;
export const TabsBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-tabs-body'})`
    display: block;
    position: relative;
    border-top: ${CssVars.BORDER};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
    margin-top: -1px;
`;
