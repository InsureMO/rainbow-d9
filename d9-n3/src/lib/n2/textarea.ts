import {AttributeValueBuild, MonitorHandlerDetective, SpecificWidgetTranslator, ValidatorUtils} from '../widget';
import {N2WidgetType} from './types';
import {N2valueChangeBuild} from "../widget/translator/attribute/n2value-change-build";

export class N2TextareaTranslator extends SpecificWidgetTranslator<N2WidgetType.TEXTAREA> {
	public getSupportedType(): N2WidgetType.TEXTAREA {
		return N2WidgetType.TEXTAREA;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2valueChangeBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
			...super.getValidationHandlerDetectives()
		];
	}
}
