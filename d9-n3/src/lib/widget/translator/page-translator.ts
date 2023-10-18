import {ParsedHeadingIdentified, SemanticHelper, WidgetType} from '../../semantic';
import {ParsedNodeDef} from '../../types';
import {AbstractTranslator} from './abstract-translator';

export class PageTranslator extends AbstractTranslator<ParsedHeadingIdentified> {
	isTypeSupported($wt: WidgetType): boolean {
		return $wt === SemanticHelper.PAGE;
	}

	public translate(node: ParsedHeadingIdentified): ParsedNodeDef {
		const $wt = SemanticHelper.PAGE;

		const classified = this.classifyAttributesAndSubWidgetsByList(node);
		const attributes = this.parseAndCombineAttributes({$wt, items: classified.attributes});

		const def = {
			$wt, ...attributes,
			$nodes: [
				...this.buildChildrenOnList({widgets: classified.widgets}),
				...this.buildChildrenOnSubHeadings({widgets: node.children})
			].map(parsed => parsed.node)
		};

		// page has no headline, use it as export key
		return {node: def, exportKey: node.headline, success: true};
	}
}
