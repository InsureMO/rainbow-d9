import {
	BaseModel,
	MUtils,
	NodeDef,
	PPUtils,
	PropValue,
	registerWidget,
	ValidationFunctions,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import dayjs from 'dayjs';
import React, {ForwardedRef, forwardRef, isValidElement, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {getDefaultCalendarDateFormat, getDefaultCalendarDatetimeFormat} from './calendar/utils';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {GlobalHandlers, useGlobalHandlers} from './global';
import {OmitHTMLProps2, OmitNodeDef} from './types';

export interface CaptionValueToLabelFormats {
	nf: (fractionDigits: number, grouping?: boolean) => Intl.NumberFormat;
	nf0: (value?: number) => string;
	nf1: (value?: number) => string;
	nf2: (value?: number) => string;
	nf3: (value?: number) => string;
}

export type CaptionValueToLabel = (value: PropValue | null | undefined, formats: CaptionValueToLabelFormats) => ReactNode;

export interface CaptionClickOptions<R extends BaseModel, M extends PropValue> {
	root: R;
	model: M;
	validators: ValidationFunctions;
	global: GlobalHandlers;
}

export type CaptionClick = <R extends BaseModel, M extends PropValue>(
	options: CaptionClickOptions<R, M>, event: MouseEvent<HTMLSpanElement>) => void | Promise<void>;

/** Caption configuration definition */
export type CaptionDef = NodeDef & OmitHTMLProps2<HTMLSpanElement, 'onClick'> & {
	labelOnValue?: boolean;
	/** use label when it is given */
	label?: ReactNode;
	/** use model value when it is true */
	valueToLabel?: CaptionValueToLabel;
	click?: CaptionClick
}
/** Caption widget definition, with html attributes */
export type CaptionProps = OmitNodeDef<CaptionDef> & WidgetProps;

const ACaption = styled.span.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-caption',
		[DOM_ID_WIDGET]: id
	};
})`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-family      : ${CssVars.CAPTION_FONT_FAMILY};
	font-size        : ${CssVars.CAPTION_FONT_SIZE};
	color            : ${CssVars.CAPTION_FONT_COLOR};
	height           : ${CssVars.INPUT_HEIGHT};
	background-color : transparent;
	white-space      : nowrap;
	overflow         : hidden;
	text-overflow    : ellipsis;
	&[data-visible=false] {
		display : none;
	}
	&[data-clickable=true] {
		cursor          : pointer;
		text-decoration : underline;
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

export const Caption = forwardRef((props: CaptionProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {
		labelOnValue, label, valueToLabel, click,
		$pp, $wrapped: {$root, $model, $p2r, $avs: {$disabled, $visible}, $vfs},
		...rest
	} = props;

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
			value = valueToLabel(MUtils.getValue($model, $pp), formatter);
		} else if (label != null) {
			value = label;
		} else {
			// empty caption
			value = '';
		}
		try {
			if (Array.isArray(value)) {
				value = value.map(item => {
					if (typeof value === 'object' && !isValidElement(value)) {
						return JSON.stringify(item);
					}
				});
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
		{children}
	</ACaption>;
});

export type LabelDef = Omit<CaptionDef, 'labelOnValue'>;
export type LabelProps = OmitNodeDef<LabelDef> & WidgetProps;

export const Label = forwardRef((props: LabelProps, ref: ForwardedRef<HTMLSpanElement>) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Caption {...props} labelOnValue={true} ref={ref}/>;
});

registerWidget({key: 'Label', JSX: Label, container: false, array: false});
registerWidget({key: 'Caption', JSX: Caption, container: false, array: false});
