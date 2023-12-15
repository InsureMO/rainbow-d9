import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {I18NVars} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {TimePickerContainer, TimePickerLabel, TimePickerSelector, TimePickerSelectorOption} from './widgets';

export const TimePicker = (props: { value: Dayjs, timeFormat: string }) => {
	const {value, timeFormat} = props;

	const hourSelectorRef = useRef<HTMLDivElement>(null);
	const minuteSelectorRef = useRef<HTMLDivElement>(null);
	const secondSelectorRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onOpen = () => setVisible(true);
		const onClose = () => setVisible(false);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
		on(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
			off(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		};
	}, [on, off]);
	useEffect(() => {
		if (hourSelectorRef.current != null && visible) {
			hourSelectorRef.current.querySelector(`span[data-hour="${value.hour()}"]`)?.scrollIntoView();
		}
		if (minuteSelectorRef.current != null && visible) {
			minuteSelectorRef.current.querySelector(`span[data-minute="${value.minute()}"]`)?.scrollIntoView();
		}
		if (secondSelectorRef.current != null && visible) {
			secondSelectorRef.current.querySelector(`span[data-second="${value.second()}"]`)?.scrollIntoView();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	if (!visible) {
		return null;
	}

	const onHourChange = (index: number) => () => {
		const newValue = value.hour(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onMinuteChange = (index: number) => () => {
		const newValue = value.minute(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onSecondChange = (index: number) => () => {
		const newValue = value.second(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};

	const hasMinute = (timeFormat ?? '').includes('m');
	const hasSecond = hasMinute && (timeFormat ?? '').includes('s');
	const columns = 3 - (!hasMinute ? 1 : 0) - (!hasSecond ? 1 : 0);

	return <TimePickerContainer columns={columns}>
		<TimePickerLabel>{I18NVars.CALENDAR.HOUR}</TimePickerLabel>
		{hasMinute ? <TimePickerLabel>{I18NVars.CALENDAR.MINUTE}</TimePickerLabel> : null}
		{hasSecond ? <TimePickerLabel>{I18NVars.CALENDAR.SECOND}</TimePickerLabel> : null}
		<TimePickerSelector ref={hourSelectorRef}>
			{new Array(24).fill(1).map((v, index) => {
				return <TimePickerSelectorOption data-current={value.hour() === index} data-hour={index}
				                                 onClick={onHourChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		{hasMinute
			? <TimePickerSelector ref={minuteSelectorRef}>
				{new Array(60).fill(1).map((v, index) => {
					return <TimePickerSelectorOption data-current={value.minute() === index} data-minute={index}
					                                 onClick={onMinuteChange(index)} key={index}>
						{`${index}`.padStart(2, '0')}
					</TimePickerSelectorOption>;
				})}
			</TimePickerSelector>
			: null}
		{hasSecond
			? <TimePickerSelector ref={secondSelectorRef}>
				{new Array(60).fill(1).map((v, index) => {
					return <TimePickerSelectorOption data-current={value.second() === index} data-second={index}
					                                 onClick={onSecondChange(index)} key={index}>
						{`${index}`.padStart(2, '0')}
					</TimePickerSelectorOption>;
				})}
			</TimePickerSelector>
			: null}
	</TimePickerContainer>;
};