import {FileDef, TypeOrmPipelineStepDef, TypeOrmWithAutonomousPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions} from '../../types';
import {AndConfirm, AndConfirmCommit, AndPrepare} from '../common';
import {TypeOrmStepDefModel, TypeOrmWithAutonomousStepDefModel} from './types';

export const prepare =
	<F extends TypeOrmPipelineStepDef, M extends TypeOrmStepDefModel>(and?: (def: F, model: M) => void): AndPrepare<F, M> => {
		return (def: F, model: M) => {
			model.datasource = def.datasource;
			model.transaction = def.transaction;
			if (and != null) {
				and(def, model);
			}
		};
	};
export const prepareWithAutonomous =
	<F extends TypeOrmWithAutonomousPipelineStepDef, M extends TypeOrmWithAutonomousStepDefModel>(and?: (def: F, model: M) => void): AndPrepare<F, M> => {
		return (def: F, model: M) => {
			prepare<F, M>((def, model) => {
				model.autonomous = def.autonomous;
				if (and != null) {
					and(def, model);
				}
			})(def, model);
		};
	};

export const switchUse = ['datasource', 'transaction'];
export const switchUseWithAutonomous = [...switchUse, 'autonomous'];

export const confirm
	= <F extends TypeOrmPipelineStepDef, M extends TypeOrmStepDefModel>(and?: (model: M, def: F, file: FileDef, options: ConfirmNodeOptions) => ConfigurableElementAnchor | AndConfirmCommit): AndConfirm<F, M> => {
	return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
		// TODO VALIDATE PROPERTIES
		let andCommit = null;
		if (and != null) {
			// execute and function
			andCommit = and(model, def, file, options);
			if (typeof andCommit === 'string') {
				return andCommit;
			}
		}
		return () => {
			def.datasource = model.datasource;
			def.transaction = model.transaction;
			if (andCommit != null) {
				andCommit();
			}
		};
	};
};

export const confirmWithAutonomous
	= <F extends TypeOrmWithAutonomousPipelineStepDef, M extends TypeOrmWithAutonomousStepDefModel>(and?: (model: M, def: F, file: FileDef, options: ConfirmNodeOptions) => ConfigurableElementAnchor | AndConfirmCommit): AndConfirm<F, M> => {
	return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
		// TODO VALIDATE PROPERTIES
		let andCommit = null;
		if (and != null) {
			// execute and function
			andCommit = and(model, def, file, options);
			if (typeof andCommit === 'string') {
				return andCommit;
			}
		}
		return () => {
			def.autonomous = model.autonomous;
			if (andCommit != null) {
				andCommit();
			}
		};
	};
};
