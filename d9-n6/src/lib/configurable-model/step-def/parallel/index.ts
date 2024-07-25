import {ParallelPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {elementCloneData} from './element-clone-data';
import {elementRace} from './element-race';
import {findSubPorts} from './find-sub-ports';
import {PortRace} from './port-race';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {ParallelStepDefModel} from './types';

export * from './types';

export const ParallelStepDefs: StepNodeConfigurer<ParallelPipelineStepDef, ParallelStepDefModel> = {
	use: StandardPipelineStepRegisterKey.PARALLEL_SETS,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		CommonStepDefs.createMainContentElement(elementRace, elementCloneData),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		...CommonStepDefs.prebuiltPorts.input,
		{key: 'race', port: PortRace},
		{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes, findSubPorts,
	helpDocs: HelpDocs.parallelStep
};
registerStepDef(ParallelStepDefs);
