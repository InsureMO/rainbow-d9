export interface ApiFileValidator {
	maxSize?: string | number;
	mimeType?: string;
}

export interface ApiNonameOrNamedFiles extends ApiFileValidator {
	/** no name means any file */
	name?: string;
	/** multiple is ignored when no name declared */
	multiple?: boolean;
}

export type ApiNamedFile = string | { name: string; maxCount?: number; };

export interface ApiMultipleNamedFiles extends ApiFileValidator {
	names: Array<ApiNamedFile>;
}

export interface ApiPipelineFileDef {
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
		| ApiNonameOrNamedFiles
		// multiple files with multiple names
		| Array<ApiNamedFile>
		| ApiMultipleNamedFiles;
	exposeHeaders?: Record<string, string>;
	exposeFile?: boolean;
}
