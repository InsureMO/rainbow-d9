# Page::Demo Tab

## Section::# 10. ECharts

### Section::## 10.1 Simple Charts

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
- Chart::Use SVG::first
	- $fc
	- initOptions:
	  ```javascript
	  return { renderer: 'svg' };
	  ```
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

### Section::## 10.2 Autonomous Chart

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

### Section::## 10.3 Chart on External Data

- data-rows-auto-1fr: true

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