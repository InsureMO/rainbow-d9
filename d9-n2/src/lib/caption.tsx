import {
	BaseModel,
	Enhance$WrappedPropsForArrayElement,
	MUtils,
	NodeDef,
	Nullable,
	PPUtils,
	PropValue,
	registerWidget,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, isValidElement, MouseEvent, ReactNode, useRef} from 'react';
import styled from 'styled-components';
import {ButtonFill, ButtonInk} from './button';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DecorateWrapperDef, transformDecorators} from './decorate-assist';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {LabelLike} from './label-like';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps2, OmitNodeDef, ValidationHandlers} from './types';
import {df, locale, nf, nf0, nf1, nf2, nf3, nfWithLocale, nfXWithLocale, useDualRefs, wrapNf} from './utils';

export interface CaptionValueToLabelFormats {
	nf: (fractionDigits: number, grouping?: boolean) => Intl.NumberFormat;
	nf0: (value?: number) => string;
	nf1: (value?: number) => string;
	nf2: (value?: number) => string;
	nf3: (value?: number) => string;
}

export type CaptionValueToLabel<R extends BaseModel = BaseModel, M extends PropValue = PropValue> = (
	value: Nullable<PropValue>, formats: CaptionValueToLabelFormats,
	options: ModelCarriedHandler<R, M> & GlobalEventHandlers) => ReactNode;

export interface CaptionClickOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, ValidationHandlers, GlobalEventHandlers {
}

export type CaptionClick = <R extends BaseModel, M extends PropValue>(
	options: CaptionClickOptions<R, M>, event: MouseEvent<HTMLSpanElement>) => void | Promise<void>;

/** Caption configuration definition */
export type CaptionDef =
	NodeDef
	& TipAttachableWidget
	& DecorateWrapperDef
	& OmitHTMLProps2<HTMLSpanElement, 'onClick'>
	& {
	labelOnValue?: boolean;
	/** use label when it is given */
	label?: ReactNode;
	/** exactly same as label, but with higher priority */
	text?: ReactNode;
	/** use model value when it is true */
	valueToLabel?: CaptionValueToLabel;
	click?: CaptionClick
}
/** Caption widget definition, with html attributes */
export type CaptionProps = OmitNodeDef<CaptionDef> & WidgetProps;

// noinspection CssUnresolvedCustomProperty
const ACaption = styled.span.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW ?? 'd9-caption',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.CAPTION_FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-visible=false] {
        display: none;
    }

    &[data-clickable=true] {
        cursor: pointer;
        text-decoration: underline;
    }

    &[data-w=d9-badge] {
        justify-content: center;
        height: calc(${CssVars.INPUT_HEIGHT} / 4 * 3);
        border-radius: calc(${CssVars.INPUT_HEIGHT} / 8 * 3);
        padding: 0 ${CssVars.INPUT_INDENT};

        &[data-fill=fill] {
            background-color: ${CssVars.PRIMARY_COLOR};
            color: ${CssVars.INVERT_COLOR};
            fill: ${CssVars.INVERT_COLOR};

            &[data-ink=primary] {
                background-color: ${CssVars.PRIMARY_COLOR};
            }

            &[data-ink=danger] {
                background-color: ${CssVars.DANGER_COLOR};
            }

            &[data-ink=success] {
                background-color: ${CssVars.SUCCESS_COLOR};
            }

            &[data-ink=warn] {
                background-color: ${CssVars.WARN_COLOR};
            }

            &[data-ink=info] {
                background-color: ${CssVars.INFO_COLOR};
            }

            &[data-ink=waive] {
                background-color: ${CssVars.WAIVE_COLOR};
            }
        }

        &[data-fill=plain] {
            color: ${CssVars.PRIMARY_COLOR};
            fill: ${CssVars.PRIMARY_COLOR};
            border: ${CssVars.BORDER};
            border-color: ${CssVars.PRIMARY_COLOR};

            &[data-ink=primary] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
                border-color: ${CssVars.PRIMARY_COLOR};
            }

            &[data-ink=danger] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
                border-color: ${CssVars.DANGER_COLOR};
            }

            &[data-ink=success] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
                border-color: ${CssVars.SUCCESS_COLOR};
            }

            &[data-ink=warn] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
                border-color: ${CssVars.WARN_COLOR};
            }

            &[data-ink=info] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
                border-color: ${CssVars.INFO_COLOR};
            }

            &[data-ink=waive] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
                border-color: ${CssVars.WAIVE_COLOR};
            }
        }
    }
