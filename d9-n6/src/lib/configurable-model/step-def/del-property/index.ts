import {DelPropertyPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs, PortAnyError, PortCatchableError, PortExposedError, PortUncatchableError} from '../common';
import {confirm} from './confirm';
import {elementProperty} from './element-property';
import {PortProperty} from './port-property';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {DelPropertyStepDefModel} from './types';

export * from './types';

export const DelPropertyStepDefs: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel> = {
	use: StandardPipelineStepRegisterKey.DEL_PROPERTY,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		CommonStepDefs.createMainContentElement(elementProperty),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		{key: 'from-input', port: CommonStepDefs.ports.fromInput},
		{key: 'property', port: PortProperty},
		{key: 'catchable-error-handle', port: PortCatchableError},
		{key: 'exposed-error-handle', port: PortExposedError},
		{key: 'uncatchable-error-handle', port: PortUncatchableError},
		{key: 'any-error-handle', port: PortAnyError},
		{key: 'to-output', port: CommonStepDefs.ports.toOutput},
		{key: 'merge', port: CommonStepDefs.ports.merge}
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.delPropertyStep
};
export const DelPropertiesStepDefs = {
	...DelPropertyStepDefs,
	use: StandardPipelineStepRegisterKey.DELETE_PROPERTIES
};
registerStepDef(DelPropertyStepDefs);
