import {BaseModel, MUtils, NodeDef, PPUtils, PropValue, registerWidget, VUtils, WidgetProps} from '@rainbow-d9/n1';
import dayjs from 'dayjs';
import React, {ForwardedRef, forwardRef, isValidElement, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {ButtonFill, ButtonInk} from './button';
import {getDefaultCalendarDateFormat, getDefaultCalendarDatetimeFormat} from './calendar/utils';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DecorateWrapperDef, transformDecorators} from './decorate-assist';
import {useGlobalHandlers} from './global';
import {LabelLike} from './label-like';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps2, OmitNodeDef, ValidationHandlers} from './types';

export interface CaptionValueToLabelFormats {
	nf: (fractionDigits: number, grouping?: boolean) => Intl.NumberFormat;
	nf0: (value?: number) => string;
	nf1: (value?: number) => string;
	nf2: (value?: number) => string;
	nf3: (value?: number) => string;
}

export type CaptionValueToLabel = (value: PropValue | null | undefined, formats: CaptionValueToLabelFormats) => ReactNode;

export interface CaptionClickOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, ValidationHandlers, GlobalEventHandlers {
}

export type CaptionClick = <R extends BaseModel, M extends PropValue>(
	options: CaptionClickOptions<R, M>, event: MouseEvent<HTMLSpanElement>) => void | Promise<void>;

/** Caption configuration definition */
export type CaptionDef = NodeDef & DecorateWrapperDef & OmitHTMLProps2<HTMLSpanElement, 'onClick'> & {
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ACaption = styled.span.attrs(({id, 'data-w': dataW}) => {
	return {
		[DOM_KEY_WIDGET]: dataW ?? 'd9-caption',
		[DOM_ID_WIDGET]: id
	};
})`
    display: flex;
    position: relative;
    align-items: center;
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

const nf = (fractionDigits: number, grouping?: boolean) => {
	return new Intl.NumberFormat((void 0), {
		useGrouping: grouping == null ? true : grouping,
		minimumFractionDigits: fractionDigits || 0,
		maximumFractionDigits: fractionDigits || 0
	});
};
const wrap = (format: Intl.NumberFormat['format']) => {
	return (value?: number) => value == null ? '' : format(value);
};
const nf0 = wrap(nf(0).format);
const nf1 = wrap(nf(1).format);
const nf2 = wrap(nf(2).format);
const nf3 = wrap(nf(3).format);

const df = (value: string, options?: { from?: string; to?: string; }): string => {
	if (VUtils.isBlank(value)) {
		return value;
	}
	const fromFormat = options?.from || getDefaultCalendarDatetimeFormat();
	const toFormat = options?.to || getDefaultCalendarDateFormat();
	const parsed = dayjs(value, fromFormat);
	if (parsed.isValid()) {
		return parsed.format(toFormat);
	} else {
		return value;
	}
};

const formatter = new Proxy({nf, nf0, nf1, nf2, nf3, df}, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(target: any, p: string): any {
		const func = target[p];
		if (func != null) {
			return func;
		} else if (/^nf\d{1,2}$/.test(p)) {
			const f = wrap(nf(Number(p.slice(2))).format);
			target[p] = f;
			return f;
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
		leads, tails,
		labelOnValue, valueToLabel, click,
		$pp, $wrapped,
		...rest
	} = props;
	const {$root, $model, $p2r, $avs: {$disabled, $visible}, $vfs} = $wrapped;
	const label = props.text ?? props.label;

	const globalHandlers = useGlobalHandlers();
	const onClicked = click != null
		? async (event: MouseEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();

			if ($disabled) {
				return;
			}

			click && await click({root: $root, model: $model, validators: $vfs, global: globalHandlers}, event);
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
			value = valueToLabel(MUtils.getValue($model, $pp), formatter) ?? '';
		} else if (label != null) {
			// wrap nested is not necessary, since caption do everything very well by itself.
			// but still use label like here to make it more consistent.
			value = <LabelLike $wrapped={$wrapped} $validationScopes={props} label={label}/>;
		} else {
			// empty caption
			value = '';
		}
		try {
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
	                 ref={ref}>
		{transformDecorators(leads).map(lead => {
			return <LeadDecorator key={VUtils.generateUniqueId()}>
				{lead}
			</LeadDecorator>;
		})}
		{children}
		{transformDecorators(tails).map(tail => {
			return <TailDecorator key={VUtils.generateUniqueId()}>
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
	return <Caption {...rest} ref={ref} data-w="d9-badge" data-ink={ink} data-fill={fill}/>;
});

registerWidget({key: 'Badge', JSX: Badge, container: false, array: false});
registerWidget({key: 'Label', JSX: Label, container: false, array: false});
registerWidget({key: 'Caption', JSX: Caption, container: false, array: false});
