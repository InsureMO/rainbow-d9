import styled from 'styled-components';
import {CssVars} from '../../constants';

export const TimePickerContainer = styled.div.attrs<{ columns: number }>(({columns}) => {
	return {
		'data-w': 'd9-calendar-time-picker',
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
export const TimePickerLabel = styled.div.attrs({'data-w': 'd9-calendar-time-picker-label'})`
    display: flex;
    align-items: center;
    font-variant: ${CssVars.FONT_VARIANT};
    font-weight: ${CssVars.FONT_BOLD}
`;
export const TimePickerSelector = styled.div.attrs({'data-w': 'd9-calendar-time-picker-selector', 'data-v-scroll': ''})`
    display: flex;
    flex-direction: column;
    height: calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    overflow-y: scroll;
`;
export const TimePickerSelectorOption = styled.span.attrs({'data-w': 'd9-calendar-time-picker-selector-option'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-could-perform=false] {
        cursor: default;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.3;
            z-index: 0;
        }
    }

    &[data-current=true] {
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.15;
            z-index: 0;
        }
    }

    &[data-current=false]:hover {
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 1;
    }
`;
