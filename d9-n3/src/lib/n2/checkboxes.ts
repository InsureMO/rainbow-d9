import {Undefinable} from '@rainbow-d9/n1';
import {
	AttributeValueBuild,
	CustomAttributeName,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils,
	ValueChangedBuild,
	WidgetPropertyName
} from '../widget';
import {
	N2DropdownOptionsBuild,
	N2DropdownReactionRefreshOptionsBuild,
	N2DropdownReactionRefreshOptionsHandlerDetective,
	N2DropdownSortBuild
} from './dropdown';
import {N2WidgetType} from './types';

export abstract class AbstractN2CheckboxesTranslator<T extends N2WidgetType.CHECKBOXES | N2WidgetType.CHECKS> extends SpecificWidgetTranslator<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2DropdownOptionsBuild, N2DropdownSortBuild, ValueChangedBuild, N2DropdownReactionRefreshOptionsBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...super.getReactionHandlerDetectives(),
			N2DropdownReactionRefreshOptionsHandlerDetective
		];
	}
}

export class N2CheckboxesTranslator extends AbstractN2CheckboxesTranslator<N2WidgetType.CHECKBOXES> {
	public getSupportedType(): N2WidgetType.CHECKBOXES {
		return N2WidgetType.CHECKBOXES;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Checkboxes.sort': 'optionSort'};
	}
}

export class N2ChecksTranslator extends AbstractN2CheckboxesTranslator<N2WidgetType.CHECKS> {
	public getSupportedType(): N2WidgetType.CHECKS {
		return N2WidgetType.CHECKS;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Checks.sort': 'optionSort'};
	}
}
