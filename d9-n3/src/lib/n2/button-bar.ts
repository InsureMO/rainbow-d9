import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2ButtonBarTranslator extends SpecificWidgetTranslator<N2WidgetType.BUTTON_BAR> {
	public getSupportedType(): N2WidgetType.BUTTON_BAR {
		return N2WidgetType.BUTTON_BAR;
	}
}
