import {MUtils} from '@rainbow-d9/n1';
import {init} from 'echarts';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {ChartProps} from './types';

export interface ChartState {
	domInitialized: boolean;
}

export const useInitialize = (ref: React.MutableRefObject<HTMLDivElement>, props: ChartProps): [ChartState, Dispatch<SetStateAction<ChartState>>] => {
	const {
		$pp, $wrapped: {$model},
		options, settings, mergeData, loading
	} = props;

	const [state, setState] = React.useState<ChartState>({domInitialized: false});
	useEffect(() => {
		if (state.domInitialized || ref.current == null) {
			return;
		}

		const chart = init(ref.current);
		(async () => {
			const data = MUtils.getValue($model, $pp);
			if (data != null) {
				const optionsWithData = await mergeData(options, data);
				chart.setOption(optionsWithData, settings);
			} else {
				// no data, show loading
				chart.setOption(options, settings);
				const loadingOptions = loading?.();
				if (Array.isArray(loadingOptions)) {
					chart.showLoading(loadingOptions[0], loadingOptions[1]);
				} else {
					chart.showLoading(loadingOptions);
				}
			}
			setState({domInitialized: true});
		})();

		return () => {
			chart.dispose();
		};
	}, [state.domInitialized, ref, $pp, $model, options, settings, mergeData, loading]);
	return [state, setState];
};