`;

const formatter = new Proxy({nf, nf0, nf1, nf2, nf3}, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(target: any, p: string): any {
		const func = target[p];
		if (p === 'df') {
			// date format's locale can be changed outside
			return df;
		}
		const language = locale();
		if (language === 'en' || language === 'en-US') {
			if (func != null) {
				return func;
			} else if (/^nf\d{1,2}$/.test(p)) {
				const f = wrapNf(nf(Number(p.slice(2))).format);
				// cache the function
				target[p] = f;
				return f;
			}
		} else if (p === 'nf') {
			return nfWithLocale(language);
		} else if (/^nf\d{1,2}$/.test(p)) {
			return nfXWithLocale(language, Number(p.slice(2)));
		} else {
			return null;
		}
	}
});

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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span[data-w=d9-deco-lead],
    > span[data-w=d9-deco-tail] {
        color: ${CssVars.FONT_COLOR};
        fill: ${CssVars.FONT_COLOR};
    }

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
        width: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator = styled(Decorator).attrs({
	[DOM_KEY_WIDGET]: 'd9-deco-lead'
})`
`;
const TailDecorator = styled(Decorator).attrs({
	[DOM_KEY_WIDGET]: 'd9-deco-tail'
})`
`;

export const Caption = forwardRef((props: CaptionProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {
		label: _label, text: _text,
		leads, tails,
		labelOnValue, valueToLabel, click,
		tip,
		$pp, $wrapped,
		...rest
	} = props;
	const {$root, $model, $p2r, $avs: {$disabled, $visible}, $vfs} = $wrapped;
	const label = _text ?? _label;

	const globalHandlers = useGlobalHandlers();
	const captionRef = useRef<HTMLSpanElement>(null);
	useDualRefs(captionRef, ref);
	useTip({ref: captionRef, ...buildTip({tip, root: $root, model: $model})});

	const onClicked = click != null
		? async (event: MouseEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();

			if ($disabled) {
				return;
			}

			const $mightInArray$wrapped = $wrapped as unknown as Enhance$WrappedPropsForArrayElement<CaptionProps>['$wrapped'];
			click && await click({
				root: $root, model: $model,
				// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
				// @ts-ignore
				$arrayHolder: $mightInArray$wrapped.$arrayHolder, $array: $mightInArray$wrapped.$array,
				validators: $vfs, global: globalHandlers
			}, event);
		}
		: (void 0);

	const children = (() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let value: any;
		if (labelOnValue && valueToLabel == null) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			value = (MUtils.getValue($model, $pp) as any) ?? '';
		} else if (labelOnValue && valueToLabel != null) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			value = valueToLabel(MUtils.getValue($model, $pp), formatter, {
				global: globalHandlers, root: $root, model: $model
			}) ?? '';
		} else if (label != null) {
			// wrap nested is not necessary, since caption do everything very well by itself.
			// but still use label like here to make it more consistent.
			value = <LabelLike $wrapped={$wrapped} $validationScopes={props} label={label}/>;
		} else {
			// empty caption
			value = '';
		}
		try {
			// noinspection JSUnresolvedReference
			if (Array.isArray(value)) {
				value = value.filter(item => item != null).map(item => {
					if (typeof item === 'object' && !isValidElement(item)) {
						return JSON.stringify(item);
					} else {
						return item;
					}
				});
			} else if (value == null) {
				return null;
			} else if (typeof value === 'object' && !isValidElement(value)) {
				value = JSON.stringify(value);
			}
		} catch {
			// do nothing
		}
		return value;
	})();

	return <ACaption {...rest} data-disabled={$disabled} data-visible={$visible}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                 onClick={onClicked} data-clickable={onClicked != null}
	                 ref={captionRef}>
		{transformDecorators(leads).map((lead, index) => {
			return <LeadDecorator key={index}>
				{lead}
			</LeadDecorator>;
		})}
		{children}
		{transformDecorators(tails).map((tail, index) => {
			return <TailDecorator key={index}>
				{tail}
			</TailDecorator>;
		})}
	</ACaption>;
});

export type LabelDef = Omit<CaptionDef, 'labelOnValue'>;
export type LabelProps = OmitNodeDef<LabelDef> & WidgetProps;

export const Label = forwardRef((props: LabelProps, ref: ForwardedRef<HTMLSpanElement>) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Caption {...props} labelOnValue={true} ref={ref}/>;
});

export interface BadgeDef extends CaptionDef {
	ink?: ButtonInk;
	fill?: Exclude<ButtonFill, ButtonFill.LINK>;
}

export type BadgeProps = OmitNodeDef<BadgeDef> & WidgetProps;

export const Badge = forwardRef((props: BadgeProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {ink, fill = ButtonFill.FILL, ...rest} = props;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Caption {...rest} data-w="d9-badge" data-ink={ink} data-fill={fill} ref={ref}/>;
});

registerWidget({key: 'Badge', JSX: Badge, container: false, array: false});
registerWidget({key: 'Label', JSX: Label, container: false, array: false});
registerWidget({key: 'Caption', JSX: Caption, container: false, array: false});
