# Page::Demo Tab

## Section::# 10. ECharts

- Chart::Simple Chart::first
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
- AutChart::Autonomous Chart::second
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