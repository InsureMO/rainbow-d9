import {registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {AutonomousChartDef, ChartDef} from '../types';
import {AutonomousChart} from './chart';

export const AutonomousChartInitOptionsBuild = Widget.createSnippetBuild<ChartDef, 'initOptions', ChartDef['initOptions']>(
	'initOptions', (parsed: string) => new Function(parsed) as ChartDef['initOptions']);
export const AutonomousChartOptionsBuild = Widget.createSnippetBuild<AutonomousChartDef, 'options', AutonomousChartDef['options']>(
	'options', (parsed: string) => new Function(parsed) as AutonomousChartDef['options']);
export const AutonomousChartSettingsBuild = Widget.createSnippetBuild<AutonomousChartDef, 'settings', AutonomousChartDef['settings']>(
	'settings', (parsed: string) => new Function(parsed) as AutonomousChartDef['settings']);
export const AutonomousChartMergeDataBuild = Widget.createSnippetBuild<AutonomousChartDef, 'mergeData', AutonomousChartDef['mergeData']>(
	'mergeData', (parsed: string) => new Function('options', 'data', parsed) as AutonomousChartDef['mergeData']);
export const AutonomousChartFetchDataBuild = Widget.createSnippetBuild<AutonomousChartDef, 'fetchData', AutonomousChartDef['fetchData']>(
	'fetchData', (parsed: string) => new Function('options', 'data', parsed) as AutonomousChartDef['fetchData']);

export abstract class AbstractAutonomousChartTranslator extends Widget.SpecificWidgetTranslator<string> {
	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			AutonomousChartInitOptionsBuild, AutonomousChartOptionsBuild, AutonomousChartSettingsBuild,
			AutonomousChartMergeDataBuild, AutonomousChartFetchDataBuild
		];
	}
}

export const registerAutonomousChart = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'AutChart' : widgetType;
	registerWidget({key: widgetType, JSX: AutonomousChart, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractAutonomousChartTranslator {
		public getSupportedType(): string {
			return widgetType;
		}

		public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
			return {
				[`${widgetType}.merge`]: 'mergeData',
				[`${widgetType}.fetch`]: 'fetchData',
				[`${widgetType}.interval`]: 'fetchInterval'
			};
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
