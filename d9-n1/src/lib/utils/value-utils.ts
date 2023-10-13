import {nanoid} from 'nanoid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any;

export interface TestedNumericValue {
	test: boolean;
}

export interface TestedNotNumericValue extends TestedNumericValue {
	test: false;
}

export interface TestedIsNumericValue extends TestedNumericValue {
	test: true;
	value: number;
}

export interface ValueUtilsType {
	readonly isEmpty: (v?: AnyValue) => boolean;
	readonly isNotEmpty: (v?: AnyValue) => boolean;
	/**
	 * check the given value is blank or not. null or blank string should be determined as true.
	 */
	readonly isBlank: (v?: AnyValue) => boolean;
	readonly isNotBlank: (v2: AnyValue) => boolean;
	/**
	 * check the given value is primitive type or not.
	 * only string/number/boolean will be treated as primitive type.
	 * returns false when value is null or undefined, since accurate type cannot be determined.
	 */
	readonly isPrimitive: (v?: AnyValue) => boolean;
	readonly isNumber: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly assertNumber: (v: AnyValue | undefined, assert: (v: number) => boolean) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isInteger: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isNotInteger: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isPositive: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isNotPositive: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isNegative: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	readonly isNotNegative: (v?: AnyValue) => TestedNotNumericValue | TestedIsNumericValue;
	// eslint-disable-next-line @typescript-eslint/ban-types
	readonly isFunction: (v?: AnyValue) => v is Function;
	readonly base64Encode: (str: string) => string;
	readonly base64Decode: (str: string) => string;
	readonly generateUniqueId: () => string;
	readonly noop: () => void;
}

export const VUtils: ValueUtilsType = {
	isEmpty: (v?: AnyValue): boolean => v == null || (typeof v === 'string' && v.length === 0),
	isNotEmpty: (v?: AnyValue): boolean => (v ?? '') !== '',
	isBlank: (v?: AnyValue) => v == null || (typeof v === 'string' && v.trim().length === 0),
	isNotBlank: (v?: AnyValue) => v != null && `${v}`.trim().length !== 0,
	isPrimitive: (v?: AnyValue) => v != null && ['string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof v),
	isNumber: (v?: AnyValue) => {
		if (VUtils.isBlank(v)) {
			return {test: false};
		}
		switch (typeof v) {
			case 'number':
				return {test: true, value: v};
			case 'string': {
				const n = Number(v);
				return Number.isNaN(n) ? {test: false} : {test: true, value: n};
			}
			default:
				return {test: false};
		}
	},
	assertNumber: (v: AnyValue | undefined, assert: (v: number) => boolean) => {
		const result = VUtils.isNumber(v);
		if (!result.test) {
			return result;
		} else if (assert(result.value)) {
			return result;
		} else {
			return {test: false};
		}
	},
	isInteger: (v?: AnyValue) => VUtils.assertNumber(v, Number.isInteger),
	isNotInteger: (v?: AnyValue) => VUtils.assertNumber(v, (v: number) => !Number.isInteger(v)),
	isPositive: (v?: AnyValue) => VUtils.assertNumber(v, (v: number) => v > 0),
	isNotPositive: (v?: AnyValue) => VUtils.assertNumber(v, (v: number) => v <= 0),
	isNegative: (v?: AnyValue) => VUtils.assertNumber(v, (v: number) => v < 0),
	isNotNegative: (v?: AnyValue) => VUtils.assertNumber(v, (v: number) => v >= 0),
	// eslint-disable-next-line @typescript-eslint/ban-types
	isFunction: (v?: AnyValue): v is Function => v != null && (typeof v === 'function'),
	base64Encode: (str: string): string => Buffer.from(str, 'utf-8').toString('base64'),
	base64Decode: (str: string): string => Buffer.from(str, 'base64').toString('utf-8'),
	generateUniqueId: () => nanoid(),
	noop: () => (void 0)
};