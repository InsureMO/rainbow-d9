import {registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {ChartDef} from '../types';
import {Chart} from './chart';

export const ChartOptionsBuild = Widget.createSnippetBuild<ChartDef, 'options', ChartDef['options']>(
	'options', (parsed: string) => new Function(parsed) as ChartDef['options']);
export const ChartSettingsBuild = Widget.createSnippetBuild<ChartDef, 'settings', ChartDef['settings']>(
	'settings', (parsed: string) => new Function(parsed) as ChartDef['settings']);
export const ChartMergeDataBuild = Widget.createSnippetBuild<ChartDef, 'mergeData', ChartDef['mergeData']>(
	'mergeData', (parsed: string) => new Function('options', 'data', parsed) as ChartDef['mergeData']);

export abstract class AbstractChartTranslator extends Widget.SpecificWidgetTranslator<string> {
	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [ChartOptionsBuild, ChartSettingsBuild, ChartMergeDataBuild];
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
