import {NodeDef, VUtils} from '@rainbow-d9/n1';
import {TableHeaderDef} from '@rainbow-d9/n2';
import {ParsedNodeType} from '../node-types';
import {ParsedList, ParsedListItemAttributePair, SemanticUtils} from '../semantic';
import {Undefinable} from '../utility-types';
import {AttributeValueBuild, SpecificArrayWidgetTranslator, WidgetPropertyName} from '../widget';
import {N2WidgetType} from './types';

export const N2TableHeadersBuild: AttributeValueBuild<Array<TableHeaderDef>> = {
	accept: (key: WidgetPropertyName) => key === 'headers',
	build: (_value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<Array<TableHeaderDef>> => {
		if (list.children == null || list.children.length === 0 || list.children[0].type !== ParsedNodeType.LIST) {
			return (void 0);
		}
		const headers: Array<TableHeaderDef> = ((list.children[0] as ParsedList).children ?? [])
			.filter(SemanticUtils.isAttributePairListItem)
			.map((pair, index) => {
				const {attributeName, attributeValue} = pair;
				if (VUtils.isBlank(attributeName)) {
					return null;
				} else if (attributeName.toLowerCase() === 'column' || VUtils.isBlank(attributeValue)) {
					// build by sub list item
					if (pair.children == null || pair.children.length === 0 || pair.children[0].type !== ParsedNodeType.LIST) {
						return null;
					}
					const parsed = ((pair.children[0] as ParsedList).children ?? [])
						.filter(SemanticUtils.isAttributePairListItem)
						.reduce((attrs, {attributeName, attributeValue}) => {
							const name = attributeName.toLowerCase().trim();
							if (name === 'label') {
								attrs.label = attributeValue.trim();
							} else if (name === 'width') {
								const value = attributeValue.trim();
								const positive = VUtils.isPositive(value);
								if (positive.test) {
									attrs.width = positive.value;
								} else {
									attrs.width = value;
								}
							}
							return attrs;
						}, {} as Omit<TableHeaderDef, 'index'>);
					if (VUtils.isNotBlank(parsed.label) && VUtils.isNotBlank(parsed.width)) {
						return {...parsed, index};
					} else {
						return null;
					}
				} else {
					const value = attributeValue.trim();
					const positive = VUtils.isPositive(value);
					if (positive.test) {
						return {label: attributeName.trim(), width: positive.value, index};
					} else {
						return {label: attributeName.trim(), width: value, index};
					}
				}
			}).filter(x => x != null);

		return headers.length === 0 ? (void 0) : headers;
	}
};

export class N2TableTranslator extends SpecificArrayWidgetTranslator<N2WidgetType.TABLE> {
	public getSupportedType(): N2WidgetType.TABLE {
		return N2WidgetType.TABLE;
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2TableHeadersBuild];
	}
}
