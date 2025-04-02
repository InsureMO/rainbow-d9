import {
	BaseModel,
	ExternalDefIndicator,
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
		// combine all handlers to one

		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const createHandle = (delegators: Array<[Function, Function]>) => {
			return async <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$handle}, index) => {
					const ret = await result;
					// once a handler returns true, the result will be true
					if (ret) {
						return ret;
					}
					if ($handle instanceof ExternalDefIndicator) {
						// it is replaced by the external def in runtime
						return await delegators[index][0](options) ?? false;
					} else {
						return await $handle(options) ?? false;
					}
				}, Promise.resolve(false));
			};
		};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const createDefaultHandle = (delegators: Array<[Function, Function]>) => {
			return async <R extends BaseModel, M extends PropValue, V extends PropValue>(options: NodeAttributeValueInitializerOptions<R, M, V>): Promise<boolean> => {
				return await monitors.reduce(async (result, {$default}, index) => {
					try {
						const ret = await result;
						// once a handler returns true, the result will be true
						if (ret) {
							return ret;
						}
						if (typeof $default === 'boolean') {
							return $default;
						}
						if ($default instanceof ExternalDefIndicator) {
							// it is replaced by the external def in runtime
							return await delegators[index][1](options) ?? false;
						} else {
							return await $default(options) ?? false;
						}
					} catch (e) {
						N3Logger.error(e, 'DisabledMonitorDefaultValueCompute');
						return true;
					}
				}, Promise.resolve(false));
			};
		};

		const delegators = this.buildHandleDelegators(monitors);
		attributes[MonitorNodeAttributes.DISABLED] = {
			$watch: watches,
			$handle: createHandle(delegators),
			$default: createDefaultHandle(delegators)
		};
		return attributes;
	}
}