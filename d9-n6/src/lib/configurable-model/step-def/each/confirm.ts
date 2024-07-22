import {VUtils} from '@rainbow-d9/n1';
import {EachPipelineStepDef, FileDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {EachStepDefModel} from './types';

export const confirm: StepNodeConfigurer<EachPipelineStepDef, EachStepDefModel>['confirm'] =
	(model: EachStepDefModel, def: EachPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		// errorHandles is replaced, but keep the confirmation logic anyway
		CommonStepDefs.confirm(model, def, file, handlers);

		if (VUtils.isBlank(model.originalContentName)) {
			delete def.originalContentName;
		} else {
			def.originalContentName = model.originalContentName.trim();
		}
		if (VUtils.isBlank(model.originalContentName)) {
			delete def.originalContentName;
		} else {
			def.itemName = model.itemName.trim();
		}

		handlers.onChange();
		return true;
	};
