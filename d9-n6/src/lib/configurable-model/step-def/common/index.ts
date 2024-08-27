import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {
	AllInPipelineStepDef,
	FileDef,
	PipelineStepDef,
	PipelineStepDiagramDef,
	SetsLikePipelineStepDef
} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel} from '../../../edit-dialog';
import {StepDefsFolder, tryToRevealSubStep} from '../../../editor';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrMissBadge, createSnippetEditor} from '../../common';
import {ConfigChangesConfirmed, ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {
	confirm,
	confirmConditionalPipelineStep,
	confirmRoutesPipelineStep,
	confirmSetsLikePipelineStep
} from './confirm';
import {
	createConditionalSubNodesAndEndNode,
	createParallelSubNodesAndEndNode,
	createRoutesSubNodesAndEndNode,
	createSetsLikeSubNodesAndEndNode,
	createSubNodes,
	createSubNodesAndEndNode
} from './create-sub-nodes';
import {discard} from './discard';
import {
	createMainContentElement,
	createSwitchableSnippetElement,
	ELEMENT_ANCHOR_USE,
	elementErrorHandles,
	elementFromInputGroup,
	elementName,
	elementToOutputGroup,
	elementUse
} from './elements';
import {findSubPorts} from './find-sub-ports';
import {folder} from './folder';
import {
	PortAnyError,
	PortCatchableError,
	PortExposedError,
	PortFromInput,
	PortMerge,
	PortSteps,
	PortToOutput,
	PortUncatchableError
} from './ports';
import {prepare} from './prepare';
import {survivalAfterConfirm} from './survival-after-confirm';
import {switchUse} from './switch-use';
import {CommonStepDefModel, CommonStepDefsType, CreateStepNodeConfigurerOptions, RouteTestStepDefModel} from './types';

export * from './types';
export * from './utils';

export * from './links';
export * from './port-widgets';
export * from './ports';

export const CommonStepDefs: CommonStepDefsType = {
	prepare, switchUse, confirm, survivalAfterConfirm, discard, folder,
	properties: {
		name: elementName, use: elementUse,
		fromInput: elementFromInputGroup, toOutput: elementToOutputGroup,
		errorHandles: elementErrorHandles,
		leadingGroup: [elementName, elementUse, elementFromInputGroup],
		tailingGroup: [elementErrorHandles, elementToOutputGroup]
	},
	ports: {
		fromInput: PortFromInput, toOutput: PortToOutput, merge: PortMerge,
		handleCatchableError: PortCatchableError, handleUncatchableError: PortUncatchableError,
		handleExposedError: PortExposedError, handleAnyError: PortAnyError
	},
	prebuiltPorts: {
		steps: PortSteps,
		input: [{key: 'from-input', port: PortFromInput}],
		errorHandles: [
			{key: 'catchable-error-handle', port: PortCatchableError},
			{key: 'exposed-error-handle', port: PortExposedError},
			{key: 'uncatchable-error-handle', port: PortUncatchableError},
			{key: 'any-error-handle', port: PortAnyError}
		],
		output: [
			{key: 'to-output', port: PortToOutput},
			{key: 'merge', port: PortMerge}
		]
	},
	createSubNodes, createSubNodesAndEndNode,
	createSetsLikeSubNodesAndEndNode, createParallelSubNodesAndEndNode,
	createConditionalSubNodesAndEndNode, createRoutesSubNodesAndEndNode,
	confirmSetsLikePipelineStep, confirmConditionalPipelineStep, confirmRoutesPipelineStep,
	findSubPorts,
	switchFoldWhenSubNodesExist: (step: PipelineStepDiagramDef, fold: boolean) => {
		step.$diagram = step.$diagram ?? {};
		step.$diagram.$foldSubSteps = fold;
	},
	askSubSteps: (step: SetsLikePipelineStepDef) => {
		const subSteps = step.steps ?? [];
		return subSteps.length === 0 ? (void 0) : subSteps;
	},
	askSubStepsWithCategory: (step: SetsLikePipelineStepDef) => {
		const steps = step.steps ?? [];
		return steps.length === 0 ? (void 0) : {steps};
	},
	tryToRevealSubSteps: <F extends AllInPipelineStepDef>(step: F, subStep: PipelineStepDef, findSubSteps?: (step: F) => Undefinable<Array<PipelineStepDef>>): boolean => {
		const steps = (findSubSteps == null ? (step as unknown as SetsLikePipelineStepDef).steps : findSubSteps(step)) ?? [];
		if (steps.includes(subStep)) {
			const def = step as PipelineStepDiagramDef;
			def.$diagram = {...(def.$diagram ?? {}), $foldSubSteps: false};
			return true;
		} else {
			const revealed = steps.some(step => tryToRevealSubStep(step, subStep));
			if (revealed) {
				const def = step as PipelineStepDiagramDef;
				def.$diagram = {...(def.$diagram ?? {}), $foldSubSteps: false};
			}
			return revealed;
		}
	},
	// element create
	createMainContentElement,
	createSwitchableSnippetElement,
	// configurers
	createStepNodeConfigurer: <F extends AllInPipelineStepDef, M extends CommonStepDefModel>(options: CreateStepNodeConfigurerOptions<F, M>): StepNodeConfigurer<F, M> => {
		const {
			use,
			prepare, switchUse, confirm, survivalAfterConfirm, discard, folder,
			properties, ports,
			createSubNodes, findSubPorts,
			helpDocs,
			reconfigurer, firstSubStepPortContainerFind
		} = options;

		return {
			use,
			prepare: (() => {
				const [key, func] = prepare ?? [];
				switch (key) {
					case 'replace':
						return func;
					case 'and':
						return (def: F): M => CommonStepDefs.prepare(def, func);
					default:
						console.debug(`No prepare defined for step[${use}], use default CommonStepDefs.prepare.`);
						return (def: F): M => CommonStepDefs.prepare(def);
				}
			})(),
			switchUse: (() => {
				const [key, content] = switchUse ?? [];
				switch (key) {
					case 'replace':
						return content;
					case 'keep':
						return (model: ConfigurableModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
							CommonStepDefs.switchUse(model, content, originalUse);
							return model;
						};
					default:
						console.debug(`No switchUse defined for step[${use}], use default CommonStepDefs.switchUse.`);
						return (model: ConfigurableModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
							CommonStepDefs.switchUse(model, [], originalUse);
							return model;
						};
				}
			})(),
			confirm: (() => {
				const [key, func] = confirm ?? [];
				switch (key) {
					case 'replace':
						return func;
					case 'and':
						return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigChangesConfirmed => {
							return CommonStepDefs.confirm(model, def, file, options, func);
						};
					default:
						console.debug(`No confirm defined for step[${use}], use default CommonStepDefs.confirm.`);
						return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigChangesConfirmed => {
							return CommonStepDefs.confirm(model, def, file, options);
						};
				}
			})(),
			survivalAfterConfirm: (() => {
				const [key, func] = survivalAfterConfirm ?? [];
				switch (key) {
					case 'replace':
						return func;
					case 'and':
						return (def: F, property: string): boolean => {
							const survival = CommonStepDefs.survivalAfterConfirm(def, property);
							if (!survival) {
								return func(def, property);
							} else {
								return survival;
							}
						};
					default:
						console.debug(`No survivalAfterConfirm defined for step[${use}], use default CommonStepDefs.survivalAfterConfirm.`);
						return (def: F, property: string): boolean => {
							return CommonStepDefs.survivalAfterConfirm(def, property);
						};
				}
			})(),
			discard: discard ?? CommonStepDefs.discard,
			folder: ((): StepDefsFolder => {
				const {switch: switchFold, askSubSteps, askSubStepsWithCategory, tryToRevealSubStep} = folder ?? {};
				return {
					accept: (step: F) => step.use === use,
					switch: (step: PipelineStepDiagramDef, fold: boolean) => {
						CommonStepDefs.folder.switch(step, fold);
						switchFold?.(step, fold);
					},
					askSubSteps: (step: F) => {
						const subSteps = [...(askSubSteps?.(step) ?? []), ...(CommonStepDefs.folder.askSubSteps(step) ?? [])];
						return subSteps.length === 0 ? (void 0) : subSteps;
					},
					askSubStepsWithCategory: (step: F) => {
						const found = CommonStepDefs.folder.askSubStepsWithCategory(step);
						return {...(found ?? {}), ...(askSubStepsWithCategory?.(step) ?? {})};
					},
					tryToRevealSubStep: (step: F, subStep: PipelineStepDef): boolean => {
						const revealed = CommonStepDefs.folder.tryToRevealSubStep(step, subStep);
						if (revealed) {
							return true;
						}
						return tryToRevealSubStep?.(step, subStep) ?? false;
					}
				};
			})(),
			properties: [
				...CommonStepDefs.properties.leadingGroup,
				...(properties ?? []),
				...CommonStepDefs.properties.tailingGroup
			],
			ports: [
				...CommonStepDefs.prebuiltPorts.input,
				...(ports ?? []),
				...CommonStepDefs.prebuiltPorts.errorHandles,
				...CommonStepDefs.prebuiltPorts.output
			],
			createSubNodes: createSubNodes ?? CommonStepDefs.createSubNodesAndEndNode,
			findSubPorts: findSubPorts ?? CommonStepDefs.findSubPorts,
			helpDocs,
			reconfigurer: reconfigurer,
			firstSubStepPortContainerFind: firstSubStepPortContainerFind
		};
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	reconfigurePropertiesWithRouteCheck: (properties: Array<ConfigurableElement>, _model: StepNodeModel): Undefinable<Array<ConfigurableElement>> => {
		const index = properties.findIndex(prop => prop.anchor === ELEMENT_ANCHOR_USE);
		const beforeAndUse = properties.slice(0, index + 1);
		const after = properties.slice(index + 1);
		return [
			...beforeAndUse,
			{
				code: 'route-test', label: Labels.StepRouteTest, anchor: 'route-test',
				children: [{
					code: 'route-check', label: Labels.StepRouteCheck, anchor: 'route-check',
					badge: createCheckOrMissBadge<RouteTestStepDefModel>({check: model => VUtils.isNotBlank(model.temporary?.check)}),
					editor: createSnippetEditor<RouteTestStepDefModel>({
						getValue: model => model.temporary?.check,
						setValue: (model, value) => {
							model.temporary = model.temporary ?? {};
							model.temporary.check = value;
						},
						height: PlaygroundCssVars.SNIPPET_ROUTE_CHECK_HEIGHT
					}),
					helpDoc: HelpDocs.stepRouteCheck
				}],
				group: true, collapsible: true
			},
			...after
		];
	}
};

