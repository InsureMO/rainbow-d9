import {
	BaseModel,
	MonitorNodeAttributes,
	NodeAttributeValue,
	NodeAttributeValueHandleOptions,
	PropValue,
	ValidationResult,
	VUtils
} from '@d9/n1';
import {WidgetType} from '../../../semantic';
import {Undefinable} from '../../../utility-types';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild} from './monitor-build';
import {MonitorHandler, MonitorHandlerDetective, MonitorHandlerDetectOptions} from './types';

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

const detectRequired: MonitorHandlerDetective = detectSimpleCheck({
	attrName: 'required', defaultInvalidMessage: 'Field is required.',
	validate: (value) => VUtils.isNotBlank(value)
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

export class ValidatorUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_SIMPLE_CHECK = detectSimpleCheck;
	public static readonly DETECT_REQUIRED = detectRequired;
	public static readonly DETECT_NUMERIC = detectNumeric;
	public static readonly DETECT_POSITIVE = detectPositive;
	public static readonly DETECT_NOT_POSITIVE = detectNotNegative;
	public static readonly DETECT_INTEGER = detectInteger;
	public static readonly DETECT_LENGTH = detectLength;

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
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
	public combine(options: MonitorHandlerDetectOptions): AttributeMap {
		const {
			attributes: attrs, handlers
		} = this.buildHandlersDetective(ValidatorUtils.getAllDetectives)(options);
		if (handlers == null || handlers.length === 0) {
			return attrs;
		}

		const monitors = this.findMonitors(handlers);
		if (monitors.length === 0) {
			return attrs;
		}

		// combine all handlers to one
		attrs[MonitorNodeAttributes.VALID] = {
			$watch: this.findWatches(monitors),
			$handle: <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): ValidationResult => {
				// call each handle, no matter what it watches
				return monitors.reduce((result, {$handle}) => {
					if (!result.valid) {
						return result;
					}
					result = $handle(options) ?? result;
					return result;
				}, {valid: true} as ValidationResult);
			}
		};
		return attrs;
	}
}
