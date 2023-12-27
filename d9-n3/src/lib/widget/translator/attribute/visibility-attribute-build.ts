import {MonitorNodeAttributes} from '@rainbow-d9/n1';
import {ComplexMonitorableAttributeValue, MonitorableAttributeBuild} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type VisibilityMonitorAttributeValue = ComplexMonitorableAttributeValue;

export class VisibilityAttributeBuild extends MonitorableAttributeBuild<VisibilityMonitorAttributeValue> {
	public accept(key: WidgetPropertyName): boolean {
		return MonitorNodeAttributes.VISIBLE === key;
	}
}
