import {TypeOrmOperationPipelineStepDef, TypeOrmPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {TypeOrmOperationStepDefModel, TypeOrmStepDefModel} from './types';

const prepare: StepNodeConfigurer<TypeOrmPipelineStepDef, TypeOrmStepDefModel>['prepare'] =
	(def: TypeOrmPipelineStepDef): TypeOrmStepDefModel => {
		const model: TypeOrmStepDefModel = CommonStepDefs.prepare(def) as TypeOrmStepDefModel;
		model.datasource = def.datasource;
		model.transaction = def.transaction;
		return model;
	};
const prepareOperation: StepNodeConfigurer<TypeOrmOperationPipelineStepDef, TypeOrmOperationStepDefModel>['prepare'] =
	(def: TypeOrmOperationPipelineStepDef): TypeOrmOperationStepDefModel => {
		const model: TypeOrmOperationStepDefModel = prepare(def) as TypeOrmOperationStepDefModel;
		model.autonomous = def.autonomous;
		return model;
	};
export const TypeOrmStepPrepareFuncs = {prepare, prepareOperation};
