import {VUtils} from '@rainbow-d9/n1';
import {CheckboxPossibleValues} from '@rainbow-d9/n2';
import {ParsedListItemAttributePair} from '../semantic';
import {Undefinable} from '../utility-types';
import {
	AttributeValueBuild,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2CheckboxValuesBuild: AttributeValueBuild<CheckboxPossibleValues> = {
	accept: (key: WidgetPropertyName) => key === 'values',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, _list: ParsedListItemAttributePair): Undefinable<CheckboxPossibleValues> => {
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
			return [values[0], null];
		} else {
			return values as CheckboxPossibleValues;
		}
	}
};

export class N2CheckboxTranslator extends SpecificWidgetTranslator<N2WidgetType.CHECKBOX> {
	public getSupportedType(): N2WidgetType.CHECKBOX {
		return N2WidgetType.CHECKBOX;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CheckboxValuesBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [ValidatorUtils.DETECT_REQUIRED];
	}
}
