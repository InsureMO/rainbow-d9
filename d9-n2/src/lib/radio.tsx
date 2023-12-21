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
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {OmitHTMLProps, OmitNodeDef} from './types';

export type RadioPossibleValues = [NullPropValue | PrimitivePropValue, NullPropValue | PrimitivePropValue];

/** radio configuration definition */
export type RadioDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	values?: RadioPossibleValues;
};
/** radio widget definition, with html attributes */
export type RadioProps = OmitNodeDef<RadioDef> & WidgetProps;

const ARadio = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-radio',
		[DOM_ID_WIDGET]: id
	};
})`
    display: block;
    position: relative;
    padding: calc((${CssVars.INPUT_HEIGHT}) / 6) 0;
    width: ${CssVars.INPUT_HEIGHT};
    height: ${CssVars.INPUT_HEIGHT};
    cursor: pointer;

    &[data-checked=false]:after {
        width: 0;
        height: 0;
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 3);
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
            &:before {
                border-color: ${CssVars.BORDER_COLOR};
                box-shadow: none;
            }

            &:after {
                background-color: ${CssVars.FONT_COLOR};
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
        &:before {
            border-color: ${CssVars.PRIMARY_COLOR};
        }

        &:after {
            background-color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        border: ${CssVars.BORDER};
        border-radius: 100%;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        z-index: 0;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 6);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 6);
        border-radius: 100%;
        background-color: ${CssVars.FONT_COLOR};
        transform-origin: center;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;

export const Radio = (props: RadioProps) => {
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
		if (oldValue == values[0]) {
			// already checked, radio cannot back to uncheck
		} else {
			const newValue = oldValue == values[0] ? values[1] : values[0];
			await $onValueChange(newValue);
		}
	};

	const value = MUtils.getValue($model, $pp);
	const checked = (value ?? '') == (values[0] ?? '');

	return <ARadio data-disabled={$disabled} data-visible={$visible} tabIndex={0}
	               data-checked={checked}
	               onClick={onClick} {...rest}/>;
};

registerWidget({key: 'Radio', JSX: Radio, container: false, array: false});
