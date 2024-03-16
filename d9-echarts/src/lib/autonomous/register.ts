import {registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {AutonomousChartDef, ChartDef} from '../types';
import {AutonomousChart} from './chart';

export const AutonomousChartInitOptionsBuild = Widget.createSyncSnippetBuild<ChartDef, 'initOptions'>('initOptions', []);
export const AutonomousChartOptionsBuild = Widget.createSyncSnippetBuild<AutonomousChartDef, 'options'>('options', []);
export const AutonomousChartSettingsBuild = Widget.createSyncSnippetBuild<AutonomousChartDef, 'settings'>('settings', []);
export const AutonomousChartMergeDataBuild = Widget.createAsyncSnippetBuild<AutonomousChartDef, 'mergeData'>('mergeData', ['options', 'data']);
export const AutonomousChartFetchDataBuild = Widget.createAsyncSnippetBuild<AutonomousChartDef, 'fetchData'>('fetchData', ['options']);

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
