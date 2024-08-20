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

export interface PipelineStepDiagramDetails {
	$x?: number;
	$y?: number;
	$foldSubSteps?: boolean;
	$foldCatchable?: boolean;
	$foldUncatchable?: boolean;
	$foldExposed?: boolean;
	$foldAny?: boolean;
}

export interface PipelineStepDiagramDef extends PipelineStepDef {
	$diagram?: PipelineStepDiagramDetails;
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

export interface HttpPipelineStepDef extends AllInPipelineStepDef {
	system?: string;
	endpoint?: string;
	decorateUrl?: string;
	method?: string;
	timeout?: number;
	generateHeaders?: string;
	bodyUsed?: boolean;
	generateBody?: string;
	readResponse?: string;
	responseErrorHandles?: string | { [key: string]: string; };
}

export interface HttpFetchPipelineStepDef extends HttpPipelineStepDef {
	use: StandardPipelineStepRegisterKey.HTTP_FETCH;
	responseErrorHandles?: { [key: string]: string; };
}

export interface HttpGetPipelineStepDef extends HttpPipelineStepDef {
	use: StandardPipelineStepRegisterKey.HTTP_GET;
	method: 'get';
}

export interface HttpPostPipelineStepDef extends HttpPipelineStepDef {
	use: StandardPipelineStepRegisterKey.HTTP_POST;
	method: 'get';
}

export interface SetsLikePipelineStepDef extends AllInPipelineStepDef {
	steps: Array<PipelineStepDef>;
}

export interface SetsPipelineStepDef extends SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.SETS;
}

export interface AsyncSetsPipelineStepDef extends SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.ASYNC_SETS;
}

export interface EachPipelineStepDef extends SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.EACH_SETS;
	originalContentName?: string;
	itemName?: string;
}

export interface ParallelPipelineStepDef extends SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.PARALLEL_SETS;
	cloneData?: string;
	race?: boolean;
}

export interface ConditionalPipelineStepDef extends SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS;
	check?: string;
	otherwise?: Array<PipelineStepDef>;
}

export interface TypeOrmPipelineStepDef extends AllInPipelineStepDef {
	datasource?: string;
	transaction?: string;
}

export interface TypeOrmWithAutonomousPipelineStepDef extends TypeOrmPipelineStepDef {
	autonomous?: boolean;
}

export interface TypeOrmBySnippetPipelineStepDef extends TypeOrmWithAutonomousPipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET;
	snippet?: string;
}

export interface TypeOrmBySqlPipelineStepDef extends TypeOrmWithAutonomousPipelineStepDef {
	sql?: string;
}

export interface TypeOrmBulkSaveBySqlPipelineStepDef extends TypeOrmBySqlPipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_BULK_SAVE_BY_SQL;
}

export interface TypeOrmSaveBySqlPipelineStepDef extends TypeOrmBySqlPipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_SAVE_BY_SQL;
}

export interface TypeOrmLoadManyBySqlPipelineStepDef extends TypeOrmBySqlPipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_MANY_BY_SQL;
}

export interface TypeOrmLoadOneBySqlPipelineStepDef extends TypeOrmBySqlPipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_LOAD_ONE_BY_SQL;
}

export interface TypeOrmTransactionalPipelineStepDef extends TypeOrmPipelineStepDef, SetsLikePipelineStepDef {
	use: StandardPipelineStepRegisterKey.TYPEORM_TRANSACTIONAL;
}

export interface RefOnCodePipelineStepDef extends AllInPipelineStepDef {
	code?: string;
}

export interface RefPipelinePipelineStepDef extends RefOnCodePipelineStepDef {
	use: StandardPipelineStepRegisterKey.REF_PIPELINE;
}

export interface RefStepPipelineStepDef extends RefOnCodePipelineStepDef {
	use: StandardPipelineStepRegisterKey.REF_STEP;
}
