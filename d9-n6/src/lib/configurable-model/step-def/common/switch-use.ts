import {PipelineStepDef} from '../../../definition';
import {CommonStepDefModel, CommonStepDefsType} from './types';

export const switchUse: CommonStepDefsType['switchUse'] = (def: CommonStepDefModel, keptPropNames: Array<string>, originalUse: PipelineStepDef['use']): void => {
	const keptProps: Record<string, true> = {
		name: true, use: true,
		fromInput: true, toOutput: true, merge: true,
		errorHandles: true,
		temporary: true,
		...(keptPropNames.reduce((names, name) => {
			return names[name] = true;
		}, {}))
	};

	// backup other keys as an object with original use as key to temporary
	// in case of use value switched back
	def.temporary[originalUse] = Object.keys(def).reduce((acc, key) => {
		if (keptProps[key] != true) {
			acc[key] = def[key];
			delete def[key];
		}
		return acc;
	}, {} as CommonStepDefModel);
};
