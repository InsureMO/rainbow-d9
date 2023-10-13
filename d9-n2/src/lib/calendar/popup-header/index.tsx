import {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import {I18NVars} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {CalendarProps} from '../types';
import {CalendarSVGIcon} from '../widgets';
import {
	PopupHeaderContainer,
	PopupHeaderDateLabel,
	PopupHeaderPlaceholder,
	PopupHeaderTimeButton,
	PopupHeaderTimeLabel
} from './widgets';

type CalendarPopupHeaderProps = Required<Pick<CalendarProps, 'dateFormat' | 'time' | 'timeFormat'>> & {
	value: Dayjs;
	confirm: (value: Dayjs) => void;
}

export const DateIcon = () => {
	return <CalendarSVGIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
		<path
			d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
	</CalendarSVGIcon>;
};
export const TimeIcon = () => {
	return <CalendarSVGIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
		<path
			d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
	</CalendarSVGIcon>;
};
export const BackIcon = () => {
	return <CalendarSVGIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path
			d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" />
	</CalendarSVGIcon>;
};

enum CurrentPicker {
	DATE, YEAR_MONTH, TIME
}

export const CalendarPopupHeader = (props: CalendarPopupHeaderProps) => {
	const {dateFormat, time, timeFormat, value, confirm} = props;

	const {fire} = useCalendarEventBus();
	const [currentPicker, setCurrentPicker] = useState(CurrentPicker.DATE);

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

	return <PopupHeaderContainer>
		<PopupHeaderDateLabel>{currentDisplayDate}</PopupHeaderDateLabel>
		{time
			? <PopupHeaderTimeLabel>{currentDisplayTime}</PopupHeaderTimeLabel>
			: null}
		<PopupHeaderPlaceholder />
		{time
			? <>
				<PopupHeaderTimeButton onClick={onToDayStartClicked}>00</PopupHeaderTimeButton>
				<PopupHeaderTimeButton onClick={onToDayEndClicked}>24</PopupHeaderTimeButton>
				{currentPicker !== CurrentPicker.TIME
					? <PopupHeaderTimeButton onClick={onToTimeClicked}><TimeIcon /></PopupHeaderTimeButton>
					: null}
			</>
			: null}
		{currentPicker !== CurrentPicker.YEAR_MONTH
			? <PopupHeaderTimeButton onClick={onYearMonthClicked}><DateIcon /></PopupHeaderTimeButton>
			: null}
		{currentPicker !== CurrentPicker.DATE
			? <PopupHeaderTimeButton onClick={onBackClicked}><BackIcon /></PopupHeaderTimeButton> : null}
		<PopupHeaderTimeButton onClick={onConfirmClicked}>{I18NVars.CALENDAR.CONFIRM}</PopupHeaderTimeButton>
	</PopupHeaderContainer>;
};