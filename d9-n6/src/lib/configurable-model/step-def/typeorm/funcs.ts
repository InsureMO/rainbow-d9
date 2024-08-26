import {Nullable} from '@rainbow-d9/n1';
import {FileDef, TypeOrmPipelineStepDef, TypeOrmWithAutonomousPipelineStepDef} from '../../../definition';
import {ConfigurableElement, ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions} from '../../types';
import {AndConfirm, AndConfirmCommit, AndConfirmReturned, AndPrepare, CommonStepDefs, StepPort} from '../common';
import {elementDatasource} from './element-datasource';
import {elementAutonomousOrTransaction} from './element-transaction';
import {PortDatasource} from './port-datasource';
import {PortTransactionWithAutonomous} from './port-transaction';
import {TypeOrmStepDefModel, TypeOrmWithAutonomousStepDefModel} from './types';

export const prepare =
	<F extends TypeOrmPipelineStepDef, M extends TypeOrmStepDefModel>(and?: (def: F, model: M) => void): AndPrepare<F, M> => {
		return (def: F, model: M) => {
			model.datasource = def.datasource;
			if ((model.datasource ?? '').startsWith('env:')) {
				model.temporary = {...(model.temporary ?? {datasourceByEnvs: true})};
				model.temporary.datasourceEnvKey = model.datasource.substring(4);
			}
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
	= <F extends TypeOrmPipelineStepDef, M extends TypeOrmStepDefModel>(and?: AndConfirm<F, M>): AndConfirm<F, M> => {
	return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): AndConfirmReturned => {
		// TODO VALIDATE PROPERTIES OF TYPEORM STEPS
		const invalidAnchors: Array<ConfigurableElementAnchor> = [];
		let andCommit: Nullable<AndConfirmReturned> = null;
		if (and != null) {
			// execute and function
			andCommit = and(model, def, file, options);
			if (Array.isArray(andCommit)) {
				return [...invalidAnchors, ...andCommit];
			}
		}
		return () => {
			def.datasource = model.datasource;
			def.transaction = model.transaction;
			if (andCommit != null) {
				(andCommit as AndConfirmCommit)();
			}
		};
	};
};

export const confirmWithAutonomous
	= <F extends TypeOrmWithAutonomousPipelineStepDef, M extends TypeOrmWithAutonomousStepDefModel>(and?: AndConfirm<F, M>): AndConfirm<F, M> => {
	return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): AndConfirmReturned => {
		return confirm((model: M, def: F, file: FileDef, options: ConfirmNodeOptions): AndConfirmReturned => {
			// TODO VALIDATE AUTONOMOUS OF TYPEORM STEPS WHICH CAN BE AUTONOMOUS
			const invalidAnchors: Array<ConfigurableElementAnchor> = [];
			let andCommit: Nullable<AndConfirmReturned> = null;
			if (and != null) {
				// execute and function
				andCommit = and(model, def, file, options);
				if (Array.isArray(andCommit)) {
					return [...invalidAnchors, ...andCommit];
				}
			}
			return () => {
				def.autonomous = model.autonomous;
				if (andCommit != null) {
					(andCommit as AndConfirmCommit)();
				}
			};
		})(model, def, file, options);
	};
};

export interface CreateTypeOrmWithAutonomousStepDefsOptions<F extends TypeOrmWithAutonomousPipelineStepDef, M extends TypeOrmWithAutonomousStepDefModel> {
	use: F['use'];
	andPrepare?: AndPrepare<F, M>;
	keepPropertiesOnUseSwitch?: Array<string>;
	andConfirm?: AndConfirm<F, M>;
	survivalProperties: Array<string>;
	properties?: Array<ConfigurableElement>;
	ports?: Array<{ key: string, port: StepPort }>;
	helpDocs: string;
}

export const createTypeOrmWithAutonomousStepDefs =
	<F extends TypeOrmWithAutonomousPipelineStepDef, M extends TypeOrmWithAutonomousStepDefModel>(options: CreateTypeOrmWithAutonomousStepDefsOptions<F, M>) => {
		const {
			use, andPrepare, keepPropertiesOnUseSwitch, andConfirm, survivalProperties,
			properties, ports = [], helpDocs
		} = options;

		return CommonStepDefs.createStepNodeConfigurer<F, M>({
			use,
			prepare: ['and', prepareWithAutonomous(andPrepare)],
			switchUse: ['keep', [...switchUseWithAutonomous, ...(keepPropertiesOnUseSwitch ?? [])]],
			confirm: ['and', confirmWithAutonomous(andConfirm)],
			survivalAfterConfirm: ['and', (_def: TypeOrmWithAutonomousPipelineStepDef, property: string) => {
				return [...switchUseWithAutonomous, ...survivalProperties].includes(property);
			}],
			properties: [CommonStepDefs.createMainContentElement(elementDatasource, elementAutonomousOrTransaction, ...(properties ?? []))],
			ports: [
				{key: 'datasource', port: PortDatasource},
				{key: 'transaction', port: PortTransactionWithAutonomous},
				...(ports ?? [])
			],
			helpDocs
		});
	};