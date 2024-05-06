import {NodeDef, registerWidget, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {PlanSelection} from './plan-selection';
import {PlanSelectionDef} from './types';

export const PlanSelectionDefsBuild = Widget.createAsyncSnippetBuild<PlanSelectionDef, 'defs'>('defs', ['options']);
export const PlanSelectionValuesInitBuild = Widget.createAsyncSnippetBuild<PlanSelectionDef, 'valuesInit'>('valuesInit', ['options']);
export const PlanSelectionValuesClearBuild = Widget.createAsyncSnippetBuild<PlanSelectionDef, 'valuesClear'>('valuesClear', ['options']);
export const PlanSelectionTitleBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'planTitle'>('planTitle', ['def', 'elementValueChanged']);
export const PlanSelectionSubTitleBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'planSubTitle'>('planSubTitle', ['def', 'elementValueChanged', 'currencySymbol', 'premiumDescription']);
export const PlanSelectionElementTitleBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'elementTitle'>('elementTitle', ['def', 'level', 'forceUpdate']);
export const PlanSelectionElementFixedValueBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'elementFixedValue'>('elementFixedValue', ['options']);
export const PlanSelectionElementOptionsValueBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'elementOptionsValue'>('elementOptionsValue', ['options']);
export const PlanSelectionElementNumberValueBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'elementNumberValue'>('elementNumberValue', ['options']);
export const PlanSelectionElementNumberValueValidatorBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'elementNumberValueValidator'>('elementNumberValueValidator', ['options']);
export const PlanSelectionPlanOperatorsBuild = Widget.createSyncSnippetBuild<PlanSelectionDef, 'planOperators'>('planOperators', ['def', 'plan']);
export const PlanSelectionCalculateBuild = Widget.createAsyncSnippetBuild<PlanSelectionDef, 'calculate'>('calculate', ['event']);

export abstract class AbstractPlanSelectionTranslator extends Widget.SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			PlanSelectionDefsBuild, PlanSelectionValuesInitBuild, PlanSelectionValuesClearBuild,
			PlanSelectionTitleBuild, PlanSelectionSubTitleBuild, PlanSelectionElementTitleBuild,
			PlanSelectionElementFixedValueBuild, PlanSelectionElementOptionsValueBuild,
			PlanSelectionElementNumberValueBuild, PlanSelectionElementNumberValueValidatorBuild,
			PlanSelectionPlanOperatorsBuild,
			PlanSelectionCalculateBuild
		];
	}
}

export const registerPlanSelect = (widgetHelper: Widget.WidgetHelper, widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'PlanSelect' : widgetType;
	registerWidget({key: widgetType, JSX: PlanSelection, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractPlanSelectionTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
