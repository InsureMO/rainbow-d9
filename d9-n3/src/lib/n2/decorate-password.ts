import {
	AttributeValueBuild,
	DecorateLeadsBuild,
	DecorateTailsBuild,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils
} from '../widget';
import {N2WidgetType} from './types';

export class N2DecoratePasswordTranslator extends SpecificWidgetTranslator<N2WidgetType.DECORATE_PASSWORD> {
	public getSupportedType(): N2WidgetType.DECORATE_PASSWORD {
		return N2WidgetType.DECORATE_PASSWORD;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [DecorateLeadsBuild, DecorateTailsBuild];
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
