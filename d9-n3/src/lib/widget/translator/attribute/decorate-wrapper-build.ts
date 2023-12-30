import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {DecorateElement} from '@rainbow-d9/n2';
import {ParsedNodeType} from '../../../node-types';
import {ParsedList, ParsedListItemAttributePair, SemanticUtils} from '../../../semantic';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export const DecorateItemsByStrBuild = (value: string): Array<DecorateElement> => {
	return value.split(';')
		.map(item => item.trim())
		.filter(item => VUtils.isNotBlank(item));
};

export const DecorateWrapperBuild = (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<Array<DecorateElement>> => {
	if (VUtils.isNotBlank(value)) {
		return DecorateItemsByStrBuild(value);
	}
	if ((list.children ?? []).length == 0) {
		return [];
	}
	// should be a list
	if (list.children[0].type === ParsedNodeType.LIST) {
		return ((list.children[0] as ParsedList).children ?? [])
			.filter(SemanticUtils.isAttributesListItem)
			.filter(({attributes}) => attributes != null && attributes.length !== 0)
			.map(({attributes}) => attributes[0]);
	} else {
		return [];
	}
};

export const DecorateLeadsBuild: AttributeValueBuild<Array<DecorateElement>> = {
	accept: (key: WidgetPropertyName) => key === 'leads',
	build: DecorateWrapperBuild
};

export const DecorateTailsBuild: AttributeValueBuild<Array<DecorateElement>> = {
	accept: (key: WidgetPropertyName) => key === 'tails',
	build: DecorateWrapperBuild
};
