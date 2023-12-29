import {ExternalDefIndicator, VUtils} from '@rainbow-d9/n1';
import {ParsedNodeType} from '../../../node-types';
import {
	ParsedCode,
	ParsedEmphasis,
	ParsedInlineCode,
	ParsedList,
	ParsedListItemAttributePair,
	ParsedParagraph,
	ParsedStrong,
	ParsedText,
	SemanticUtils
} from '../../../semantic';
import {Nullable, Undefinable} from '../../../utility-types';
import {AbstractTranslator} from '../abstract-translator';
import {FALSE_VALUES, TRUE_VALUES} from './constants';
import {AttributeValueBuild, ScriptSnippet, WidgetPropertyName} from './types';

export interface ComplexMonitorableAttributeValue {
	on: Array<string>;
	snippet: ExternalDefIndicator | ScriptSnippet;
}

export type PossibleMonitorableAttributeValue<V extends ComplexMonitorableAttributeValue> = V | boolean;

export interface PossibleParsedAttributeValue {
	parsed: boolean;
	name?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any;
}

export abstract class MonitorableAttributeBuild<A extends ComplexMonitorableAttributeValue> implements AttributeValueBuild<PossibleMonitorableAttributeValue<A>> {
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

	protected parseCodeBlock(code: ParsedCode): ScriptSnippet {
		return code.text;
	}

	protected parseParagraph(textCarrier: ParsedParagraph | ParsedEmphasis | ParsedStrong): ScriptSnippet {
		return (textCarrier.children ?? [])
			.filter(child => {
				return [
					ParsedNodeType.INLINE_CODE,
					ParsedNodeType.TEXT, ParsedNodeType.EMPHASIS, ParsedNodeType.STRONG
				].includes(child.type);
			})
			.map(child => {
				if (child.type === ParsedNodeType.INLINE_CODE) {
					return (child as ParsedInlineCode).text;
				} else if (child.type === ParsedNodeType.TEXT) {
					return (child as ParsedText).text;
				} else if (child.type === ParsedNodeType.EMPHASIS) {
					return this.parseParagraph(child as ParsedEmphasis);
				} else if (child.type === ParsedNodeType.STRONG) {
					return this.parseParagraph(child as ParsedStrong);
				} else {
					return '';
				}
			}).join('');
	}

	protected parseHandle(attributeValue: string, item: ParsedListItemAttributePair): ExternalDefIndicator | ScriptSnippet {
		const {children} = item;
		const concerned = (children ?? [])
			.filter(child => child.type === ParsedNodeType.CODE || ParsedNodeType.PARAGRAPH);
		if (concerned.length === 0) {
			if (VUtils.isNotBlank(attributeValue)) {
				if (attributeValue.trim().toLowerCase().startsWith(AbstractTranslator.EXTERNAL_DEF_PREFIX)) {
					return new ExternalDefIndicator(attributeValue.trim().substring(AbstractTranslator.EXTERNAL_DEF_PREFIX.length));
				} else {
					return attributeValue;
				}
			} else {
				return '';
			}
		}
		const snippet = concerned.map(node => {
			if (node.type === ParsedNodeType.CODE) {
				return this.parseCodeBlock(node as ParsedCode);
			} else if (node.type === ParsedNodeType.PARAGRAPH) {
				return this.parseParagraph(node as ParsedParagraph);
			} else {
				return '';
			}
		}).join('\n');
		if (VUtils.isNotBlank(attributeValue)) {
			return `${attributeValue}\n${snippet}`;
		} else {
			return snippet;
		}
	}

	/**
	 * default do nothing, return parsed as false
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected parseAttribute(_attributeName: string, _attributeValue: string, _item: ParsedListItemAttributePair): PossibleParsedAttributeValue {
		return {parsed: false};
	}

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<PossibleMonitorableAttributeValue<A>> {
		if (VUtils.isNotBlank(value)) {
			value = (value || '').trim();
			if (TRUE_VALUES.includes(value)) {
				return true;
			} else if (FALSE_VALUES.includes(value)) {
				return false;
			} else {
				// should be a complex attribute value
				// parse later
			}
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
					complex.snippet = this.parseHandle(attributeValue, item);
				} else {
					const {parsed, name, value} = this.parseAttribute(attributeName, attributeValue, item);
					if (parsed) {
						complex[name] = value;
					}
				}
			});
		if (complex.on.length === 0 || VUtils.isBlank(complex.snippet)) {
			// invalid complex attribute value, ignored
			return (void 0);
		}
		return complex;
	}
}