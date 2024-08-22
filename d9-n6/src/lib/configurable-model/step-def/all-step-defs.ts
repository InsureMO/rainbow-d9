import {Undefinable} from '@rainbow-d9/n1';
import {registerStepDefsReconfigurers} from '../../edit-dialog';
import {registerStepDefsFolders} from '../../editor';
import {StepNodeConfigurer} from '../types';
import {registerFirstSubStepPortContainerFinds} from './common';

const Defs: Record<string, Readonly<StepNodeConfigurer>> = {};

export const AllStepDefsAsArray = () => Object.values(Defs);
export const AllStepDefsAsMap = () => ({...Defs});

export const registerStepDef = (def: StepNodeConfigurer) => {
	Defs[def.use] = def;
	registerStepDefsFolders(def.folder);
	if (def.reconfigurer != null) {
		registerStepDefsReconfigurers(def.reconfigurer);
	}
	if (def.firstSubStepPortContainerFind != null) {
		registerFirstSubStepPortContainerFinds(def.firstSubStepPortContainerFind);
	}
};

export const findStepDef = (use: string): Undefinable<StepNodeConfigurer> => {
	return Defs[use];
};
