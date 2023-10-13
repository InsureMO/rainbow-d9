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
				throw new Error(`At least one path needs to be declared on attribute[${key}] monitor.`);
			}
			if ($handle == null) {
				N1Logger.error('Watch def: ', declared, 'FindWatches');
				throw new Error(`Monitor handler is missed on attribute[${key}] monitor.`);
			}
			return {$watch, $handle, $default, $attributeName: key} as MonitorWatchDef;
		})
		.filter(x => x != null) as Array<MonitorWatchDef>;
};

export const buildDefaultAttributeValues = (def: NodeDef & ModelHolder): NodeAttributeValues => {
	const {$root, $model, $pp} = def;
	const values = findWatches(def).reduce((attrs, declared) => {
		const {$attributeName, $default} = declared;
		if (VUtils.isFunction($default)) {
			const value = MUtils.getValue($model, $pp);
			attrs[$attributeName.trim()] = $default({root: $root, model: $model, value});
		} else if ($default == null) {
			// do nothing
		} else {
			attrs[$attributeName.trim()] = $default;
		}
		return attrs;
	}, {} as NodeAttributeValues);
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
