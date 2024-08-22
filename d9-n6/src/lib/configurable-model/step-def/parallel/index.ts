import {VUtils} from '@rainbow-d9/n1';
import {ParallelPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {
	createBoolEditor,
	createCheckOrIgnoreBadge,
	createPrePortBoolWithKey,
	createSnippetEditor,
	createYesOrNoBadge
} from '../../common';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefModel, CommonStepDefs} from '../common';

export interface ParallelStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.PARALLEL_SETS;
	cloneData?: string;
	race?: boolean;
}

export const ParallelStepDefs =
	CommonStepDefs.createStepNodeConfigurer<ParallelPipelineStepDef, ParallelStepDefModel>({
		use: StandardPipelineStepRegisterKey.PARALLEL_SETS,
		prepare: ['and', (def, model) => {
			model.cloneData = def.cloneData;
			model.race = def.race;
		}],
		switchUse: ['keep', ['cloneData', 'race']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, _options): AndConfirmReturned => {
			// TODO VALIDATE PROPERTIES OF PARALLEL STEP
			return () => {
				if (VUtils.isBlank(model.cloneData)) {
					delete def.cloneData;
				} else {
					def.cloneData = model.cloneData.trim();
				}
				if (VUtils.isBlank(model.race)) {
					delete def.race;
				} else {
					def.race = model.race;
				}
			};
		}],
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: CommonStepDefs.askSubSteps,
			askSubStepsWithCategory: CommonStepDefs.askSubStepsWithCategory
		},
		properties: [
			CommonStepDefs.createMainContentElement({
				code: 'race', label: Labels.StepParallelRace, anchor: 'race',
				badge: createYesOrNoBadge<ParallelStepDefModel>({check: model => model.race === true}),
				editor: createBoolEditor<ParallelStepDefModel>({
					getValue: model => model.race,
					setValue: (model, value) => {
						if (value === true) {
							model.race = true;
						} else {
							delete model.race;
						}
					}
				}),
				helpDoc: HelpDocs.stepParallelRace
			}, {
				code: 'clone-data', label: Labels.StepParallelCloneData, anchor: 'clone-data',
				badge: createCheckOrIgnoreBadge<ParallelStepDefModel>({check: model => VUtils.isNotBlank(model.snippet)}),
				editor: createSnippetEditor<ParallelStepDefModel>({
					getValue: model => model.cloneData,
					setValue: (model, value) => model.cloneData = value,
					height: PlaygroundCssVars.SNIPPET_PARALLEL_CLONE_DATA_HEIGHT
				}),
				helpDoc: HelpDocs.stepParallelCloneData
			})
		],
		ports: [
			createPrePortBoolWithKey<ParallelStepDefModel>({
				key: 'race', label: Labels.StepParallelRace, getValue: model => model.race
			}),
			{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}
		],
		createSubNodes: CommonStepDefs.createParallelSubNodesAndEndNode,
		helpDocs: HelpDocs.parallelStep
	});
registerStepDef(ParallelStepDefs);
