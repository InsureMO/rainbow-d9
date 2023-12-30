import {
	BaseModel,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValueHandleOptions,
	NodeAttributeValueInitializerOptions,
	Nullable,
	PropValue,
	Undefinable,
	WidgetType
} from '@rainbow-d9/n1';
import {N3Logger} from '../../../logger';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild, createDefaultMonitorHandlerDetective} from './monitor-build';
import {MonitorHandlerDetective} from './types';

export class VisibilityUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_VISIBILITY =
		createDefaultMonitorHandlerDetective({
			attributeName: MonitorNodeAttributes.VISIBLE,
			// only returns false means invisible
			redressResult: (ret: Nullable<boolean>): boolean => ret !== false
		});

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = VisibilityUtils.DETECTIVES[$wt];
		VisibilityUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = VisibilityUtils.DETECTIVES[$wt];
		delete VisibilityUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return VisibilityUtils.DETECTIVES[$wt] ?? [];
	}
}

export class VisibilityBuild extends AbstractMonitorBuild {
	protected getAllDetectives(): ($wt: WidgetType) => Array<MonitorHandlerDetective> {
		return VisibilityUtils.getAllDetectives;
	}

	protected doCombine(
		monitors: Array<Partial<MonitorOthers<boolean>>>, watches: Array<string>,
		attributes: AttributeMap): AttributeMap {
		attributes[MonitorNodeAttributes.VISIBLE] = {
			$watch: watches,
			$handle: async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$handle}) => {
					const ret = await result;
					// once a handler returns false, the result will be false
					if (!ret) {
						return ret;
					}
					return await $handle(options) ?? true;
				}, Promise.resolve(true));
			},
			$default: async <R extends BaseModel, M extends PropValue, V extends PropValue>
			(options: NodeAttributeValueInitializerOptions<R, M, V>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$handle}) => {
					try {
						const ret = await result;
						// once a handler returns false, the result will be false
						if (!ret) {
							return ret;
						}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						return await $handle(options as NodeAttributeValueHandleOptions<R, M, V, any, any>) ?? true;
					} catch (e) {
						N3Logger.error(e, 'VisibleMonitorDefaultValueCompute');
						return true;
					}
				}, Promise.resolve(true));
			}
		};
		return attributes;
	}
}
