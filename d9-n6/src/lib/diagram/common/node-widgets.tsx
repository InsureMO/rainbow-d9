import {CssVars, DOM_KEY_WIDGET, SDP, UnwrappedCaption} from '@rainbow-d9/n2';
import React, {DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes} from 'react';
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
    max-width: ${PlaygroundCssVars.NODE_MAX_WIDTH}
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
    color: var(--color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    //white-space: unset;
    //overflow: unset;
    //text-overflow: unset;
    padding: calc((${CssVars.INPUT_HEIGHT} - var(--font-size)) / 2) 0;
`;
// noinspection CssUnresolvedCustomProperty
export const NodeTitleSpreader = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-node-title-spreader'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    min-width: var(--min-width, ${PlaygroundCssVars.NODE_TITLE_SPREADER_MIN_WIDTH});

    + span {
        flex-grow: unset;
    }
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// noinspection CssUnresolvedCustomProperty
export const NodeSecondTitle = styled(UnwrappedCaption)`
    flex-grow: 1;
    justify-content: flex-end;
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    color: var(--color);
    font-size: var(--font-size);
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NodeWrapperProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
}

export const NodeWrapper = forwardRef((props: NodeWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {children, ...rest} = props;

	return <NodeContainer {...rest} ref={ref}>
		{children}
	</NodeContainer>;
});
