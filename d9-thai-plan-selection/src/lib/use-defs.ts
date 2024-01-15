import {Undefinable} from '@rainbow-d9/n1';
import {useEffect, useState} from 'react';
import {PlanDefs, PlanElementCode, PlanElementDef, PlanSelectionDef} from './types';

export interface PlanElementDefOrdered {
	code: PlanElementCode;
	name: string;
	description?: string;
	displayOrder: number;
	children?: Array<PlanElementDefOrdered>;
	def: PlanElementDef;
}

export type PlanDefOrdered = Array<PlanElementDefOrdered>;

interface ExistsElement {
	displayOrder: number;
	map: ExistsCodeMap;
	ordered: Array<PlanElementDefOrdered>;
}

interface ExistsCodeMap {
	[key: PlanElementCode]: ExistsElement;
}

const orderDef = (
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
	defs?: PlanDefs;
	orderedDefs?: PlanDefOrdered;
}

export const useDefs = (defs: PlanSelectionDef['defs']) => {
	const [state, setState] = useState<PlanDefsState>({initialized: false});
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		(async () => {
			let loadedDefs: PlanDefs;
			if (typeof defs === 'function') {
				loadedDefs = await defs();
			} else {
				loadedDefs = defs;
			}
			setState({initialized: true, defs: loadedDefs, orderedDefs: orderPlanDefs(loadedDefs)});
		})();
	}, [state.initialized, defs]);

	return state;
};
