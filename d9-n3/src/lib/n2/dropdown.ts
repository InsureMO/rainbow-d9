import {VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, DropdownOptionSort, DropdownOptionValue} from '@rainbow-d9/n2';
import {ParsedNodeType} from '../node-types';
import {ParsedList, ParsedListItemAttributePair, SemanticUtils} from '../semantic';
import {Undefinable} from '../utility-types';
import {
	AttributeValueBuild,
	CustomAttributeName,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2DropdownOptionsByStrBuild = (value: string): DropdownOptions<DropdownOptionValue> => {
	return value.split(';')
		.map(option => option.trim())
		.filter(option => VUtils.isNotBlank(option))
		.map(option => option.split(':'))
		.map(([value, label]) => [value.trim(), (label ?? '').trim()])
		.filter(([value, label]) => VUtils.isNotBlank(value) && VUtils.isNotBlank(label))
		.map(([value, label]) => ({value, label}));
};

export const N2DropdownOptionsBuild: AttributeValueBuild<DropdownOptions<DropdownOptionValue>> = {
	accept: (key: WidgetPropertyName) => key === 'options',
	build: (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<DropdownOptions<DropdownOptionValue>> => {
		if (VUtils.isNotBlank(value)) {
			return N2DropdownOptionsByStrBuild(value);
		}
		if ((list.children ?? []).length == 0) {
			return [];
		}
		// should be a list
		if (list.children[0].type === ParsedNodeType.LIST) {
			return ((list.children[0] as ParsedList).children ?? [])
				.filter(SemanticUtils.isAttributePairListItem)
				.map(({attributeName, attributeValue}) => ({value: attributeName, label: attributeValue}));
		} else {
			return [];
		}
	}
};

export const N2DropdownSortBuild: AttributeValueBuild<DropdownOptionSort> = {
	accept: (key: WidgetPropertyName) => key === 'optionSort',
	build: (value: Undefinable<string>): Undefinable<DropdownOptionSort> => {
		if (VUtils.isBlank(value)) {
			return (void 0);
		}
		value = value.trim().toLowerCase();
		if (value == 'asc') {
			return DropdownOptionSort.ASC;
		} else if (value == 'desc') {
			return DropdownOptionSort.DESC;
		} else {
			return (void 0);
		}
	}
};

export class N2DropdownTranslator extends SpecificWidgetTranslator<N2WidgetType.DROPDOWN> {
	public getSupportedType(): N2WidgetType.DROPDOWN {
		return N2WidgetType.DROPDOWN;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Dropdown.sort': 'optionSort'};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2DropdownOptionsBuild, N2DropdownSortBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [ValidatorUtils.DETECT_REQUIRED];
	}
}
