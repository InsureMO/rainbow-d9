import React, {useRef} from 'react';
import {AChart, useDataMerge, useInitialize, useResize} from '../basic';
import {AutonomousChartProps} from './types';
import {useAutonomousFetch} from './use-autonomous-fetch';

export const AutonomousChart = (props: AutonomousChartProps) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		options, settings, marker, mergeData, loading,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		fetchData, fetchInterval,
		height,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state] = useInitialize(ref, props);
	useResize(ref, state.domInitialized);
	useDataMerge(ref, state.domInitialized, state.marker, props);
	useAutonomousFetch(ref, state.domInitialized, state.marker, props);

	return <AChart {...rest} chartHeight={height} ref={ref}/>;
};
