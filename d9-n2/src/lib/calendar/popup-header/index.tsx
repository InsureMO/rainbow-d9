import {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import styled from 'styled-components';
import {CssVars} from '../../constants';
import {Back, Date, Time} from '../../icons';
import {IntlLabel} from '../../intl-label';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {CalendarProps} from '../types';
import {checkDateParts} from '../utils';
import {
	PopupHeaderContainer,
	PopupHeaderDateLabel,
	PopupHeaderPlaceholder,
	PopupHeaderTimeButton,
	PopupHeaderTimeLabel
} from './widgets';

type CalendarPopupHeaderProps = Required<Pick<CalendarProps, 'date' | 'dateFormat' | 'time' | 'timeFormat'>> & {
	value: Dayjs;
	confirm: (value: Dayjs) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DateIcon = styled(Date as any)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimeIcon = styled(Time as any)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BackIcon = styled(Back as any)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;

enum CurrentPicker {
	DATE, YEAR_MONTH, TIME
}

export const CalendarPopupHeader = (props: CalendarPopupHeaderProps) => {
	const {date, dateFormat, time, timeFormat, value, confirm} = props;

	const {fire} = useCalendarEventBus();
	const [currentPicker, setCurrentPicker] = useState(() => {
		return checkDateParts(dateFormat).hasDate ? CurrentPicker.DATE : CurrentPicker.YEAR_MONTH;
	});

	const onYearMonthClicked = () => {
		fire(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER);
		setCurrentPicker(CurrentPicker.YEAR_MONTH);
	};
	const onToTimeClicked = () => {
		fire(CalendarEventTypes.OPEN_TIME_PICKER);
		setCurrentPicker(CurrentPicker.TIME);
	};
	const onBackClicked = () => {
		if (currentPicker === CurrentPicker.TIME) {
			fire(CalendarEventTypes.CLOSE_TIME_PICKER);
		} else if (currentPicker === CurrentPicker.YEAR_MONTH) {
			fire(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER);
		}
		setCurrentPicker(CurrentPicker.DATE);
	};
	const onToDayStartClicked = () => {
		const newValue = value.hour(0).minute(0).second(0).millisecond(0);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onToDayEndClicked = () => {
		const newValue = value.hour(23).minute(59).second(59).millisecond(999);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onConfirmClicked = () => confirm(value);

	const currentDisplayDate = value.format(dateFormat);
	const currentDisplayTime = value.format(timeFormat);

	const {hasDate} = checkDateParts(dateFormat);

	return <PopupHeaderContainer>
		{date ? <PopupHeaderDateLabel>{currentDisplayDate}</PopupHeaderDateLabel> : null}
		{time ? <PopupHeaderTimeLabel>{currentDisplayTime}</PopupHeaderTimeLabel> : null}
		<PopupHeaderPlaceholder/>
		{date && time
			? <>
				<PopupHeaderTimeButton onClick={onToDayStartClicked}>00</PopupHeaderTimeButton>
				<PopupHeaderTimeButton onClick={onToDayEndClicked}>24</PopupHeaderTimeButton>
				{currentPicker !== CurrentPicker.TIME
					? <PopupHeaderTimeButton onClick={onToTimeClicked}><TimeIcon/></PopupHeaderTimeButton>
					: null}
			</>
			: null}
		{date && currentPicker !== CurrentPicker.YEAR_MONTH
			? <PopupHeaderTimeButton onClick={onYearMonthClicked}><DateIcon/></PopupHeaderTimeButton>
			: null}
		{date && hasDate && currentPicker !== CurrentPicker.DATE
			? <PopupHeaderTimeButton onClick={onBackClicked}><BackIcon/></PopupHeaderTimeButton>
			: null}
		<PopupHeaderTimeButton onClick={onConfirmClicked}>
			<IntlLabel keys={['calendar', 'confirm']} value="Ok"/>
		</PopupHeaderTimeButton>
	</PopupHeaderContainer>;
};