import {NodeDef, registerWidget, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {PlanSelection} from './plan-selection';
import {PlanSelectionDef} from './types';

export const PlanSelectionDefsBuild = Widget.createSnippetBuild<PlanSelectionDef, 'defs', PlanSelectionDef['defs']>(
	'defs', (parsed: string) => new Function(parsed) as PlanSelectionDef['defs']);
export const PlanSelectionTitleBuild = Widget.createSnippetBuild<PlanSelectionDef, 'planTitle', PlanSelectionDef['planTitle']>(
	'planTitle', (parsed: string) => new Function('def', 'elementValueChanged', parsed) as PlanSelectionDef['planTitle']);
export const PlanSelectionSubTitleBuild = Widget.createSnippetBuild<PlanSelectionDef, 'planSubTitle', PlanSelectionDef['planSubTitle']>(
	'planSubTitle', (parsed: string) => new Function('def', 'elementValueChanged', 'currencySymbol', 'premiumDescription', parsed) as PlanSelectionDef['planSubTitle']);
export const PlanSelectionElementTitleBuild = Widget.createSnippetBuild<PlanSelectionDef, 'elementTitle', PlanSelectionDef['elementTitle']>(
	'elementTitle', (parsed: string) => new Function('def', 'level', parsed) as PlanSelectionDef['elementTitle']);
export const PlanSelectionElementFixedValueBuild = Widget.createSnippetBuild<PlanSelectionDef, 'elementFixedValue', PlanSelectionDef['elementFixedValue']>(
	'elementFixedValue', (parsed: string) => new Function('options', parsed) as PlanSelectionDef['elementFixedValue']);
export const PlanSelectionElementOptionsValueBuild = Widget.createSnippetBuild<PlanSelectionDef, 'elementOptionsValue', PlanSelectionDef['elementOptionsValue']>(
	'elementOptionsValue', (parsed: string) => new Function('options', parsed) as PlanSelectionDef['elementOptionsValue']);
export const PlanSelectionElementNumberValueBuild = Widget.createSnippetBuild<PlanSelectionDef, 'elementNumberValue', PlanSelectionDef['elementNumberValue']>(
	'elementNumberValue', (parsed: string) => new Function('options', parsed) as PlanSelectionDef['elementNumberValue']);
export const PlanSelectionElementNumberValueValidatorBuild = Widget.createSnippetBuild<PlanSelectionDef, 'elementNumberValueValidator', PlanSelectionDef['elementNumberValueValidator']>(
	'elementNumberValueValidator', (parsed: string) => new Function('options', parsed) as PlanSelectionDef['elementNumberValueValidator']);
export const PlanSelectionPlanOperatorsBuild = Widget.createSnippetBuild<PlanSelectionDef, 'planOperators', PlanSelectionDef['planOperators']>(
	'planOperators', (parsed: string) => new Function('def', 'plan', parsed) as PlanSelectionDef['planOperators']);
export const PlanSelectionCalculateBuild = Widget.createSnippetBuild<PlanSelectionDef, 'calculate', PlanSelectionDef['calculate']>(
	'calculate', (parsed: string) => new Function('event', parsed) as PlanSelectionDef['calculate']);

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
			PlanSelectionDefsBuild,
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
