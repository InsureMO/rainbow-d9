import {Undefinable} from '@rainbow-d9/n1';
import {
	ConditionalPipelineStepDef,
	FileDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {
	ConfigurableElement,
	ConfigurableModel,
	registerStepDefsReconfigurers,
	StepDefsReconfigurer
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfigChangesConfirmed, ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs, RouteTestStepDefModel} from '../common';
import {ELEMENT_ANCHOR_USE} from '../common/elements';

export interface ConditionalStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS;
	check?: string;
}

export const ConditionalStepDefs =
	CommonStepDefs.createStepNodeConfigurer<ConditionalPipelineStepDef, ConditionalStepDefModel>({
		use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS,
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createConditionalSubNodesAndEndNode,
		helpDocs: HelpDocs.conditionalStep
	});
registerStepDef(ConditionalStepDefs);

const getParentDef = (model: StepNodeModel): ConditionalPipelineStepDef => {
	return model.getSubOf() as ConditionalPipelineStepDef;
};
const shouldReConfigure = (model: StepNodeModel): boolean => {
	if (model.isFirstSubStep()) {
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

		// TODO
		const index = properties.findIndex(prop => prop.anchor === ELEMENT_ANCHOR_USE);
		const beforeAndUse = properties.slice(0, index + 1);
		const after = properties.slice(index + 1);
		return [
			...beforeAndUse,
			// {
			//
			// },
			...after
		];
	}
};
registerStepDefsReconfigurers(ConditionalStepCheckReconfigurer);
