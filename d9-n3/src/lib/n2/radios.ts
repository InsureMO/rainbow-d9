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

export class N2RadiosTranslator extends SpecificWidgetTranslator<N2WidgetType.RADIOS> {
	public getSupportedType(): N2WidgetType.RADIOS {
		return N2WidgetType.RADIOS;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Radios.sort': 'optionSort'};
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
