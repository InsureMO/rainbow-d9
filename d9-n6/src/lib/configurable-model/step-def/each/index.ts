import {EachPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {elementItemName} from './element-item-name';
import {elementOriginalContentName} from './element-original-content-name';
import {findSubPorts} from './find-sub-ports';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {EachStepDefModel} from './types';

export * from './types';

export const EachStepDefs: StepNodeConfigurer<EachPipelineStepDef, EachStepDefModel> = {
	use: StandardPipelineStepRegisterKey.EACH_SETS,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		CommonStepDefs.createMainContentElement(elementOriginalContentName, elementItemName),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		...CommonStepDefs.prebuiltPorts.input,
		{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes, findSubPorts,
	helpDocs: HelpDocs.eachStep
};
registerStepDef(EachStepDefs);
