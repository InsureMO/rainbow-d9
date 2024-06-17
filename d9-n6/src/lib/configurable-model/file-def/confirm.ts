import {FileDef, isPipelineDef, PipelineStepUseDef} from '../../definition';
import {ConfigurableElementAnchor, ConfigurableModel} from '../../edit-dialog';
import {FileDefModel, PipelineFileDefModel, StepOrSetsFileDefModel} from './types';

export const confirm = (model: ConfigurableModel, def: FileDef): ConfigurableElementAnchor | true => {
	const originalType = def.type;

	const edited = model as FileDefModel;
	def.code = edited.code;
	def.type = edited.type;
	def.enabled = edited.enabled;

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
			delete def.initOnly;
		} else {
			delete def.route;
			delete def.method;
			delete def.headers;
			delete def.pathParams;
			delete def.queryParams;
			delete def.body;
			delete def.files;
			delete def.exposeHeaders;
			delete def.exposeFile;
			def.initOnly = editedDef.initOnly === true;
		}
	} else {
		(def as unknown as PipelineStepUseDef).use = (edited as StepOrSetsFileDefModel).use;
	}
	return true;
};
