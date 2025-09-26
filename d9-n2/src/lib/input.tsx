import {
	MUtils,
	PPUtils,
	PropertyPath,
	PropValue,
	registerWidget,
	useForceUpdate,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import {
	FactoryOpts,
	MaskedDate,
	MaskedDynamic,
	MaskedFunction,
	MaskedNumber,
	MaskedPattern,
	MaskedRange,
	MaskedRegExp
} from 'imask';
import React, {ChangeEvent, CompositionEvent, FocusEvent, ForwardedRef, forwardRef, useEffect, useRef} from 'react';
import {useIMask} from 'react-imask';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {internationalize, useLanguage} from './intl-label';
import {OmitHTMLProps2, OmitNodeDef} from './types';
import {detectNumberFormat, locale, useDualRefs} from './utils';

export const InputMaskTypes = {
	number: MaskedNumber,
	date: MaskedDate,
	func: MaskedFunction,
	pattern: MaskedPattern,
	range: MaskedRange,
	regexp: MaskedRegExp,
	enum: MaskedRange,
	dynamic: MaskedDynamic
};

/** Input configuration definition */
export type InputDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps2<HTMLInputElement, 'value' | 'onChange'>
	& {
	autoSelect?: boolean;
	valueToNumber?: boolean;
	mask?: string | ((types: typeof InputMaskTypes) => FactoryOpts);
};
/** widget definition, with html attributes */
export type InputProps = OmitNodeDef<InputDef> & WidgetProps;

// noinspection CssUnresolvedCustomProperty
const AnInput = styled.input.attrs<{ autoSelect: boolean }>(
	({id, autoSelect, onFocus}) => {
		if (!autoSelect) {
			return {
				[DOM_KEY_WIDGET]: 'd9-input',
				[DOM_ID_WIDGET]: id
			};
		}

		return {
			[DOM_KEY_WIDGET]: 'd9-input',
			[DOM_ID_WIDGET]: id,
			onFocus: (event: FocusEvent<HTMLInputElement>) => {
				event.target.select();
				if (onFocus != null) {
					onFocus(event);
				}
			}
		};
	})<{ autoSelect: boolean }>`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: 0;
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        text-overflow: unset;
        background-color: ${CssVars.DISABLE_COLOR};

        &:hover, &:focus {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
        }
    }

    &::placeholder {
        color: ${CssVars.PLACEHOLDER_COLOR};
    }

    &:hover {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringifyInputValue = (options: { $model: PropValue; $pp: PropertyPath; value?: any }): string => {
	const {$model, $pp, value} = options;

	if (value == null) {
		return '';
	}
	switch (typeof value) {
		case 'object':
			console.error(`Value is an object, check your declaration and model please.`, $model, $pp);
			return '';
		case 'function':
			console.error(`Value is a function, check your declaration and model please.`, $model, $pp);
			return '';
		case 'symbol':
			console.error(`Value is a symbol, check your declaration and model please.`, $model, $pp);
			return '';
		default:
			// number, boolean, bigint, string
			return value.toString != null ? value.toString() : `${value}`;
	}
};

const usePlaceholder = (placeholder?: string) => {
	useLanguage();

	if (VUtils.isBlank(placeholder)) {
		return (void 0);
	} else {
		return internationalize(placeholder, [placeholder]);
	}
};

export const InternalInput = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		autoSelect = true, valueToNumber = false, mask,
		onCompositionStart: compositionStart, onCompositionEnd: compositionEnd,
		tip,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const valueRef = useRef({value: MUtils.getValue($model, $pp)});
	const needRefreshMaskRef = useRef(false);
	const compositionRef = useRef<{ ing: boolean; text?: string }>({ing: false});
	const globalHandlers = useGlobalHandlers();

	const onValueChanged = async (value?: string) => {
		if (`${valueRef.current.value ?? ''}` !== `${value ?? ''}`) {
			// fresh to ref
			valueRef.current.value = value;
			if (valueToNumber && !value.includes(' ')) {
				// if value contains whitespace, treated as normal string
				const tested = VUtils.isNumber(value);
				if (tested.test) {
					// use the numeric value
					await $onValueChange(tested.value, true, {global: globalHandlers});
				} else {
					// still use original value from text
					await $onValueChange(value, true, {global: globalHandlers});
				}
			} else {
				await $onValueChange(value, true, {global: globalHandlers});
			}
		}
	};
	const hasMask = VUtils.isNotBlank(mask);
	const maskOptions = hasMask ? (typeof mask === 'function' ? mask(InputMaskTypes) : {
		mask, lazy: false
	}) : (void 0);
	const {ref: inputRef, setUnmaskedValue} = useIMask<HTMLInputElement>(maskOptions, {
		defaultUnmaskedValue: `${valueRef.current.value ?? ''}`,
		onAccept: (_, mask) => {
			// noinspection JSIgnoredPromiseFromCall
			onValueChanged(mask.unmaskedValue);
		}
	});
	// every time
	useEffect(() => {
		if (!hasMask || needRefreshMaskRef.current === false) {
			return;
		}

		needRefreshMaskRef.current = false;
		setUnmaskedValue(`${valueRef.current.value ?? ''}`);
	});
	useDualRefs(inputRef, ref);
	useTip({ref: inputRef, ...buildTip({tip, root: $root, model: $model})});
	const forceUpdate = useForceUpdate();

	const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
		// handle change use mask event
		if (hasMask) {
			return;
		}
		if (compositionRef.current.ing) {
			// composition ing, sync to composition ref, and force update
			compositionRef.current = {ing: true, text: event.target.value};
			forceUpdate();
		} else {
			await onValueChanged(event.target.value);
		}
	};

	const valueFromModel = MUtils.getValue($model, $pp);
	if (valueRef.current.value == valueFromModel || `${valueFromModel}.` == valueRef.current.value) {
		// do nothing
	} else {
		valueRef.current.value = valueFromModel;
		// never trigger refresh mask is there is no mask defined
		if (hasMask) {
			needRefreshMaskRef.current = true;
		}
	}
	const displayValue = hasMask
		// value is no need for mask
		? (void 0)
		: (compositionRef.current.ing
			// use value from composition ref
			? compositionRef.current.text
			// use value from value ref
			: stringifyInputValue({$model, $pp, value: valueRef.current.value}));
	const onCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
		compositionRef.current = {ing: true, text: displayValue};
		if (compositionStart != null) {
			compositionStart(event);
		}
	};
	const onCompositionEnd = async (event: CompositionEvent<HTMLInputElement>) => {
		compositionRef.current = {ing: false};
		await onValueChanged(inputRef.current.value);
		if (compositionEnd != null) {
			compositionEnd(event);
		}
	};

	return <AnInput {...rest} autoSelect={autoSelect}
	                disabled={$disabled} data-disabled={$disabled} data-visible={$visible}
	                value={displayValue}
	                onChange={onChange}
	                onCompositionStart={onCompositionStart}
	                onCompositionEnd={onCompositionEnd}
	                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                ref={inputRef}/>;
});

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {placeholder, ...rest} = props;
	const i18nPlaceholder = usePlaceholder(placeholder);
	return <InternalInput {...rest} placeholder={i18nPlaceholder} ref={ref}/>;
});

export type NumberInputFormat = Omit<typeof MaskedNumber.DEFAULTS, 'mask'>;

export type NumberInputDef = Omit<InputDef, 'valueToNumber' | 'mask'> & {
	format?: NumberInputFormat | (() => NumberInputFormat);
	grouping?: boolean;
};

export type NumberInputProps = OmitNodeDef<NumberInputDef> & WidgetProps;

export const NumberInput = forwardRef((props: NumberInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {placeholder, format, grouping = false, ...rest} = props;

	const i18nPlaceholder = usePlaceholder(placeholder);

	let mask = (void 0);
	if (VUtils.isNotBlank(format)) {
		mask = () => {
			if (typeof format === 'function') {
				return {...MaskedNumber.DEFAULTS, ...format()};
			} else {
				return {...MaskedNumber.DEFAULTS, ...format};
			}
		};
	} else if (grouping) {
		const [groupingSeparator, decimalSeparator] = detectNumberFormat(locale());
		mask = () => ({...MaskedNumber.DEFAULTS, thousandsSeparator: groupingSeparator, radix: decimalSeparator});
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <InternalInput {...rest} placeholder={i18nPlaceholder} mask={mask} data-number={true} valueToNumber={true}
	                      ref={ref}/>;
});

export type PasswordInputDef = Omit<InputDef, 'valueToNumber' | 'mask'>;
export type PasswordInputProps = OmitNodeDef<PasswordInputDef> & WidgetProps;

export const PasswordInput = forwardRef((props: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {placeholder, ...rest} = props;
	const i18nPlaceholder = usePlaceholder(placeholder);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <InternalInput {...rest} placeholder={i18nPlaceholder} type="password" valueToNumber={false} ref={ref}/>;
});

registerWidget({key: 'Number', JSX: NumberInput, container: false, array: false});
registerWidget({key: 'Input', JSX: Input, container: false, array: false});
registerWidget({key: 'Pwd', JSX: PasswordInput, container: false, array: false});
