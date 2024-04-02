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

export class N2MultiDropdownTranslator extends SpecificWidgetTranslator<N2WidgetType.MULTI_DROPDOWN> {
	public getSupportedType(): N2WidgetType.MULTI_DROPDOWN {
		return N2WidgetType.MULTI_DROPDOWN;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'MultiDropdown.sort': 'optionSort'};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		// TODO ValueChangeableNodeDef
		return [N2DropdownOptionsBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild, ValueChangedBuild];
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
