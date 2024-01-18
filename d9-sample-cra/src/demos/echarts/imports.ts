// Import bar charts, all suffixed with Chart
import {BarChart} from 'echarts/charts';
import {
	DatasetComponent,
	GridComponent,
	TitleComponent,
	TooltipComponent,
	TransformComponent
} from 'echarts/components';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Features like Universal Transition and Label Layout
import {LabelLayout, UniversalTransition} from 'echarts/features';

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import {CanvasRenderer, SVGRenderer} from 'echarts/renderers';

echarts.use([
	BarChart,
	TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent,

	LabelLayout, UniversalTransition,

	CanvasRenderer, SVGRenderer
]);