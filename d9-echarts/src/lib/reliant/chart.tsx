import React, {useRef} from 'react';
import {AChart, useDataMerge, useInitialize, useResize} from '../basic';
import {ReliantChartProps} from '../types';
import {useReliantWatch} from './use-reliant-watch';

export const ReliantChart = (props: ReliantChartProps) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, settings, marker, mergeData, loading,
		$wrapped: {$avs: {$disabled, $visible}},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchData,
		height,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state] = useInitialize(ref, props);
	useResize(ref, state.domInitialized);
	useDataMerge(ref, state.domInitialized, state.marker, props);
	useReliantWatch(ref, state.domInitialized, state.marker, props);

	return <AChart {...rest} data-w="d9-rel-chart"
	               data-disabled={$disabled} data-visible={$visible}
	               chartHeight={height} ref={ref}/>;
};
