import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {
	FileDef,
	PipelineStepDef,
	PipelineStepDiagramDef,
	StandardPipelineStepRegisterKey,
	TypeOrmBulkSaveBySqlPipelineStepDef,
	TypeOrmBySqlPipelineStepDef,
	TypeOrmLoadManyBySqlPipelineStepDef,
	TypeOrmLoadManyBySqlUseCursorPipelineStepDef,
	TypeOrmLoadOneBySqlPipelineStepDef,
	TypeOrmSaveBySqlPipelineStepDef
} from '../../../definition';
import {
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {
	CommonElementEditorStyles,
	createCheckOrMissBadge,
	createPrePortExistsWithKey,
	createSelectableSqlEditor,
	createSnippetEditor,
	createValueOrAnotherBadge,
	JsEditorExtensionType
} from '../../common';
import {ConfirmNodeOptions} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefs} from '../common';
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

export interface TypeOrmLoadManyBySqlUseCursorStepDefModel extends TypeOrmBySqlStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL_USE_CURSOR;
	fetchSize?: number;
	streamTo?: string;
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
				if (VUtils.isBlank(model.sql) || model.sql === '@ignore') {
					// don't know why compiler raise it, and add this rule to avoid compilation error anyway
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					model.temporary.sqlByParams;
					delete model.sql;
				}
			},
			keepPropertiesOnUseSwitch: ['sql'],
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			andConfirm: (model, def, _file: FileDef, _options: ConfirmNodeOptions): AndConfirmReturned => {
				// TODO VALIDATE SQL OF TYPEORM SQL STEPS
				return () => {
					if (model.temporary?.sqlByParams === true) {
						def.sql = '@ignore';
					} else {
						def.sql = model.sql;
					}
				};
			},
			survivalProperties: ['sql'],
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
				key: 'sql', label: Labels.StepTypeOrmSql,
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
const FetchSizeEditor = (props: ConfigurableElementEditorProps<TypeOrmLoadManyBySqlUseCursorStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const valueRef = useRef<string>(`${model.fetchSize ?? ''}`);

	const onValueChange = (value: PropValue) => {
		const test = VUtils.isPositive(value);
		if (test.test) {
			model.fetchSize = test.value;
		} else {
			delete model.fetchSize;
		}

		valueRef.current = value as string;
		onValueChanged();
	};

	return <UnwrappedInput onValueChange={onValueChange} value={valueRef.current}
	                       style={CommonElementEditorStyles.input200} ref={inputRef}/>;
};
export const TypeOrmLoadManyBySqlUseCursorStepDefs = (() => {
	const defs = createTypeOrmWithAutonomousStepDefs<TypeOrmLoadManyBySqlUseCursorPipelineStepDef, TypeOrmLoadManyBySqlUseCursorStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL_USE_CURSOR,
		andPrepare: (def, model) => {
			model.sql = def.sql;
			model.fetchSize = def.fetchSize;
			model.streamTo = def.streamTo;
			model.temporary = model.temporary || {};
			if (VUtils.isBlank(model.sql) || model.sql === '@ignore') {
				// don't know why compiler raise it, and add this rule to avoid compilation error anyway
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				model.temporary.sqlByParams;
				delete model.sql;
			}
		},
		keepPropertiesOnUseSwitch: ['sql', 'fetchSize', 'streamTo'],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		andConfirm: (model, def, _file: FileDef, options: ConfirmNodeOptions): AndConfirmReturned => {
			// TODO VALIDATE SQL OF TYPEORM SQL STEPS
			return () => {
				CommonStepDefs.confirmSetsLikePipelineStep(def, options);
				def.fetchSize = model.fetchSize;
				def.streamTo = model.streamTo;
				if (model.temporary?.sqlByParams === true) {
					def.sql = '@ignore';
				} else {
					def.sql = model.sql;
				}
			};
		},
		survivalProperties: ['sql', 'fetchSize', 'streamTo', 'steps', 'steps.*', '$diagram.$foldSubSteps'],
		properties: [{
			code: 'sql', label: Labels.StepTypeOrmSql, anchor: 'sql',
			badge: (model: TypeOrmLoadManyBySqlUseCursorStepDefModel): ReactNode => {
				if (model.temporary?.sqlByParams === true) {
					return Labels.StepTypeOrmSqlByParams;
				} else if (VUtils.isNotBlank(model.sql)) {
					return <ConfigurableElementBadgeChecked/>;
				} else {
					return <ConfigurableElementBadgeMissed/>;
				}
			},
			editor: createSelectableSqlEditor<TypeOrmLoadManyBySqlUseCursorStepDefModel, boolean>({
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
			helpDoc: HelpDocs.stepTypeOrmLoadManyBySqlUseCursorSql
		}, {
			code: 'fetch-size', label: Labels.StepTypeOrmFetchSize, anchor: 'fetch-size',
			badge: createValueOrAnotherBadge<TypeOrmLoadManyBySqlUseCursorStepDefModel>({
				check: model => VUtils.isNotBlank(model.fetchSize),
				one: model => model.fetchSize,
				another: <NavigatorElementBadgeWrapper data-role="use-default">
					{Labels.UseDefault}
				</NavigatorElementBadgeWrapper>
			}),
			editor: FetchSizeEditor,
			helpDoc: HelpDocs.stepTypeOrmLoadManyBySqlUseCursorFetchSize
		}, {
			code: 'stream-to', label: Labels.StepTypeOrmStreamTo, anchor: 'stream-to',
			badge: createCheckOrMissBadge<TypeOrmLoadManyBySqlUseCursorStepDefModel>({check: model => VUtils.isNotBlank(model.streamTo)}),
			editor: createSnippetEditor<TypeOrmLoadManyBySqlUseCursorStepDefModel>({
				extensionType: JsEditorExtensionType.SNIPPET,
				getValue: model => model.streamTo,
				setValue: (model, value) => model.streamTo = value,
				height: PlaygroundCssVars.SNIPPET_TYPEORM_STREAM_TO_HEIGHT
			}),
			helpDoc: HelpDocs.stepTypeOrmLoadManyBySqlUseCursorStreamTo
		}],
		ports: [createPrePortExistsWithKey<TypeOrmLoadManyBySqlUseCursorStepDefModel>({
			key: 'sql', label: Labels.StepTypeOrmSql,
			getValue: model => model.sql
		}), {key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		helpDocs: HelpDocs.typeOrmLoadManyBySqlUseCursorStep
	});
	defs.folder = {
		accept: (step: TypeOrmLoadManyBySqlUseCursorPipelineStepDef) => step.use === StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL_USE_CURSOR,
		switch: (step: PipelineStepDiagramDef, fold: boolean) => {
			CommonStepDefs.folder.switch(step, fold);
			CommonStepDefs.switchFoldWhenSubNodesExist(step, fold);
		},
		askSubSteps: (step: TypeOrmLoadManyBySqlUseCursorPipelineStepDef) => {
			const subSteps = [...(CommonStepDefs.askSubSteps(step) ?? []), ...(CommonStepDefs.folder.askSubSteps(step) ?? [])];
			return subSteps.length === 0 ? (void 0) : subSteps;
		},
		askSubStepsWithCategory: (step: TypeOrmLoadManyBySqlUseCursorPipelineStepDef) => {
			const found = CommonStepDefs.folder.askSubStepsWithCategory(step);
			return {...(found ?? {}), ...(CommonStepDefs.askSubStepsWithCategory(step) ?? {})};
		},
		tryToRevealSubStep: (step: TypeOrmLoadManyBySqlUseCursorPipelineStepDef, subStep: PipelineStepDef): boolean => {
			const revealed = CommonStepDefs.folder.tryToRevealSubStep(step, subStep);
			if (revealed) {
				return true;
			}
			return CommonStepDefs.tryToRevealSubSteps(step, subStep) ?? false;
		}
	};
	defs.createSubNodes = CommonStepDefs.createSetsLikeSubNodesAndEndNode;
	defs.findSubPorts = CommonStepDefs.findSubPorts;
	registerStepDef(defs);
	return defs;
})();
