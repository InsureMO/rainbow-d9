import {VUtils} from '@rainbow-d9/n1';
import {FileDef, StandardPipelineStepRegisterKey, TypeOrmBySnippetPipelineStepDef} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrMissBadge, createPrePortExistsWithKey, createSnippetEditor} from '../../common';
import {ConfirmNodeOptions} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned} from '../common';
import {createTypeOrmWithAutonomousStepDefs} from './funcs';
import {TypeOrmWithAutonomousStepDefModel} from './types';

export interface TypeOrmBySnippetStepDefModel extends TypeOrmWithAutonomousStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET;
	snippet?: string;
}

export const TypeOrmBySnippetStepDefs =
	createTypeOrmWithAutonomousStepDefs<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET,
		andPrepare: (def, model) => model.snippet = def.snippet,
		keepPropertiesOnUseSwitch: ['snippet'],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		andConfirm: (model, def, _file: FileDef, _options: ConfirmNodeOptions): AndConfirmReturned => {
			// TODO VALIDATE SNIPPET OF TYPEORM SNIPPET STEP
			return () => def.snippet = model.snippet;
		},
		properties: [{
			code: 'snippet', label: Labels.StepTypeOrmSnippet, anchor: 'snippet',
			badge: createCheckOrMissBadge<TypeOrmBySnippetStepDefModel>({check: model => VUtils.isNotBlank(model.snippet)}),
			editor: createSnippetEditor<TypeOrmBySnippetStepDefModel>({
				getValue: model => model.snippet,
				setValue: (model, value) => model.snippet = value,
				height: PlaygroundCssVars.SNIPPET_HEIGHT
			}),
			helpDoc: HelpDocs.stepTypeOrmSnippet
		}],
		ports: [createPrePortExistsWithKey<TypeOrmBySnippetStepDefModel>({
			key: 'snippet', label: Labels.StepTypeOrmSnippet,
			getValue: model => model.snippet
		})],
		helpDocs: HelpDocs.typeOrmBySnippetStep
	});
registerStepDef(TypeOrmBySnippetStepDefs);
