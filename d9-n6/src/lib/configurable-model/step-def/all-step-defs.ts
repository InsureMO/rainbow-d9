import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeConfigurer} from '../types';

const Defs: Record<string, Readonly<StepNodeConfigurer>> = {};

export const AllStepDefsAsArray = () => Object.values(Defs);
export const AllStepDefsAsMap = () => ({...Defs});

export const registerStepDef = (def: StepNodeConfigurer) => {
	Defs[def.use] = def;
};

export const findStepDef = (use: string): Undefinable<StepNodeConfigurer> => {
	return Defs[use];
};
