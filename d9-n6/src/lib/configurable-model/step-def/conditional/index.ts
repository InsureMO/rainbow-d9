import {Undefinable} from '@rainbow-d9/n1';
import {
	AllInPipelineStepDef,
	ConditionalPipelineStepDef,
	FileDef,
	isFileDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfigChangesConfirmed, ConfirmNodeOptions, NodeOperators, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {
	AndConfirmReturned,
	CommonStepDefModel,
	CommonStepDefs,
	createNodeOperatorsForStep,
	FirstSubStepPortForOtherwise,
	FirstSubStepPortForRouteTest,
	RouteTestStepDefModel
} from '../common';
import {StepDefsReconfigurer} from '../step-def-reconfigurer';

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
	},
	operators: (operators: StepNodeConfigurer['operators'], node: StepNodeModel): Undefinable<StepNodeConfigurer['operators']> => {
		if (isFileDef(node.step) || isFileDef(node.getSubOf())) {
			// top level, do nothing
			return (void 0);
		}
		const parentDef = node.getSubOf() as PipelineStepDef;
		if (parentDef.use !== StandardPipelineStepRegisterKey.CONDITIONAL_SETS) {
			// parent is not conditional, do nothing
			return (void 0);
		}
		return <F extends AllInPipelineStepDef>(node: StepNodeModel, def: F): NodeOperators<F> => {
			const computed = operators(node, def);
			const parentDef = node.getSubOf() as ConditionalPipelineStepDef;
			const steps = parentDef.steps ?? [];
			const otherwise = parentDef.otherwise ?? [];
			// prepend/append step already be handled in common logic
			if (steps.includes(def) && node.isFirstSubStep() && otherwise.length === 0) {
				// if given node is one of check steps, and otherwise not exists, can do add otherwise
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				computed.addOtherwise = (node: StepNodeModel, _def: F) => {
					parentDef.otherwise = [node.assistant.createDefaultStep()];
					node.handlers.onChange();
				};
			} else if (otherwise.includes(def)) {
				// if given node is one of otherwise steps, can do prepend/append/remove step
				// otherwise can be removed anyway
				createNodeOperatorsForStep(otherwise, true, computed);
				if (otherwise[0] === def) {
					// otherwise can be removed anyway for first step of otherwise
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					computed.removeOtherwise = (node: StepNodeModel, _def: F) => {
						delete parentDef.otherwise;
						node.handlers.onChange();
					};
				}
				if (otherwise.length === 1) {
					// only one step in otherwise, since remove step equals remove otherwise
					// and because of remove otherwise exists, therefore delete remove step
					delete computed.remove;
				}
			}
			return computed;
		};
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
			const isRouteTest = (parent as ConditionalPipelineStepDef).steps?.[0] === step;
			if (isRouteTest) {
				return FirstSubStepPortForRouteTest;
			}
			const isOtherwise = (parent as ConditionalPipelineStepDef).otherwise?.[0] === step;
			return isOtherwise ? FirstSubStepPortForOtherwise : (void 0);
		}
	});
registerStepDef(ConditionalStepDefs);
