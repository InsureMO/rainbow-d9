import {NodeDef, registerWidget, VUtils} from '@rainbow-d9/n1';
import {SpecificWidgetTranslator} from '@rainbow-d9/n3/src/lib/widget';
import {PlanSelection} from './plan-selection';

export abstract class AbstractPlanSelectionTranslator extends SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}
}

export const registerPlanSelect = (widgetType?: string) => {
	widgetType = VUtils.isBlank(widgetType) ? 'PlanSelect' : widgetType;
	registerWidget({key: widgetType, JSX: PlanSelection, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractPlanSelectionTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
};
