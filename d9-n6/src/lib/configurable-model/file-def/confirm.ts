import {VUtils} from '@rainbow-d9/n1';
import {
	FileDef,
	isPipelineDef,
	PipelineFileDef,
	PipelineStepUseDef,
	SetsPipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../definition';
import {ConfigurableModel} from '../../edit-dialog';
import {ConfigChangesConfirmed, FileNodeConfigurer, FileNodeConfirmOptions} from '../types';
import {FileDefModel, PipelineFileDefModel} from './types';

export const confirm: FileNodeConfigurer['confirm'] = (model: ConfigurableModel, def: FileDef, options: FileNodeConfirmOptions): ConfigChangesConfirmed => {
	const {handlers, assistant} = options;
	// TODO VALIDATE DEF FILE PROPERTIES
	const edited = model as FileDefModel;
	def.code = edited.code;
	def.type = edited.type;
	def.enabled = edited.enabled;

	const deleteApiAttrs = (given: FileDef) => {
		const def = given as PipelineFileDef;
		delete def.route;
		delete def.method;
		delete def.headers;
		delete def.pathParams;
		delete def.queryParams;
		delete def.body;
		delete def.files;
		delete def.exposeHeaders;
		delete def.exposeFile;
	};
	const deleteNonApiAttrs = (given: FileDef) => {
		const def = given as PipelineFileDef;
		delete def.initOnly;
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deleteNonPipelineAttrs = (_given: FileDef) => {
		// const def = given as unknown as PipelineStepUseDef;
		// do not delete use, since repaint double buffer will use this attribute
		// delete def.use;
	};

	if (isPipelineDef(def)) {
		const editedDef = edited as PipelineFileDefModel;
		if (editedDef.api === true) {
			def.route = editedDef.route;
			def.method = editedDef.method;
			def.headers = editedDef.headers;
			def.pathParams = editedDef.pathParams;
			def.queryParams = editedDef.queryParams;
			def.body = editedDef.body;
			def.files = editedDef.files;
			def.exposeHeaders = editedDef.exposeHeaders;
			def.exposeFile = editedDef.exposeFile;
			deleteNonApiAttrs(def);
		} else {
			def.initOnly = editedDef.initOnly === true;
			deleteApiAttrs(def);
		}
		deleteNonPipelineAttrs(def);
		if (!VUtils.isBlank((def as unknown as PipelineStepUseDef).use)) {
			// could be switched from step/step-sets to pipeline

		}
	} else {
		deleteApiAttrs(def);
		deleteNonApiAttrs(def);
		if (VUtils.isBlank((def as unknown as PipelineStepUseDef).use)) {
			// could be switched from pipeline to step/step-sets
			const steps = (def as PipelineFileDef).steps ?? [];
			if (steps.length === 0) {
				const defaultDef = assistant.createDefaultStep();
				if (def.type === 'step') {
					// copy default step to file def
					Object.keys(defaultDef).forEach(key => def[key] = defaultDef[key]);
				} else {
					const sets = def as unknown as SetsPipelineStepDef;
					sets.use = StandardPipelineStepRegisterKey.SETS;
					sets.steps = [defaultDef];
				}
			} else {
				// copy steps to a sets step
				const sets = def as unknown as SetsPipelineStepDef;
				sets.use = StandardPipelineStepRegisterKey.SETS;
				sets.steps = steps;
			}
		} else {
			// switched from step to step-sets or opposite,
			// since the two are logically equivalent, there is no need to do anything.
		}
	}
	handlers.onChange();
	return true;
};
