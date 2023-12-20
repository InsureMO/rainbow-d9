import {NodeDef} from '@rainbow-d9/n1';
import {Undefinable} from '../utility-types';
import {CustomAttributeName, SpecificArrayWidgetTranslator, WidgetPropertyName} from '../widget';
import {N2WidgetType} from './types';

abstract class AbstractRibsTranslator<T extends N2WidgetType.RIBS | N2WidgetType.READONLY_RIBS> extends SpecificArrayWidgetTranslator<T> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getToWidgetAttributeNames(): Array<string> {
		return [...super.getToWidgetAttributeNames(), 'caption'];
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return this.buildDefaultAttributeNamesMapping({[`${this.getSupportedType()}.elementTitle`]: 'caption'});
	}
}

export class N2RibsTranslator extends AbstractRibsTranslator<N2WidgetType.RIBS> {
	public getSupportedType(): N2WidgetType.RIBS {
		return N2WidgetType.RIBS;
	}
}

export class N2RibsViewTranslator extends AbstractRibsTranslator<N2WidgetType.READONLY_RIBS> {
	public getSupportedType(): N2WidgetType.READONLY_RIBS {
		return N2WidgetType.READONLY_RIBS;
	}
}
