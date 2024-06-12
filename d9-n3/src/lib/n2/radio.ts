import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {RadioPossibleValues} from '@rainbow-d9/n2';
import {ParsedListItemAttributePair} from '../semantic';
import {
	AttributeValueBuild,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	TipAttachableBuild,
	tryBoolOnAttrValue,
	ValidatorUtils,
	ValueChangedBuild,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2RadioValuesBuild: AttributeValueBuild<RadioPossibleValues> = {
	accept: (key: WidgetPropertyName) => key === 'values',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, _list: ParsedListItemAttributePair): Undefinable<RadioPossibleValues> => {
		if (VUtils.isBlank(value)) {
			// ignored
			return (void 0);
		}
		const values = value.split(',')
			.map(v => v.trim())
			.filter((_, index) => index <= 1)
			.map(v => VUtils.isBlank(v) ? null : v);
		if (values.length === 0) {
			return (void 0);
		} else if (values.length === 1) {
			return [tryBoolOnAttrValue(values[0]), null];
		} else {
			return [tryBoolOnAttrValue(values[0]), tryBoolOnAttrValue(values[1])];
		}
	}
};

export class N2RadioTranslator extends SpecificWidgetTranslator<N2WidgetType.RADIO> {
	public getSupportedType(): N2WidgetType.RADIO {
		return N2WidgetType.RADIO;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2RadioValuesBuild, TipAttachableBuild, ValueChangedBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}
