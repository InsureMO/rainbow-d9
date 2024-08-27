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
import {
	AndConfirmReturned,
	CommonStepDefModel,
	CommonStepDefs,
	FirstSubStepPortForRouteTest,
	RouteTestStepDefModel
} from '../common';

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
	return parentDef.use === StandardPipelineStepRegisterKey.CONDITIONAL_SETS && (parentDef.steps ?? [])[0] === model.step;
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
		confirm: ['and', (_model, def, _file, options): AndConfirmReturned => {
			return () => {
				CommonStepDefs.confirmConditionalPipelineStep(def, options);
			};
		}],
		survivalAfterConfirm: ['and', (_def: ConditionalPipelineStepDef, property: string) => {
			return [
				'check', 'steps', 'steps.*', 'otherwise', 'otherwise.*',
				'$diagram.$foldSubSteps'
			].includes(property);
		}],
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: (step: ConditionalPipelineStepDef) => {
				const subSteps = [...(step.steps ?? []), ...(step.otherwise ?? [])];
				return subSteps.length === 0 ? (void 0) : subSteps;
			},
			askSubStepsWithCategory: (step: ConditionalPipelineStepDef) => {
				const {steps = [], otherwise = []} = step;
				const found = {'if': steps, otherwise};
				Object.keys(found).forEach(key => {
					if (found[key].length === 0) {
						delete found[key];
					}
				});

				return Object.keys(found).length === 0 ? (void 0) : found;
			},
			tryToRevealSubStep: (step: ConditionalPipelineStepDef, subStep: PipelineStepDef): boolean => {
				return CommonStepDefs.tryToRevealSubSteps<ConditionalPipelineStepDef>(step, subStep, (step) => {
					return [...(step.steps ?? []), ...(step.otherwise ?? [])];
				});
			}
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createConditionalSubNodesAndEndNode,
		helpDocs: HelpDocs.conditionalStep,
		reconfigurer: ConditionalStepCheckReconfigurer,
		firstSubStepPortContainerFind: (step, parent) => {
			if (parent.use !== StandardPipelineStepRegisterKey.CONDITIONAL_SETS) {
				return (void 0);
			}
			const found = (parent as ConditionalPipelineStepDef).steps?.[0] === step;
			return found ? FirstSubStepPortForRouteTest : (void 0);
		}
	});
registerStepDef(ConditionalStepDefs);
