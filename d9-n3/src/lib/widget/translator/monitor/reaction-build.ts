import {
	BaseModel,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValue,
	NodeAttributeValueHandleOptions,
	Nullable,
	PPUtils,
	PropValue,
	Reaction,
	Undefinable,
	VUtils
} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {AttributeNames} from '../attribute';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild, createDefaultMonitorHandlerDetective} from './monitor-build';
import {MonitorHandlerDetective} from './types';

export class ReactionUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_REACTION_REPAINT =
		createDefaultMonitorHandlerDetective({
			attributeName: AttributeNames.REACTION_REPAINT,
			// only returns false means invisible
			redressResult: (ret: Nullable<Reaction>): Reaction => (ret == null || VUtils.isBlank(ret)) ? Reaction.REPAINT : ret,
			ignoreDefault: true,
			deleteAttribute: true
		});
	public static readonly DETECT_REACTION_CLEAR_ME =
		createDefaultMonitorHandlerDetective({
			attributeName: AttributeNames.REACTION_CLEAR_ME,
			// only returns false means invisible
			redressResult: (ret: Nullable<Reaction>): Reaction => (ret == null || VUtils.isBlank(ret)) ? Reaction.CLEAR_VALUE : ret,
			ignoreDefault: true,
			deleteAttribute: true
		});
	public static readonly DETECT_REACTION_WATCH =
		createDefaultMonitorHandlerDetective({
			attributeName: AttributeNames.REACTION_WATCH,
			// only returns false means invisible
			redressResult: (ret: Nullable<Reaction>): Reaction => (ret == null || VUtils.isBlank(ret)) ? Reaction.REPAINT : ret,
			ignoreDefault: true,
			deleteAttribute: true
		});

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ReactionUtils.DETECTIVES[$wt];
		ReactionUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = ReactionUtils.DETECTIVES[$wt];
		delete ReactionUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return ReactionUtils.DETECTIVES[$wt] ?? [];
	}
}

export class ReactionBuild extends AbstractMonitorBuild {
	protected getAllDetectives(): ($wt: WidgetType) => Array<MonitorHandlerDetective> {
		return ReactionUtils.getAllDetectives;
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
						// noinspection UnnecessaryLocalVariableJS
						const should = $watch.some(watch => {
							const watchPath = PPUtils.absolute(options.pathToRoot, watch);
							// noinspection UnnecessaryLocalVariableJS
							const match = PPUtils.matches(watchPath, changedOn);
							return match;
						});
						return should;
					})
					.map(async ({$handle}) => {
						// noinspection UnnecessaryLocalVariableJS
						const ret = await $handle(options);
						return ret;
					})
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
