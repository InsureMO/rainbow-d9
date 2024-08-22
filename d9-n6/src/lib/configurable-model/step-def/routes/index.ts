import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef, RoutesPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel, StepDefsReconfigurer} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfigChangesConfirmed, ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs, FirstSubStepPortForRouteTest, RouteTestStepDefModel} from '../common';

export interface RoutesStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ROUTES_SETS;
}

const getParentDef = (model: StepNodeModel): RoutesPipelineStepDef => {
	return model.getSubOf() as RoutesPipelineStepDef;
};
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
const getRouteOfParentDef = (model: StepNodeModel): ArrayElement<RoutesPipelineStepDef['routes']> => {
	const parentDef = getParentDef(model);
	return parentDef.routes?.find(route => route.steps?.[0] === model.step);
};
const shouldReConfigure = (model: StepNodeModel): boolean => {
	if (!model.isFirstSubStep()) {
		return false;
	}
	return getRouteOfParentDef(model) != null;
};

export const RoutesStepCheckReconfigurer: StepDefsReconfigurer = {
	prepare: (prepare: StepNodeConfigurer['prepare'], model: StepNodeModel): Undefinable<StepNodeConfigurer['prepare']> => {
		if (!shouldReConfigure(model)) {
			return (void 0);
		}

		const routeDef = getRouteOfParentDef(model);
		return (def: PipelineStepDef): ConfigurableModel => {
			const model = prepare(def) as RouteTestStepDefModel;
			model.temporary = model.temporary ?? {};
			model.temporary.check = routeDef.check;
			return model;
		};
	},
	confirm: (confirm: StepNodeConfigurer['confirm'], model: StepNodeModel): Undefinable<StepNodeConfigurer['confirm']> => {
		if (!shouldReConfigure(model)) {
			return (void 0);
		}

		const routeDef = getRouteOfParentDef(model);
		return (model: ConfigurableModel, def: PipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigChangesConfirmed => {
			const ret = confirm(model, def, file, options);
			// TODO VALIDATE CHECK OF ROUTE STEP
			routeDef.check = (model as RouteTestStepDefModel).temporary?.check;
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

export const RoutesStepDefs =
	CommonStepDefs.createStepNodeConfigurer<RoutesPipelineStepDef, RoutesStepDefModel>({
		use: StandardPipelineStepRegisterKey.ROUTES_SETS,
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: (step: RoutesPipelineStepDef) => {
				const subSteps = [
					...(step.routes ?? []).map(route => route.steps ?? []).flat(),
					...(step.otherwise ?? [])
				];
				return subSteps.length === 0 ? (void 0) : subSteps;
			},
			askSubStepsWithCategory: (step: RoutesPipelineStepDef) => {
				const found = (step.routes ?? []).reduce((acc, route, index) => {
					acc[`if-${index + 1}`] = route.steps ?? [];
					return acc;
				}, {otherwise: step.otherwise ?? []});
				Object.keys(found).forEach(key => {
					if (found[key].length === 0) {
						delete found[key];
					}
				});

				return Object.keys(found).length === 0 ? (void 0) : found;
			}
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createRoutesSubNodesAndEndNode,
		helpDocs: HelpDocs.routesStep,
		reconfigurer: RoutesStepCheckReconfigurer,
		firstSubStepPortContainerFind: (step, parent) => {
			if (parent.use !== StandardPipelineStepRegisterKey.ROUTES_SETS) {
				return (void 0);
			}
			const found = (parent as RoutesPipelineStepDef).routes?.some(route => route.steps?.[0] === step);
			return found ? FirstSubStepPortForRouteTest : (void 0);
		}
	});
registerStepDef(RoutesStepDefs);
