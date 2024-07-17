import {AsyncSetsPipelineStepDef, FileDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {AsyncSetsStepDefModel} from './types';

export const confirm: StepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>['confirm'] =
	(model: AsyncSetsStepDefModel, def: AsyncSetsPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		// errorHandles is replaced, but keep the confirmation logic anyway
		CommonStepDefs.confirm(model, def, file, handlers);

		handlers.onChange();
		return true;
	};
