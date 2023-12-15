import {
	MUtils,
	NullPropValue,
	PrimitivePropValue,
	registerWidget,
	ValueChangeableNodeDef,
	WidgetProps
} from '@rainbow-d9/n1';
import React from 'react';
import styled from 'styled-components';
import {CssVars} from './constants';
import {Check} from './icons';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type CheckboxPossibleValues = [NullPropValue | PrimitivePropValue, NullPropValue | PrimitivePropValue];

/** Input configuration definition */
export type CheckboxDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	values?: CheckboxPossibleValues;
};
/** Input widget definition, with html attributes */
export type CheckBoxProps = OmitNodeDef<CheckboxDef> & WidgetProps;

const ACheckbox = styled.div.attrs({'data-w': 'd9-checkbox'})`
    display: block;
    position: relative;
    padding: calc((${CssVars.INPUT_HEIGHT}) / 6) 0;
    width: ${CssVars.INPUT_HEIGHT};
    height: ${CssVars.INPUT_HEIGHT};
    color: ${CssVars.FONT_COLOR};
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

        &:hover:before, &:focus-within:before {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
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
        color: ${CssVars.PRIMARY_COLOR};

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
        width: calc((${CssVars.INPUT_HEIGHT}) / 6 * 5);
        height: calc((${CssVars.INPUT_HEIGHT}) / 6 * 5);
        top: calc((${CssVars.INPUT_HEIGHT}) / -12);
        left: calc((${CssVars.INPUT_HEIGHT}) / -12);
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;

export const Checkbox = (props: CheckBoxProps) => {
	const {
		values = [true, false],
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const onClick = async () => {
		if ($disabled) {
			return;
		}

		const oldValue = MUtils.getValue($model, $pp);
		const newValue = oldValue == values[0] ? values[1] : values[0];
		await $onValueChange(newValue);
	};

	const value = MUtils.getValue($model, $pp);
	const checked = (value ?? '') == (values[0] ?? '');

	return <ACheckbox data-disabled={$disabled} data-visible={$visible} tabIndex={0}
	                  data-checked={checked}
	                  onClick={onClick} {...rest}>
		{<Check/>}
	</ACheckbox>;
};

registerWidget({key: 'Checkbox', JSX: Checkbox, container: false, array: false});