import {
	MUtils,
	PPUtils,
	PropertyPath,
	PropValue,
	registerWidget,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {useGlobalHandlers} from './global';
import {OmitHTMLProps2, OmitNodeDef} from './types';

/** Input configuration definition */
export type InputDef = ValueChangeableNodeDef & OmitHTMLProps2<HTMLInputElement, 'value' | 'onChange'> & {
	autoSelect?: boolean;
	valueToNumber?: boolean;
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
				onFocus && onFocus(event);
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

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		autoSelect = true, valueToNumber = false,
		$pp, $wrapped: {$onValueChange, $model, $p2r, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const valueRef = useRef({value: MUtils.getValue($model, $pp)});
	const globalHandlers = useGlobalHandlers();

	const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
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
	};

	const valueFromModel = MUtils.getValue($model, $pp);
	if (valueRef.current.value == valueFromModel || `${valueFromModel}.` == valueRef.current.value) {
		// do nothing
	} else {
		valueRef.current.value = valueFromModel;
	}

	return <AnInput {...rest} autoSelect={autoSelect}
	                disabled={$disabled} data-disabled={$disabled} data-visible={$visible}
	                value={stringifyInputValue({$model, $pp, value: valueRef.current.value})}
	                onChange={onChange}
	                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                ref={ref}/>;
});

export type NumberInputDef = Omit<InputDef, 'valueToNumber'>;
export type NumberInputProps = OmitNodeDef<NumberInputDef> & WidgetProps;

export const NumberInput = forwardRef((props: NumberInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Input {...props} data-number={true} valueToNumber={true} ref={ref}/>;
});

registerWidget({key: 'Number', JSX: NumberInput, container: false, array: false});
registerWidget({key: 'Input', JSX: Input, container: false, array: false});
