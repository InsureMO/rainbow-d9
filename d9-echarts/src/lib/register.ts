import {Widget} from '@rainbow-d9/n3';
import {registerAutonomousChart} from './autonomous';
import {registerChart} from './basic';
import {registerReliantChart} from './reliant';

export interface ChartWidgetTypes {
	Basic: string;
	Autonomous: string;
	Reliant: string;
}

export const registerCharts = (widgetHelper: Widget.WidgetHelper, widgetTypes?: ChartWidgetTypes) => {
	registerChart(widgetHelper, widgetTypes?.Basic);
	registerAutonomousChart(widgetHelper, widgetTypes?.Autonomous);
	registerReliantChart(widgetHelper, widgetTypes?.Reliant);
};
