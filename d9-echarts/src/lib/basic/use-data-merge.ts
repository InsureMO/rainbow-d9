import {MUtils} from '@rainbow-d9/n1';
import {GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {getInstanceByDom} from 'echarts';
import {MutableRefObject, useEffect} from 'react';
import {ChartGlobalEventPrefix, ChartProps} from './types';

export const useDataMerge = (ref: MutableRefObject<HTMLDivElement>, domInitialized: boolean, marker: string, props: ChartProps) => {
	const {
		$pp, $wrapped: {$model},
		options, settings, mergeData
	} = props;

	const {on, off} = useGlobalEventBus();
	useEffect(() => {
		if (!domInitialized || ref.current == null) {
			return;
		}
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (clipped !== marker) {
				return;
			}
			if (prefix !== ChartGlobalEventPrefix.DATA_CHANGED) {
				return;
			}
			const chart = getInstanceByDom(ref.current);
			const data = MUtils.getValue($model, $pp);
			(async () => {
				if (data != null) {
					const optionsWithData = await mergeData(options, data);
					chart.setOption(optionsWithData, settings);
					// no matter the loading is shown or not, hide it
					chart.hideLoading();
				}
			})();
		};
		on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, domInitialized, ref, $pp, $model, options, settings, marker, mergeData]);
};