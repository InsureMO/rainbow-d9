import {FileDef, SnippetPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnippetStepDefModel} from './types';

export const confirm: StepNodeConfigurer<SnippetPipelineStepDef, SnippetStepDefModel>['confirm'] =
	(model: SnippetStepDefModel, def: SnippetPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.snippet = model.snippet;

		options.handlers.onChange();
		return true;
	};
