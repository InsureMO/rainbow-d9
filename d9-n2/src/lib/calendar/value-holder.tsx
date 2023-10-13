import {Dayjs} from 'dayjs';
import React, {Fragment, useEffect, useState} from 'react';
import {useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';
import {useValueChange} from './use-value-change';

export const CalendarValueHolder = (props: { initValue?: Dayjs | null; }) => {
	const {initValue} = props;

	const {on, off, fire} = useCalendarEventBus();
	const [value, setValue] = useState<Dayjs | null>(initValue ?? null);
	useEffect(() => {
		setValue(initValue ?? null);
	}, [initValue]);
	useValueChange(setValue);
	useEffect(() => {
		const onValueCleared = () => setValue(null);
		const onAskValue = (onData: (value: Dayjs | null) => void) => onData(value);
		on(CalendarEventTypes.VALUE_CLEARED, onValueCleared);
		on(CalendarEventTypes.ASK_VALUE, onAskValue);
		return () => {
			off(CalendarEventTypes.VALUE_CLEARED, onValueCleared);
			off(CalendarEventTypes.ASK_VALUE, onAskValue);
		};
	}, [on, off, fire, value]);

	return <Fragment />;
};