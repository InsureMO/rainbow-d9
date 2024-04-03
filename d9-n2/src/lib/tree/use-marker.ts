import {NUtils, VUtils} from '@rainbow-d9/n1';
import {useRef, useState} from 'react';
import {TreeNodeDef} from './types';

export interface Markers {
	[key: string]: boolean;
}

export interface MarkersFunctions {
	generate: () => string;
	add: (node: TreeNodeDef) => void;
	delete: (node: TreeNodeDef) => void;
}

export const useMarker = (): MarkersFunctions => {
	const markers = useRef<Markers>({});
	const [funcs] = useState<MarkersFunctions>((): MarkersFunctions => {
		const generate = (node?: TreeNodeDef) => {
			let marker = NUtils.generateReactKey();
			while (markers[marker] === true) {
				marker = NUtils.generateReactKey();
			}
			markers[marker] = true;
			if (node != null) {
				node.marker = marker;
			}
			return marker;
		};
		const add = (node: TreeNodeDef) => {
			if (VUtils.isBlank(node.marker)) {
				markers[generate(node)] = true;
			} else {
				// might be duplication, but ignore it anyway
				markers[node.marker] = true;
			}
		};
		const deleteMarker = (node: TreeNodeDef) => {
			if (VUtils.isNotBlank(node.marker)) {
				delete markers[node.marker];
			}
		};
		return {generate, add, delete: deleteMarker};
	});

	return funcs;
};