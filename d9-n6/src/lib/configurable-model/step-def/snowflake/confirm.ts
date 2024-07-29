import {FileDef, SnowflakePipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnowflakeStepDefModel} from './types';

export const confirm: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>['confirm'] =
	(model: SnowflakeStepDefModel, def: SnowflakePipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		options.handlers.onChange();
		return true;
	};
