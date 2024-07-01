import {Undefinable} from '@rainbow-d9/n1';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {ConfigurableElement} from '../../../edit-dialog';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';
import {confirm} from './confirm';
import {createSubNodes, createSubNodesAndEndNode} from './create-sub-nodes';
import {discard} from './discard';
import {elementName} from './element-name';
import {findSubPorts} from './find-sub-ports';
import {
	PortAnyError,
	PortCatchableError,
	PortExposedError,
	PortFromRequest,
	PortMergeRequest,
	PortSteps,
	PortToResponse,
	PortUncatchableError
} from './ports';
import {prepare} from './prepare';
import {CommonStepDefModel, StepPort} from './types';

export * from './types';
export * from './utils';

export * from './port-widgets';
export * from './ports';

export interface CommonStepDefsProperties {
	name: ConfigurableElement;
	// fromRequest: ConfigurableElement;
	// toResponse: ConfigurableElement;
	// mergeRequest: ConfigurableElement;
}

/**
 * step extends from AbstractFragmentaryPipelineStep, will inherit these ports
 */
export interface CommonStepDefsPorts {
	fromRequest: StepPort;
	toResponse: StepPort;
	mergeRequest: StepPort;
	handleCatchableError: StepPort;
	handleUncatchableError: StepPort;
	handleExposedError: StepPort;
	handleAnyError: StepPort;
}

/**
 * prebuilt but not mandatory
 */
export interface PrebuiltStepDefsPorts {
	steps: StepPort;
}

export interface CreateSubNodesAndEndNodeOptions extends CreateSubNodesOptions {
	createSpecificSubNodes?: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
}

export interface CommonStepDefsType extends Omit<StepNodeConfigurer<CommonStepDefModel>, 'use' | 'properties' | 'ports' | 'createSubNodes' | 'helpDocs'> {
	properties: CommonStepDefsProperties;
	ports: CommonStepDefsPorts;
	prebuiltPorts: PrebuiltStepDefsPorts;
	createSubNodes: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
	createSubNodesAndEndNode: (node: StepNodeModel, options: CreateSubNodesAndEndNodeOptions) => Undefinable<HandledNodeModel>;
}

export const CommonStepDefs: CommonStepDefsType = {
	prepare, confirm, discard,
	properties: {name: elementName},
	ports: {
		fromRequest: PortFromRequest, toResponse: PortToResponse, mergeRequest: PortMergeRequest,
		handleCatchableError: PortCatchableError, handleUncatchableError: PortUncatchableError,
		handleExposedError: PortExposedError, handleAnyError: PortAnyError
	},
	prebuiltPorts: {
		steps: PortSteps
	},
	createSubNodes, createSubNodesAndEndNode, findSubPorts
};
