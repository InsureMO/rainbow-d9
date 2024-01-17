import {registerWidget} from '@rainbow-d9/n1';
import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {ChartProps} from './types';
import {useDataMerge} from './use-data-merge';
import {useInitialize} from './use-initialize';
import {useResize} from './use-resize';
import {redressChartMarker} from './utils';

// noinspection CssUnresolvedCustomProperty
export const AChart = styled.span.attrs<{ chartHeight?: string | number }>(
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
    width: 100%;
    height: var(--chart-height);
`;

export const Chart = (props: ChartProps) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, settings, marker, mergeData, loading,
		height,
		...rest
	} = props;
	redressChartMarker(props);

	const ref = useRef<HTMLDivElement>(null);
	const [state] = useInitialize(ref, props);
	useResize(ref, state.domInitialized);
	useDataMerge(ref, state.domInitialized, props);

	return <AChart {...rest} chartHeight={height} ref={ref}/>;
};

registerWidget({key: 'Chart', JSX: Chart, container: false, array: false});
