import {DelPropertyPipelineStepDef, FileDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {DelPropertyStepDefModel} from './types';

export const confirm: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel>['confirm'] =
	(model: DelPropertyStepDefModel, def: DelPropertyPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, handlers);

		def.property = model.property;

		handlers.onChange();
		return true;
	};
