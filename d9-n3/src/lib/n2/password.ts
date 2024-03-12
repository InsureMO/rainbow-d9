import {MonitorHandlerDetective, SpecificWidgetTranslator, ValidatorUtils} from '../widget';
import {N2WidgetType} from './types';

export class N2PasswordTranslator extends SpecificWidgetTranslator<N2WidgetType.PASSWORD> {
	public getSupportedType(): N2WidgetType.PASSWORD {
		return N2WidgetType.PASSWORD;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
			ValidatorUtils.DETECT_REGEX,
			...super.getValidationHandlerDetectives()
		];
	}
}
