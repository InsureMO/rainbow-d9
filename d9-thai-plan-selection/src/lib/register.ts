import {NodeDef, registerWidget, VUtils} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {PlanSelection} from './plan-selection';

export abstract class AbstractPlanSelectionTranslator extends Widget.SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
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
