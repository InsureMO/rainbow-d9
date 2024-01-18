import {useThrottler, useWrapperEventBus, WrapperEventTypes} from '@rainbow-d9/n1';
import {useGlobalHandlers} from '@rainbow-d9/n2';
import {getInstanceByDom} from 'echarts';
import {MutableRefObject, useEffect} from 'react';
import {REACTION_REFRESH_CHART, ReliantChartProps} from '../types';
import {askOptions, askSettings} from '../utils';

export const useReliantWatch = (ref: MutableRefObject<HTMLDivElement>, domInitialized: boolean, marker: string, props: ReliantChartProps) => {
	const {
		$pp, $wrapped: {$root, $model},
		options, settings, mergeData,
		fetchData, fetchDefer = 1
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {replace, clear} = useThrottler();
	const {on, off} = useWrapperEventBus();
	useEffect(() => {
		if (!domInitialized || ref.current == null) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const onUnhandledReactionOccurred = (command: any) => {
			if (command !== REACTION_REFRESH_CHART) {
				return;
			}

			replace(async () => {
				if (ref.current == null) {
					return;
				}
				const chart = getInstanceByDom(ref.current);
				const data = await fetchData({global: globalHandlers, marker, root: $root, model: $model});
				if (data != null) {
					const optionsWithData = await mergeData(askOptions(options), data);
					chart.setOption(optionsWithData, askSettings(settings));
					// no matter the loading is shown or not, hide it
					chart.hideLoading();
				}
			}, fetchDefer * 1000);
		};
		on && on(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
		return () => {
			off && off(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
		};
	}, [
		globalHandlers, on, off, replace, clear, domInitialized, ref,
		$pp, $root, $model,
		options, settings, marker, mergeData, fetchData, fetchDefer
	]);
};
