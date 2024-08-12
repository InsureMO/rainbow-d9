import {FileDef, TypeOrmOperationPipelineStepDef, TypeOrmPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {TypeOrmOperationStepDefModel, TypeOrmStepDefModel} from './types';

const confirmBase =
	(model: TypeOrmStepDefModel, def: TypeOrmPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.datasource = model.datasource;
		def.transaction = model.transaction;

		return true;
	};
const confirm: StepNodeConfigurer<TypeOrmPipelineStepDef, TypeOrmStepDefModel>['confirm'] =
	(model: TypeOrmStepDefModel, def: TypeOrmPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		confirmBase(model, def, file, options);

		options.handlers.onChange();
		return true;
	};
const confirmOperation: StepNodeConfigurer<TypeOrmOperationPipelineStepDef, TypeOrmOperationStepDefModel>['confirm'] =
	(model: TypeOrmOperationStepDefModel, def: TypeOrmOperationPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		confirmBase(model, def, file, options);

		def.autonomous = model.autonomous;

		options.handlers.onChange();
		return true;
	};
export const TypeOrmStepConfirmFuncs = {confirm, confirmOperation};