import {ContainerDef, ExternalDefIndicator, NodeDef} from '@rainbow-d9/n1';
import {SectionDef, TabDef, TabsDef} from '@rainbow-d9/n2';
import {SpecificWidgetTranslator, AttributeValueBuild, createAsyncSnippetBuild} from '../widget';
import {N2WidgetType} from './types';


export const N2TabDataChangedBuild = createAsyncSnippetBuild<TabDef, 'data'>('data', ['options']);
export const N2TabBodyChangedBuild = createAsyncSnippetBuild<TabDef, 'body'>('body', ['marker']);

export class N2TabTranslator extends SpecificWidgetTranslator<N2WidgetType.TAB> {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		// TODO TabDef Data&Body
		return [N2TabDataChangedBuild, N2TabBodyChangedBuild];
	}

	public getSupportedType(): N2WidgetType.TAB {
		return N2WidgetType.TAB;
	}

	public transformLabelAttributeName(): string {
		return 'title';
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getToWidgetAttributeNames(): Array<string> {
		return [...super.getToWidgetAttributeNames(), 'title', 'badge'];
	}

	public postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		const tabDef = defs as unknown as TabDef;
		if (tabDef.body == null || !(tabDef.body instanceof ExternalDefIndicator)) {
			tabDef.body = {
				$wt: N2WidgetType.SECTION,
				$nodes: defs.$nodes
			} as SectionDef;
			delete defs.$nodes;
		}
		return defs as unknown as Def;
	}
}

export class N2TabsTranslator extends SpecificWidgetTranslator<N2WidgetType.TABS> {
	public getSupportedType(): N2WidgetType.TABS {
		return N2WidgetType.TABS;
	}


	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		(defs as unknown as TabsDef).contents = defs.$nodes as Array<TabDef>;
		delete defs.$nodes;
		return defs as unknown as Def;
	}
}
