import {
	ModelHolder,
	MonitorNodeAttributes,
	MUtils,
	NodeDef,
	PPUtils,
	PropertyPath,
	WrapperDelegate
} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {TabDef} from './types';

export interface TabBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	def: TabDef['body'];
	active?: boolean;
}

interface TabBodyDefState {
	initialized: boolean;
	def?: NodeDef;
}

export const TabBody = (props: TabBodyProps) => {
	const {
		$pp, def,
		$root, $model, $p2r,
		active = false
	} = props;

	const [defState, setDefState] = useState<TabBodyDefState>({initialized: false});
	useEffect(() => {
		if (defState.initialized) {
			return;
		}
		if (typeof def === 'function') {
			(async () => {
				const loadedDef = await def();
				setDefState({initialized: true, def: loadedDef});
			})();
		} else {
			setDefState({initialized: true, def});
		}
	}, [defState.initialized, def]);

	if (!defState.initialized) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const defs = {...defState.def!};
	if (!active) {
		defs[MonitorNodeAttributes.VISIBLE] = false;
	}

	return <WrapperDelegate {...defs}
	                        $root={$root} $model={MUtils.getValue($model, $pp)} $p2r={PPUtils.concat($p2r, $pp)}
	                        data-w="d9-tab-body"/>;
};
