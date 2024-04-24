import {Dayjs} from 'dayjs';
import {useEffect} from 'react';
import {useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';

export const useValueChange = (onChange: (value: Dayjs, isDateChanged?: true) => void) => {
	const {on, off} = useCalendarEventBus();
	useEffect(() => {
		on(CalendarEventTypes.VALUE_SELECTED, onChange);
		return () => {
			off(CalendarEventTypes.VALUE_SELECTED, onChange);
		};
	}, [on, off, onChange]);
};