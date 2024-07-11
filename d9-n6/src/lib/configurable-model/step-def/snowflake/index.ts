import {SnowflakePipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {SnowflakeStepDefModel} from './types';

export * from './types';

export const SnowflakePropertyStepDefs: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel> = {
	use: StandardPipelineStepRegisterKey.SNOWFLAKE,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		...CommonStepDefs.prebuiltPorts.input,
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.snowflakeStep
};
registerStepDef(SnowflakePropertyStepDefs);
