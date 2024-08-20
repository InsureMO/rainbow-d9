import {VUtils} from '@rainbow-d9/n1';
import {EachPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrUseDefaultBadge, createStrEditor} from '../../common';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefModel, CommonStepDefs} from '../common';

export interface EachStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.EACH_SETS;
	originalContentName?: string;
	itemName?: string;
}

export const EachStepDefs =
	CommonStepDefs.createStepNodeConfigurer<EachPipelineStepDef, EachStepDefModel>({
		use: StandardPipelineStepRegisterKey.EACH_SETS,
		prepare: ['and', (def, model) => {
			model.originalContentName = def.originalContentName;
			model.itemName = def.itemName;
		}],
		switchUse: ['keep', ['originalContentName', 'itemName']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, options): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE PROPERTIES
			return () => {
				if (VUtils.isBlank(model.originalContentName)) {
					delete def.originalContentName;
				} else {
					def.originalContentName = model.originalContentName.trim();
				}
				if (VUtils.isBlank(model.itemName)) {
					delete def.itemName;
				} else {
					def.itemName = model.itemName.trim();
				}
			};
		}],
		properties: [
			CommonStepDefs.createMainContentElement({
				code: 'original-content-name', label: Labels.StepEachOriginalContentName,
				anchor: 'original-content-name',
				badge: createCheckOrUseDefaultBadge<EachStepDefModel>({check: model => VUtils.isNotBlank(model.originalContentName)}),
				editor: createStrEditor<EachStepDefModel>({
					getValue: model => model.originalContentName,
					setValue: (model, value) => model.originalContentName = value,
					placeholder: '$content'
				}),
				helpDoc: HelpDocs.stepEachOriginalContentName
			}, {
				code: 'item-name', label: Labels.StepEachItemName, anchor: 'item-name',
				badge: createCheckOrUseDefaultBadge<EachStepDefModel>({check: model => VUtils.isNotBlank(model.itemName)}),
				editor: createStrEditor<EachStepDefModel>({
					getValue: model => model.itemName,
					setValue: (model, value) => model.itemName = value,
					placeholder: '$item'
				}),
				helpDoc: HelpDocs.stepEachItemName
			})
		],
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.eachStep
	});
registerStepDef(EachStepDefs);
