import {MUtils} from '@rainbow-d9/n1';
import {useGlobalHandlers} from '@rainbow-d9/n2';
import {getInstanceByDom} from 'echarts';
import {MutableRefObject, useEffect} from 'react';
import {AutonomousChartProps} from '../types';
import {askOptions, askSettings} from '../utils';

export const useAutonomousFetch = (ref: MutableRefObject<HTMLDivElement>, domInitialized: boolean, marker: string, props: AutonomousChartProps) => {
	const {
		$pp, $wrapped: {$root, $model},
		options, settings, mergeData,
		fetchData, fetchInterval = 10
	} = props;

	const globalHandlers = useGlobalHandlers();
	useEffect(() => {
		if (!domInitialized || ref.current == null) {
			return;
		}

		const syncData = async () => {
			if (ref.current == null) {
				return;
			}
			const chart = getInstanceByDom(ref.current);

			const data = await fetchData({global: globalHandlers, marker, root: $root, model: $model});
			if (data != null) {
				MUtils.setValue($model, $pp, data);
				const optionsWithData = await mergeData(askOptions(options), data);
				chart.setOption(optionsWithData, askSettings(settings));
				// no matter the loading is shown or not, hide it
				chart.hideLoading();
			}
		};
		const data = MUtils.getValue($model, $pp);
		if (data == null) {
			// no data presents, fetch immediately
			// noinspection JSIgnoredPromiseFromCall
			syncData();
		}
		const createTimer = () => {
			return setTimeout(async () => {
				await syncData();
				if (ref.current == null) {
					return;
				}
				createTimer();
			}, fetchInterval * 1000);
		};
		// data already carries, no need to fetch, start a timer to fetch periodically
		const timer = createTimer();

		return () => {
			try {
				clearTimeout(timer);
			} catch {
				// ignore
			}
		};
	}, [
		globalHandlers, domInitialized, ref,
		$pp, $root, $model,
		options, settings, mergeData, marker, fetchData, fetchInterval
	]);
};
