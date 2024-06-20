import {AllInPipelineStepDef, FileDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel} from './types';

export const confirm: StepNodeConfigurer<CommonStepDefModel>['confirm'] = (model: CommonStepDefModel, def: AllInPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
	def.name = model.name;
	// TODO copy all common properties
	handlers.onChange();
	return true;
};
