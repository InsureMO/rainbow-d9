import {confirm} from './confirm';
import {createSubNodes, createSubNodesAndEndNode} from './create-sub-nodes';
import {discard} from './discard';
import {
	elementErrorHandles,
	elementFromRequestGroup,
	elementName,
	elementToResponseGroup,
	elementUse
} from './elements';
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
import {switchUse} from './switch-use';
import {CommonStepDefsType} from './types';

export * from './types';
export * from './utils';

export * from './links';
export * from './port-widgets';
export * from './ports';

export const CommonStepDefs: CommonStepDefsType = {
	prepare, switchUse, confirm, discard,
	properties: {
		name: elementName, use: elementUse,
		fromRequest: elementFromRequestGroup, toResponse: elementToResponseGroup,
		errorHandles: elementErrorHandles,
		leadingGroup: [elementName, elementUse, elementFromRequestGroup],
		tailingGroup: [elementErrorHandles, elementToResponseGroup]
	},
	ports: {
		fromRequest: PortFromRequest, toResponse: PortToResponse, mergeRequest: PortMergeRequest,
		handleCatchableError: PortCatchableError, handleUncatchableError: PortUncatchableError,
		handleExposedError: PortExposedError, handleAnyError: PortAnyError
	},
	prebuiltPorts: {
		steps: PortSteps,
		errorHandles: [
			{key: 'catchable-error-handle', port: PortCatchableError},
			{key: 'exposed-error-handle', port: PortExposedError},
			{key: 'uncatchable-error-handle', port: PortUncatchableError},
			{key: 'any-error-handle', port: PortAnyError}
		]
	},
	createSubNodes, createSubNodesAndEndNode, findSubPorts
};
