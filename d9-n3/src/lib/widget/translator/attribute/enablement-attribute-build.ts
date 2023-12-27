import {MonitorNodeAttributes} from '@rainbow-d9/n1';
import {ComplexMonitorableAttributeValue, MonitorableAttributeBuild} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type EnablementMonitorAttributeValue = ComplexMonitorableAttributeValue;

export class EnablementAttributeBuild extends MonitorableAttributeBuild<EnablementMonitorAttributeValue> {
	public accept(key: WidgetPropertyName): boolean {
		return MonitorNodeAttributes.DISABLED === key;
	}
}
