import {
	MUtils,
	NullPropValue,
	PrimitivePropValue,
	registerWidget,
	ValueChangeableNodeDef,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {KeyboardEvent, MouseEvent} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {Check} from './icons';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type CheckboxPossibleValues = [NullPropValue | PrimitivePropValue, NullPropValue | PrimitivePropValue];

/** checkbox configuration definition */
export type CheckboxDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	values?: CheckboxPossibleValues;
};
/** checkbox widget definition, with html attributes */
export type CheckboxProps = OmitNodeDef<CheckboxDef> & WidgetProps;

const ACheckbox = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-checkbox',
		[DOM_ID_WIDGET]: id
	};
})`
    display: block;
    position: relative;
    padding: calc((${CssVars.INPUT_HEIGHT}) / 6) 0;
    width: ${CssVars.INPUT_HEIGHT};
    height: ${CssVars.INPUT_HEIGHT};
    fill: ${CssVars.FONT_COLOR};
    cursor: pointer;

    &[data-checked=true] {
        > svg {
            opacity: 1;
        }
    }

    &[data-checked=false] {
        > svg {
            opacity: 0;
        }
    }

    &[data-visible=false] {
        display: none;
    }

    &[disabled], &[data-disabled=true] {
        cursor: default;

        &:before {
            background-color: ${CssVars.DISABLE_COLOR};
        }

        &:hover, &:focus-within {
            fill: ${CssVars.FONT_COLOR};

            &:before {
                border-color: ${CssVars.BORDER_COLOR};
                box-shadow: none;
            }
        }
    }

    &:hover:before {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus-within:before {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &:hover,
    &:focus-within {
        fill: ${CssVars.PRIMARY_COLOR};

        &:before {
            border-color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        border: ${CssVars.BORDER};
        border-radius: ${CssVars.BORDER_RADIUS};
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        z-index: 0;
    }

    > svg {
        position: relative;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 6);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 6);
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;

export const Checkbox = (props: CheckboxProps) => {
	const {
		values = [true, false],
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const onValueChange = async () => {
		const oldValue = MUtils.getValue($model, $pp);
		const newValue = oldValue == values[0] ? values[1] : values[0];
		await $onValueChange(newValue);
	};
	const onClick = async (event: MouseEvent<HTMLDivElement>) => {
		if ($disabled) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		await onValueChange();
	};
	const onKeyUp = async (event: KeyboardEvent<HTMLDivElement>) => {
		const {key} = event;
		if (key === ' ') {
			await onValueChange();
		}
	};

	const value = MUtils.getValue($model, $pp);
	const checked = (value ?? '') == (values[0] ?? '');

	return <ACheckbox data-disabled={$disabled} data-visible={$visible} tabIndex={0}
	                  data-checked={checked}
	                  onClick={onClick} onKeyUp={onKeyUp} {...rest}>
		{<Check/>}
	</ACheckbox>;
};

registerWidget({key: 'Checkbox', JSX: Checkbox, container: false, array: false});