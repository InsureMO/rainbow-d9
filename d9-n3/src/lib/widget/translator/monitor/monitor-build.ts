import {
	ExternalDefIndicator,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValue,
	Nullable,
	PropertyPath,
	VUtils
} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {AsyncFunction} from '../../../utils';
import {ScriptSnippet} from '../attribute';
import {ComplexMonitorableAttributeValue} from '../attribute/monitor-attribute-build';
import {ReactionTypes} from '../attribute/reaction-repaint-attribute-build';
import {AttributeMap} from '../types';
import {
	MonitorHandler,
	MonitorHandlerDetective,
	MonitorHandlerDetectOptions,
	MonitorHandlers,
	MonitorHandlersDetective
} from './types';

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

	protected abstract getAllDetectives(): (($wt: WidgetType) => Array<MonitorHandlerDetective>);

	protected allowNoWatch(): boolean {
		return false;
	}

	protected abstract doCombine(
		monitors: Array<Partial<MonitorOthers<NodeAttributeValue>>>, watches: Array<string>,
		attributes: AttributeMap): AttributeMap;

	public combine(options: MonitorHandlerDetectOptions): AttributeMap {
		const {
			attributes: attrs, handlers
		} = this.buildHandlersDetective(this.getAllDetectives())(options);

		if (handlers == null || handlers.length === 0) {
			return attrs;
		}
		const monitors = this.findMonitors(handlers);
		if (monitors.length === 0) {
			return attrs;
		}
		const watches = this.findWatches(monitors);
		if (watches.length == 0 && !this.allowNoWatch()) {
			return attrs;
		}
		return this.doCombine(monitors, watches, attrs);
	}
}

export const createDefaultMonitorHandlerDetective = <V, M extends MonitorOthers<V>>(options: {
	attributeName: MonitorNodeAttributes | ReactionTypes;
	redressResult: (ret: Nullable<V>) => V;
	ignoreDefault?: boolean;
}): MonitorHandlerDetective => {
	const {attributeName, redressResult, ignoreDefault = false} = options;

	return (options: MonitorHandlerDetectOptions): MonitorHandler => {
		const {attributes} = options;
		const value = attributes[attributeName];
		// ignore when there is no value or a boolean value
		if (value == null || typeof value === 'boolean') {
			return (void 0);
		}
		const {on, snippet} = value as ComplexMonitorableAttributeValue;
		if (on == null || on.length === 0 || VUtils.isBlank(snippet)) {
			return (void 0);
		}
		if (snippet instanceof ExternalDefIndicator) {
			// def indicator will be replaced in rendering
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return {$watch: on, $handle: snippet as any, $default: snippet};
		}
		let redressedSnippet: ScriptSnippet;
		if (!snippet.includes('\n')) {
			// single line
			if (!snippet.startsWith('return ')) {
				redressedSnippet = `return ${snippet}`;
			} else {
				redressedSnippet = snippet;
			}
		} else {
			// multiple lines
			redressedSnippet = snippet;
		}
		// this is async function
		const handle = new AsyncFunction(
			'root', 'model', 'value', 'pathToRoot', 'propertyPath', 'absolutePath',
			'changedOn', 'from', 'to',
			redressedSnippet);
		handle.$snippet = redressedSnippet;
		return {
			$watch: on,
			$handle: async (options): Promise<V> => {
				const ret = await handle(
					options.root, options.model, options.value, options.pathToRoot, options.propertyPath, options.absolutePath,
					options.changedOn, options.from, options.to);
				// only returns true represents disabled
				return redressResult(ret);
			},
			$default: ignoreDefault ? (void 0) : async (options): Promise<V> => {
				const ret = await handle(options.root, options.model, options.value);
				// only returns true represents disabled
				return redressResult(ret);
			}
		} as M;
	};
};