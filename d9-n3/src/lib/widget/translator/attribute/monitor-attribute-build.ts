import {ExternalDefIndicator, Nullable, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedNodeType} from '../../../node-types';
import {ParsedList, ParsedListItemAttributePair, SemanticUtils} from '../../../semantic';
import {FALSE_VALUES, TRUE_VALUES} from './constants';
import {parseSnippet} from './snippet-attribute';
import {AttributeValueBuild, ScriptSnippet, WidgetPropertyName} from './types';

export interface ComplexMonitorableAttributeValue {
	on: Array<string>;
	snippet?: ExternalDefIndicator | ScriptSnippet;
}

export type PossibleMonitorableAttributeValue<V extends ComplexMonitorableAttributeValue, O> = V | O;

export interface PossibleParsedAttributeValue {
	parsed: boolean;
	name?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any;
}

export abstract class MonitorableAttributeBuild<A extends ComplexMonitorableAttributeValue, O> implements AttributeValueBuild<PossibleMonitorableAttributeValue<A, O>> {
	public abstract accept(key: WidgetPropertyName): boolean;

	protected createComplexAttributeValue(): A {
		return {on: [], snippet: ''} as A;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected parseOn(value: Undefinable<string>, _list: ParsedListItemAttributePair): Array<string> {
		if (VUtils.isNotBlank(value)) {
			return value.split(',').map(item => item.trim()).filter(item => item.length !== 0);
		} else {
			return [];
		}
	}

	/**
	 * default do nothing, return parsed as false
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected parseAttribute(_attributeName: string, _attributeValue: string, _item: ParsedListItemAttributePair): PossibleParsedAttributeValue {
		return {parsed: false};
	}

	protected abstract detectBooleanValues(): boolean;

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<PossibleMonitorableAttributeValue<A, O>> {
		if (VUtils.isNotBlank(value)) {
			value = (value || '').trim();
			if (this.detectBooleanValues()) {
				if (TRUE_VALUES.includes(value)) {
					return true as O;
				} else if (FALSE_VALUES.includes(value)) {
					return false as O;
				}
			}
			// should be a complex attribute value
			// parse later
		}
		if (list == null || list.children == null || list.children.length === 0) {
			// nothing else can be parsed, ignored
			return (void 0);
		}
		if (list.children[0].type !== ParsedNodeType.LIST) {
			// should be a sub list which contains one "on" and one "handle"
			return (void 0);
		}
		const complex = this.createComplexAttributeValue();
		((list.children[0] as ParsedList).children ?? [])
			.filter(SemanticUtils.isAttributePairListItem)
			.map(item => {
				const {attributeName, attributeValue} = item;
				if (attributeName === 'on') {
					complex.on = this.parseOn(attributeValue, item);
				} else if (attributeName === 'handle') {
					complex.snippet = parseSnippet(attributeValue, item);
				} else {
					const {parsed, name, value} = this.parseAttribute(attributeName, attributeValue, item);
					if (parsed) {
						complex[name] = value;
					}
				}
			});
		return complex;
	}
}