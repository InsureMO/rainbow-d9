import {AllInPipelineStepDef, FileDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {ConfigChangesConfirmed, ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {confirm} from './confirm';
import {
	createConditionalSubNodesAndEndNode,
	createParallelSubNodesAndEndNode,
	createSetsLikeSubNodesAndEndNode,
	createSubNodes,
	createSubNodesAndEndNode
} from './create-sub-nodes';
import {discard} from './discard';
import {
	createMainContentElement,
	createSwitchableSnippetElement,
	elementErrorHandles,
	elementFromInputGroup,
	elementName,
	elementToOutputGroup,
	elementUse
} from './elements';
import {findSubPorts} from './find-sub-ports';
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
import {switchUse} from './switch-use';
import {CommonStepDefModel, CommonStepDefsType, CreateStepNodeConfigurerOptions} from './types';

export * from './types';
export * from './utils';

export * from './links';
export * from './port-widgets';
export * from './ports';

export const CommonStepDefs: CommonStepDefsType = {
	prepare, switchUse, confirm, discard,
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
	createSetsLikeSubNodesAndEndNode, createParallelSubNodesAndEndNode, createConditionalSubNodesAndEndNode,
	findSubPorts,
	// element create
	createMainContentElement,
	createSwitchableSnippetElement,
	// configurers
	createStepNodeConfigurer: <F extends AllInPipelineStepDef, M extends CommonStepDefModel>(options: CreateStepNodeConfigurerOptions<F, M>): StepNodeConfigurer<F, M> => {
		const {
			use,
			prepare, switchUse, confirm, discard,
			properties, ports,
			createSubNodes, findSubPorts,
			helpDocs
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
						console.warn(`No prepare defined for step[${use}], use default CommonStepDefs.prepare.`);
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
						console.warn(`No switchUse defined for step[${use}], use default CommonStepDefs.switchUse.`);
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
						console.warn(`No confirm defined for step[${use}], use default CommonStepDefs.confirm.`);
						return (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigChangesConfirmed => {
							return CommonStepDefs.confirm(model, def, file, options);
						};
				}
			})(),
			discard: discard ?? CommonStepDefs.discard,
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
			helpDocs
		};
	}
};

