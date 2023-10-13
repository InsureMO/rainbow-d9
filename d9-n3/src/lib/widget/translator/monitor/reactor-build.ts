import {
	BaseModel,
	MonitorNodeAttributes,
	NodeAttributeValueHandleOptions,
	PPUtils,
	PropValue,
	Reaction,
	VUtils
} from '@d9/n1';
import {WidgetType} from '../../../semantic';
import {Undefinable} from '../../../utility-types';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild} from './monitor-build';
import {MonitorHandlerDetective, MonitorHandlerDetectOptions} from './types';

export class ReactorUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ReactorUtils.DETECTIVES[$wt];
		ReactorUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ReactorUtils.DETECTIVES[$wt];
		delete ReactorUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return ReactorUtils.DETECTIVES[$wt] ?? [];
	}
}

export class ReactorBuild extends AbstractMonitorBuild {
	public combine(options: MonitorHandlerDetectOptions): AttributeMap {
		const {
			attributes: attrs, handlers
		} = this.buildHandlersDetective(ReactorUtils.getAllDetectives)(options);
		if (handlers == null || handlers.length === 0) {
			return attrs;
		}

		const monitors = this.findMonitors(handlers);
		if (monitors.length === 0) {
			return attrs;
		}

		const watches = this.findWatches(monitors);
		if (watches.length == 0) {
			// reaction must have watches
			return attrs;
		}

		// combine all handlers to one
		attrs[MonitorNodeAttributes.REACTION] = {
			$watch: watches,
			$handle: <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Array<Reaction> | Reaction | undefined => {
				const {changedOn} = options;
				const results = monitors
					.map(({$watch, $handle}) => {
						// react only when watch is matched
						if ($watch.some(watch => PPUtils.matches(PPUtils.absolute(options.pathToRoot, watch), changedOn))) {
							return $handle(options);
						} else {
							return (void 0);
						}
					})
					.filter(result => VUtils.isNotBlank(result));
				if (results.length === 0) {
					return (void 0);
				} else {
					return results;
				}
			}
		};
		return attrs;
	}
}
