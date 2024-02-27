import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2BoxTranslator extends SpecificWidgetTranslator<N2WidgetType.BOX> {
	public getSupportedType(): N2WidgetType.BOX {
		return N2WidgetType.BOX;
	}
}
