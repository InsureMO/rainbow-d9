import {NodeDef, PropertyPath, Undefinable, VUtils} from '@rainbow-d9/n1';
import {useEffect, useState} from 'react';
import {TabDef} from './types';

export interface TabBodyInitState {
	initialized: boolean;
	def?: NodeDef;
}

export interface TabBodyInitOptions {
	$pp?: PropertyPath;
	marker?: string;
	def?: TabDef['body'];
}

export const useTabBodyInit = (options: TabBodyInitOptions) => {
	const {$pp, marker, def} = options;

	const [defState, setDefState] = useState<TabBodyInitState>({initialized: false});
	useEffect(() => {
		if (defState.initialized) {
			return;
		}
		(async () => {
			let foundDef: Undefinable<NodeDef>;
			if (typeof def === 'function') {
				foundDef = await def(marker);
			} else {
				foundDef = def;
			}
			if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
				foundDef.$pp = $pp;
			}
			setDefState({initialized: true, def: foundDef});
		})();
	}, [defState.initialized, def, $pp, marker]);

	return defState;
};