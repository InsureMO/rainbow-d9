import {FileDef, PipelineFileDef, PipelineStepFileDef, PipelineStepSetsFileDef} from '../../definition';
import {ConfigurableModel} from '../../edit-dialog';

export interface FileDefModel extends ConfigurableModel, FileDef {
}

export interface PipelineFileDefModel extends FileDefModel, Omit<PipelineFileDef, 'steps'> {
	type: PipelineFileDef['type'];
	api: boolean;
	temporary?: {
		roles?: Array<string>;
		headers?: string;
		pathParams?: string;
		queryParams?: string;
		files?: {
			parse?: boolean; // parse file or not
			list?: boolean;  // list file or not, effective on parse is true only
			files?: string;
			maxSize?: string;
			mimeType?: string;
		};
		exposeHeaders?: string;
	};
}

export interface StepOrSetsFileDefModel extends FileDefModel {
	type: PipelineStepFileDef['type'] | PipelineStepSetsFileDef['type'];
}
