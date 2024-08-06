import {PipelineStepDef} from '../../../definition';
import {CommonStepDefModel, CommonStepDefsType} from './types';

export const switchUse: CommonStepDefsType['switchUse'] = (def: CommonStepDefModel, keptPropNames: Array<string>, originalUse: PipelineStepDef['use']): void => {
	const commonKeys: Array<keyof CommonStepDefModel> = ['name', 'use', 'fromInput', 'toOutput', 'merge', 'errorHandles', 'temporary'];

	// backup all keys as an object with original use as key to temporary
	// in case of use value switched back
	def.temporary[`$${originalUse}`] = Object.keys(def).reduce((acc, key) => {
		if (commonKeys.includes(key)) {
			// do nothing
			return acc;
		} else {
			// backup value
			acc[key] = def[key];
			if (!keptPropNames.includes(key)) {
				// not in kept properties list, delete it from def
				delete def[key];
			}
		}
		return acc;
	}, {} as CommonStepDefModel);

	const existsKeys = Object.keys(def);
	const backup = def.temporary[`$${def.use}`] ?? {};
	// write back when there is temporary backup for new use of step
	// only write back keys that not exists in def
	Object.keys(backup).forEach(key => {
		if (!existsKeys.includes(key)) {
			def[key] = backup[key];
		}
	});
};
