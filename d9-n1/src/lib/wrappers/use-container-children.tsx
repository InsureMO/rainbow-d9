import {useState} from 'react';
import {ContainerDef, NodeDef} from '../types';
import {NUtils} from '../utils';

/**
 * assign a unique key for every child, and cache it.
 */
export const useContainerChildren = (options: {
	def: ContainerDef;
	/** which property carries child node defs, use $nodes when ignored. */
	nodesFrom?: string;
}): { keys: Array<[NodeDef, string]>, defs: Array<NodeDef> } => {
	const {def, nodesFrom} = options;

	const childrenDefs = NUtils.getChildNodes(def, nodesFrom) || [];
	const [keys] = useState<Array<[NodeDef, string]>>(() => {
		return childrenDefs.map(child => [child, NUtils.generateReactKey()]);
	});
	Promise.resolve().then(() => {
		if (childrenDefs.length === 0) {
			keys.length = 0;
		} else {
			// starts from tail
			for (let index = keys.length - 1; index >= 0; index--) {
				const [def] = keys[index];
				if (!childrenDefs.includes(def)) {
					keys.splice(index, 1);
				}
			}
		}
	});
	return {keys, defs: childrenDefs};
};