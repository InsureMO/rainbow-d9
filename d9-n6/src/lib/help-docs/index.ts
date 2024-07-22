import {docs as AsyncSetsStepDocs} from './async-sets-step';
import {docs as DelPropertyStepDocs} from './del-property-step';
import {docs as EachStepDocs} from './each-step';
import {docs as GetPropertyStepDocs} from './get-property-step';
import {docs as PipelineDocs} from './pipeline';
import {docs as SetsStepDocs} from './sets-step';
import {docs as SnippetStepDocs} from './snippet-step';
import {docs as SnowflakeStepDocs} from './snowflake-step';
import {docs as StepCommonDocs} from './step';

export const HelpDocs = {
	...PipelineDocs,
	...StepCommonDocs,
	// basic
	...SnippetStepDocs,
	...GetPropertyStepDocs,
	...DelPropertyStepDocs,
	...SnowflakeStepDocs,
	// sets
	...SetsStepDocs,
	...AsyncSetsStepDocs,
	...EachStepDocs
};
