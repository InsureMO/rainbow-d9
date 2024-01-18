import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {ChartProps} from '../types';
import {useDataMerge} from './use-data-merge';
import {useInitialize} from './use-initialize';
import {useResize} from './use-resize';

// noinspection CssUnresolvedCustomProperty
export const AChart = styled.div.attrs<{ chartHeight?: string | number }>(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, 'data-w': dataW, chartHeight}) => {
		return {
			[DOM_KEY_WIDGET]: dataW ?? 'd9-chart',
			[DOM_ID_WIDGET]: id,
			style: {
				'--chart-height': chartHeight ?? '300px'
			}
		};
	})<{ chartHeight?: string | number }>`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: var(--chart-height);
`;

export const Chart = (props: ChartProps) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, settings, marker, mergeData, loading,
		$wrapped: {$avs: {$disabled, $visible}},
		height,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state] = useInitialize(ref, props);
	useResize(ref, state.domInitialized);
	useDataMerge(ref, state.domInitialized, state.marker, props);

	return <AChart {...rest}
	               data-disabled={$disabled} data-visible={$visible}
	               chartHeight={height} ref={ref}/>;
};
