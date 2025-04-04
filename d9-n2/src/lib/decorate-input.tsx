import {MBUtils, MUtils, PPUtils, PropValue, registerWidget, VUtils, WidgetProps} from '@rainbow-d9/n1';
import React, {CSSProperties, ForwardedRef, forwardRef, ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DecorateWrapperDef, transformDecorators} from './decorate-assist';
import {buildTip, TipAttachableWidget, useTip} from './global';
import {Input, InputDef, NumberInput, NumberInputDef, PasswordInput, PasswordInputDef} from './input';
import {toIntlLabel} from './intl-label';
import {SDP} from './styled-components-styles';
import {OmitNodeDef} from './types';
import {useDualRefs} from './utils';

export type DecorateInputDef = InputDef & { diTip?: TipAttachableWidget['tip'] } & DecorateWrapperDef;
export type DecorateInputProps = OmitNodeDef<DecorateInputDef> & DecorateWrapperDef & WidgetProps;

// noinspection CssUnresolvedCustomProperty
const DecorateInputContainer = styled.div.attrs(
	({id}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-deco-input',
			[DOM_ID_WIDGET]: VUtils.isBlank(id) ? (void 0) : id
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any;
	})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: ${CssVars.INPUT_HEIGHT};

    &[data-placeholder=true] {
        > input[data-w=d9-input]:not(:nth-last-child(2)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    &[data-placeholder=false] {
        > input[data-w=d9-input]:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    &[data-visible=false] {
        display: none;
    }

    > input[data-w=d9-input] {
        flex-grow: 1;

        &:hover, &:focus {
            z-index: 1;
        }

        &:not([value=""]),
        &[data-composition-ing=true] {
            + span[data-w=d9-deco-input-placeholder] {
                color: transparent;
            }
        }

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: calc(${CssVars.BORDER_WIDTH} * -1);
        }
    }
`;
const Decorator = styled.span`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    fill: ${CssVars.FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-w=d9-deco-lead]:not(:first-child),
    &[data-w=d9-deco-tail] {
        margin-left: calc(${CssVars.BORDER_WIDTH} * -1);
    }

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
        width: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator = styled(Decorator).attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-deco-lead'})`
    &:first-child {
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
    }
`;
const TailDecorator = styled(Decorator).attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-deco-tail'})`
    &:last-child {
        border-top-right-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-right-radius: ${CssVars.BORDER_RADIUS};
    }
`;
// noinspection CssUnresolvedCustomProperty
const Placeholder = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-deco-input-placeholder'})`
    display: block;
    position: absolute;
    top: var(--top, 0);
    left: var(--left, 0);
    width: var(--width, 0);
    height: var(--height, 0);
    line-height: var(--height, 0);
    color: ${CssVars.PLACEHOLDER_COLOR};
    background-color: transparent;
    padding: 0 ${CssVars.INPUT_INDENT};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    user-select: none;
    z-index: 2;
`;

interface DecorateProps {
	id?: HTMLElement['id'];
	placeholder?: string;
	leads?: DecorateWrapperDef['leads'];
	tails?: DecorateWrapperDef['tails'];
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

const Decorate = forwardRef((props: DecorateProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
	const {id, placeholder, leads, tails, children, ...rest} = props;

	const ref = useRef<HTMLDivElement>(null);
	useDualRefs(ref, forwardedRef);
	useEffect(() => {
		if (ref.current == null) {
			return null;
		}
		const node = ref.current.querySelector('span[data-w=d9-deco-input-placeholder]') as HTMLSpanElement;
		if (node == null) {
			return;
		}

		const computePlaceholderSize = () => {
			if (ref.current == null) {
				// to avoid some async error, not sure the exact situation.
				// it might be something like this widget was unmounted but the resize observer still works,
				// which means ref is null.
				return;
			}
			const {left: containerLeft} = ref.current.getBoundingClientRect();
			const input = ref.current.querySelector('input');
			const {left, width, height} = input.getBoundingClientRect();
			const {
				borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth
			} = window.getComputedStyle(input);
			node.style.setProperty('--top', `${Number((borderTopWidth ?? '0').replace('px', ''))}px`);
			node.style.setProperty('--left', `${left - containerLeft + Number((borderLeftWidth ?? '0').replace('px', ''))}px`);
			node.style.setProperty('--width', `${width - Number((borderLeftWidth ?? '0').replace('px', '')) - Number((borderRightWidth ?? '0').replace('px', ''))}px`);
			node.style.setProperty('--height', `${height - Number((borderTopWidth ?? '0').replace('px', '')) - Number((borderBottomWidth ?? '0').replace('px', ''))}px`);
		};
		const resizeObserver = new ResizeObserver(() => {
			computePlaceholderSize();
		});
		resizeObserver.observe(ref.current);
		computePlaceholderSize();
		return () => {
			resizeObserver?.disconnect();
		};
	});

	const hasPlaceholder = VUtils.isNotBlank(placeholder);

	return <DecorateInputContainer id={VUtils.isBlank(id) ? (void 0) : `di-${id}`}
	                               data-placeholder={hasPlaceholder} {...rest} ref={ref}>
		{transformDecorators(leads).map((lead, index) => {
			return <LeadDecorator key={index}>
				{lead}
			</LeadDecorator>;
		})}
		{children}
		{hasPlaceholder ? <Placeholder>{toIntlLabel((placeholder ?? '').trim())}</Placeholder> : null}
		{transformDecorators(tails).map((tail, index) => {
			return <TailDecorator key={index}>
				{tail}
			</TailDecorator>;
		})}
	</DecorateInputContainer>;
});

export const askDecorateAttrs = (props: DecorateInputProps, rest: object) => {
	const deviceTags = MBUtils.pickDeviceTags(props);
	const decorateAttrs = Object.keys(rest).reduce((attrs, key) => {
		if (key.startsWith('data-di-')) {
			attrs[key] = rest[key];
			delete rest[key];
		} else if (['data-valid', 'data-visible', 'data-disabled'].includes(key)) {
			attrs[key] = rest[key];
		} else if (key === '$wrapped') {
			attrs['data-disabled'] = rest[key].$avs?.$disabled ?? false;
			attrs['data-visible'] = rest[key].$avs?.$visible ?? true;
		}
		return attrs;
	}, {});

	return {tags: deviceTags, attrs: decorateAttrs};
};

const useComposition = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const onCompositionStart = () => {
		inputRef.current?.setAttribute('data-composition-ing', 'true');
	};
	const onCompositionEnd = () => {
		inputRef.current?.setAttribute('data-composition-ing', 'false');
	};
	return {inputRef, onCompositionStart, onCompositionEnd};
};
export const DecorateInput = forwardRef((props: DecorateInputProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		placeholder,
		leads, tails,
		diTip,
		className, style, ...rest
	} = props;
	const {$wrapped: {$root, $model, $p2r}} = rest;
	const {tags: deviceTags, attrs: decorateAttrs} = askDecorateAttrs(props, rest);

	const decorateRef = useRef<HTMLDivElement>(null);
	useDualRefs(decorateRef, ref);
	useTip({ref: decorateRef, prefix: 'data-di', ...buildTip({tip: diTip, root: $root, model: $model})});
	const {inputRef, onCompositionStart, onCompositionEnd} = useComposition();

	const computePlaceholder = () => {
		if (VUtils.isBlank(placeholder)) {
			return (void 0);
		}
		if (VUtils.isNotBlank(rest.mask)) {
			// mask exists
			return (void 0);
		}
		return placeholder;
	};
	return <Decorate {...deviceTags} {...decorateAttrs}
	                 placeholder={computePlaceholder()} leads={leads} tails={tails}
	                 className={className} style={style}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                 ref={decorateRef}>
		<Input {...rest} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd} ref={inputRef}/>
	</Decorate>;
});

export type DecorateNumberInputDef = NumberInputDef & { diTip?: TipAttachableWidget['tip'] } & DecorateWrapperDef;
export type DecorateNumberInputProps = OmitNodeDef<DecorateNumberInputDef> & WidgetProps;

export const DecorateNumberInput = forwardRef((props: DecorateNumberInputProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		placeholder,
		leads, tails,
		diTip,
		className, style, ...rest
	} = props;
	const {$pp, $wrapped: {$p2r, $root, $model, $onValueChange}} = rest;
	const {tags: deviceTags, attrs: decorateAttrs} = askDecorateAttrs(props, rest);

	const decorateRef = useRef<HTMLDivElement>(null);
	useDualRefs(decorateRef, ref);
	useTip({ref: decorateRef, prefix: 'data-di', ...buildTip({tip: diTip, root: $root, model: $model})});
	const {inputRef, onCompositionStart, onCompositionEnd} = useComposition();

	const [omitPlaceholder, setOmitPlaceholder] = useState(() => {
		return VUtils.isNotEmpty(MUtils.getValue($model, $pp));
	});

	const computePlaceholder = () => {
		if (VUtils.isBlank(placeholder)) {
			return (void 0);
		}
		if (omitPlaceholder) {
			return (void 0);
		}
		return placeholder;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rest.$wrapped.$onValueChange = async <NV extends PropValue>(newValue: NV, doForceUpdate: boolean, ...args: Array<any>): Promise<void> => {
		setOmitPlaceholder(VUtils.isNotEmpty(newValue));
		$onValueChange(newValue, doForceUpdate, ...args);
	};

	return <Decorate {...deviceTags} {...decorateAttrs}
	                 placeholder={computePlaceholder()} leads={leads} tails={tails}
	                 className={className} style={style}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                 ref={decorateRef}>
		<NumberInput {...rest} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd}
		             ref={inputRef}/>
	</Decorate>;
});

export type DecoratePasswordInputDef = PasswordInputDef & { diTip?: TipAttachableWidget['tip'] } & DecorateWrapperDef;
export type DecoratePasswordInputProps = OmitNodeDef<DecoratePasswordInputDef> & WidgetProps;

export const DecoratePasswordInput = forwardRef((props: DecoratePasswordInputProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		placeholder,
		leads, tails,
		diTip,
		className, style, ...rest
	} = props;
	const {$wrapped: {$p2r, $root, $model}} = rest;
	const {tags: deviceTags, attrs: decorateAttrs} = askDecorateAttrs(props, rest);

	const decorateRef = useRef<HTMLDivElement>(null);
	useDualRefs(decorateRef, ref);
	useTip({ref: decorateRef, prefix: 'data-di', ...buildTip({tip: diTip, root: $root, model: $model})});
	const {inputRef, onCompositionStart, onCompositionEnd} = useComposition();

	return <Decorate {...deviceTags} {...decorateAttrs}
	                 placeholder={placeholder} leads={leads} tails={tails}
	                 className={className} style={style}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                 ref={decorateRef}>
		<PasswordInput {...rest} onCompositionStart={onCompositionStart} onCompositionEnd={onCompositionEnd}
		               ref={inputRef}/>
	</Decorate>;
});

registerWidget({key: 'DecoInput', JSX: DecorateInput, container: false, array: false});
registerWidget({key: 'DecoNumber', JSX: DecorateNumberInput, container: false, array: false});
registerWidget({key: 'DecoPwd', JSX: DecoratePasswordInput, container: false, array: false});
