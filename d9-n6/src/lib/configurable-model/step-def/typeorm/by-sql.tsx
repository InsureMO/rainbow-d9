import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {
	FileDef,
	StandardPipelineStepRegisterKey,
	TypeOrmBulkSaveBySqlPipelineStepDef,
	TypeOrmBySqlPipelineStepDef,
	TypeOrmLoadManyBySqlPipelineStepDef,
	TypeOrmLoadOneBySqlPipelineStepDef,
	TypeOrmSaveBySqlPipelineStepDef
} from '../../../definition';
import {
	ConfigurableElementAnchor,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createPrePortExistsWithKey, createSelectableSqlEditor} from '../../common';
import {ConfirmNodeOptions} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit} from '../common';
import {createTypeOrmWithAutonomousStepDefs} from './funcs';
import {TypeOrmWithAutonomousStepDefModel} from './types';

export interface TypeOrmBySqlStepDefModel extends TypeOrmWithAutonomousStepDefModel {
	sql?: string;
	temporary?: TypeOrmWithAutonomousStepDefModel['temporary'] & {
		sqlByParams?: boolean;
	};
}

export interface TypeOrmBulkSaveBySqlStepDefModel extends TypeOrmBySqlStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_BULK_SAVE_BY_SQL;
}

export interface TypeOrmSaveBySqlStepDefModel extends TypeOrmBySqlStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_SAVE_BY_SQL;
}

export interface TypeOrmLoadManyBySqlStepDefModel extends TypeOrmBySqlStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL;
}

export interface TypeOrmLoadOneBySqlStepDefModel extends TypeOrmBySqlStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_ONE_BY_SQL;
}

interface CreateTypeOrmBySqlPipelineStepDefsOptions<F extends TypeOrmBySqlPipelineStepDef> {
	use: F['use'];
	sqlHelpDocs: string;
	stepHelpDocs: string;
}

const createTypeOrmBySqlPipelineStepDefs =
	<F extends TypeOrmBySqlPipelineStepDef, M extends TypeOrmBySqlStepDefModel>(options: CreateTypeOrmBySqlPipelineStepDefsOptions<F>) => {
		const {use, sqlHelpDocs, stepHelpDocs} = options;
		const defs = createTypeOrmWithAutonomousStepDefs<F, M>({
			use,
			andPrepare: (def, model) => {
				model.sql = def.sql;
				model.temporary = model.temporary || {};
				model.temporary.sqlByParams = VUtils.isBlank(model.sql);
			},
			keepPropertiesOnUseSwitch: ['sql'],
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			andConfirm: (model, def, _file: FileDef, _options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
				// TODO VALIDATE SQL
				return () => {
					if (model.temporary?.sqlByParams === true) {
						delete def.sql;
					} else {
						def.sql = model.sql;
					}
				};
			},
			properties: [{
				code: 'sql', label: Labels.StepTypeOrmSql, anchor: 'sql',
				badge: (model: M): ReactNode => {
					if (model.temporary?.sqlByParams === true) {
						return Labels.StepTypeOrmSqlByParams;
					} else if (VUtils.isNotBlank(model.sql)) {
						return <ConfigurableElementBadgeChecked/>;
					} else {
						return <ConfigurableElementBadgeMissed/>;
					}
				},
				editor: createSelectableSqlEditor<M, boolean>({
					findFlag: (model) => model.temporary?.sqlByParams ?? false,
					saveFlag: (model, value) => model.temporary = {...(model.temporary ?? {}), sqlByParams: value},
					findSnippet: (model) => model.sql,
					saveSnippet: (model, text) => model.sql = text,
					flagCandidates: [
						{value: false, label: Labels.StepTypeOrmSqlPredefined},
						{value: true, label: Labels.StepTypeOrmSqlByParams}
					],
					isSnippetAvailable: (value) => value !== true,
					height: PlaygroundCssVars.SQL_HEIGHT
				}),
				helpDoc: sqlHelpDocs
			}],
			ports: [createPrePortExistsWithKey<M>({
				key: 'snippet', label: Labels.StepTypeOrmSql,
				getValue: model => model.sql
			})],
			helpDocs: stepHelpDocs
		});
		registerStepDef(defs);
		return defs;
	};
export const TypeOrmBulkSaveBySqlStepDefs =
	createTypeOrmBySqlPipelineStepDefs<TypeOrmBulkSaveBySqlPipelineStepDef, TypeOrmBulkSaveBySqlStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_BULK_SAVE_BY_SQL,
		sqlHelpDocs: HelpDocs.stepTypeOrmBulkSaveBySqlSql, stepHelpDocs: HelpDocs.typeOrmBulkSaveBySqlStep
	});
export const TypeOrmSaveBySqlStepDefs =
	createTypeOrmBySqlPipelineStepDefs<TypeOrmSaveBySqlPipelineStepDef, TypeOrmSaveBySqlStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_SAVE_BY_SQL,
		sqlHelpDocs: HelpDocs.stepTypeOrmSaveBySqlSql, stepHelpDocs: HelpDocs.typeOrmSaveBySqlStep
	});
export const TypeOrmLoadManyBySqlStepDefs =
	createTypeOrmBySqlPipelineStepDefs<TypeOrmLoadManyBySqlPipelineStepDef, TypeOrmLoadManyBySqlStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL,
		sqlHelpDocs: HelpDocs.stepTypeOrmLoadManyBySqlSql, stepHelpDocs: HelpDocs.typeOrmLoadManyBySqlStep
	});
export const TypeOrmLoadOneBySqlStepDefs =
	createTypeOrmBySqlPipelineStepDefs<TypeOrmLoadOneBySqlPipelineStepDef, TypeOrmLoadOneBySqlStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_ONE_BY_SQL,
		sqlHelpDocs: HelpDocs.stepTypeOrmLoadOneBySqlSql, stepHelpDocs: HelpDocs.typeOrmLoadOneBySqlStep
	});
