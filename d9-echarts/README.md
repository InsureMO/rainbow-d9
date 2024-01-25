![Static Badge](https://img.shields.io/badge/InsureMO-777AF2.svg)

![License](https://img.shields.io/github/license/InsureMO/rainbow-d9)
![GitHub Release](https://img.shields.io/github/v/release/InsureMO/rainbow-d9)
![GitHub Release Date](https://img.shields.io/github/release-date/InsureMO/rainbow-d9)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/InsureMO/rainbow-d9)

![npm (scoped)](https://img.shields.io/npm/v/%40rainbow-d9/echarts?logo=npm)
![npm](https://img.shields.io/npm/dm/%40rainbow-d9/echarts)

![Depends](https://img.shields.io/badge/React-white.svg?logo=react)
![Depends](https://img.shields.io/badge/Styled--Components-white.svg?logo=styledcomponents&logoColor=DB7093)
![Depends](https://img.shields.io/badge/ECharts-white.svg?logo=apacheecharts&logoColor=AA344D)

![Module Formats](https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg)

# d9-echarts

Echarts.

## Basic Chart

| Attribute Name | Type                                                            | Description                          |
|----------------|-----------------------------------------------------------------|--------------------------------------|
| initOptions    | `ChartInitOptions \| (() => Promise<ChartInitOptions>)`         | echarts init options.                |
| options        | `EChartsOption  \| (() => EChartsOption)`                       | echarts options, could include data. |
| settings       | `SetOptionOpts \| (() => SetOptionOpts)`                        | echarts settings.                    |
| marker         | text                                                            | Chart marker, global unique.         |
| mergeData      | `(options: EChartsOption, data: any) => Promise<EChartsOption>` | merge data to options.               |
| loading        | `() => object \| [string, object]`                              | echarts loading options.             |   
| height         | number, text                                                    | Chart height, default 300px.         |

Basic Chart refreshes the chart by receiving external events `ChartGlobalEventPrefix.DATA_CHANGED`. Before sending events to Basic Chart,
please ensure that the data required by the chart has been written to the model. Basic Chart obtains data through the defined model
properties and calls `mergeData` to merge the data into echarts options, and then refreshes the chart.

### A Sample

```markdown
- Chart::Use Canvas, Default::first
	- $fc
	- options:
	  ```javascript
	  return {
	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
	    yAxis: {type: 'value'},
	    series: [{type: 'bar'}]
	  }
	  ```
	- merge:
	  ```javascript
	  options.series[0].data = data;
	  return options;
	  ```
```

## Autonomous Chart

On top of Basic Chart, the following properties are added:

| Attribute Name | Type                                          | Description         |
|----------------|-----------------------------------------------|---------------------|
| fetchData      | `(options: FetchDataOptions) => Promise<any>` | fetch chart data.   |
| fetchInterval  | number                                        | 10 seconds default. |

Autonomous Chart fetches data through `fetchData`, making it self-refreshing.

### A Sample

```markdown
- AutChart::Refresh every 1 second::second
	- $fc
	- options:
	  ```javascript
	  return {
	    legend: {top: 'bottom'},
	    series: [
	      {
	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
	        itemStyle: { borderRadius: 8 }
	      }
	    ]
	  }
	  ```
	- merge:
	  ```javascript
	  options.series[0].data = data;
	  return options;
	  ```
	- fetch:
	  ```typescript
	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
	    return { value: Math.ceil(Math.random() * 30) + 20, name };
	  });
	  ```
	- interval: 1
```

## Reliant Chart

On top of Basic Chart, the following properties are added:

| Attribute Name | Type                                          | Description        |
|----------------|-----------------------------------------------|--------------------|
| fetchData      | `(options: FetchDataOptions) => Promise<any>` | fetch chart data.  |
| fetchDefer     | number                                        | 1 seconds default. |

Reliant Chart fetches data through `fetchData`. It depends on the data of other widgets, when the data of other widgets changes, it will be
refreshed after deferred time.   
In order for the chart to listen for data changes from other widgets, a reaction needs to be defined. The markdown configuration has already
added the `criteria` property to define this type of response, so you only need to add the properties that need to be listened to.

### A Sample

```markdown
- Dropdown::Month::third.criteria.weekOfYear
	- options: 1:Jan; 2:Feb; 3:Mar; 4:Apr; 5:May; 6:Jun; 7:Jul; 8:Aug; 9:Sep; 10:Oct; 11:Nov; 12:Dec
	- place: $row: 1, $col: 1, $cols: 3
- Dropdown::Gender::third.criteria.gender
	- options: F:Female;M:Male
	- place: $row: 2, $col: 1, $cols: 3
- RelChart::::third.data
	- place: $row: 1, $rows: 2, $col: 4, $cols: 3
	- options:
	  ```javascript
	  return {
	    legend: {top: 'bottom'},
	    series: [
	      {
	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
	        itemStyle: { borderRadius: 8 }
	      }
	    ]
	  }
	  ```
	- merge:
	  ```javascript
	  options.series[0].data = data;
	  return options;
	  ```
	- fetch:
	  ```typescript
	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
	    return { value: Math.ceil(Math.random() * 30) + 20, name };
	  });
	  ```
	- criteria:
		- on: /third.criteria.**
```