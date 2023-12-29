import {Undefinable} from '../utility-types';
import {
	AttributeValueBuild,
	CustomAttributeName,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils,
	WidgetPropertyName
} from '../widget';
import {N2DropdownOptionsBuild, N2DropdownSortBuild} from './dropdown';
import {N2WidgetType} from './types';

export class N2CheckboxesTranslator extends SpecificWidgetTranslator<N2WidgetType.CHECKBOXES> {
	public getSupportedType(): N2WidgetType.CHECKBOXES {
		return N2WidgetType.CHECKBOXES;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Checkboxes.sort': 'optionSort'};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2DropdownOptionsBuild, N2DropdownSortBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2ChecksTranslator extends SpecificWidgetTranslator<N2WidgetType.CHECKS> {
	public getSupportedType(): N2WidgetType.CHECKS {
		return N2WidgetType.CHECKS;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Checks.sort': 'optionSort'};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2DropdownOptionsBuild, N2DropdownSortBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}
