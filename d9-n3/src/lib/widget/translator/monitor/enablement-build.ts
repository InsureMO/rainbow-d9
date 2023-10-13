import {AttributeMap} from '../types';
import {AbstractMonitorBuild} from './monitor-build';
import {MonitorHandlerDetectOptions} from './types';

export class EnablementBuild extends AbstractMonitorBuild {
	public combine(options: MonitorHandlerDetectOptions): AttributeMap {
		const {attributes: attrs} = options;

		return attrs;
	}
}
