import {Dayjs} from 'dayjs';
import {DEFAULTS} from './constants';

export const setCalendarDefaults = (defaults: {
	ymFormat?: string; dateFormat?: string; timeFormat?: string; datetimeFormat?: string;
	autoConfirm?: boolean; useCalendarIcon?: boolean;
}) => {
	DEFAULTS.YM_FORMAT = defaults.ymFormat ?? DEFAULTS.YM_FORMAT;
	DEFAULTS.DATE_FORMAT = defaults.dateFormat ?? DEFAULTS.DATE_FORMAT;
	DEFAULTS.TIME_FORMAT = defaults.timeFormat ?? DEFAULTS.TIME_FORMAT;
	DEFAULTS.DATETIME_FORMAT = defaults.datetimeFormat ?? DEFAULTS.DATETIME_FORMAT;
	DEFAULTS.AUTO_CONFIRM = defaults.autoConfirm ?? DEFAULTS.AUTO_CONFIRM;
	DEFAULTS.USE_CALENDAR_ICON = defaults.useCalendarIcon ?? DEFAULTS.USE_CALENDAR_ICON;
};
export const getDefaultCalendarYMFormat = (): string => DEFAULTS.YM_FORMAT;
export const getDefaultCalendarDateFormat = (): string => DEFAULTS.DATE_FORMAT;
export const getDefaultCalendarTimeFormat = (): string => DEFAULTS.TIME_FORMAT;
export const getDefaultCalendarDatetimeFormat = (): string => DEFAULTS.DATETIME_FORMAT;

export const isCalendarAutoConfirm = (): boolean => DEFAULTS.AUTO_CONFIRM;
export const isStickIconUseCalendar = (): boolean => DEFAULTS.USE_CALENDAR_ICON;

export const FIX_TIME_AT_START_OF_DAY = {hour: 0, minute: 0, second: 0, millisecond: 0};
export const FIX_TIME_AT_END_OF_DAY = {hour: 23, minute: 59, second: 59, millisecond: 59};

export const toStartOfDay = (datetime: Dayjs): Dayjs => {
	return datetime.hour(0).minute(0).second(0).millisecond(0);
};

export const toEndOfDay = (datetime: Dayjs): Dayjs => {
	return datetime.hour(23).minute(59).second(59).millisecond(999);
};

export const checkTimeParts = (timeFormat?: string) => {
	const hasMinute = (timeFormat ?? '').includes('m');
	const hasSecond = hasMinute && (timeFormat ?? '').includes('s');
	return {hasMinute, hasSecond};
};
export const checkDateParts = (dateFormat?: string) => {
	return {hasDate: (dateFormat ?? '').toLowerCase().includes('d')};
};