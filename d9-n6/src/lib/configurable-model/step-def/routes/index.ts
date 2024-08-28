import {Undefinable} from '@rainbow-d9/n1';
import {
	AllInPipelineStepDef,
	FileDef,
	isFileDef,
	PipelineStepDef,
	RoutesPipelineStepDef,
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

export interface RoutesStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ROUTES_SETS;
}

const getParentDef = (model: StepNodeModel): RoutesPipelineStepDef => {
	return model.getSubOf() as RoutesPipelineStepDef;
};
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
const getRouteOfParentDef = (model: StepNodeModel): Undefinable<ArrayElement<RoutesPipelineStepDef['routes']>> => {
	const parentDef = getParentDef(model);
	if (parentDef.use !== StandardPipelineStepRegisterKey.ROUTES_SETS) {
		return (void 0);
	}
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
	},
	operators: (operators: StepNodeConfigurer['operators'], node: StepNodeModel): Undefinable<StepNodeConfigurer['operators']> => {
		if (isFileDef(node.step) || isFileDef(node.getSubOf())) {
			// top level, do nothing
			return (void 0);
		}
		const parentDef = node.getSubOf() as PipelineStepDef;
		if (parentDef.use !== StandardPipelineStepRegisterKey.ROUTES_SETS) {
			// parent is not routes, do nothing
			return (void 0);
		}
		return <F extends AllInPipelineStepDef>(node: StepNodeModel, def: F): NodeOperators<F> => {
			const computed = operators(node, def);
			const parentDef = node.getSubOf() as RoutesPipelineStepDef;
			const routes = parentDef.routes ?? [];
			// find route which include given step
			const route = routes.find(route => (route.steps ?? []).includes(def));
			const otherwise = parentDef.otherwise ?? [];
			// if given node is one of route steps
			if (route != null) {
				// can do prepend/append/remove step
				const steps = route.steps;
				// override remove function
				if (routes.length > 1) {
					// more than one route, can remove step anyway
					createNodeOperatorsForStep(steps, true, computed);
					// override route, when there is no step on route, remove route as well
					computed.remove = (node: StepNodeModel, def: F) => {
						// remove step first
						steps.splice(steps.indexOf(def), 1);
						if (steps.length === 0) {
							// remove route if no step left
							const index = routes.indexOf(route);
							routes.splice(index, 1);
							node.handlers.onChange();
						}
					};
				} else {
					// last step of last route cannot be removed
					createNodeOperatorsForStep(steps, false, computed);
				}
				if (node.isFirstSubStep()) {
					// can prepend/append route anyway
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					computed.prependRoute = (node: StepNodeModel, _def: F) => {
						const index = routes.indexOf(route);
						if (index === 0) {
							routes.unshift({steps: [node.assistant.createDefaultStep()]});
						} else {
							routes.splice(index, 0, {steps: [node.assistant.createDefaultStep()]});
						}
						node.handlers.onChange();
					};
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					computed.appendRoute = (node: StepNodeModel, _def: F) => {
						const index = routes.indexOf(route);
						if (index === steps.length - 1) {
							routes.push({steps: [node.assistant.createDefaultStep()]});
						} else {
							routes.splice(index + 1, 0, {steps: [node.assistant.createDefaultStep()]});
						}
						node.handlers.onChange();
					};
					if (otherwise.length === 0) {
						// if otherwise not exists, can do add otherwise
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						computed.addOtherwise = (node: StepNodeModel, _def: F) => {
							parentDef.otherwise = [node.assistant.createDefaultStep()];
							node.handlers.onChange();
						};
					}
				}
			} else if (otherwise.includes(def)) {
				// if given node is one of otherwise steps, can do prepend/append/remove step
				// otherwise can be removed anyway
				createNodeOperatorsForStep(otherwise, true, computed);
				// can prepend route
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				computed.prependRoute = (node: StepNodeModel, _def: F) => {
					routes.push({steps: [node.assistant.createDefaultStep()]});
					parentDef.routes = routes;
					node.handlers.onChange();
				};
			}
			return computed;
		};
	}
};

export const RoutesStepDefs =
	CommonStepDefs.createStepNodeConfigurer<RoutesPipelineStepDef, RoutesStepDefModel>({
		use: StandardPipelineStepRegisterKey.ROUTES_SETS,
		confirm: ['and', (_model, def, _file, options): AndConfirmReturned => {
			return () => {
				CommonStepDefs.confirmRoutesPipelineStep(def, options);
			};
		}],
		survivalAfterConfirm: ['and', (_def: RoutesPipelineStepDef, property: string) => {
			return [
				'routes', 'routes.check', 'routes.steps', 'routes.steps.*',
				'otherwise', 'otherwise.*',
				'$diagram.$foldSubSteps'
			].includes(property);
		}],
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
			},
			tryToRevealSubStep: (step: RoutesPipelineStepDef, subStep: PipelineStepDef): boolean => {
				return CommonStepDefs.tryToRevealSubSteps<RoutesPipelineStepDef>(step, subStep, (step) => {
					return [
						...(step.routes ?? []).map(route => route.steps ?? []).flat(),
						...(step.otherwise ?? [])
					];
				});
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
			const isRouteTest = (parent as RoutesPipelineStepDef).routes?.some(route => route.steps?.[0] === step);
			if (isRouteTest) {
				return FirstSubStepPortForRouteTest;
			}
			const isOtherwise = (parent as RoutesPipelineStepDef).otherwise?.[0] === step;
			return isOtherwise ? FirstSubStepPortForOtherwise : (void 0);
		}
	});
registerStepDef(RoutesStepDefs);
