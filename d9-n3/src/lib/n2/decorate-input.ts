import {
	AttributeValueBuild,
	DecorateLeadsBuild,
	DecorateTailsBuild,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils
} from '../widget';
import {N2WidgetType} from './types';

export class N2DecorateInputTranslator extends SpecificWidgetTranslator<N2WidgetType.DECORATE_INPUT> {
	public getSupportedType(): N2WidgetType.DECORATE_INPUT {
		return N2WidgetType.DECORATE_INPUT;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [DecorateLeadsBuild, DecorateTailsBuild];
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
