import {ExternalDefIndicator, VUtils} from '@rainbow-d9/n1';
import {ParsedNodeType} from '../../../node-types';
import {
	ParsedCode,
	ParsedEmphasis,
	ParsedInlineCode,
	ParsedListItemAttributePair,
	ParsedParagraph,
	ParsedStrong,
	ParsedText
} from '../../../semantic';
import {AbstractTranslator} from '../abstract-translator';
import {ScriptSnippet} from './types';

const parseCodeBlock = (code: ParsedCode): ScriptSnippet => {
	return code.text;
};

const parseParagraph = (textCarrier: ParsedParagraph | ParsedEmphasis | ParsedStrong): ScriptSnippet => {
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
				return parseParagraph(child as ParsedEmphasis);
			} else if (child.type === ParsedNodeType.STRONG) {
				return parseParagraph(child as ParsedStrong);
			} else {
				return '';
			}
		}).join('');
};

export const parseSnippet = (attributeValue: string, item: ParsedListItemAttributePair): ExternalDefIndicator | ScriptSnippet => {
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
			return parseCodeBlock(node as ParsedCode);
		} else if (node.type === ParsedNodeType.PARAGRAPH) {
			return parseParagraph(node as ParsedParagraph);
		} else {
			return '';
		}
	}).join('\n');
	if (VUtils.isNotBlank(attributeValue)) {
		return `${attributeValue}\n${snippet}`;
	} else {
		return snippet;
	}
};
