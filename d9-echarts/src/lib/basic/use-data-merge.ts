import {MUtils, PPUtils, PropertyPath, RootEventTypes, useRootEventBus} from '@rainbow-d9/n1';
import {GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {getInstanceByDom} from 'echarts';
import {MutableRefObject, useEffect} from 'react';
import {ChartGlobalEventPrefix, ChartProps} from '../types';
import {askOptions, askSettings} from '../utils';

export const useDataMerge = (ref: MutableRefObject<HTMLDivElement>, domInitialized: boolean, marker: string, props: ChartProps) => {
	const {
		$pp, $wrapped: {$model, $p2r},
		options, settings, mergeData
	} = props;

	const {on, off} = useGlobalEventBus();
	const {on: onRoot, off: offRoot} = useRootEventBus();
	useEffect(() => {
		if (!domInitialized || ref.current == null) {
			return;
		}
		const refreshChart = async () => {
			if (ref.current == null) {
				return;
			}
			const chart = getInstanceByDom(ref.current);
			const data = MUtils.getValue($model, $pp);
			if (data != null) {
				const optionsWithData = await mergeData(askOptions(options), data);
				chart.setOption(optionsWithData, askSettings(settings));
				// no matter the loading is shown or not, hide it
				chart.hideLoading();
			}
		};
		const onCustomEvent = async (_: string, prefix: string, clipped: string) => {
			if (clipped !== marker) {
				return;
			}
			if (prefix !== ChartGlobalEventPrefix.DATA_CHANGED) {
				return;
			}
			await refreshChart();
		};
		const onValueChanged = async (absolutePath: PropertyPath) => {
			if (!PPUtils.matches(absolutePath, PPUtils.absolute($p2r, $pp))) {
				return;
			}
			await refreshChart();
		};
		on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		onRoot && onRoot(RootEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			offRoot && offRoot(RootEventTypes.VALUE_CHANGED, onValueChanged);
			off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, onRoot, offRoot, domInitialized, ref, $p2r, $pp, $model, options, settings, marker, mergeData]);
};
