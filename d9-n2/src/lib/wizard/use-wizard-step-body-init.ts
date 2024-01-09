import {NodeDef, PropertyPath, Undefinable, VUtils} from '@rainbow-d9/n1';
import {useEffect, useState} from 'react';
import {WizardStepDef} from './types';

export interface WizardStepBodyInitState {
	initialized: boolean;
	def?: NodeDef;
}

export interface WizardStepBodyInitOptions {
	$pp?: PropertyPath;
	marker?: string;
	def?: WizardStepDef['body'];
}

export const useWizardStepBodyInit = (options: WizardStepBodyInitOptions) => {
	const {$pp, marker, def} = options;

	const [defState, setDefState] = useState<WizardStepBodyInitState>({initialized: false});
	// noinspection DuplicatedCode
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