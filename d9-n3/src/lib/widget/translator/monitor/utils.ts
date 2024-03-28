import {AttributeMap} from '../types';
import {MonitorHandler, MonitorHandlerDetective, MonitorHandlerDetectOptions} from './types';

export const wrapMonitorHandlerDetective = (detective: MonitorHandlerDetective, more: (attributes: AttributeMap) => void): MonitorHandlerDetective => {
	return (options: MonitorHandlerDetectOptions): MonitorHandler => {
		const ret = detective(options);
		if (ret == null) {
			return (void 0);
		} else {
			more(options.attributes);
			return ret;
		}
	};
};
