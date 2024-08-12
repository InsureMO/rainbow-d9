import {PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {CommonStepDefs} from '../common';
import {TypeOrmOperationStepDefModel, TypeOrmStepDefModel} from './types';

const createSwitchUse = <M extends TypeOrmStepDefModel>(...keptPropNames: Array<string>) => {
	return (model: M, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['datasource', 'transaction', ...keptPropNames], originalUse);
		return model;
	};
};
const createOperationSwitchUse = <M extends TypeOrmOperationStepDefModel>(...keptPropNames: Array<string>) => {
	return createSwitchUse<M>('autonomous', ...keptPropNames);
};
export const TypeOrmStepSwitchUseFuncs = {createSwitchUse, createOperationSwitchUse};
