import {MonitorNodeAttributes, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {Nullable, Undefinable} from '../../../utility-types';
import {
	ComplexMonitorableAttributeValue,
	MonitorableAttributeBuild,
	PossibleMonitorableAttributeValue
} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type ValidationMonitorAttributeValue = ComplexMonitorableAttributeValue;

export class ValidationAttributeBuild extends MonitorableAttributeBuild<ValidationMonitorAttributeValue, never> {
	public accept(key: WidgetPropertyName): boolean {
		return MonitorNodeAttributes.VALID === key;
	}

	protected detectBooleanValues(): boolean {
		return false;
	}

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<PossibleMonitorableAttributeValue<ValidationMonitorAttributeValue, never>> {
		const built = super.build(value, list);
		if (built == null) {
			return built;
		}
		if (built.on.length === 0 && VUtils.isBlank(built.snippet)) {
			// invalid complex attribute value, ignored
			return (void 0);
		}
		return built;
	}
}
