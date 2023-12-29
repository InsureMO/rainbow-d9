import {MonitorHandlerDetective, SpecificWidgetTranslator, ValidatorUtils} from '../widget';
import {N2WidgetType} from './types';

export class N2TextareaTranslator extends SpecificWidgetTranslator<N2WidgetType.TEXTAREA> {
	public getSupportedType(): N2WidgetType.TEXTAREA {
		return N2WidgetType.TEXTAREA;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
			...super.getValidationHandlerDetectives()
		];
	}
}
