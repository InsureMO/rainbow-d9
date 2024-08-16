import {mergeStepDocsAnd} from '../step';
import {docs as common} from '../typeorm-step';
import {markdown as stepBulkSave} from './step-bulk-save.md';
import {markdown as stepLoadMany} from './step-load-many.md';
import {markdown as stepLoadOne} from './step-load-one.md';
import {markdown as stepSave} from './step-save.md';

const sql = 'Open the `Native SQL Support & Enhancement` section in the left-side step descriptions for more information.';
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
	typeOrmLoadOneBySqlStep: mergeStepDocsAnd(stepLoadOne, {'${typeorm}\n': common.stepTypeOrm})
};
