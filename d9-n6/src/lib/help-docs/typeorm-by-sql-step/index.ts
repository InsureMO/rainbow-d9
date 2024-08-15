import {mergeStepDocsAnd} from '../step';
import {docs as common} from '../typeorm-step';
import {markdown as stepTypeOrmBulkSaveBySqlSql} from './bulk-save-sql.md';
import {markdown as stepTypeOrmLoadManyBySqlSql} from './load-many-sql.md';
import {markdown as stepTypeOrmLoadOneBySqlSql} from './load-one-sql.md';
import {markdown as stepTypeOrmSaveBySqlSql} from './save-sql.md';
import {markdown as stepBulkSave} from './step-bulk-save.md';
import {markdown as stepLoadMany} from './step-load-many.md';
import {markdown as stepLoadOne} from './step-load-one.md';
import {markdown as stepSave} from './step-save.md';

export const docs = {
	// stepTypeOrmSnippet,
	// typeOrmBySnippetStep: mergeStepDocsAnd(step, {'${typeorm}\n': common.stepTypeOrm})
	stepTypeOrmBulkSaveBySqlSql,
	typeOrmBulkSaveBySqlStep: mergeStepDocsAnd(stepBulkSave, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmSaveBySqlSql,
	typeOrmSaveBySqlStep: mergeStepDocsAnd(stepSave, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmLoadManyBySqlSql,
	typeOrmLoadManyBySqlStep: mergeStepDocsAnd(stepLoadMany, {'${typeorm}\n': common.stepTypeOrm}),
	stepTypeOrmLoadOneBySqlSql,
	typeOrmLoadOneBySqlStep: mergeStepDocsAnd(stepLoadOne, {'${typeorm}\n': common.stepTypeOrm})
};
