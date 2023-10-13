import {Undefinable} from '../utility-types';
import {createOrGetParserRepositorySingleton, HeadingParser} from './parser';
import {IdentifiedBlock, IdentifiedBlockType, ParsedHeading, ParsedHeadingIdentified, WidgetFlag} from './types';
import {SemanticUtils} from './utils';

export class SemanticHelper extends HeadingParser {
	/** exactly use as entrypoint widget */
	public static readonly PAGE = 'Page';

	public classifyParsedHeadings(headings: Array<ParsedHeading>): IdentifiedBlock {
		const ignored: Array<ParsedHeading> = [];
		const used: Array<ParsedHeadingIdentified> = [];

		headings.forEach(heading => {
			if (SemanticUtils.isIdentifiedHeading(heading)) {
				if (heading.$flag === WidgetFlag.IGNORE || this.findIgnoreFlag(heading)) {
					// ignore flag might be a single line, should be detected
					// if so, modify block as ignored
					heading.$flag = WidgetFlag.IGNORE;
					ignored.push(heading);
				} else {
					used.push(heading);
				}
			} else if (SemanticUtils.isReservedHeading(heading)) {
				ignored.push(heading);
			}
		});

		if (used.length === 1) {
			// only one first level,
			// any other is subordinate of this one,
			// no independent existed
			const one = used[0];
			// detect type from the only one
			const type = one.$wt === SemanticHelper.PAGE ? IdentifiedBlockType.PAGE : IdentifiedBlockType.WIDGET;
			return {exported: [one], type, independent: [], ignored};
		}

		const roots: Array<ParsedHeadingIdentified> = [];
		const independent: Array<ParsedHeadingIdentified> = [];

		if (used.some(heading => heading.$wt === SemanticHelper.PAGE)) {
			// has page
			used.forEach(heading => {
				if (heading.$wt === SemanticHelper.PAGE) {
					roots.push(heading);
				} else {
					independent.push(heading);
				}
			});
			return {exported: roots, type: IdentifiedBlockType.PAGE, independent, ignored};
		} else {
			// no page, it is a component widget
			used.forEach(heading => {
				if (heading.$flag === WidgetFlag.EXPORT) {
					roots.push(heading);
				} else if (this.findExportFlag(heading)) {
					heading.$flag = WidgetFlag.EXPORT;
					roots.push(heading);
				} else {
					independent.push(heading);
				}
			});
			return {exported: roots, type: IdentifiedBlockType.WIDGET, independent, ignored};
		}
	}
}

const SINGLETON: {
	helper: Undefinable<SemanticHelper>
} = {helper: (void 0)};

export const createOrGetSemanticHelperSingleton = (): SemanticHelper => {
	if (SINGLETON.helper == null) {
		SINGLETON.helper = new SemanticHelper(createOrGetParserRepositorySingleton());
	}
	return SINGLETON.helper;
};
