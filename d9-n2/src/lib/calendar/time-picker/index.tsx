import {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {TimePickerContainer, TimePickerLabel, TimePickerSelector, TimePickerSelectorOption} from './widgets';

export const TimePicker = (props: { value: Dayjs }) => {
	const {value} = props;

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

	return <TimePickerContainer>
		<TimePickerLabel>Hour</TimePickerLabel>
		<TimePickerLabel>Minute</TimePickerLabel>
		<TimePickerLabel>Second</TimePickerLabel>
		<TimePickerSelector>
			{new Array(24).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onHourChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		<TimePickerSelector>
			{new Array(60).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onMinuteChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		<TimePickerSelector>
			{new Array(60).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onSecondChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
	</TimePickerContainer>;
};