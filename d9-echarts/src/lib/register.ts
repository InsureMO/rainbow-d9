import {Widget} from '@rainbow-d9/n3';
import {registerAutonomousChart} from './autonomous';
import {registerChart} from './basic';

export interface ChartWidgetTypes {
	Chart: string;
	AutChart: string;
}

export const registerCharts = (widgetHelper: Widget.WidgetHelper, widgetTypes?: ChartWidgetTypes) => {
	registerChart(widgetHelper, widgetTypes?.Chart);
	registerAutonomousChart(widgetHelper, widgetTypes?.AutChart);
};
