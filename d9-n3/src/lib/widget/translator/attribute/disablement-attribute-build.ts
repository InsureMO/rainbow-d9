import {MonitorNodeAttributes} from '@rainbow-d9/n1';
import {ComplexMonitorableAttributeValue, MonitorableAttributeBuild} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type DisablementMonitorAttributeValue = ComplexMonitorableAttributeValue;

export class DisablementAttributeBuild extends MonitorableAttributeBuild<DisablementMonitorAttributeValue> {
	public accept(key: WidgetPropertyName): boolean {
		return MonitorNodeAttributes.DISABLED === key;
	}
}
