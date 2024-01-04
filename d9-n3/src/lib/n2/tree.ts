import {ExternalDefIndicator, Undefinable, VUtils} from '@rainbow-d9/n1';
import {TreeNodeDef, TreeNodeDetect} from '@rainbow-d9/n2';
import {ParsedListItemAttributePair} from '../semantic';
import {AttributeValueBuild, SpecificWidgetTranslator, WidgetPropertyName} from '../widget';
import {parseSnippet} from '../widget/translator/attribute/snippet-attribute';
import {N2WidgetType} from './types';

export const N2TreeChildNodesBuild: AttributeValueBuild<TreeNodeDetect | ExternalDefIndicator> = {
	accept: (key: WidgetPropertyName) => key === 'detective',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<TreeNodeDetect | ExternalDefIndicator> => {
		const parsed = parseSnippet(value, list);
		if (parsed instanceof ExternalDefIndicator) {
			// in fact, external def indicator is already intercepted by caller,
			// see AbstractTranslator.buildAttributeValue for more details
			return parsed;
		} else if (VUtils.isBlank(parsed)) {
			return (void 0);
		} else {
			const func = new Function('parentNode', parsed);
			return (parentNode?: TreeNodeDef): Array<TreeNodeDef> => func(parentNode);
		}
	}
};

export class N2TreeTranslator extends SpecificWidgetTranslator<N2WidgetType.TREE> {
	public getSupportedType(): N2WidgetType.TREE {
		return N2WidgetType.TREE;
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2TreeChildNodesBuild];
	}
}
