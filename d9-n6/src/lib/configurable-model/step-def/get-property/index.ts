import {GetPropertyPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {elementProperty} from './element-property';
import {PortProperty} from './port-property';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {GetPropertyStepDefModel} from './types';

export * from './types';

export const GetPropertyStepDefs: StepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel> = {
	use: StandardPipelineStepRegisterKey.GET_PROPERTY,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		CommonStepDefs.createMainContentElement(elementProperty),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		...CommonStepDefs.prebuiltPorts.input,
		{key: 'property', port: PortProperty},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.getPropertyStep
};
registerStepDef(GetPropertyStepDefs);
