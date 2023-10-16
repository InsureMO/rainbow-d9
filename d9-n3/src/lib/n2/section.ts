import {NodeDef} from '@rainbow-d9/n1';
import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2SectionTranslator extends SpecificWidgetTranslator<N2WidgetType.SECTION> {
	public getSupportedType(): N2WidgetType.SECTION {
		return N2WidgetType.SECTION;
	}

	public transformLabelAttributeName(): string {
		return 'title';
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}
}
