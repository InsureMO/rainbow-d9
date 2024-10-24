import {ContainerDef, ContainerWidgetProps, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {OmitHTMLProps, OmitNodeDef} from './types';

export enum ButtonBarAlignment {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right'
}

/** Button bar configuration definition */
export type ButtonBarDef = ContainerDef & OmitHTMLProps<HTMLDivElement> & {
	alignment?: ButtonBarAlignment;
};
/** Button bar widget definition, with html attributes */
export type ButtonBarProps = OmitNodeDef<ButtonBarDef> & ContainerWidgetProps;

// noinspection CssUnresolvedCustomProperty
const AButtonBar = styled.div.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW ?? 'd9-button-bar',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: end;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    height: calc(${CssVars.INPUT_HEIGHT} + 16px);
    padding: 8px 0;
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;

    &[data-alignment=left] {
        justify-content: start;

        > button:not(:first-child) {
            margin-left: 8px;
        }
    }

    &[data-alignment=center] {
        justify-content: center;

        > button:not(:first-child) {
            margin-left: 8px;
        }
    }

    > *:not(:last-child) {
        margin-right: 8px;
    }

    > div[data-w=d9-input],
    > div[data-w=d9-dropdown] {
        width: auto;
    }
`;

export const ButtonBar = forwardRef((props: ButtonBarProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {alignment = ButtonBarAlignment.RIGHT, children, ...rest} = props;

	return <AButtonBar {...rest} data-alignment={alignment} ref={ref}>
		{children}
	</AButtonBar>;
});

registerWidget({key: 'ButtonBar', JSX: ButtonBar, container: true, array: false});