import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef, RoutesPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
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
import {
	CommonStepDefModel,
	CommonStepDefs,
	FirstSubStepPortForRouteTest,
	registerFirstSubStepPortContainerFinds,
	RouteTestStepDefModel
} from '../common';

export interface RoutesStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ROUTES_SETS;
}

export const RoutesStepDefs =
	CommonStepDefs.createStepNodeConfigurer<RoutesPipelineStepDef, RoutesStepDefModel>({
		use: StandardPipelineStepRegisterKey.ROUTES_SETS,
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createRoutesSubNodesAndEndNode,
		helpDocs: HelpDocs.routesStep
	});
registerStepDef(RoutesStepDefs);

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
registerStepDefsReconfigurers(RoutesStepCheckReconfigurer);
registerFirstSubStepPortContainerFinds((step, parent) => {
	if (parent.use !== StandardPipelineStepRegisterKey.ROUTES_SETS) {
		return (void 0);
	}
	const found = (parent as RoutesPipelineStepDef).routes?.some(route => route.steps?.[0] === step);
	return found ? FirstSubStepPortForRouteTest : (void 0);
});
