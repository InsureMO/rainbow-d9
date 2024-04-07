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

export const DateCalendar = forwardRef((props: Omit<CalendarProps, 'time' | 'timeFormat'>, ref: ForwardedRef<HTMLDivElement>) => {
	return <Calendar {...props} time={false} ref={ref}/>;
});

export const DateTimeCalendar = forwardRef((props: Omit<CalendarProps, 'time' | 'fixedTimeAt'>, ref: ForwardedRef<HTMLDivElement>) => {
	return <Calendar {...props} time={true} ref={ref}/>;
});

export {CalendarProps, CalendarDef, CalendarFixedTimeAt};
export * as CalendarConstants from './constants';
export * as CalendarUtils from './utils';

registerWidget({key: 'Calendar', JSX: Calendar, container: false, array: false});
registerWidget({key: 'Date', JSX: DateCalendar, container: false, array: false});
registerWidget({key: 'DateTime', JSX: DateTimeCalendar, container: false, array: false});