import {ConfigurableElement} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {discard} from './discard';
import {elementName} from './element-name';
import {PortFromRequest} from './port-from-request';
import {PortMergeRequest} from './port-merge-request';
import {PortToResponse} from './port-to-response';
import {prepare} from './prepare';
import {CommonStepDefModel, StepPort} from './types';

export * from './types';
export * from './utils';

export * from './sub-steps-port';

export interface CommonStepDefsProperties {
	name: ConfigurableElement;
	// fromRequest: ConfigurableElement;
	// toResponse: ConfigurableElement;
	// mergeRequest: ConfigurableElement;
}

export interface CommonStepDefsPorts {
	fromRequest: StepPort;
	toResponse: StepPort;
	mergeRequest: StepPort;
}

export interface CommonStepDefsType extends Omit<StepNodeConfigurer<CommonStepDefModel>, 'use' | 'properties' | 'ports' | 'helpDocs'> {
	properties: CommonStepDefsProperties;
	ports: CommonStepDefsPorts;
}

export const CommonStepDefs: CommonStepDefsType = {
	prepare, confirm, discard,
	properties: {name: elementName},
	ports: {fromRequest: PortFromRequest, toResponse: PortToResponse, mergeRequest: PortMergeRequest},
	createSubNodes
};
