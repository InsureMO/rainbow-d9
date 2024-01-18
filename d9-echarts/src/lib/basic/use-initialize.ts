import {MUtils} from '@rainbow-d9/n1';
import {getInstanceByDom, init} from 'echarts';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {ChartProps} from '../types';
import {askOptions, askSettings, redressChartMarker} from '../utils';

export interface ChartState {
	domInitialized: boolean;
	marker: string;
}

export const useInitialize = (ref: React.MutableRefObject<HTMLDivElement>, props: ChartProps): [ChartState, Dispatch<SetStateAction<ChartState>>] => {
	const {
		$pp, $wrapped: {$model},
		options, settings, mergeData, loading
	} = props;

	const [state, setState] = React.useState<ChartState>({
		domInitialized: false, marker: redressChartMarker(props)
	});
	useEffect(() => {
		if (state.domInitialized || ref.current == null) {
			return;
		}

		const chart = init(ref.current);
		(async () => {
			const data = MUtils.getValue($model, $pp);
			if (data != null) {
				const optionsWithData = await mergeData(askOptions(options), data);
				chart.setOption(optionsWithData, askSettings(settings));
			} else {
				// no data, show loading
				chart.setOption(askOptions(options), askSettings(settings));
				const loadingOptions = loading?.();
				if (Array.isArray(loadingOptions)) {
					chart.showLoading(loadingOptions[0], loadingOptions[1]);
				} else {
					chart.showLoading(loadingOptions);
				}
			}
			setState(state => ({...state, domInitialized: true}));
		})();

		return () => {
			// chart.dispose();
		};
	}, [state.domInitialized, ref, $pp, $model, options, settings, mergeData, loading]);
	useEffect(() => {
		if (!state.domInitialized) {
			return;
		}
		const chartRef = ref.current;
		return () => {
			if (chartRef == null) {
				return;
			}
			try {
				const chart = getInstanceByDom(chartRef);
				chart.dispose();
			} catch {
				// ignore
			}
		};
	}, [state.domInitialized, ref]);
	return [state, setState];
};