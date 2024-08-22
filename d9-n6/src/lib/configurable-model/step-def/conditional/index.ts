import {Undefinable} from '@rainbow-d9/n1';
import {
	ConditionalPipelineStepDef,
	FileDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel, StepDefsReconfigurer} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfigChangesConfirmed, ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs, FirstSubStepPortForRouteTest, RouteTestStepDefModel} from '../common';

export interface ConditionalStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS;
}

const getParentDef = (model: StepNodeModel): ConditionalPipelineStepDef => {
	return model.getSubOf() as ConditionalPipelineStepDef;
};
const shouldReConfigure = (model: StepNodeModel): boolean => {
	if (!model.isFirstSubStep()) {
		return false;
	}
	const parentDef = getParentDef(model);
	return (parentDef.steps ?? [])[0] === model.step;
};

export const ConditionalStepCheckReconfigurer: StepDefsReconfigurer = {
	prepare: (prepare: StepNodeConfigurer['prepare'], model: StepNodeModel): Undefinable<StepNodeConfigurer['prepare']> => {
		if (!shouldReConfigure(model)) {
			return (void 0);
		}

		const parentDef = getParentDef(model);
		return (def: PipelineStepDef): ConfigurableModel => {
			const model = prepare(def) as RouteTestStepDefModel;
			model.temporary = model.temporary ?? {};
			model.temporary.check = parentDef.check;
			return model;
		};
	},
	confirm: (confirm: StepNodeConfigurer['confirm'], model: StepNodeModel): Undefinable<StepNodeConfigurer['confirm']> => {
		if (!shouldReConfigure(model)) {
			return (void 0);
		}

		const parentDef = getParentDef(model);
		return (model: ConfigurableModel, def: PipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigChangesConfirmed => {
			const ret = confirm(model, def, file, options);
			// TODO VALIDATE CHECK OF CONDITIONAL STEP
			parentDef.check = (model as RouteTestStepDefModel).temporary?.check;
			return ret;
		};
	},
	properties: (properties: Array<ConfigurableElement>, model: StepNodeModel): Undefinable<Array<ConfigurableElement>> => {
		if (!shouldReConfigure(model)) {
			return (void 0);
		}

		return CommonStepDefs.reconfigurePropertiesWithRouteCheck(properties, model);
	}
};

export const ConditionalStepDefs =
	CommonStepDefs.createStepNodeConfigurer<ConditionalPipelineStepDef, ConditionalStepDefModel>({
		use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS,
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubStep: (step: ConditionalPipelineStepDef) => {
				const subSteps = [...(step.steps ?? []), ...(step.otherwise ?? [])];
				return subSteps.length === 0 ? (void 0) : subSteps;
			}
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createConditionalSubNodesAndEndNode,
		helpDocs: HelpDocs.conditionalStep,
		reconfigurer: ConditionalStepCheckReconfigurer,
		firstSubStepPortContainerFind: (step, parent) => {
			if (parent.use === StandardPipelineStepRegisterKey.CONDITIONAL_SETS
				&& (parent as ConditionalPipelineStepDef).steps?.[0] === step) {
				return FirstSubStepPortForRouteTest;
			}
			return (void 0);
		}
	});
registerStepDef(ConditionalStepDefs);
