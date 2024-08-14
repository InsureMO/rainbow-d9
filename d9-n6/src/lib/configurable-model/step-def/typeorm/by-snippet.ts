import {VUtils} from '@rainbow-d9/n1';
import {FileDef, StandardPipelineStepRegisterKey, TypeOrmBySnippetPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrMissBadge, createPrePortExistsWithKey, createSnippetEditor} from '../../common';
import {ConfirmNodeOptions} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefs} from '../common';
import {elementDatasource} from './element-datasource';
import {elementAutonomousOrTransaction} from './element-transaction';
import {confirmWithAutonomous, prepareWithAutonomous, switchUseWithAutonomous} from './funcs';
import {TypeOrmWithAutonomousStepDefModel} from './types';

export interface TypeOrmBySnippetStepDefModel extends TypeOrmWithAutonomousStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET;
	snippet?: string;
}

export const TypeOrmBySnippetStepDefs =
	CommonStepDefs.createStepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET,
		prepare: ['and', prepareWithAutonomous((def, model) => model.snippet = def.snippet)],
		switchUse: ['keep', [...switchUseWithAutonomous, 'snippet']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', confirmWithAutonomous((model, def, _file: FileDef, _options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE SNIPPET
			return () => {
				def.snippet = model.snippet;
			};
		})],
		properties: [
			CommonStepDefs.createMainContentElement(elementDatasource, elementAutonomousOrTransaction, {
				code: 'snippet', label: Labels.StepTypeOrmSnippet, anchor: 'snippet',
				badge: createCheckOrMissBadge<TypeOrmBySnippetStepDefModel>({check: model => VUtils.isNotBlank(model.snippet)}),
				editor: createSnippetEditor<TypeOrmBySnippetStepDefModel>({
					getValue: model => model.snippet,
					setValue: (model, value) => model.snippet = value,
					height: PlaygroundCssVars.SNIPPET_HEIGHT
				}),
				helpDoc: HelpDocs.stepTypeOrmSnippet
			})
		],
		// TODO PORTS
		ports: [
			createPrePortExistsWithKey<TypeOrmBySnippetStepDefModel>({
				key: 'snippet', label: Labels.StepTypeOrmSnippet,
				getValue: model => model.snippet
			})
		],
		helpDocs: HelpDocs.typeOrmBySnippetStep
	});
registerStepDef(TypeOrmBySnippetStepDefs);
