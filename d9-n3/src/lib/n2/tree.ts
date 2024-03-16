import {TreeDef} from '@rainbow-d9/n2';
import {AttributeValueBuild, createSyncSnippetBuild, SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export const N2TreeChildNodesBuild = createSyncSnippetBuild<TreeDef, 'detective'>('detective', ['parentNode', 'options']);

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
