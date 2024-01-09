import {ModelHolder, NodeDef, PropertyPath, Undefinable, VUtils, WrapperDelegate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {TabDef} from './types';
import {ATabBody} from './widgets';

export interface TabBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	marker: string;
	def: TabDef['body'];
	active?: boolean;
}

interface TabBodyDefState {
	initialized: boolean;
	def?: NodeDef;
}

export const TabBody = (props: TabBodyProps) => {
	const {
		$pp, marker, def,
		$root, $model, $p2r,
		active = false
	} = props;

	const [defState, setDefState] = useState<TabBodyDefState>({initialized: false});
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

	if (!defState.initialized) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const defs = defState.def!;
	return <ATabBody data-visible={active}>
		<WrapperDelegate {...defs} $root={$root} $model={$model} $p2r={$p2r}/>
	</ATabBody>;
};
