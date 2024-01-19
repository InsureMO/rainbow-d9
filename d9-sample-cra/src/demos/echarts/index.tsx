import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {EChartsOption} from 'echarts';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';
import './imports';

export const ECharts = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {
		mergeData: {
			first: (options: EChartsOption, data: any) => {
				return {
					xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
					yAxis: {type: 'value'},
					series: [
						{data, type: 'bar'}
					]
				};
			}
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const EChartsData = DemoData;
export const EChartsMarkdown = DemoContent;
