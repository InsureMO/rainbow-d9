import {
	BaseModel,
	ExternalDefIndicator,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValue,
	NodeAttributeValueHandleOptions,
	Nullable,
	PropValue,
	Undefinable,
	ValidationResult,
	VUtils
} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild, createDefaultMonitorHandlerDetective} from './monitor-build';
import {MonitorHandler, MonitorHandlerDetective, MonitorHandlerDetectOptions} from './types';
import {wrapMonitorHandlerDetective} from './utils';

const detectSimpleCheck = (options: {
	attrName: string;
	defaultInvalidMessage: string;
	validate: (value?: PropValue) => boolean;
}): MonitorHandlerDetective => {
	const {attrName, defaultInvalidMessage, validate} = options;

	return (options: MonitorHandlerDetectOptions): MonitorHandler => {
		const {attributes} = options;
		if (attributes[attrName] !== true && typeof attributes[attrName] !== 'string') {
			return (void 0);
		}
		const message = attributes[attrName] === true ? defaultInvalidMessage : (attributes[attrName] as string);
		delete attributes[attrName];
		return (options: { value?: PropValue; }): NodeAttributeValue => {
			const {value} = options;
			if (!validate(value)) {
				return {valid: false, failReason: message} as ValidationResult;
			}
		};
	};
};

const detectRequired: MonitorHandlerDetective = wrapMonitorHandlerDetective(detectSimpleCheck({
	attrName: 'required', defaultInvalidMessage: 'Field is required.',
	validate: (value) => VUtils.isNotBlank(value)
}), (attributes) => {
	attributes['data-required'] = true;
});

const detectNumeric: MonitorHandlerDetective = detectSimpleCheck({
	attrName: 'numeric', defaultInvalidMessage: 'Field value should be numeric.',
	validate: (value) => `${value ?? ''}`.length === 0 || VUtils.isNumber(value).test
});

const detectPositive: MonitorHandlerDetective = detectSimpleCheck({
	attrName: 'positive', defaultInvalidMessage: 'Field value should be positive.',
	validate: (value) => `${value ?? ''}`.length === 0 || VUtils.isPositive(value).test
});

const detectNotNegative: MonitorHandlerDetective = detectSimpleCheck({
	attrName: 'notNegative', defaultInvalidMessage: 'Field value should be non-negative.',
	validate: (value) => `${value ?? ''}`.length === 0 || VUtils.isNotNegative(value).test
});

const detectInteger: MonitorHandlerDetective = detectSimpleCheck({
	attrName: 'integer', defaultInvalidMessage: 'Field value should be an integer.',
	validate: (value) => `${value ?? ''}`.length === 0 || VUtils.isInteger(value).test
});

const detectRegex: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): MonitorHandler => {
	const {attributes} = options;
	const regex = attributes.regex || attributes.regexp;
	if (VUtils.isBlank(regex)) {
		return (void 0);
	}

	delete attributes.regex;
	delete attributes.regexp;

	const match = `${regex}`.match(/^([^;]+);?(.*)$/);
	if (match != null) {
		const patterns = match[1].split(',')
			.map(pattern => pattern.trim())
			.filter(pattern => pattern.length !== 0)
			.map(pattern => {
				const regex = ValidatorUtils.findRegex(pattern);
				if (regex != null) {
					return regex;
				}
				if (pattern.endsWith('/i')) {
					return new RegExp(pattern.substring(0, pattern.length - 2), 'i');
				} else {
					return new RegExp(pattern);
				}
			});
		const message = VUtils.isBlank(match[2]) ? `Field pattern should match regexp[${match[1]}].` : match[2].trim();
		return (options: { value?: PropValue }): NodeAttributeValue => {
			const {value} = options;
			if (VUtils.isEmpty(value) || patterns.some(pattern => pattern.test(`${value}`))) {
				return {valid: true} as ValidationResult;
			} else {
				return {valid: false, failReason: message} as ValidationResult;
			}
		};
	}
};

const detectLength: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): MonitorHandler => {
	const {attributes} = options;
	if (attributes.length == null) {
		return (void 0);
	}
	const mightBePositive = VUtils.isPositive(attributes.length);
	if (mightBePositive.test) {
		delete attributes.length;
		return (options: { value?: PropValue }): NodeAttributeValue => {
			const {value} = options;
			const length = `${value ?? ''}`.length;
			if (length === 0) {
				return {valid: true} as ValidationResult;
			} else if (length !== mightBePositive.value) {
				return {
					valid: false, failReason: `Field length should be ${mightBePositive.value}.`
				} as ValidationResult;
			}
		};
	}
	const match = `${attributes.length}`.match(/^([^;]+);?(.*)$/);
	if (match != null) {
		const message = VUtils.isBlank(match[2]) ? `Field length should be ${match[1]}.` : match[2].trim();
		const lengthMatch = match[1].match(/([^,])+/g);
		if (lengthMatch != null) {
			const rules = lengthMatch.map(part => {
				const mightBePositive = VUtils.isPositive(part);
				if (mightBePositive.test) {
					return (length: number) => length === mightBePositive.value;
				}
				const rangeMatch = part.match(/^(\d*)\.\.(\d*)$/);
				if (rangeMatch != null) {
					const min = Number(rangeMatch[1]); // empty will be cast to 0
					const max = VUtils.isBlank(rangeMatch[2]) ? Infinity : Number(rangeMatch[2]);
					return (length: number) => length >= min && length <= max;
				}
				return null;
			}).filter(x => x != null);
			if (rules.length !== 0) {
				delete attributes.length;
				return (options: { value?: PropValue }): NodeAttributeValue => {
					const {value} = options;
					const length = `${value ?? ''}`.length;
					if (length === 0) {
						return {valid: true} as ValidationResult;
					} else if (rules.some(rule => rule(length))) {
						// pass when at least one rule is passed
						return {valid: true} as ValidationResult;
					} else {
						return {valid: false, failReason: message} as ValidationResult;
					}
				};
			}
		}
	}
};

