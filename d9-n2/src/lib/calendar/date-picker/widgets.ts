import styled from 'styled-components';
import {CssVars} from '../../constants';

export const DatePickerContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    cursor: default;
`;
export const DatePickerShortcut = styled.div`
    display: flex;
    flex-direction: column;
    grid-row: span 2;
    border-right: ${CssVars.BORDER};
`;
export const DatePickerShortcutButton = styled.span`
    display: flex;
    align-items: center;
    height: ${CssVars.CALENDAR_DATE_CELL_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    font-size: 0.8em;
    font-variant: ${CssVars.FONT_VARIANT};
    cursor: pointer;
    user-select: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
export const DatePickerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
`;
export const DatePickerHeaderYearMonth = styled.span`
    font-weight: ${CssVars.FONT_BOLD};
    font-variant: ${CssVars.FONT_VARIANT};
`;
export const DatePickerHeaderOperators = styled.div`
    display: flex;
    align-items: center;
`;
const DatePickerHeaderButton = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${CssVars.FONT_BOLD};
    border-radius: ${CssVars.BORDER_RADIUS};
    user-select: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
export const DatePickerHeaderTodayButton = styled(DatePickerHeaderButton)`
    transform: scale(0.8);
    transform-origin: right;
    padding: 2px 6px;
    font-variant: ${CssVars.FONT_VARIANT};
`;
export const DatePickerHeaderMonthChangeButton = styled(DatePickerHeaderButton)`
    height: 20px;
    width: 24px;
`;
export const DatePickerBody = styled.div`
    display: grid;
    grid-template-columns: repeat(7, ${CssVars.CALENDAR_DATE_CELL_SIZE});
    grid-template-rows: repeat(7, ${CssVars.CALENDAR_DATE_CELL_SIZE});
`;
export const DatePickerBodyHeaderCell = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-weight: ${CssVars.FONT_BOLD};
    opacity: 0.7;
    cursor: default;

    &:first-child,
    &:nth-child(7) {
        color: ${CssVars.DANGER_COLOR};
    }
`;
export const DatePickerBodyDateCell = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    cursor: pointer;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10);
        left: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10);
        height: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5);
        width: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5);
        border-radius: 100%;
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 0;
        z-index: 0;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }

    &:hover:before {
        opacity: 1;
    }

    &[data-current-month=false] {
        color: ${CssVars.CALENDAR_LIGHT_DATE_COLOR};

        &:hover {
            color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &[data-today=true] {
        font-weight: ${CssVars.FONT_BOLD};
        color: ${CssVars.PRIMARY_COLOR};
    }

    &[data-could-perform=false] {
        cursor: default;

        &[data-current-month=false]:hover {
            color: ${CssVars.CALENDAR_LIGHT_DATE_COLOR};
        }

        &:before {
            display: none;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.15;
            z-index: 0;
        }

        &:hover:before {
            opacity: 0;
        }
    }

    &[data-current=true] {
        color: ${CssVars.INVERT_COLOR};

        &:before {
            background-color: ${CssVars.INVERT_COLOR};
            opacity: 1;
            z-index: 0;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10 + 3px);
            left: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10 + 3px);
            height: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5 - 6px);
            width: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5 - 6px);
            border-radius: 100%;
            background-color: ${CssVars.PRIMARY_COLOR};
            z-index: 1;
        }

        > span {
            font-size: 0.8em;
        }
    }

    > span {
        z-index: 2;
    }
`;
