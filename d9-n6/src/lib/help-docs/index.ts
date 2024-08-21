import {docs as AsyncParallelStepDocs} from './async-sets-step';
import {docs as ConditionalStepDocs} from './conditional-step';
import {docs as DelPropertyStepDocs} from './del-property-step';
import {docs as EachStepDocs} from './each-step';
import {docs as GetPropertyStepDocs} from './get-property-step';
import {docs as HttpStepDocs} from './http-fetch-step';
import {docs as ParallelStepDocs} from './parallel-step';
import {docs as PipelineDocs} from './pipeline';
import {docs as RefPipelineDocs} from './ref-pipeline-step';
import {docs as RefStepDocs} from './ref-step-step';
import {docs as RoutesStepDocs} from './routes-step';
import {docs as SetsStepDocs} from './sets-step';
import {docs as SnippetStepDocs} from './snippet-step';
import {docs as SnowflakeStepDocs} from './snowflake-step';
import {docs as StepCommonDocs} from './step';
import {docs as TypeOrmBySnippetStepDocs} from './typeorm-by-snippet-step';
import {docs as TypeOrmBySqlStepDocs} from './typeorm-by-sql-step';
import {docs as TypeOrmCommonDocs} from './typeorm-step';
import {docs as TypeOrmTransactionalStepDocs} from './typeorm-transactional-step';

export const HelpDocs = {
	...PipelineDocs,
	...StepCommonDocs,
	// basic
	...SnippetStepDocs,
	...GetPropertyStepDocs,
	...DelPropertyStepDocs,
	...SnowflakeStepDocs,
	// http
	...HttpStepDocs,
	// sets
	...SetsStepDocs,
	...AsyncParallelStepDocs,
	...EachStepDocs,
	...ParallelStepDocs,
	...ConditionalStepDocs,
	...RoutesStepDocs,
	// typeorm
	...TypeOrmCommonDocs,
	...TypeOrmBySnippetStepDocs,
	...TypeOrmBySqlStepDocs,
	...TypeOrmTransactionalStepDocs,
	// ref
	...RefPipelineDocs,
	...RefStepDocs
};
