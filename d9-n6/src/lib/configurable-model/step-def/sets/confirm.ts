import {FileDef, SetsPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsStepDefModel} from './types';

export const confirm: StepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel>['confirm'] =
	(model: SetsStepDefModel, def: SetsPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		options.handlers.onChange();
		return true;
	};
