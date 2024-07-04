import {FileDef, SetsPipelineStepDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsStepDefModel} from './types';

export const confirm: StepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel>['confirm'] =
	(model: SetsStepDefModel, def: SetsPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, handlers);

		handlers.onChange();
		return true;
	};
