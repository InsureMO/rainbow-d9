import {mergeStepDocsAnd} from '../step';
import {docs as common} from '../typeorm-step';
import {markdown as stepBulkSave} from './step-bulk-save.md';
import {markdown as stepLoadManyUseCursor} from './step-load-many-use-cursor.md';
import {markdown as stepLoadMany} from './step-load-many.md';
import {markdown as stepLoadOne} from './step-load-one.md';
import {markdown as stepSave} from './step-save.md';

const sql = 'Open the `Native SQL Support & Enhancement` section in the left-side step for more information.';
const fetchSize = 'Size of the fetch. Default is 20.';
const streamTo = `Use snippet processing for data processing. The following parameters can be used during the conversion process:

- \`$factor\`: fetched data of current round,
- \`$request\`: The entire request data, including both content and context,
- \`$helpers\` or \`$\`: Data manipulation helpers.

> It is an async function, so \`await\` is available inside.
`;
export const docs = {
	// stepTypeOrmSnippet,
	// typeOrmBySnippetStep: mergeStepDocsAnd(step, {'${typeorm}\n': common.stepTypeOrm})
	stepTypeOrmBulkSaveBySqlSql: sql,
	typeOrmBulkSaveBySqlStep: mergeStepDocsAnd(stepBulkSave, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmSaveBySqlSql: sql,
	typeOrmSaveBySqlStep: mergeStepDocsAnd(stepSave, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmLoadManyBySqlSql: sql,
	typeOrmLoadManyBySqlStep: mergeStepDocsAnd(stepLoadMany, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmLoadOneBySqlSql: sql,
	typeOrmLoadOneBySqlStep: mergeStepDocsAnd(stepLoadOne, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmLoadManyBySqlUseCursorSql: sql,
	stepTypeOrmLoadManyBySqlUseCursorFetchSize: fetchSize,
	stepTypeOrmLoadManyBySqlUseCursorStreamTo: streamTo,
	typeOrmLoadManyBySqlUseCursorStep: mergeStepDocsAnd(stepLoadManyUseCursor, {'${typeorm}\n': common.stepTypeOrm})
};
