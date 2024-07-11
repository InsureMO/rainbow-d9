export type PipelineStepRegisterKey = string;

// from @rainbow-o23/n3
export enum StandardPipelineStepRegisterKey {
	SNIPPET = 'snippet',
	SNOWFLAKE = 'snowflake',
	GET_PROPERTY = 'get-property',
	DEL_PROPERTY = 'del-property',
	DELETE_PROPERTIES = 'del-properties',

	SETS = 'sets',
	ASYNC_SETS = 'async-sets',
	EACH_SETS = 'each',
	PARALLEL_SETS = 'parallel',
	CONDITIONAL_SETS = 'conditional',
	ROUTES_SETS = 'routes',

	TYPEORM_BY_SNIPPET = 'typeorm-snippet',
	TYPEORM_LOAD_ENTITY_BY_ID = 'typeorm-load-entity',
	TYPEORM_SAVE_ENTITY = 'typeorm-save-entity',
	TYPEORM_LOAD_ONE_BY_SQL = 'typeorm-load-one',
	TYPEORM_LOAD_MANY_BY_SQL = 'typeorm-load-many',
	TYPEORM_SAVE_BY_SQL = 'typeorm-save',
	TYPEORM_BULK_SAVE_BY_SQL = 'typeorm-bulk-save',
	TYPEORM_TRANSACTIONAL = 'typeorm-transactional',

	HTTP_FETCH = 'http-fetch',
	HTTP_POST = 'http-post',
	HTTP_GET = 'http-get',

	REF_PIPELINE = 'ref-pipeline',
	REF_STEP = 'ref-step'
}

export interface PipelineStepDef {
	name: string;
	use: PipelineStepRegisterKey | StandardPipelineStepRegisterKey;
}

export interface AllInPipelineStepDef extends PipelineStepDef {
	fromInput?: string;
	toOutput?: string;
	merge?: boolean | string;
	errorHandles?: {
		catchable?: string | Array<PipelineStepDef>;
		uncatchable?: string | Array<PipelineStepDef>;
		exposed?: string | Array<PipelineStepDef>;
		any?: string | Array<PipelineStepDef>;
	};
}

export interface PipelineStepDiagramDef extends PipelineStepDef {
	$x: number;
	$y: number;
}

export interface SnippetPipelineStepDef extends AllInPipelineStepDef {
	use: StandardPipelineStepRegisterKey.SNIPPET;
	snippet?: string;
}

export interface GetPropertyPipelineStepDef extends AllInPipelineStepDef {
	use: StandardPipelineStepRegisterKey.GET_PROPERTY;
	property?: string;
}

export interface DelPropertyPipelineStepDef extends AllInPipelineStepDef {
	use: StandardPipelineStepRegisterKey.DEL_PROPERTY;
	property?: string;
}

export interface SnowflakePipelineStepDef extends AllInPipelineStepDef {
	use: StandardPipelineStepRegisterKey.SNOWFLAKE;
}

export interface SetsPipelineStepDef extends AllInPipelineStepDef {
	use: StandardPipelineStepRegisterKey.SETS;
	steps: Array<PipelineStepDef>;
}
