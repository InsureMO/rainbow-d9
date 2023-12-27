import {
	BaseModel,
	MonitorNodeAttributes,
	NodeAttributeValue,
	NodeAttributeValueHandleOptions,
	PropValue,
	WidgetType
} from '@rainbow-d9/n1';
import {Undefinable} from '../../../utility-types';
import {AttributeMap} from '../types';
import {AbstractMonitorBuild} from './monitor-build';
import {MonitorHandler, MonitorHandlerDetective, MonitorHandlerDetectOptions} from './types';

const defaultDisabled: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): MonitorHandler => {
	const {attributes} = options;
	if (attributes.$disabled == null || typeof attributes.$disabled === 'boolean') {
		return;
	}

	const on = attributes.$disabled[0].attributeValue.split(',');
	let handleSnippet = attributes.$disabled[1].attributeValue;
	delete attributes.$disabled;
	// TODO 可能不是单行，可能是多行
	if (!handleSnippet.startsWith('return ')) {
		handleSnippet = `return ${handleSnippet}`;
	}
	const handle = new Function('model', 'value', 'root', 'pathToRoot', 'propertyPath', 'absolutePath', 'changedOn', 'from', 'to', handleSnippet);
	return {
		$watch: on,
		$handle: (options): NodeAttributeValue => {
			const ret = handle(options.model, options.value, options.root, options.pathToRoot, options.propertyPath, options.absolutePath, options.changedOn, options.from, options.to);
			if (ret == null || ret === 'no' || ret == false) {
				return false;
			} else {
				return true;
			}
		}
	};
};

export class EnablementUtils {
	private static readonly DETECTIVES: Record<WidgetType, Array<MonitorHandlerDetective>> = {};
	public static readonly DETECT_DISABLED = defaultDisabled;

	private constructor() {
		// do nothing, avoid extend
	}

	public static register($wt: WidgetType, detectives: Array<MonitorHandlerDetective>): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = EnablementUtils.DETECTIVES[$wt];
		EnablementUtils.DETECTIVES[$wt] = detectives.filter(b => b != null);
		return existing;
	}

	public static unregister($wt: WidgetType): Undefinable<Array<MonitorHandlerDetective>> {
		const existing = EnablementUtils.DETECTIVES[$wt];
		delete EnablementUtils.DETECTIVES[$wt];
		return existing;
	}

	public static getAllDetectives($wt: WidgetType): Array<MonitorHandlerDetective> {
		return EnablementUtils.DETECTIVES[$wt] ?? [];
	}
}

export class EnablementBuild extends AbstractMonitorBuild {
	public combine(options: MonitorHandlerDetectOptions): AttributeMap {
		const {
			attributes: attrs, handlers
		} = this.buildHandlersDetective(EnablementUtils.getAllDetectives)(options);

		if (handlers == null || handlers.length === 0) {
			return attrs;
		}
		const monitors = this.findMonitors(handlers);
		if (monitors.length === 0) {
			return attrs;
		}
		attrs[MonitorNodeAttributes.DISABLED] = {
			$watch: this.findWatches(monitors),
			$handle: <R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
			(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>): boolean => {
				return monitors.reduce((result, {$handle}) => {
					if (!result) {
						return result;
					}
					result = $handle(options) ?? result;
					return result;
				}, true);
			}
		};
		return attrs;
	}
}