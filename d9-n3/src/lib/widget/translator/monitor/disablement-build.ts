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

export class DisablementUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_DISABLED =
		createDefaultMonitorHandlerDetective({
			attributeName: MonitorNodeAttributes.DISABLED,
			// only returns true means disabled
			redressResult: (ret: Nullable<boolean>): boolean => ret === true
		});

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = DisablementUtils.DETECTIVES[$wt];
		DisablementUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = DisablementUtils.DETECTIVES[$wt];
		delete DisablementUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return DisablementUtils.DETECTIVES[$wt] ?? [];
	}
}

export class DisablementBuild extends AbstractMonitorBuild {
	protected getAllDetectives(): ($wt: WidgetType) => Array<MonitorHandlerDetective> {
		return DisablementUtils.getAllDetectives;
	}

	protected doCombine(
		monitors: Array<Partial<MonitorOthers<boolean>>>, watches: Array<string>,
		attributes: AttributeMap): AttributeMap {
		attributes[MonitorNodeAttributes.DISABLED] = {
			$watch: watches,
			$handle: async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$handle}) => {
					const ret = await result;
					// once a handler returns true, the result will be true
					if (ret) {
						return ret;
					}
					return await $handle(options) ?? result;
				}, Promise.resolve(false));
			},
			$default: async <R extends BaseModel, M extends PropValue, V extends PropValue>
			(options: NodeAttributeValueInitializerOptions<R, M, V>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$handle}) => {
					try {
						const ret = await result;
						// once a handler returns true, the result will be true
						if (ret) {
							return ret;
						}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						return await $handle(options as NodeAttributeValueHandleOptions<R, M, V, any, any>) ?? false;
					} catch (e) {
						N3Logger.error(e, 'DisabledMonitorDefaultValueCompute');
						return true;
					}
				}, Promise.resolve(false));
			}
		};
		return attributes;
	}
}