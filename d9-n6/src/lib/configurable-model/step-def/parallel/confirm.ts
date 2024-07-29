import {VUtils} from '@rainbow-d9/n1';
import {FileDef, ParallelPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {ParallelStepDefModel} from './types';

export const confirm: StepNodeConfigurer<ParallelPipelineStepDef, ParallelStepDefModel>['confirm'] =
	(model: ParallelStepDefModel, def: ParallelPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		if (VUtils.isBlank(model.cloneData)) {
			delete def.cloneData;
		} else {
			def.cloneData = model.cloneData.trim();
		}
		if (VUtils.isBlank(model.race)) {
			delete def.race;
		} else {
			def.race = model.race;
		}
		options.handlers.onChange();
		return true;
	};
