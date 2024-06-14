import {
	ApiMultipleNamedFiles,
	ApiNamedFile,
	ApiNonameOrNamedFiles,
	FileDef,
	PipelineFileDef,
	PipelineStepFileDef,
	PipelineStepSetsFileDef,
	PipelineStepUseDef
} from '../../definition';
import {ConfigurableModel} from '../../edit-dialog';

export interface FileDefModel extends ConfigurableModel, FileDef {
}

export interface PipelineFileDefModel extends FileDefModel, PipelineFileDef {
	type: PipelineFileDef['type'];
	api: boolean;
	temporary?: {
		headers?: string;
		pathParams?: string;
		queryParams?: string;
		files?: string // single or multiple files with single name
			| ApiNonameOrNamedFiles // with single name, explicitly declared it is single or multiple. default multiple is false
			| Array<ApiNamedFile> // multiple files with multiple names
			| ApiMultipleNamedFiles;
	};
}

export interface StepOrSetsFileDefModel extends FileDefModel, PipelineStepUseDef {
	type: PipelineStepFileDef['type'] | PipelineStepSetsFileDef['type'];
}
