import {Undefinable} from '@rainbow-d9/n1';
import {GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import {PlanDefs, PlanElementCode, PlanElementDef, PlanSelectionGlobalEventPrefix, PlanSelectionProps} from './types';
import {redressPlanMarker} from './utils';

export interface PlanElementDefOrdered {
	code: PlanElementCode;
	name: string;
	description?: string;
	displayOrder: number;
	children?: Array<PlanElementDefOrdered>;
	def: PlanElementDef;
}

export type PlanDefOrdered = Array<PlanElementDefOrdered>;

export interface ExistsElement {
	displayOrder: number;
	map: ExistsCodeMap;
	ordered: Array<PlanElementDefOrdered>;
}

export interface ExistsCodeMap {
	[key: PlanElementCode]: ExistsElement;
}

export const orderDef = (
	children: () => Array<PlanElementDef>,
	ordered: PlanDefOrdered, orderedCodeMap: ExistsCodeMap
) => {
	children().forEach(element => {
		let exists = orderedCodeMap[element.code];
		if (exists != null) {
			// already exists, do nothing
		} else {
			const displayOrder = element.displayOrder ?? 0;
			const children = [];
			exists = {displayOrder, map: {}, ordered: children};
			orderedCodeMap[element.code] = exists;
			// let children be empty array now
			ordered.push({
				code: element.code, name: element.name, description: element.description,
				displayOrder, children, def: element
			});
		}
		orderDef(() => element.children ?? [], exists.ordered, exists.map);
	});
};

const orderPlanDefs = (defs: PlanDefs): Undefinable<PlanDefOrdered> => {
	if (defs == null || defs.length === 0) {
		return (void 0);
	}

	const ordered: PlanDefOrdered = [];
	const map: ExistsCodeMap = {};
	defs.forEach((def) => orderDef(() => def.elements ?? [], ordered, map));
	const sort = (ordered: Array<PlanElementDefOrdered>) => {
		const original = [...ordered];
		ordered = ordered.sort((a, b) => {
			if (a.displayOrder < b.displayOrder) {
				return -1;
			} else if (a.displayOrder > b.displayOrder) {
				return 1;
			} else {
				return original.indexOf(a) - original.indexOf(b);
			}
		});
		ordered.forEach(({children}) => {
			if (children != null && children.length !== 0) {
				sort(children);
			}
		});
		return ordered;
	};
	return sort(ordered);
};

export interface PlanDefsState {
	initialized: boolean;
	marker: string;
	defs?: PlanDefs;
	orderedDefs?: PlanDefOrdered;
}

export const useDefs = (options: PlanSelectionProps) => {
	const {
		defs, valuesInit, valuesClear,
		$wrapped: {$root, $model}
	} = options;

	const {on, off} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const [state, setState] = useState<PlanDefsState>({
		initialized: false, marker: redressPlanMarker(options)
	});
	useEffect(() => {
		const loadDefs = async (beforeChangeState: (defs: PlanDefs) => Promise<void>) => {
			let loadedDefs: PlanDefs;
			if (typeof defs === 'function') {
				loadedDefs = await defs({root: $root, model: $model, global: globalHandlers});
			} else {
				loadedDefs = defs;
			}
			await beforeChangeState(loadedDefs);
			setState(state => {
				return {
					initialized: true, marker: state.marker,
					defs: loadedDefs, orderedDefs: orderPlanDefs(loadedDefs)
				};
			});
		};
		if (!state.initialized) {
			(async () => await loadDefs(async (defs) => {
				if (valuesInit != null) {
					await valuesInit({defs, root: $root, model: $model, global: globalHandlers});
				}
			}))();
		}

		const onCustomEvent = async (_key: string, prefix: string, clipped: string) => {
			if (!state.initialized || prefix !== PlanSelectionGlobalEventPrefix.RELOAD_DEFS || clipped !== state.marker) {
				return;
			}
			setState(state => ({initialized: false, marker: state.marker}));
			await loadDefs(async (defs) => {
				if (valuesClear != null) {
					await valuesClear({defs, root: $root, model: $model, global: globalHandlers});
				}
			});
		};
		on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [
		globalHandlers, on, off,
		state.initialized, state.marker, defs, valuesInit, valuesClear, $root, $model
	]);

	return state;
};
