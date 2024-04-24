import {Nullable} from '@rainbow-d9/n1';
import {Dayjs} from 'dayjs';

export enum CalendarEventTypes {
	OPEN_YEAR_MONTH_PICKER = 'open-year-month-picker',
	CLOSE_YEAR_MONTH_PICKER = 'close-year-month-picker',

	OPEN_TIME_PICKER = 'open-time-picker',
	CLOSE_TIME_PICKER = 'close-time-picker',

	INIT_POPUP_VALUE = 'init-popup-value',
	/** value selected, but not confirmed */
	VALUE_SELECTED = 'value-selected',
	/** value cleared, sync event to model was fired */
	VALUE_CLEARED = 'value-cleared',

	ASK_VALUE = 'ask-value',
}

export interface CalendarEventBus {
	fire(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER): this;

	on(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, listener: () => void): this;

	off(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER): this;

	on(type: CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, listener: () => void): this;

	off(type: CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.OPEN_TIME_PICKER): this;

	on(type: CalendarEventTypes.OPEN_TIME_PICKER, listener: () => void): this;

	off(type: CalendarEventTypes.OPEN_TIME_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.CLOSE_TIME_PICKER): this;

	on(type: CalendarEventTypes.CLOSE_TIME_PICKER, listener: () => void): this;

	off(type: CalendarEventTypes.CLOSE_TIME_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.INIT_POPUP_VALUE, value: Dayjs): this;

	on(type: CalendarEventTypes.INIT_POPUP_VALUE, listener: (value: Dayjs) => void): this;

	off(type: CalendarEventTypes.INIT_POPUP_VALUE, listener: (value: Dayjs) => void): this;

	fire(type: CalendarEventTypes.VALUE_SELECTED, value: Dayjs, isDateChanged?: true): this;

	on(type: CalendarEventTypes.VALUE_SELECTED, listener: (value: Dayjs, isDateChanged?: true) => void): this;

	off(type: CalendarEventTypes.VALUE_SELECTED, listener: (value: Dayjs, isDateChanged?: true) => void): this;

	fire(type: CalendarEventTypes.VALUE_CLEARED): this;

	on(type: CalendarEventTypes.VALUE_CLEARED, listener: () => void): this;

	off(type: CalendarEventTypes.VALUE_CLEARED, listener: () => void): this;

	fire(type: CalendarEventTypes.ASK_VALUE, onData: (value: Nullable<Dayjs>) => void): this;

	on(type: CalendarEventTypes.ASK_VALUE, listener: (onData: (value: Nullable<Dayjs>) => void) => void): this;

	off(type: CalendarEventTypes.ASK_VALUE, listener: (onData: (value: Nullable<Dayjs>) => void) => void): this;
}