import {ModelHolder, NodeDef, PropertyPath, VUtils, WrapperDelegate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {WizardStepDef} from './types';
import {AWizardStepBody} from './widgets';

export interface WizardStepBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	def: WizardStepDef['body'];
	active?: boolean;
	shared?: NodeDef;
	sharedAtLead?: boolean;
}

interface WizardStepBodyDefState {
	initialized: boolean;
	def?: NodeDef;
}

export const WizardStepBody = (props: WizardStepBodyProps) => {
	const {
		$pp, def,
		$root, $model, $p2r,
		active = false, shared, sharedAtLead
	} = props;

	const [defState, setDefState] = useState<WizardStepBodyDefState>({initialized: false});
	useEffect(() => {
		if (defState.initialized) {
			return;
		}
		(async () => {
			let foundDef: NodeDef | undefined;
			if (typeof def === 'function') {
				foundDef = await def();
			} else {
				foundDef = def;
			}
			if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
				foundDef.$pp = $pp;
			}
			setDefState({initialized: true, def: foundDef});
		})();
	}, [defState.initialized, def, $pp]);

	if (!defState.initialized) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const defs = defState.def!;
	if (shared != null) {
		const {$pos: {$cols = 3} = {}} = shared;
		defs.$pos = defs.$pos ?? {};
		defs.$pos.$cols = 12 - $cols;
		if (sharedAtLead === true) {
			defs.$pos.$col = 4;
		}
	}

	return <AWizardStepBody data-visible={active}>
		{shared != null && active && sharedAtLead === true
			? <WrapperDelegate {...shared} $root={$root} $model={$model} $p2r={$p2r}/>
			: null}
		<WrapperDelegate {...defs} $root={$root} $model={$model} $p2r={$p2r}/>
		{shared != null && active && sharedAtLead !== true
			? <WrapperDelegate {...shared} $root={$root} $model={$model} $p2r={$p2r}/>
			: null}
	</AWizardStepBody>;
};
