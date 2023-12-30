import {Undefinable} from '@rainbow-d9/n1';
import {N3Logger} from '../../logger';
import {ParsedNodeType} from '../../node-types';
import {
	ParsedEmphasis,
	ParsedInlineCode,
	ParsedNodeMap,
	ParsedPhrasingNodes,
	ParsedStrong,
	ParsedText,
	WidgetFlag
} from '../types';
import {AbstractParser} from './abstract-parser';

export abstract class AbstractSemanticNodeParser<T extends keyof ParsedNodeMap> extends AbstractParser {
	/**
	 * get supported node type
	 */
	public abstract getSupportedType(): T;

	/**
	 * check the given type is supported or not
	 */
	public accept(type: keyof ParsedNodeMap): boolean {
		return type === this.getSupportedType();
	}

	/**
	 * parse preparsed node
	 */
	public abstract parsePreparsed(preparsed: ParsedNodeMap[T]['preparsed']): ParsedNodeMap[T];

	/**
	 * parse native markdown ast node
	 */
	public parseNative(node: ParsedNodeMap[T]['preparsed']['content']): Undefinable<ParsedNodeMap[T]> {
		const preparser = this.findPreparser(node.type);
		if (preparser != null) {
			return this.parsePreparsed(preparser.parse(node));
		} else {
			N3Logger.error(`Node[type=${node.type}] not supported yet.`, AbstractSemanticNodeParser.name);
			return (void 0);
		}
	}
}

export type ValidTitlePhrasing = ParsedText | ParsedEmphasis | ParsedStrong | ParsedInlineCode;

export abstract class AbstractSemanticNodeWidgetParser<T extends keyof ParsedNodeMap> extends AbstractSemanticNodeParser<T> {
	public static readonly WIDGET_TITLE_SPLITTER = '::';
	// flag line, pattern is "[//] # (some comments)"
	public static readonly COMMENT_LINE_MATCHER = /^\[\/\/]\s+#\s+\((.*)\)\s*$/;
	public static readonly IGNORE_FLAG_LINE = '[//] # (IGNORE)';
	public static readonly EXPORT_FLAG_LINE = '[//] # (EXPORT)';
	// flags tailing in line, only available on heading and list item
	public static readonly TAILING_IGNORE_FLAG = '::IGNORE';
	public static readonly TAILING_EXPORT_FLAG = '::EXPORT';

	protected getWidgetTitleSplitter(): string {
		return AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
	}

	protected getCommentLineMatcher(): RegExp {
		return AbstractSemanticNodeWidgetParser.COMMENT_LINE_MATCHER;
	}

	protected getIgnoreFlagLine(): string {
		return AbstractSemanticNodeWidgetParser.IGNORE_FLAG_LINE;
	}

	protected getTailingIgnoreFlag(): string {
		return AbstractSemanticNodeWidgetParser.TAILING_IGNORE_FLAG;
	}

	protected getExportFlagLine(): string {
		return AbstractSemanticNodeWidgetParser.EXPORT_FLAG_LINE;
	}

	protected getTailingExportFlag(): string {
		return AbstractSemanticNodeWidgetParser.TAILING_EXPORT_FLAG;
	}

	protected isValidPhrasingForTitle(phrasing: ParsedPhrasingNodes): phrasing is ValidTitlePhrasing {
		switch (phrasing.type) {
			case ParsedNodeType.TEXT:
			case ParsedNodeType.INLINE_CODE:
				return true;
			case ParsedNodeType.EMPHASIS:
			case ParsedNodeType.STRONG:
				return phrasing.children.every(this.isValidPhrasingForTitle);
			default:
				N3Logger.info(`Parsed phrasing[${phrasing.preparsed.content.type}]`, AbstractSemanticNodeWidgetParser.name);
				return false;
		}
	}

	protected toPlainText(phrasing: ValidTitlePhrasing) {
		switch (phrasing.type) {
			case ParsedNodeType.TEXT:
				return phrasing.text;
			case ParsedNodeType.INLINE_CODE:
				return phrasing.text;
			case ParsedNodeType.EMPHASIS:
			case ParsedNodeType.STRONG:
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore child type passed check, so must be valid phrasing type
				return phrasing.children.map(child => this.toPlainText(child));
			default:
				return '';
		}
	}

	protected askTitle(phrasings: Array<ParsedPhrasingNodes>): false | string {
		const accepted = phrasings.filter(this.isValidPhrasingForTitle);
		if (accepted.length !== phrasings.length) {
			return false;
		}
		return accepted.map(phrasing => this.toPlainText(phrasing)).join('').trim();
	}

	protected asWidgetFlag(text?: string): WidgetFlag {
		text = (text ?? '').trim();
		const toCompare = text.startsWith(this.getWidgetTitleSplitter()) ? text : `${this.getWidgetTitleSplitter()}${text}`;
		switch (toCompare) {
			case this.getTailingIgnoreFlag():
				return WidgetFlag.IGNORE;
			case this.getTailingExportFlag():
				return WidgetFlag.EXPORT;
			default:
				return WidgetFlag.STANDARD;
		}
	}
}