const detectNumberRange: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): MonitorHandler => {
	const {attributes} = options;
	if (attributes.numberRange == null) {
		return (void 0);
	}
	const match = `${attributes.numberRange}`.match(/^([^;]+);?(.*)$/);
	if (match != null) {
		const message = VUtils.isBlank(match[2]) ? `Value should be in range ${match[1]}.` : match[2].trim();
		const rangeMatch = match[1].match(/([^,])+/g);
		if (rangeMatch != null) {
			const rules = rangeMatch.map(part => {
				// eslint-disable-next-line no-useless-escape
				const rangeMatch = part.match(/^([(\[]?)(-?\d+(\.\d+)?)?\.\.(-?\d+(\.\d+)?)?([)\]]?)$/);
				if (rangeMatch != null) {
					const minIncluded = rangeMatch[1] !== '(';
					const min = VUtils.isBlank(rangeMatch[2]) ? -Infinity : Number(rangeMatch[2]);
					const max = VUtils.isBlank(rangeMatch[4]) ? Infinity : Number(rangeMatch[4]);
					const maxIncluded = rangeMatch[6] !== ')';
					return (value: number) => {
						return (minIncluded ? (value >= min) : (value > min))
							&& (maxIncluded ? (value <= max) : (value < max));
					};
				}
				return null;
			}).filter(x => x != null);
			if (rules.length !== 0) {
				delete attributes.numberRange;
				return (options: { value?: PropValue }): NodeAttributeValue => {
					const {value} = options;
					const testedValue = VUtils.isNumber(value);
					if (!testedValue.test) {
						// not a number, pass check
						return {valid: true} as ValidationResult;
					} else if (rules.some(rule => rule(testedValue.value))) {
						// pass when at least one rule is passed
						return {valid: true} as ValidationResult;
					} else {
						return {valid: false, failReason: message} as ValidationResult;
					}
				};
			}
		}
	}
};

export class ValidatorUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_VALIDATION =
		createDefaultMonitorHandlerDetective({
			attributeName: MonitorNodeAttributes.VALID,
			// only returns false means invisible
			redressResult: (ret: Nullable<ValidationResult>): ValidationResult => {
				if (ret == null) {
					return {valid: true};
				} else {
					return ret;
				}
			}
		});
	// noinspection JSUnusedGlobalSymbols
	public static readonly DETECT_SIMPLE_CHECK = detectSimpleCheck;
	public static readonly DETECT_REQUIRED = detectRequired;
	public static readonly DETECT_NUMERIC = detectNumeric;
	public static readonly DETECT_POSITIVE = detectPositive;
	public static readonly DETECT_NOT_NEGATIVE = detectNotNegative;
	public static readonly DETECT_INTEGER = detectInteger;
	public static readonly DETECT_REGEX = detectRegex;
	public static readonly DETECT_LENGTH = detectLength;
	public static readonly DETECT_NUMBER_RANGE = detectNumberRange;
	private static readonly _PREDEFINED_REGEXPS: Record<string, RegExp> = {};

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static registerRegexps(regexps: Record<string, RegExp>): void {
		Object.keys(regexps ?? {}).forEach(key => {
			ValidatorUtils._PREDEFINED_REGEXPS[key] = regexps[key];
		});
	}

	public static findRegex(key: string): Nullable<RegExp> {
		return ValidatorUtils._PREDEFINED_REGEXPS[key];
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ValidatorUtils.DETECTIVES[$wt];
		ValidatorUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ValidatorUtils.DETECTIVES[$wt];
		delete ValidatorUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return ValidatorUtils.DETECTIVES[$wt] ?? [];
	}
}

export class ValidatorBuild extends AbstractMonitorBuild {
	protected getAllDetectives(): ($wt: WidgetType) => Array<MonitorHandlerDetective> {
		return ValidatorUtils.getAllDetectives;
	}

	/**
	 * validation allows no watch, which means only watch itself
	 */
	protected allowNoWatch(): boolean {
		return true;
	}

	protected doCombine(
		monitors: Array<Partial<MonitorOthers<NodeAttributeValue>>>, watches: Array<string>,
		attributes: AttributeMap): AttributeMap {
		// combine all handlers to one

		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const createHandle = (delegators: Array<[Function, Function]>) => {
			const func = async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<ValidationResult> => {
				// call each handle, no matter what it watches
				return await monitors.reduce(async (result, {$handle}, index) => {
					const ret = await result;
					// once invalid detected, the result will be invalid
					if (!ret.valid) {
						return ret;
					}
					if ($handle != null) {
						if ($handle instanceof ExternalDefIndicator) {
							// it is replaced by the external def in runtime
							return await func.$indicators[index][0](options) ?? result;
						} else {
							return await $handle(options) ?? result;
						}
					} else {
						return result;
					}
				}, Promise.resolve({valid: true} as ValidationResult));
			};
			func.$indicators = delegators;
			return func;
		};

		attributes[MonitorNodeAttributes.VALID] = {
			$watch: watches.length === 0 ? (void 0) : watches,
			$handle: createHandle(this.buildHandleDelegators(monitors))
		};
		return attributes;
	}
}
