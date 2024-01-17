import {ExternalDefIndicator, NodeDef, registerWidget, Undefinable, VUtils} from '@rainbow-d9/n1';
import {Semantic, Widget} from '@rainbow-d9/n3';
import {PlanSelection} from './plan-selection';
import {PlanSelectionDef} from './types';

export const createAttributeBuild = <P extends keyof PlanSelectionDef, F = PlanSelectionDef[P]>(
	attrName: P, createFunc: (parsed: string) => F
): Widget.AttributeValueBuild<F | ExternalDefIndicator> => {
	return {
		accept: (key: Widget.WidgetPropertyName) => key === attrName,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		build: (value: Undefinable<string>, list: Semantic.ParsedListItemAttributePair): Undefinable<F | ExternalDefIndicator> => {
			const parsed = Widget.parseSnippet(value, list);
			if (parsed instanceof ExternalDefIndicator) {
				// in fact, external def indicator is already intercepted by caller,
				// see AbstractTranslator.buildAttributeValue for more details
				return parsed;
			} else if (VUtils.isBlank(parsed)) {
				return (void 0);
			} else {
				return createFunc(parsed);
			}
		}
	};
};
export const PlanSelectionDefsBuild = createAttributeBuild<'defs'>(
	'defs', (parsed: string) => {
		return new Function(parsed) as PlanSelectionDef['defs'];
	});
export const PlanSelectionTitleBuild = createAttributeBuild<'planTitle'>(
	'planTitle', (parsed: string) => {
		return new Function('def', 'elementValueChanged', parsed) as PlanSelectionDef['planTitle'];
	});
export const PlanSelectionSubTitleBuild = createAttributeBuild<'planSubTitle'>(
	'planSubTitle', (parsed: string) => {
		return new Function('def', 'elementValueChanged', 'currencySymbol', 'premiumDescription', parsed) as PlanSelectionDef['planSubTitle'];
	});
export const PlanSelectionElementTitleBuild = createAttributeBuild<'elementTitle'>(
	'elementTitle', (parsed: string) => {
		return new Function('def', 'level', parsed) as PlanSelectionDef['elementTitle'];
	});
export const PlanSelectionElementFixedValueBuild = createAttributeBuild<'elementFixedValue'>(
	'elementFixedValue', (parsed: string) => {
		return new Function('options', parsed) as PlanSelectionDef['elementFixedValue'];
	});
export const PlanSelectionElementOptionsValueBuild = createAttributeBuild<'elementOptionsValue'>(
	'elementOptionsValue', (parsed: string) => {
		return new Function('options', parsed) as PlanSelectionDef['elementOptionsValue'];
	});
export const PlanSelectionElementNumberValueBuild = createAttributeBuild<'elementNumberValue'>(
	'elementNumberValue', (parsed: string) => {
		return new Function('options', parsed) as PlanSelectionDef['elementNumberValue'];
	});
export const PlanSelectionElementNumberValueValidatorBuild = createAttributeBuild<'elementNumberValueValidator'>(
	'elementNumberValueValidator', (parsed: string) => {
		return new Function('options', parsed) as PlanSelectionDef['elementNumberValueValidator'];
	});
export const PlanSelectionPlanOperatorsBuild = createAttributeBuild<'planOperators'>(
	'planOperators', (parsed: string) => {
		return new Function('def', 'plan', parsed) as PlanSelectionDef['planOperators'];
	});
export const PlanSelectionCalculateBuild = createAttributeBuild<'calculate'>(
	'calculate', (parsed: string) => {
		return new Function('event', parsed) as PlanSelectionDef['calculate'];
	});

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
