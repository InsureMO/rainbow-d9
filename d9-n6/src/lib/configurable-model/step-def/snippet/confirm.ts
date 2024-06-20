import {FileDef, SnippetPipelineStepDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnippetStepDefModel} from './types';

export const confirm: StepNodeConfigurer['confirm'] = (model: SnippetStepDefModel, def: SnippetPipelineStepDef, file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
	CommonStepDefs.confirm(model, def, file, handlers);

	def.snippet = model.snippet;

	handlers.onChange();
	return true;
};
