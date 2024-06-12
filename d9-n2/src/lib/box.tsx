import {ContainerDef, ContainerWidgetProps, PPUtils, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, useRef} from 'react';
import styled from 'styled-components';
import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {buildTip, TipAttachableWidget, useTip} from './global';
import {OmitHTMLProps, OmitNodeDef} from './types';
import {useDualRefs} from './utils';

/** Box configuration definition */
export type BoxDef = ContainerDef & TipAttachableWidget & OmitHTMLProps<HTMLDivElement>;
/** Box widget definition, with html attributes */
export type BoxProps = OmitNodeDef<BoxDef> & ContainerWidgetProps;

// noinspection CssUnresolvedCustomProperty
const ABox = styled.div.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-box',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
export const Box = forwardRef((props: BoxProps, ref: ForwardedRef<HTMLDivElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {tip, $wrapped, children, ...rest} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const boxRef = useRef<HTMLDivElement>(null);
	useDualRefs(boxRef, ref);
	useTip({ref: boxRef, ...buildTip({tip, root: $wrapped.$root, model: $wrapped.$model})});

	return <ABox {...rest} data-disabled={$disabled} data-visible={$visible}
	             id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	             ref={boxRef}>
		{children}
	</ABox>;
});

registerWidget({key: 'Box', JSX: Box, container: true, array: false});
