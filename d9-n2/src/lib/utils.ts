import {createLogger, VUtils} from '@rainbow-d9/n1';
import dayjs from 'dayjs';
import {getDefaultCalendarDateFormat, getDefaultCalendarDatetimeFormat} from './calendar/utils';
import {$d9n2} from './constants';

export const toCssSize = (size?: number | string): string => typeof size === 'number' ? `${size}px` : `${size ?? ''}`;
export const locale = () => $d9n2.intl.language ?? navigator?.language ?? 'en-US';
export type NumberFormatter = (fractionDigits: number, grouping?: boolean) => Intl.NumberFormat;
export type NumberFormat = (value?: number) => string;

export const nf: NumberFormatter = (fractionDigits: number, grouping?: boolean) => {
	return new Intl.NumberFormat((void 0), {
		useGrouping: grouping == null ? true : grouping,
		minimumFractionDigits: fractionDigits || 0,
		maximumFractionDigits: fractionDigits || 0
	});
};
export const wrapNf = (format: Intl.NumberFormat['format']): NumberFormat => {
	return (value?: number) => value == null ? '' : format(value);
};
export const nf0: NumberFormat = wrapNf(nf(0).format);
export const nf1: NumberFormat = wrapNf(nf(1).format);
export const nf2: NumberFormat = wrapNf(nf(2).format);
export const nf3: NumberFormat = wrapNf(nf(3).format);

export const nfWithLocale = (locale: string): NumberFormatter => {
	return (fractionDigits: number, grouping?: boolean) => {
		return new Intl.NumberFormat(locale, {
			useGrouping: grouping == null ? true : grouping,
			minimumFractionDigits: fractionDigits || 0,
			maximumFractionDigits: fractionDigits || 0
		});
	};
};
export const nfXWithLocale = (locale: string, fractionDigits: number): NumberFormat => {
	return wrapNf(nfWithLocale(locale)(fractionDigits).format);
};

export const df = (value: string, options?: { from?: string; to?: string; }): string => {
	if (VUtils.isBlank(value)) {
		return value;
	}
	const fromFormat = options?.from || getDefaultCalendarDatetimeFormat();
	const toFormat = options?.to || getDefaultCalendarDateFormat();
	const parsed = dayjs(value, fromFormat);
	if (parsed.isValid()) {
		return parsed.format(toFormat);
	} else {
		return value;
	}
};

export const N2Logger = createLogger();
