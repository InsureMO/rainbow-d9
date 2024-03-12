import {MonitorHandlerDetective, SpecificWidgetTranslator, ValidatorUtils} from '../widget';
import {N2WidgetType} from './types';

export class N2InputTranslator extends SpecificWidgetTranslator<N2WidgetType.INPUT> {
	public getSupportedType(): N2WidgetType.INPUT {
		return N2WidgetType.INPUT;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
			ValidatorUtils.DETECT_NUMERIC,
			ValidatorUtils.DETECT_POSITIVE,
			ValidatorUtils.DETECT_NOT_NEGATIVE,
			ValidatorUtils.DETECT_INTEGER,
			ValidatorUtils.DETECT_NUMBER_RANGE,
			ValidatorUtils.DETECT_REGEX,
			...super.getValidationHandlerDetectives()
		];
	}
}
