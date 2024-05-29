export interface RestApiFileValidator {
	maxSize?: string | number;
	mimeType?: string;
}

export interface RestApiNonameOrNamedFiles extends RestApiFileValidator {
	/** no name means any file */
	name?: string;
	/** multiple is ignored when no name declared */
	multiple?: boolean;
}

export type RestApiNamedFile = string | { name: string; maxCount?: number; };

export interface RestApiMultipleNamedFiles extends RestApiFileValidator {
	names: Array<RestApiNamedFile>;
}

export interface RestApiPipelineFileDef {
	route: string;
	method: 'get' | 'post' | 'patch' | 'delete' | 'put';
	headers?: Array<string> | true;
	pathParams?: Array<string> | true;
	queryParams?: Array<string> | true;
	body?: boolean;
	files?: boolean     // any files
		// single or multiple files with single name
		| string
		// with single name, explicitly declared it is single or multiple. default multiple is false
		| RestApiNonameOrNamedFiles
		// multiple files with multiple names
		| Array<RestApiNamedFile>
		| RestApiMultipleNamedFiles;
	exposeHeaders?: Record<string, string>;
	exposeFile?: boolean;
}
