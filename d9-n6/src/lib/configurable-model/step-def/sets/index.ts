import {SetsPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {findSubPorts} from './find-sub-ports';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {SetsStepDefModel} from './types';

export * from './types';

export const SetsStepDefs: StepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel> = {
	use: StandardPipelineStepRegisterKey.SETS,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		{key: 'from-input', port: CommonStepDefs.ports.fromInput},
		{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		{key: 'to-output', port: CommonStepDefs.ports.toOutput},
		{key: 'merge', port: CommonStepDefs.ports.merge}
	],
	createSubNodes, findSubPorts,
	helpDocs: HelpDocs.setsStep
};
registerStepDef(SetsStepDefs);
