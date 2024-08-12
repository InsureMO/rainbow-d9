import {FileDef, RefOnCodePipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {RefOnCodeStepDefModel} from './types';

export const confirm: StepNodeConfigurer['confirm'] =
	<F extends RefOnCodePipelineStepDef, M extends RefOnCodeStepDefModel>(model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.code = (model.code ?? '').trim();

		options.handlers.onChange();
		return true;
	};
