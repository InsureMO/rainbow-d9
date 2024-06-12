import {AttributeValueBuild, SpecificWidgetTranslator, TipAttachableBuild} from '../widget';
import {N2WidgetType} from './types';

export class N2BoxTranslator extends SpecificWidgetTranslator<N2WidgetType.BOX> {
	public getSupportedType(): N2WidgetType.BOX {
		return N2WidgetType.BOX;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [TipAttachableBuild];
	}
}
