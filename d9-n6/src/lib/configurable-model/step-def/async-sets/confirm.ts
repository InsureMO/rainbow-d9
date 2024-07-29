import {AsyncSetsPipelineStepDef, FileDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {AsyncSetsStepDefModel} from './types';

export const confirm: StepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>['confirm'] =
	(model: AsyncSetsStepDefModel, def: AsyncSetsPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		// errorHandles is replaced, but keep the confirmation logic anyway
		CommonStepDefs.confirm(model, def, file, options);

		options.handlers.onChange();
		return true;
	};
