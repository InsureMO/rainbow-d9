import {NUtils, VUtils} from '@rainbow-d9/n1';
import {Heading} from 'mdast';
import {PreparsedHeading} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {Undefinable} from '../../utility-types';
import {
	ParsedHeading,
	ParsedHeadingIdentified,
	ParsedHeadingKind,
	ParsedHeadingReserved,
	ParsedParagraph,
	WidgetFlag
} from '../types';
import {AbstractSemanticNodeWidgetParser} from './semantic-node-parser';

export type ParsedHeadingTitle = {
	title: string,
	$flag: WidgetFlag
};

export class HeadingParser extends AbstractSemanticNodeWidgetParser<'heading'> {
	public static readonly WIDGET_TITLE_FLAG_MATCHER = /^(.*?)(::IGNORE|::EXPORT)?$/;
	public static readonly TYPE: Heading['type'] = 'heading';

	public getSupportedType(): 'heading' {
		return HeadingParser.TYPE;
	}

	protected asReserved(heading: ParsedHeading): ParsedHeadingReserved {
		heading.kind = ParsedHeadingKind.RESERVED;
		return heading as ParsedHeadingReserved;
	}

	protected getTitleFlagMatcher(): RegExp {
		return HeadingParser.WIDGET_TITLE_FLAG_MATCHER;
	}

	protected findIgnoreFlag(node: ParsedHeadingIdentified): boolean {
		const paragraph = (node.children ?? []).find(child => child.type === ParsedNodeType.PARAGRAPH) as Undefinable<ParsedParagraph>;
		if (paragraph == null) {
			return false;
		} else if (paragraph.children.length !== 1) {
			return false;
		} else if (paragraph.children[0].type !== ParsedNodeType.TEXT) {
			return false;
		} else {
			return paragraph.children[0].text.trim() === this.getIgnoreFlagLine();
		}
	}

	protected findExportFlag(node: ParsedHeadingIdentified): boolean {
		const paragraph: ParsedParagraph = (node.children ?? []).find(child => child.type === ParsedNodeType.PARAGRAPH) as ParsedParagraph | undefined;
		if (paragraph == null) {
			return false;
		} else if (paragraph.children.length !== 1) {
			return false;
		} else if (paragraph.children[0].type !== ParsedNodeType.TEXT) {
			return false;
		} else {
			return paragraph.children[0].text.trim() === this.getExportFlagLine();
		}
	}

	protected parseTitle(title: string): ParsedHeadingTitle {
		const match = title.match(this.getTitleFlagMatcher());
		if (match == null) {
			return {title, $flag: WidgetFlag.STANDARD};
		} else {
			return {title: match[1], $flag: this.asWidgetFlag(match[2])};
		}
	}

	protected matchWidget(title: string): Pick<ParsedHeadingIdentified, '$wt' | 'headline' | '$id' | '$key'> {
		const segments = title.split(this.getWidgetTitleSplitter());
		const $key = NUtils.generateReactKey();
		if (segments.length === 1) {
			const $wt = segments[0].trim();
			return {$wt, headline: '', $id: $key, $key};
		} else if (segments.length >= 3) {
			const $id = segments[segments.length - 1].trim();
			const $wt = segments[0].trim();
			const headline = segments.slice(1, segments.length - 1).join(this.getWidgetTitleSplitter()).trim();
			return {$wt, headline: headline.trim(), $id, $key};
		} else {
			const $wt = segments[0].trim();
			const headline = segments[1].trim();
			return {$wt, headline: VUtils.isBlank(headline) ? (void 0) : headline.trim(), $id: $key, $key};
		}
	}

	public parsePreparsed(preparsed: PreparsedHeading): ParsedHeading {
		const parsed: ParsedHeading = {type: ParsedNodeType.HEADING, kind: ParsedHeadingKind.IDENTIFIED, preparsed};
		const title = this.askTitle(this.parseManyNative(preparsed.content.children ?? []));
		if (title === false) {
			// can not detect title
			return this.asReserved(parsed);
		} else if (VUtils.isBlank(title)) {
			// no title existing
			return this.asReserved(parsed);
		}
		const {title: titleStr, $flag} = this.parseTitle(title);

		const widget = this.matchWidget(titleStr);
		if (VUtils.isBlank(widget.$wt)) {
			return this.asReserved(parsed);
		}
		return {
			...parsed, ...widget, $flag,
			children: this.parseManyPreparsed(preparsed.children ?? [])
		} as ParsedHeadingIdentified;
	}
}
