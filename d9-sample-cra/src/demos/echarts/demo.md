# Page::Demo Tab

## Section::# 10. ECharts

- Chart::::first
	- options:
	  ```javascript
	  return {
	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
	    yAxis: {type: 'value'},
	    series: [{type: 'bar'}]
	  }
	  ```
	- mergeData:
	  ```javascript
	  options.series[0].data = data;
	  return options;
	  ```
