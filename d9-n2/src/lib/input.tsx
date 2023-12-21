import {MUtils, PPUtils, registerWidget, ValueChangeableNodeDef, VUtils, WidgetProps} from '@rainbow-d9/n1';
import React, {ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {OmitHTMLProps2, OmitNodeDef} from './types';

/** Input configuration definition */
export type InputDef = ValueChangeableNodeDef & OmitHTMLProps2<HTMLInputElement, 'value' | 'onChange'> & {
	autoSelect?: boolean;
	valueToNumber?: boolean;
};
/** widget definition, with html attributes */
export type InputProps = OmitNodeDef<InputDef> & WidgetProps;

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
	display          : block;
	position         : relative;
	font-family      : ${CssVars.FONT_FAMILY};
	font-size        : ${CssVars.FONT_SIZE};
	color            : ${CssVars.FONT_COLOR};
	height           : ${CssVars.INPUT_HEIGHT};
	padding          : 0 ${CssVars.INPUT_INDENT};
	background-color : transparent;
	border           : ${CssVars.BORDER};
	border-radius    : ${CssVars.BORDER_RADIUS};
	outline          : none;
	white-space      : nowrap;
	overflow         : hidden;
	text-overflow    : ellipsis;
	transition       : all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	&[data-visible=false] {
		display : none;
	}
	&[data-disabled=true] {
		text-overflow    : unset;
		background-color : ${CssVars.DISABLE_COLOR};
		&:hover, &:focus {
			border-color : ${CssVars.BORDER_COLOR};
			box-shadow   : none;
		}
	}
	&:hover {
		border-color : ${CssVars.PRIMARY_COLOR};
		box-shadow   : ${CssVars.PRIMARY_HOVER_SHADOW};
	}
	&:focus {
		border-color : ${CssVars.PRIMARY_COLOR};
		box-shadow   : ${CssVars.PRIMARY_SHADOW};
	}
`;

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {
		autoSelect = true, valueToNumber = false,
		$pp, $wrapped: {$onValueChange, $model, $p2r, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const valueRef = useRef({value: MUtils.getValue($model, $pp)});

	const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		// fresh to ref
		valueRef.current.value = value;
		if (valueToNumber && !value.includes(' ')) {
			// if value contains whitespace, treated as normal string
			const tested = VUtils.isNumber(value);
			if (tested.test) {
				// use the numeric value
				await $onValueChange(tested.value);
			} else {
				// still use original value from text
				await $onValueChange(value);
			}
		} else {
			await $onValueChange(value);
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		            value={(valueRef.current.value as any) ?? ''} onChange={onChange}
		            id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
		            ref={ref} />;
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
