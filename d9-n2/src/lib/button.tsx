import {
	BaseModel,
	Enhance$WrappedPropsForArrayElement,
	NodeDef,
	PPUtils,
	PropValue,
	registerWidget,
	VUtils,
	WidgetProps
} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, MouseEvent, ReactNode, useRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DecorateWrapperDef, transformDecorators} from './decorate-assist';
import {buildTip, TipAttachableWidget, useGlobalHandlers, useTip} from './global';
import {toIntlLabel} from './intl-label';
import {SDP, WSDP} from './styled-components-styles';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps2, OmitNodeDef, ValidationHandlers} from './types';
import {useDualRefs} from './utils';

// noinspection JSUnusedGlobalSymbols
export enum ButtonFill {
	LINK = 'link',
	PLAIN = 'plain',
	FILL = 'fill'
}

// noinspection JSUnusedGlobalSymbols
export enum ButtonInk {
	PRIMARY = 'primary',
	DANGER = 'danger',
	SUCCESS = 'success',
	WAIVE = 'waive',
	WARN = 'warn',
	INFO = 'info',
}

export interface ButtonClickOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, ValidationHandlers, GlobalEventHandlers {
}

export type ButtonClick = <R extends BaseModel, M extends PropValue>(
	options: ButtonClickOptions<R, M>, event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;

/** Button configuration definition */
export type ButtonDef =
	NodeDef
	& TipAttachableWidget
	& DecorateWrapperDef
	& OmitHTMLProps2<HTMLButtonElement, 'type' | 'onClick'>
	& {
	/** @deprecated use leads instead */
	head?: ReactNode;
	text?: ReactNode;
	/** @deprecated use tails instead */
	tail?: ReactNode;
	ink?: ButtonInk;
	fill?: ButtonFill;
	click?: ButtonClick;
};

/** Button widget definition, with html attributes */
export type ButtonProps = OmitNodeDef<ButtonDef> & WidgetProps;

// noinspection CssUnresolvedCustomProperty
const AButton = styled.button.attrs<WSDP<{ hasOneLeadOrTail: boolean }>>(
	({id, hasOneLeadOrTail, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW ?? 'd9-button',
			[DOM_ID_WIDGET]: id,
			style: {
				padding: hasOneLeadOrTail ? 0 : (void 0)
			}
		};
	})<{ hasOneLeadOrTail: boolean }>`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    font-variant: ${CssVars.FONT_VARIANT};
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.BUTTON_INDENT};
    color: ${CssVars.INVERT_COLOR};
    fill: ${CssVars.INVERT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    // fill
    // default
    border-color: ${CssVars.PRIMARY_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};

    &:hover {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus, &:active {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &[data-ink=primary] {
        border-color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.PRIMARY_COLOR};

        &:hover {
            box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.PRIMARY_SHADOW};
        }
    }

    &[data-ink=danger] {
        border-color: ${CssVars.DANGER_COLOR};
        background-color: ${CssVars.DANGER_COLOR};

        &:hover {
            box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.DANGER_SHADOW};
        }
    }

    &[data-ink=success] {
        border-color: ${CssVars.SUCCESS_COLOR};
        background-color: ${CssVars.SUCCESS_COLOR};

        &:hover {
            box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.SUCCESS_SHADOW};
        }
    }

    &[data-ink=warn] {
        border-color: ${CssVars.WARN_COLOR};
        background-color: ${CssVars.WARN_COLOR};

        &:hover {
            box-shadow: ${CssVars.WARN_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.WARN_SHADOW};
        }
    }

    &[data-ink=info] {
        border-color: ${CssVars.INFO_COLOR};
        background-color: ${CssVars.INFO_COLOR};

        &:hover {
            box-shadow: ${CssVars.INFO_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.INFO_SHADOW};
        }
    }

    &[data-ink=waive] {
        border-color: ${CssVars.WAIVE_COLOR};
        background-color: ${CssVars.WAIVE_COLOR};

        &:hover {
            box-shadow: ${CssVars.WAIVE_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.WAIVE_SHADOW};
        }
    }

    &[data-fill=link] {
        color: ${CssVars.FONT_COLOR};
        background-color: transparent;
        border-color: transparent;
        text-decoration: underline;
        box-shadow: none;

        &:hover {
            color: ${CssVars.PRIMARY_COLOR};
            box-shadow: none;
        }

        &:focus, &:active {
            box-shadow: none;
        }

        &[data-ink=primary] {
            color: ${CssVars.PRIMARY_COLOR};

            &:hover {
                color: ${CssVars.PRIMARY_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
            }
        }

        &[data-ink=danger] {
            color: ${CssVars.DANGER_COLOR};

            &:hover {
                color: ${CssVars.DANGER_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
            }
        }

        &[data-ink=success] {
            color: ${CssVars.SUCCESS_COLOR};

            &:hover {
                color: ${CssVars.SUCCESS_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
            }
        }

        &[data-ink=warn] {
            color: ${CssVars.WARN_COLOR};

            &:hover {
                color: ${CssVars.WARN_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
            }
        }

        &[data-ink=info] {
            color: ${CssVars.INFO_COLOR};

            &:hover {
                color: ${CssVars.INFO_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
            }
        }

        &[data-ink=waive] {
            color: ${CssVars.WAIVE_COLOR};

            &:hover {
                color: ${CssVars.WAIVE_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }

        > span[data-w=d9-deco-lead],
        > span[data-w=d9-deco-tail] {
            color: ${CssVars.FONT_COLOR};
            fill: ${CssVars.FONT_COLOR};
        }
    }

    &[data-fill=plain] {
        background-color: transparent;
        border-color: ${CssVars.PRIMARY_COLOR};

        &[data-ink=primary] {
            color: ${CssVars.PRIMARY_COLOR};
            border-color: ${CssVars.PRIMARY_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
            }
        }

        &[data-ink=danger] {
            color: ${CssVars.DANGER_COLOR};
            border-color: ${CssVars.DANGER_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
            }
        }

        &[data-ink=success] {
            color: ${CssVars.SUCCESS_COLOR};
            border-color: ${CssVars.SUCCESS_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
            }
        }

        &[data-ink=warn] {
            color: ${CssVars.WARN_COLOR};
            border-color: ${CssVars.WARN_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
            }
        }

        &[data-ink=info] {
            color: ${CssVars.INFO_COLOR};
            border-color: ${CssVars.INFO_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
            }
        }

        &[data-ink=waive] {
            color: ${CssVars.WAIVE_COLOR};
            border-color: ${CssVars.WAIVE_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }
    }

    &[disabled], &[data-disabled=true] {
        cursor: default;
        color: ${CssVars.WAIVE_COLOR};
        border-color: ${CssVars.DISABLE_COLOR};
        background-color: ${CssVars.DISABLE_COLOR};

        &[data-fill=plain], &[data-fill=plain][data-ink] {
            border-color: ${CssVars.WAIVE_COLOR};
        }

        &[data-fill=link], &[data-fill=link][data-ink] {
            border-color: transparent;
            background-color: transparent;
        }

        &[data-fill=link], &[data-fill=link][data-ink],
        &[data-fill=plain], &[data-fill=plain][data-ink] {
            color: ${CssVars.WAIVE_COLOR};

            &:hover, &:focus, &:active {
                box-shadow: none;
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }

        &:hover, &:focus, &:active {
            box-shadow: none;
        }

        > span[data-w=d9-deco-lead],
        > span[data-w=d9-deco-tail] {
            color: ${CssVars.WAIVE_COLOR};
            fill: ${CssVars.WAIVE_COLOR};
        }
    }

    &[data-visible=false] {
        display: none;
    }

    > span[data-w=d9-deco-lead],
    > span[data-w=d9-deco-tail] {
        color: ${CssVars.INVERT_COLOR};
        fill: ${CssVars.INVERT_COLOR};
    }

    > svg:first-child:not(:last-child) {
        margin-right: ${CssVars.BUTTON_ICON_GAP};
    }

    > span[data-role=text] {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    > svg:last-child:not(:first-child) {
        margin-left: ${CssVars.BUTTON_ICON_GAP};
    }
`;

const Decorator = styled.span`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
        width: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator = styled(Decorator).attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-deco-lead'})`
`;
const TailDecorator = styled(Decorator).attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-deco-tail'})`
`;

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {
		// noinspection JSDeprecatedSymbols
		head, text, tail, ink = ButtonInk.PRIMARY, fill = ButtonFill.FILL, click,
		leads, tails,
		tip,
		$wrapped, ...rest
	} = props;
	const {$root, $model, $p2r, $avs: {$disabled, $visible}, $vfs} = $wrapped;

	const globalHandlers = useGlobalHandlers();
	const buttonRef = useRef<HTMLButtonElement>(null);
	useDualRefs(buttonRef, ref);
	useTip({ref: buttonRef, ...buildTip({tip, root: $root, model: $model})});

	const onClicked = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if ($disabled) {
			return;
		}

		const $mightInArray$wrapped = $wrapped as unknown as Enhance$WrappedPropsForArrayElement<ButtonProps>['$wrapped'];
		if (click != null) {
			await click({
				root: $root, model: $model,
				// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
				// @ts-ignore
				$arrayHolder: $mightInArray$wrapped.$arrayHolder, $array: $mightInArray$wrapped.$array,
				validators: $vfs, global: globalHandlers
			}, event);
		}
	};

	const transformedLeads = transformDecorators(leads);
	const transformedTails = transformDecorators(tails);
	const hasNoText = text == null || (VUtils.isPrimitive(text) && VUtils.isBlank(text));
	// noinspection JSDeprecatedSymbols
	const hasNoHead = head == null || (VUtils.isPrimitive(head) && VUtils.isBlank(head));
	// noinspection JSDeprecatedSymbols
	const hasNoTail = tail == null || (VUtils.isPrimitive(tail) && VUtils.isBlank(tail));
	const hasOneLeadOrTail = hasNoText && hasNoHead && hasNoTail
		&& [...transformedLeads, ...transformedTails].length === 1;

	return <AButton {...rest} data-ink={ink} data-fill={fill}
	                data-disabled={$disabled ?? false} data-visible={$visible}
	                hasOneLeadOrTail={hasOneLeadOrTail}
	                onClick={onClicked}
	                id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                ref={buttonRef}>
		{transformedLeads.map((lead, index) => {
			return <LeadDecorator key={index}>
				{lead}
			</LeadDecorator>;
		})}
		{/** noinspection JSDeprecatedSymbols */}
		{head}
		{hasNoText ? null : <span data-role="text">{toIntlLabel(text)}</span>}
		{/** noinspection JSDeprecatedSymbols */}
		{tail}
		{transformedTails.map((tail, index) => {
			return <TailDecorator key={index}>
				{tail}
			</TailDecorator>;
		})}
	</AButton>;
});

export type LinkDef = Omit<ButtonDef, 'fill'>;
export type LinkProps = OmitNodeDef<LinkDef> & WidgetProps;

export const Link = forwardRef((props: LinkProps, ref: ForwardedRef<HTMLButtonElement>) => {
	return <Button {...props} fill={ButtonFill.LINK} ref={ref}/>;
});

registerWidget({key: 'Button', JSX: Button, container: false, array: false});
registerWidget({key: 'Link', JSX: Link, container: false, array: false});
