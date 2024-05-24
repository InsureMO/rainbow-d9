import {UnwrappedCaption} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';

// noinspection CssUnresolvedCustomProperty
export const NodeContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--background-color);
    min-width: ${PlaygroundCssVars.NODE_MIN_WIDTH};
`;
// noinspection CssUnresolvedCustomProperty
export const NodeHeader = styled.div`
    display: flex;
    position: relative;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    background: var(--background);
    padding: var(--padding);
    margin-top: -2px;
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// noinspection CssUnresolvedCustomProperty
export const NodeTitle = styled(UnwrappedCaption)`
    flex-grow: 1;
    color: var(--color);
    font-weight: var(--font-weight);
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// noinspection CssUnresolvedCustomProperty
export const NodeSecondTitle = styled(UnwrappedCaption)`
    justify-content: flex-end;
    color: var(--color);
    font-weight: var(--font-weight);
    text-decoration: var(--text-decoration);
`;
// noinspection CssUnresolvedCustomProperty
export const NodeBody = styled.div`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 2;
    grid-template-columns: auto minmax(40px, 1fr) auto;
    min-height: var(--min-height);
    padding: var(--padding);
`;

export interface NodeWrapperProps {
	children: ReactNode;
}

export const NodeWrapper = (props: NodeWrapperProps) => {
	const {children, ...rest} = props;

	return <NodeContainer {...rest}>
		{children}
	</NodeContainer>;
};