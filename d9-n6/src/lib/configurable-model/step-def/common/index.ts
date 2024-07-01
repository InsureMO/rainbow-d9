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
import {CommonStepDefsType} from './types';

export * from './types';
export * from './utils';

export * from './port-widgets';
export * from './ports';

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