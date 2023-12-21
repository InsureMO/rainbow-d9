import {MUtils, PPUtils, registerWidget, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import React, {ChangeEvent, FocusEvent, ForwardedRef, forwardRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {OmitHTMLProps2, OmitNodeDef} from './types';

/** Textarea configuration definition */
export type TextareaDef = ValueChangeableNodeDef & OmitHTMLProps2<HTMLTextAreaElement, 'value' | 'onChange'> & {
	autoSelect?: boolean;
};
/** widget definition, with html attributes */
export type TextareaProps = OmitNodeDef<TextareaDef> & WidgetProps;

const ATextarea = styled.textarea.attrs<{ autoSelect: boolean }>(
	({id, autoSelect, onFocus}) => {
		if (!autoSelect) {
			return {
				[DOM_KEY_WIDGET]: 'd9-textarea',
				[DOM_ID_WIDGET]: id
			};
		}

		return {
			[DOM_KEY_WIDGET]: 'd9-textarea',
			[DOM_ID_WIDGET]: id,
			onFocus: (event: FocusEvent<HTMLTextAreaElement>) => {
				event.target.select();
				onFocus && onFocus(event);
			}
		};
	})<{ autoSelect: boolean }>`
    display: block;
    position: relative;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    height: calc(${CssVars.INPUT_HEIGHT} * 5);
    padding: calc((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    overflow: auto;
    line-height: ${CssVars.LINE_HEIGHT};
    resize: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
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

export const Textarea = forwardRef((props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
	const {
		autoSelect = true, $pp, $wrapped: {$onValueChange, $model, $p2r, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const onChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		await $onValueChange(value);
	};

	return <ATextarea {...rest} autoSelect={autoSelect}
	                  disabled={$disabled} data-disabled={$disabled} data-visible={$visible}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		              value={(MUtils.getValue($model, $pp) as any) ?? ''} onChange={onChange}
		              id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
		              ref={ref}/>;
});

registerWidget({key: 'Textarea', JSX: Textarea, container: false, array: false});