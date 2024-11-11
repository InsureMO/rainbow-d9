import {
	MUtils,
	PPUtils,
	registerWidget,
	useForceUpdate,
	ValueChangeableNodeDef,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ChangeEvent, FocusEvent, ForwardedRef, forwardRef, useRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {internationalize, useLanguage} from './intl-label';
import {OmitHTMLProps2, OmitNodeDef} from './types';
import {useDualRefs} from './utils';

/** Textarea configuration definition */
export type TextareaDef =
	ValueChangeableNodeDef
	& TipAttachableWidget
	& OmitHTMLProps2<HTMLTextAreaElement, 'value' | 'onChange'>
	& {
	autoSelect?: boolean;
};
/** widget definition, with html attributes */
export type TextareaProps = OmitNodeDef<TextareaDef> & WidgetProps;

// noinspection CssUnresolvedCustomProperty
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

export const Textarea = forwardRef((props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
	const {
		autoSelect = true, tip, placeholder,
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		...rest
	} = props;

	const globalHandlers = useGlobalHandlers();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const compositionRef = useRef<{ ing: boolean; text?: string }>({ing: false});
	useDualRefs(textRef, ref);
	useTip({ref: textRef, ...buildTip({tip, root: $root, model: $model})});
	useLanguage();
	const forceUpdate = useForceUpdate();

	let i18nPlaceholder: string | undefined;
	if (VUtils.isBlank(placeholder)) {
		i18nPlaceholder = (void 0);
	} else {
		i18nPlaceholder = internationalize(placeholder, [placeholder]);
	}

	const onChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (compositionRef.current.ing) {
			// composition ing, sync to composition ref, and force update
			compositionRef.current = {ing: true, text: event.target.value};
			forceUpdate();
		} else {
			await $onValueChange(event.target.value, true, {global: globalHandlers});
		}
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const displayValue = compositionRef.current.ing ? compositionRef.current.text : ((MUtils.getValue($model, $pp) as any) ?? '');
	const onCompositionStart = () => {
		compositionRef.current = {ing: true, text: displayValue};
	};
	const onCompositionEnd = async () => {
		compositionRef.current = {ing: false};
		await $onValueChange(textRef.current.value, true, {global: globalHandlers});
	};

	return <ATextarea {...rest} placeholder={i18nPlaceholder} autoSelect={autoSelect}
	                  disabled={$disabled} data-disabled={$disabled} data-visible={$visible}
	                  value={displayValue}
	                  onChange={onChange}
	                  onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd}
	                  id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                  ref={textRef}/>;
});

registerWidget({key: 'Textarea', JSX: Textarea, container: false, array: false});