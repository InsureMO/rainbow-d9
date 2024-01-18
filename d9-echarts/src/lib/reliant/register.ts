import {Nullable, Reaction, registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {ChartDef, REACTION_REFRESH_CHART, ReliantChartDef} from '../types';
import {ReliantChart} from './chart';

export const ReliantChartInitOptionsBuild = Widget.createSnippetBuild<ChartDef, 'initOptions', ChartDef['initOptions']>(
	'initOptions', (parsed: string) => new Function(parsed) as ChartDef['initOptions']);
export const ReliantChartOptionsBuild = Widget.createSnippetBuild<ReliantChartDef, 'options', ReliantChartDef['options']>(
	'options', (parsed: string) => new Function(parsed) as ReliantChartDef['options']);
export const ReliantChartSettingsBuild = Widget.createSnippetBuild<ReliantChartDef, 'settings', ReliantChartDef['settings']>(
	'settings', (parsed: string) => new Function(parsed) as ReliantChartDef['settings']);
export const ReliantChartMergeDataBuild = Widget.createSnippetBuild<ReliantChartDef, 'mergeData', ReliantChartDef['mergeData']>(
	'mergeData', (parsed: string) => new Function('options', 'data', parsed) as ReliantChartDef['mergeData']);
export const ReliantChartFetchDataBuild = Widget.createSnippetBuild<ReliantChartDef, 'fetchData', ReliantChartDef['fetchData']>(
	'fetchData', (parsed: string) => new Function('options', 'data', parsed) as ReliantChartDef['fetchData']);

export interface ReliantChartReactionCriteriaMonitorAttributeValue extends Widget.ReactionMonitorAttributeValue {
	type: 'criteria';
}

export class ReliantChartReactionCriteriaAttributeBuild extends Widget.AbstractReactionAttributeBuild<ReliantChartReactionCriteriaMonitorAttributeValue> {
	protected getReactionType(): Widget.ReactionTypes {
		return 'criteria';
	}

	protected getReturnReaction(): Reaction | string {
		return REACTION_REFRESH_CHART;
	}
}

export const ReliantChartReactionCriteriaBuild = new ReliantChartReactionCriteriaAttributeBuild();

export const ReliantChartReactionCriteriaHandlerDetective = Widget.createDefaultMonitorHandlerDetective({
	attributeName: 'criteria',
	// only returns false means invisible
	redressResult: (ret: Nullable<Reaction | string>): Reaction | string => (ret == null || VUtils.isBlank(ret)) ? REACTION_REFRESH_CHART : ret,
	ignoreDefault: true, deleteAttribute: true
});

export abstract class AbstractReliantChartTranslator extends Widget.SpecificWidgetTranslator<string> {
	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			ReliantChartInitOptionsBuild, ReliantChartOptionsBuild, ReliantChartSettingsBuild,
			ReliantChartMergeDataBuild, ReliantChartFetchDataBuild,
			ReliantChartReactionCriteriaBuild
		];
	}

	public getReactionHandlerDetectives(): Array<Widget.MonitorHandlerDetective> {
		return [
			...super.getReactionHandlerDetectives(),
			ReliantChartReactionCriteriaHandlerDetective
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
