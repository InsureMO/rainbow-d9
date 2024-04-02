import {InputDef} from '@rainbow-d9/n2';
import {
	AttributeValueBuild,
	createSyncSnippetBuild,
	DecorateLeadsBuild,
	DecorateTailsBuild,
	MonitorHandlerDetective, N2ValueChangedBuild,
	SpecificWidgetTranslator,
	ValidatorUtils
} from '../widget';
import {N2WidgetType} from './types';

const StandardInputValidators = [
	ValidatorUtils.DETECT_REQUIRED,
	ValidatorUtils.DETECT_LENGTH,
	ValidatorUtils.DETECT_NUMERIC,
	ValidatorUtils.DETECT_POSITIVE,
	ValidatorUtils.DETECT_NOT_NEGATIVE,
	ValidatorUtils.DETECT_INTEGER,
	ValidatorUtils.DETECT_NUMBER_RANGE,
	ValidatorUtils.DETECT_REGEX
];
const PasswordInputValidators = [
	ValidatorUtils.DETECT_REQUIRED,
	ValidatorUtils.DETECT_LENGTH,
	ValidatorUtils.DETECT_REGEX
];

export const InputMaskBuild = createSyncSnippetBuild<InputDef, 'mask'>('mask', [], true);

export class N2InputTranslator extends SpecificWidgetTranslator<N2WidgetType.INPUT> {
	public getSupportedType(): N2WidgetType.INPUT {
		return N2WidgetType.INPUT;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		// TODO ValueChangeableNodeDef
		return [InputMaskBuild, N2ValueChangedBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...StandardInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2NumberTranslator extends SpecificWidgetTranslator<N2WidgetType.NUMBER> {
	public getSupportedType(): N2WidgetType.NUMBER {
		return N2WidgetType.NUMBER;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...StandardInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2PasswordTranslator extends SpecificWidgetTranslator<N2WidgetType.PASSWORD> {
	public getSupportedType(): N2WidgetType.PASSWORD {
		return N2WidgetType.PASSWORD;
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...PasswordInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2DecorateInputTranslator extends SpecificWidgetTranslator<N2WidgetType.DECORATE_INPUT> {
	public getSupportedType(): N2WidgetType.DECORATE_INPUT {
		return N2WidgetType.DECORATE_INPUT;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [InputMaskBuild, DecorateLeadsBuild, DecorateTailsBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...StandardInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2DecorateNumberTranslator extends SpecificWidgetTranslator<N2WidgetType.DECORATE_NUMBER> {
	public getSupportedType(): N2WidgetType.DECORATE_NUMBER {
		return N2WidgetType.DECORATE_NUMBER;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [DecorateLeadsBuild, DecorateTailsBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...StandardInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}

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
			...PasswordInputValidators,
			...super.getValidationHandlerDetectives()
		];
	}
}