import {registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {ReliantChartDef} from '../types';
import {ReliantChart} from './chart';

export const ReliantChartOptionsBuild = Widget.createSnippetBuild<ReliantChartDef, 'options', ReliantChartDef['options']>(
	'options', (parsed: string) => new Function(parsed) as ReliantChartDef['options']);
export const ReliantChartSettingsBuild = Widget.createSnippetBuild<ReliantChartDef, 'settings', ReliantChartDef['settings']>(
	'settings', (parsed: string) => new Function(parsed) as ReliantChartDef['settings']);
export const ReliantChartMergeDataBuild = Widget.createSnippetBuild<ReliantChartDef, 'mergeData', ReliantChartDef['mergeData']>(
	'mergeData', (parsed: string) => new Function('options', 'data', parsed) as ReliantChartDef['mergeData']);
export const ReliantChartFetchDataBuild = Widget.createSnippetBuild<ReliantChartDef, 'fetchData', ReliantChartDef['fetchData']>(
	'fetchData', (parsed: string) => new Function('options', 'data', parsed) as ReliantChartDef['fetchData']);

export abstract class AbstractReliantChartTranslator extends Widget.SpecificWidgetTranslator<string> {
	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			ReliantChartOptionsBuild, ReliantChartSettingsBuild,
			ReliantChartMergeDataBuild, ReliantChartFetchDataBuild
		];
	}
}

export const registerReliantChart = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'RelChart' : widgetType;
	registerWidget({key: widgetType, JSX: ReliantChart, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractReliantChartTranslator {
		public getSupportedType(): string {
			return widgetType;
		}

		public getAttributeNamesMapping(): Undefinable<Record<Widget.CustomAttributeName, Widget.WidgetPropertyName>> {
			return {
				[`${widgetType}.merge`]: 'mergeData',
				[`${widgetType}.fetch`]: 'fetchData'
			};
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
