import {FileDef, SnowflakePipelineStepDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnowflakeStepDefModel} from './types';

export const confirm: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>['confirm'] =
	(model: SnowflakeStepDefModel, def: SnowflakePipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, handlers);

		handlers.onChange();
		return true;
	};
