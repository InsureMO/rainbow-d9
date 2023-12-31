import {MonitorNodeAttributes, Nullable, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {
	ComplexMonitorableAttributeValue,
	MonitorableAttributeBuild,
	PossibleMonitorableAttributeValue
} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type VisibilityMonitorAttributeValue = ComplexMonitorableAttributeValue;

export class VisibilityAttributeBuild extends MonitorableAttributeBuild<VisibilityMonitorAttributeValue, boolean> {
	public accept(key: WidgetPropertyName): boolean {
		return MonitorNodeAttributes.VISIBLE === key;
	}

	protected detectBooleanValues(): boolean {
		return true;
	}

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<PossibleMonitorableAttributeValue<VisibilityMonitorAttributeValue, boolean>> {
		const built = super.build(value, list);
		if (built == null || typeof built === 'boolean') {
			return built;
		}
		if (built.on.length === 0 || VUtils.isBlank(built.snippet)) {
			// both of watching list and snippet are required
			// otherwise treated as invalid attribute value, ignored
			return (void 0);
		}
		return built;
	}
}
