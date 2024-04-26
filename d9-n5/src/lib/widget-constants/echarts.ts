import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';

export const ChartProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'initOptions', label: 'Snippet.', description: 'Init options of echarts.'},
	{name: 'options', label: 'Snippet.', description: 'Options of echarts.'},
	{name: 'settings', label: 'Snippet.', description: 'Settings of echarts.'},
	{name: 'marker', label: 'Text.', description: 'Global identify this section when global event fired.'},
	{
		name: 'mergeData', label: 'Snippet.',
		description: 'Merge data into chart options, data format depends on chart type.'
	},
	{
		name: 'merge', label: 'Snippet. Shortcut of "mergeData".',
		description: 'Merge data into chart options, data format depends on chart type.'
	},
	{name: 'loading', label: 'Snippet.', description: 'Loading options of echarts.'},
	{name: 'height', label: 'Text, Number.', description: 'Height of chart.'}
];
export const ChartFetchProperties: Array<PlaygroundWidgetProperty> = [
	{
		name: 'fetchData', label: 'Snippet.',
		description: 'Fetch data for chart. Data format depends on chart type.'
	},
	{
		name: 'fetch', label: 'Snippet. Shortcut of "fetchData".',
		description: 'Fetch data for chart. Data format depends on chart type.'
	}
];

export const EChartsWidgets: Array<PlaygroundWidget> = [
	{
		$wt: 'Chart', $key: 'ChartPie', label: 'Pie chart.',
		properties: ChartProperties,
		icon: PlaygroundIcons.CHART_PIE, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Pie Chart',
		template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'pie'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
	},
	{
		$wt: 'Chart', $key: 'ChartBar', label: 'Bar chart.',
		properties: ChartProperties,
		icon: PlaygroundIcons.CHART_BAR, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Bar Chart',
		template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'bar'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
	},
	{
		$wt: 'Chart', $key: 'ChartLine', label: 'Line chart.',
		properties: ChartProperties,
		icon: PlaygroundIcons.CHART_LINE, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Line Chart',
		template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'line'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
	},
	{
		$wt: 'RelChart', label: 'Chart. Refresh depends on others.',
		properties: [
			...ChartProperties,
			...ChartFetchProperties,
			{name: 'fetchDefer', label: 'Number.', description: 'Defer time in seconds after criteria changed.'},
			{
				name: 'defer', label: 'Number. Shortcut of "fetchDefer".',
				description: 'Defer time in seconds after criteria changed.'
			}
		],
		icon: PlaygroundIcons.CHART_RELIANT, group: PlaygroundWidgetGroupKey.DISPLAY,
		tooltip: 'Chart depends on data',
		template: `RelChart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    legend: {top: 'bottom'},
    series: [
      {
        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
        itemStyle: { borderRadius: 8 }
      }
    ]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  options.series[0].data = data;
  return options;
  \`\`\`
- fetch:
  \`\`\`typescript
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
    return { value: Math.ceil(Math.random() * 30) + 20, name };
  });
  \`\`\`
- criteria:
  - on: /criteria.**
`
	},
	{
		$wt: 'AutChart', label: 'Chart. Refresh autonomously.',
		properties: [
			...ChartProperties,
			...ChartFetchProperties,
			{name: 'fetchInterval', label: 'Number.', description: 'Interval time in seconds.'},
			{name: 'interval', label: 'Number. Shortcut of "fetchInterval".', description: 'Interval time in seconds.'}
		],
		icon: PlaygroundIcons.CHART_AUTONOMOUS, group: PlaygroundWidgetGroupKey.DISPLAY,
		tooltip: 'Auto refresh chart',
		template: `AutChart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    legend: {top: 'bottom'},
    series: [
      {
        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
        itemStyle: { borderRadius: 8 }
      }
    ]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  options.series[0].data = data;
  return options;
  \`\`\`
- fetch:
  \`\`\`typescript
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
    return { value: Math.ceil(Math.random() * 30) + 20, name };
  });
  \`\`\`
- interval: 1
`
	}
];
