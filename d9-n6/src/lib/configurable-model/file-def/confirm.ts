import {FileDef, isPipelineDef, PipelineFileDef, PipelineStepUseDef} from '../../definition';
import {NodeHandlers} from '../../diagram';
import {ConfigurableElementAnchor, ConfigurableModel} from '../../edit-dialog';
import {FileNodeConfigurer} from '../types';
import {FileDefModel, PipelineFileDefModel, StepOrSetsFileDefModel} from './types';

export const confirm: FileNodeConfigurer['confirm'] = (model: ConfigurableModel, def: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
	// const originalType = def.type;
	// const originalUse = (def as unknown as PipelineStepUseDef).use;

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
	const deleteNonPipelineAttrs = (given: FileDef) => {
		const def = given as unknown as PipelineStepUseDef;
		delete def.use;
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
	} else {
		(def as unknown as PipelineStepUseDef).use = (edited as StepOrSetsFileDefModel).use;
		deleteApiAttrs(def);
		deleteNonApiAttrs(def);
	}
	handlers.onChange();
	return true;
};
