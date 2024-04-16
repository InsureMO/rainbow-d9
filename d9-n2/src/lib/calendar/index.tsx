import {registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {CalendarEventBusProvider} from './event/calendar-event-bus';
import {Picker} from './picker';
import {CalendarDef, CalendarFixedTimeAt, CalendarProps} from './types';

export const Calendar = forwardRef((props: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <CalendarEventBusProvider>
		<Picker {...props} ref={ref}/>
	</CalendarEventBusProvider>;
});

export const DateCalendar = forwardRef((props: Omit<CalendarProps, 'date' | 'time' | 'timeFormat'>, ref: ForwardedRef<HTMLDivElement>) => {
	return <Calendar {...props} date={true} time={false} ref={ref}/>;
});

export const DateTimeCalendar = forwardRef((props: Omit<CalendarProps, 'date' | 'time' | 'fixedTimeAt'>, ref: ForwardedRef<HTMLDivElement>) => {
	return <Calendar {...props} date={true} time={true} ref={ref}/>;
});

export const TimeCalendar = forwardRef((props: Omit<CalendarProps, 'date' | 'time' | 'fixedTimeAt'>, ref: ForwardedRef<HTMLDivElement>) => {
	return <Calendar {...props} date={false} time={true} ref={ref}/>;
});

export {CalendarProps, CalendarDef, CalendarFixedTimeAt};
export * as CalendarConstants from './constants';
export * as CalendarUtils from './utils';

registerWidget({key: 'Calendar', JSX: Calendar, container: false, array: false});
registerWidget({key: 'Date', JSX: DateCalendar, container: false, array: false});
registerWidget({key: 'DateTime', JSX: DateTimeCalendar, container: false, array: false});
registerWidget({key: 'Time', JSX: TimeCalendar, container: false, array: false});
