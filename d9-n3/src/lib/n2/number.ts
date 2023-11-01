import {MonitorHandlerDetective, SpecificWidgetTranslator, ValidatorUtils} from '../widget';
import {N2WidgetType} from './types';

export class N2NumberTranslator extends SpecificWidgetTranslator<N2WidgetType.NUMBER> {
	public getSupportedType(): N2WidgetType.NUMBER {
		return N2WidgetType.NUMBER;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
			ValidatorUtils.DETECT_NUMERIC,
			ValidatorUtils.DETECT_POSITIVE,
			ValidatorUtils.DETECT_NOT_POSITIVE,
			ValidatorUtils.DETECT_INTEGER,
			ValidatorUtils.DETECT_NUMBER_RANGE
		];
	}
}
