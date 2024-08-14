import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../../constants';

export const YearMonthPickerContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker'})`
    display: grid;
    position: relative;
    grid-template-columns: 33% 1fr;
    grid-template-rows: calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
export const YearMonthPickerLabel = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker-label'})`
    display: flex;
    align-items: center;
    font-variant: ${CssVars.FONT_VARIANT};
    font-weight: ${CssVars.FONT_BOLD};

    &:nth-child(3) {
        margin-left: calc(${CssVars.CALENDAR_GUTTER_SIZE} * 2);
    }
`;
export const YearSelector = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker-year-selector',
	'data-v-scroll': ''
})`
    display: flex;
    flex-direction: column;
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    height: calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
    overflow-y: scroll;
`;
export const YearSelectorOption = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker-year-selector-option'})`
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
    }
`;
export const MonthSelector = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker-month-selector'})`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    grid-row-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
`;
export const MonthSelectorOption = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-calendar-ym-picker-month-selector-option'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: ${CssVars.BORDER_RADIUS};
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
            border-radius: ${CssVars.BORDER_RADIUS};
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
            border-radius: ${CssVars.BORDER_RADIUS};
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
