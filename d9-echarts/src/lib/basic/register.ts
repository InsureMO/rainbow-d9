import {registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {ChartDef} from '../types';
import {Chart} from './chart';

export const ChartInitOptionsBuild = Widget.createSyncSnippetBuild<ChartDef, 'initOptions'>('initOptions', []);
export const ChartOptionsBuild = Widget.createSyncSnippetBuild<ChartDef, 'options'>('options', []);
export const ChartSettingsBuild = Widget.createSyncSnippetBuild<ChartDef, 'settings'>('settings', []);
export const ChartMergeDataBuild = Widget.createAsyncSnippetBuild<ChartDef, 'mergeData'>('mergeData', ['options', 'data']);

export abstract class AbstractChartTranslator extends Widget.SpecificWidgetTranslator<string> {
	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [ChartInitOptionsBuild, ChartOptionsBuild, ChartSettingsBuild, ChartMergeDataBuild];
	}
}

export const registerChart = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'Chart' : widgetType;
	registerWidget({key: widgetType, JSX: Chart, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractChartTranslator {
		public getSupportedType(): string {
			return widgetType;
		}

		public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
			return {[`${widgetType}.merge`]: 'mergeData'};
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
