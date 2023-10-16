import {registerWidget} from '@rainbow-d9/n1';
import React from 'react';
import {CalendarEventBusProvider} from './event/calendar-event-bus';
import {Picker} from './picker';
import {CalendarDef, CalendarFixedTimeAt, CalendarProps} from './types';

export const Calendar = (props: CalendarProps) => {
	return <CalendarEventBusProvider>
		<Picker {...props} />
	</CalendarEventBusProvider>;
};

export const DateCalendar = (props: Omit<CalendarProps, 'time' | 'timeFormat'>) => {
	return <Calendar {...props} time={false} />;
};
export const DateTimeCalendar = (props: Omit<CalendarProps, 'time' | 'fixedTimeAt'>) => {
	return <Calendar {...props} time={true} />;
};

export {CalendarProps, CalendarDef, CalendarFixedTimeAt};
export * as CalendarConstants from './constants';
export * as CalendarUtils from './utils';

registerWidget({key: 'Calendar', JSX: Calendar, container: false, array: false});
registerWidget({key: 'Date', JSX: DateCalendar, container: false, array: false});
registerWidget({key: 'DateTime', JSX: DateTimeCalendar, container: false, array: false});