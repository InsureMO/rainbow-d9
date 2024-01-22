import {MBUtils, PPUtils, registerWidget, VUtils, WidgetProps} from '@rainbow-d9/n1';
import React, {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {DecorateWrapperDef, transformDecorators} from './decorate-assist';
import {Input, InputDef, NumberInput} from './input';
import {OmitNodeDef} from './types';

export type DecorateInputDef = InputDef & DecorateWrapperDef;
export type DecorateInputProps = OmitNodeDef<DecorateInputDef> & DecorateWrapperDef & WidgetProps;

// noinspection CssUnresolvedCustomProperty
const DecorateInputContainer = styled.div.attrs(
	({id}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-deco-input',
			[DOM_ID_WIDGET]: VUtils.isBlank(id) ? (void 0) : `di-${id}`
		};
	})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: ${CssVars.INPUT_HEIGHT};

    > input[data-w=d9-input] {
        flex-grow: 1;
        z-index: 1;

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: calc(${CssVars.BORDER_WIDTH} * -1);
        }

        &:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
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
    }
`;
const LeadDecorator = styled(Decorator).attrs({
	[DOM_KEY_WIDGET]: 'd9-deco-lead'
})`
    &:first-child {
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
    }
`;
const TailDecorator = styled(Decorator).attrs({
	[DOM_KEY_WIDGET]: 'd9-deco-tail'
})`
    &:last-child {
        border-top-right-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-right-radius: ${CssVars.BORDER_RADIUS};
    }
`;

interface DecorateProps {
	id?: HTMLElement['id'];
	leads?: DecorateWrapperDef['leads'];
	tails?: DecorateWrapperDef['tails'];
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

const Decorate = (props: DecorateProps) => {
	const {id, leads, tails, children, ...rest} = props;

	return <DecorateInputContainer id={VUtils.isBlank(id) ? (void 0) : `di-${id}`} {...rest}>
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
	</DecorateInputContainer>;
};

export const DecorateInput = (props: DecorateInputProps) => {
	const {leads, tails, className, style, ...rest} = props;
	const {$wrapped: {$p2r}} = rest;
	const deviceTags = MBUtils.pickDeviceTags(props);

	return <Decorate {...deviceTags} leads={leads} tails={tails} className={className} style={style}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}>
		<Input {...rest}/>
	</Decorate>;
};

export type DecorateNumberInputDef = Omit<DecorateInputDef, 'valueToNumber'>;
export type DecorateNumberInputProps = OmitNodeDef<DecorateNumberInputDef> & WidgetProps;

export const DecorateNumberInput = (props: DecorateNumberInputProps) => {
	const {leads, tails, className, style, ...rest} = props;
	const {$wrapped: {$p2r}} = rest;
	const deviceTags = MBUtils.pickDeviceTags(props);

	return <Decorate {...deviceTags} leads={leads} tails={tails} className={className} style={style}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}>
		<NumberInput {...rest}/>
	</Decorate>;
};

registerWidget({key: 'DecoInput', JSX: DecorateInput, container: false, array: false});
registerWidget({key: 'DecoNumber', JSX: DecorateNumberInput, container: false, array: false});
