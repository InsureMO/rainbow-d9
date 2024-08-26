import {VUtils} from '@rainbow-d9/n1';
import {SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrMissBadge, createPrePortExistsWithKey, createSnippetEditor} from '../../common';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefModel, CommonStepDefs} from '../common';

export interface SnippetStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SNIPPET;
	snippet?: string;
}

export const SnippetStepDefs =
	CommonStepDefs.createStepNodeConfigurer<SnippetPipelineStepDef, SnippetStepDefModel>({
		use: StandardPipelineStepRegisterKey.SNIPPET,
		prepare: ['and', (def, model) => model.snippet = def.snippet],
		switchUse: ['keep', ['snippet']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, _options): AndConfirmReturned => {
			// TODO VALIDATE SNIPPET OF SNIPPET STEP
			return () => def.snippet = model.snippet;
		}],
		survivalAfterConfirm: ['and', (_def: SnippetPipelineStepDef, property: string) => {
			return ['snippet'].includes(property);
		}],
		properties: [
			CommonStepDefs.createMainContentElement({
				code: 'snippet', label: Labels.StepSnippetSnippet, anchor: 'snippet',
				badge: createCheckOrMissBadge<SnippetStepDefModel>({check: model => VUtils.isNotBlank(model.snippet)}),
				editor: createSnippetEditor<SnippetStepDefModel>({
					getValue: model => model.snippet,
					setValue: (model, value) => model.snippet = value,
					height: PlaygroundCssVars.SNIPPET_HEIGHT
				}),
				helpDoc: HelpDocs.stepSnippetSnippet
			})
		],
		ports: [createPrePortExistsWithKey<SnippetStepDefModel>({
			key: 'snippet', label: Labels.StepSnippetSnippet,
			getValue: model => model.snippet
		})],
		helpDocs: HelpDocs.snippetStep
	});
registerStepDef(SnippetStepDefs);
