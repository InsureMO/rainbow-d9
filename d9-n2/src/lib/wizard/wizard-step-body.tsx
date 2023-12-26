import {ModelHolder, MUtils, NodeDef, PPUtils, PropertyPath, WrapperDelegate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {WizardStepDef} from './types';
import {AWizardStepBody} from './widgets';

export interface WizardStepBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	def: WizardStepDef['body'];
	active?: boolean;
}

interface WizardStepBodyDefState {
	initialized: boolean;
	def?: NodeDef;
}

export const WizardStepBody = (props: WizardStepBodyProps) => {
	const {
		$pp, def,
		$root, $model, $p2r,
		active = false
	} = props;

	const [defState, setDefState] = useState<WizardStepBodyDefState>({initialized: false});
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
	const defs = defState.def!;
	return <AWizardStepBody data-visible={active}>
		<WrapperDelegate {...defs}
		                 $root={$root} $model={MUtils.getValue($model, $pp)} $p2r={PPUtils.concat($p2r, $pp)}/>
	</AWizardStepBody>;
};
