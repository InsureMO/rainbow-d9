import {
	FileDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey,
	TypeOrmBySnippetPipelineStepDef
} from '../../../definition';
import {ConfigurableElementAnchor, ConfigurableModel} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {TypeOrmStepConfirmFuncs} from './confirm';
import {typeOrmDatasourceProperty} from './datasource-property';
import {TypeOrmStepPrepareFuncs} from './prepare';
import {TypeOrmStepSwitchUseFuncs} from './switch-use';
import {TypeOrmOperationStepDefModel} from './types';

export interface TypeOrmBySnippetStepDefModel extends TypeOrmOperationStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET;
	snippet?: string;
}

const prepare: StepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>['prepare'] =
	(def: TypeOrmBySnippetPipelineStepDef): TypeOrmBySnippetStepDefModel => {
		const model: TypeOrmBySnippetStepDefModel = TypeOrmStepPrepareFuncs.prepare(def) as TypeOrmBySnippetStepDefModel;
		model.snippet = def.snippet;
		return model;
	};
const switchUse: StepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>['switchUse'] =
	(model: TypeOrmBySnippetStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		TypeOrmStepSwitchUseFuncs.createOperationSwitchUse('snippet')(model, originalUse);
		return model;
	};
const confirm: StepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>['confirm'] =
	(model: TypeOrmBySnippetStepDefModel, def: TypeOrmBySnippetPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		TypeOrmStepConfirmFuncs.confirmOperation(model, def, file, options);

		def.snippet = model.snippet;

		options.handlers.onChange();
		return true;
	};

export const TypeOrmBySnippetStepDefs: StepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel> = {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		CommonStepDefs.createMainContentElement(typeOrmDatasourceProperty),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		...CommonStepDefs.prebuiltPorts.input,
		// {key: 'property', port: createRefOnCodePortCode({label})},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.typeOrmBySnippetStep
};
registerStepDef(TypeOrmBySnippetStepDefs);
