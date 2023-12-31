import styled from 'styled-components';
import {CssVars} from '../../constants';

export const TimePickerContainer = styled.div.attrs<{ columns: number }>(({columns}) => {
	return {
		style: {
			gridTemplateColumns: `repeat(${columns}, 1fr)`
		}
	};
})<{ columns: number }>`
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
export const TimePickerLabel = styled.div`
    display: flex;
    align-items: center;
    font-variant: ${CssVars.FONT_VARIANT};
    font-weight: ${CssVars.FONT_BOLD}
`;
export const TimePickerSelector = styled.div.attrs({'data-v-scroll': ''})`
    display: flex;
    flex-direction: column;
    height: calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    overflow-y: scroll;
`;
export const TimePickerSelectorOption = styled.span`
    display: flex;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-current=true] {
        color: ${CssVars.INVERT_COLOR};

        &:before {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${CssVars.BORDER_RADIUS};
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.5;
            z-index: -1;
        }
    }

    &[data-current=false]:hover {
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 1;
    }
`;
