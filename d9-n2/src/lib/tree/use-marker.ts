import {NUtils, VUtils} from '@rainbow-d9/n1';
import {useEffect, useRef, useState} from 'react';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
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
	const {on, off} = useTreeEventBus();
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
	useEffect(() => {
		const onAskMarkerAdder = (callback: (add: MarkersFunctions['add']) => void) => callback(funcs.add);
		on(TreeEventTypes.ASK_MARKER_ADDER, onAskMarkerAdder);
		return () => {
			off(TreeEventTypes.ASK_MARKER_ADDER, onAskMarkerAdder);
		};
	}, [on, off]);

	return funcs;
};