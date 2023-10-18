import {NodeDef} from '@rainbow-d9/n1';
import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2ButtonBarTranslator extends SpecificWidgetTranslator<N2WidgetType.BUTTON_BAR> {
	public getSupportedType(): N2WidgetType.BUTTON_BAR {
		return N2WidgetType.BUTTON_BAR;
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}
}
