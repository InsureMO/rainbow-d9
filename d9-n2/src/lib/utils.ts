import {createLogger, Undefinable, VUtils} from '@rainbow-d9/n1';
import dayjs from 'dayjs';
import {CSSProperties, ForwardedRef, MutableRefObject, useEffect} from 'react';
import {getDefaultCalendarDateFormat, getDefaultCalendarDatetimeFormat} from './calendar/utils';
import {$d9n2} from './constants';

export const toCssSize = (size?: number | string): string => typeof size === 'number' ? `${size}px` : `${size ?? ''}`;
export const omitGridCellStyle = (style?: Partial<CSSProperties>): Partial<CSSProperties> => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		gridColumn, gridRow, gridArea,
		...rest
	} = style || {};
	return rest;
};
export const computeGridCellStyle = (style?: Partial<CSSProperties>): Undefinable<string> => {
	if (style == null) {
		return (void 0);
	}
	const gridCellStyles = [];
	if (VUtils.isNotBlank(style.gridColumn)) {
		gridCellStyles.push(`grid-column: ${style.gridColumn};`);
	}
	if (VUtils.isNotBlank(style.gridRow)) {
		gridCellStyles.push(`grid-row: ${style.gridRow};`);
	}
	if (VUtils.isNotBlank(style.gridArea)) {
		gridCellStyles.push(`grid-area: ${style.gridArea};`);
	}
	return gridCellStyles.join('');
};
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
		return new Intl.NumberFormat(
			VUtils.isBlank(locale) ? (void 0) : locale.replace(/_/g, '-'),
			{
				useGrouping: grouping == null ? true : grouping,
				minimumFractionDigits: fractionDigits || 0,
				maximumFractionDigits: fractionDigits || 0
			});
	};
};
export const nfXWithLocale = (locale: string, fractionDigits: number): NumberFormat => {
	return wrapNf(nfWithLocale(locale)(fractionDigits).format);
};
/**
 * first: grouping separator, second: decimal separator
 */
export const detectNumberFormat = (locale?: string): [string, string] => {
	const formatted = new Intl.NumberFormat(locale ?? (void 0), {useGrouping: true}).format(1234567890.9876);
	const matched = formatted.match(/\D/g);
	return [matched[0], matched[matched.length - 1]];
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

export const useDualRefs = <T>(ref: MutableRefObject<T | null>, forwardedRef: ForwardedRef<T>) => {
	useEffect(() => {
		if (typeof forwardedRef === 'function') {
			forwardedRef(ref.current);
		} else if (typeof forwardedRef === 'object' && forwardedRef !== null) {
			forwardedRef.current = ref.current;
		}
	}, [ref, forwardedRef]);
};

export const N2Logger = createLogger();
