import {ECharts, EChartsData, EChartsMarkdown} from '../echarts';
import {N2ArrayPanel, N2ArrayPanelData, N2ArrayPanelMarkdown} from '../n2-array-panel';
import {N2BasicWidgets, N2BasicWidgetsData, N2BasicWidgetsMarkdown} from '../n2-basic-widgets';
import {N2Buttons, N2ButtonsData, N2ButtonsMarkdown} from '../n2-buttons';
import {N2Intl, N2IntlData, N2IntlMarkdown} from '../n2-intl';
import {N2Monitors, N2MonitorsData, N2MonitorsMarkdown} from '../n2-monitors';
import {N2Table, N2TableData, N2TableMarkdown} from '../n2-table';
import {N2Tabs, N2TabsData, N2TabsMarkdown} from '../n2-tabs';
import {N2Tree, N2TreeData, N2TreeMarkdown} from '../n2-tree';
import {N2Wizard, N2WizardData, N2WizardMarkdown} from '../n2-wizard';
import {ThaiPlanSelection, ThaiPlanSelectionData, ThaiPlanSelectionMarkdown} from '../thai-plan-selection';

export * from './widgets';
export * from './markdown-container';

export const Demos = [
	{
		path: '/n2-basic-widgets', label: '1. N2 Basic Widgets',
		C: N2BasicWidgets, data: N2BasicWidgetsData, markdown: N2BasicWidgetsMarkdown
	},
	{path: '/n2-buttons', label: '2. N2 Buttons', C: N2Buttons, data: N2ButtonsData, markdown: N2ButtonsMarkdown},
	{path: '/n2-table', label: '3. N2 Table', C: N2Table, data: N2TableData, markdown: N2TableMarkdown},
	{
		path: '/n2-array-panel', label: '4. N2 Array Panel',
		C: N2ArrayPanel, data: N2ArrayPanelData, markdown: N2ArrayPanelMarkdown
	},
	{path: '/n2-tabs', label: '5. N2 Tabs', C: N2Tabs, data: N2TabsData, markdown: N2TabsMarkdown},
	{path: '/n2-wizard', label: '6. N2 Wizard', C: N2Wizard, data: N2WizardData, markdown: N2WizardMarkdown},
	{
		path: '/n2-monitors', label: '7. N2 Monitors',
		C: N2Monitors, data: N2MonitorsData, markdown: N2MonitorsMarkdown
	},
	{path: '/n2-intl', label: '8. N2 Internationalization', C: N2Intl, data: N2IntlData, markdown: N2IntlMarkdown},
	{path: '/n2-tree', label: '9. N2 Tree', C: N2Tree, data: N2TreeData, markdown: N2TreeMarkdown},
	{path: '/echarts', label: '10. ECharts', C: ECharts, data: EChartsData, markdown: EChartsMarkdown},
	{
		path: '/thai-plan-selection', label: '100. ThaiCloud Plan Selection',
		C: ThaiPlanSelection, data: ThaiPlanSelectionData, markdown: ThaiPlanSelectionMarkdown
	}
];