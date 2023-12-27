import {
	BaseModel,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValue,
	NodeAttributeValueHandleOptions,
	PPUtils,
	PropValue,
	Reaction,
	VUtils
} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {Undefinable} from '../../../utility-types';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild} from './monitor-build';
import {MonitorHandlerDetective} from './types';

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
	protected getAllDetectives(): ($wt: WidgetType) => Array<MonitorHandlerDetective> {
		return ReactorUtils.getAllDetectives;
	}

	protected doCombine(
		monitors: Array<Partial<MonitorOthers<NodeAttributeValue>>>, watches: Array<string>,
		attributes: AttributeMap): AttributeMap {
		// combine all handlers to one
		attributes[MonitorNodeAttributes.REACTION] = {
			$watch: watches,
			$handle: async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<Undefinable<Array<Reaction> | Reaction>> => {
				const {changedOn} = options;
				const results = await Promise.all(monitors
					.filter(({$watch}) => {
						// react only when watch is matched
						return $watch.some(watch => PPUtils.matches(PPUtils.absolute(options.pathToRoot, watch), changedOn));
					})
					.map(async ({$handle}) => await $handle(options))
					.filter(async result => VUtils.isNotBlank(await result)));
				if (results.length === 0) {
					return (void 0);
				} else {
					return results;
				}
			}
		};
		return attributes;
	}
}
