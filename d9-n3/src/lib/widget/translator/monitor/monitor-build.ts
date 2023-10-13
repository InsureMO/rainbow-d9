import {MonitorOthers, NodeAttributeValue, PropertyPath} from '@d9/n1';
import {WidgetType} from '../../../semantic';
import {AttributeMap} from '../types';
import {MonitorHandlerDetective, MonitorHandlerDetectOptions, MonitorHandlers, MonitorHandlersDetective} from './types';

export abstract class AbstractMonitorBuild {
	protected buildHandlersDetective(
		find: ($wt: WidgetType) => Array<MonitorHandlerDetective>
	): MonitorHandlersDetective {
		return (options: MonitorHandlerDetectOptions): MonitorHandlers => {
			return find(options.$wt).reduce((monitorHandlers, detect): MonitorHandlers => {
				const {attributes, handlers} = monitorHandlers;
				const handle = detect({...options, attributes});
				if (handle != null) {
					handlers.push(handle);
				}
				return {attributes, handlers};
			}, {attributes: options.attributes, handlers: []} as MonitorHandlers);
		};
	}

	protected findMonitors(handlers: MonitorHandlers['handlers']): Array<Partial<MonitorOthers<NodeAttributeValue>>> {
		return handlers.map(handler => {
			if (typeof handler === 'function') {
				return {$handle: handler};
			} else {
				return handler;
			}
		});
	}

	protected findWatches(monitors: Array<Partial<MonitorOthers<NodeAttributeValue>>>): Array<PropertyPath> {
		return monitors.map(({$watch}) => $watch).filter($watch => $watch != null).flat();
	}

	public abstract combine(options: MonitorHandlerDetectOptions): AttributeMap;
}
