import {
	BaseModel,
	ModelHolder,
	MonitorNodeAttributes,
	MonitorOthers,
	NodeAttributeValue,
	NodeAttributeValues,
	NodeDef
} from '../types';
import {MUtils, N1Logger, NUtils, VUtils} from '../utils';
import {Watchers, Watches} from './types';

export type MonitorWatchDef = MonitorOthers<NodeAttributeValue> & { $attributeName: MonitorNodeAttributes }
export type MonitorWatchDefType =
	MonitorOthers<NodeAttributeValue>
	| NodeAttributeValues[MonitorNodeAttributes.DISABLED]
	| NodeAttributeValues[MonitorNodeAttributes.VISIBLE]

const isDeclaredAsPlainValue = (key: MonitorNodeAttributes, def: MonitorWatchDefType): boolean => {
	return [MonitorNodeAttributes.DISABLED, MonitorNodeAttributes.VISIBLE].includes(key) && typeof def === 'boolean';
};

/**
 * only watch declared could be found
 */
export const findWatches = (def: NodeDef): Array<MonitorWatchDef> => {
	return Object.values(MonitorNodeAttributes)
		.filter((key: MonitorNodeAttributes) => def[key] != null)
		.map((key: MonitorNodeAttributes) => {
			const declared = def[key] as MonitorWatchDefType;
			if (isDeclaredAsPlainValue(key, declared)) {
				// ignore plain value
				return null;
			}
			const {$watch, $handle, $default} = declared as MonitorOthers<NodeAttributeValue>;
			if (key !== MonitorNodeAttributes.VALID && ($watch == null || $watch.length === 0)) {
				// if attribute is validation, no watch means watch myself only
				N1Logger.error('Watch def: ', declared, 'FindWatches');
				N1Logger.error(`At least one path needs to be declared on attribute[${key}] monitor, ignored.`, 'FindWatches');
				return null;
			}
			if ($handle == null) {
				N1Logger.error('Watch def: ', declared, 'FindWatches');
				N1Logger.error(`Monitor handler is missed on attribute[${key}] monitor, ignored.`, 'FindWatches');
				return null;
			}
			return {$watch, $handle, $default, $attributeName: key} as MonitorWatchDef;
		})
		.filter(x => x != null) as Array<MonitorWatchDef>;
};

/**
 * very tricky thing, it is async, and needs to be executed in component initializing.
 * see {@link useDefaultAttributeValues}
 */
export const buildDefaultAttributeValues = async (def: NodeDef & ModelHolder): Promise<NodeAttributeValues> => {
	const {$root, $model, $pp} = def;
	const values = await findWatches(def)
		.reduce(async (values, declared) => {
			const attrs = await values;
			const {$attributeName, $default} = declared as MonitorWatchDef;
			if (VUtils.isFunction($default)) {
				const value = MUtils.getValue($model, $pp);
				attrs[$attributeName.trim()] = await $default({root: $root, model: $model, value});
			} else if ($default == null) {
				// do nothing
			} else {
				attrs[$attributeName.trim()] = $default;
			}
			return attrs;
		}, Promise.resolve({} as NodeAttributeValues));
	return Object.values(MonitorNodeAttributes)
		.filter((key: MonitorNodeAttributes) => def[key] != null)
		.reduce((attrs, key: MonitorNodeAttributes) => {
			const declared = def[key] as MonitorWatchDefType;
			// only plain value attribute value needs to be attached to default attributes
			if (isDeclaredAsPlainValue(key, declared)) {
				attrs[key] = declared;
			}
			return attrs;
		}, values);
};

export const buildWatches = (def: NodeDef): Watches => {
	return findWatches(def).reduce((watches, watchDef) => {
		const {$watch, $attributeName, $handle} = watchDef;
		($watch || [])
			.filter(path => VUtils.isNotBlank(path))
			.map(path => path.trim())
			.forEach(path => {
				let existing = watches[path];
				if (existing == null) {
					existing = {} as Watchers;
					watches[path] = existing;
				}
				existing[$attributeName.trim()] = $handle;
			});
		return watches;
	}, {} as Watches);
};

export const getArrayElementKey = (keys: Array<[BaseModel, string]>, getElementKey?: (element: BaseModel) => string) => (element: BaseModel) => {
	if (getElementKey != null) {
		return getElementKey(element);
	} else {
		const found = keys.find(([data]) => data === element);
		if (found != null) {
			return found[1];
		} else {
			const key = NUtils.generateReactKey();
			keys.push([element, key]);
			return key;
		}
	}
};

export const findContainerChildKey = (keys: Array<[NodeDef, string]>, find: NodeDef): string => {
	const cached = keys.find(([def]) => {
		// def === find && console.log(def, find);
		return def === find;
	});
	if (cached == null) {
		const key = NUtils.generateReactKey();
		keys.push([find, key]);
		return key;
	} else {
		return cached[1];
	}
};