import {FileDef, GetPropertyPipelineStepDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {GetPropertyStepDefModel} from './types';

export const confirm: StepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel>['confirm'] =
	(model: GetPropertyStepDefModel, def: GetPropertyPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, handlers);

		def.property = (model.property ?? '').trim();

		handlers.onChange();
		return true;
	};
