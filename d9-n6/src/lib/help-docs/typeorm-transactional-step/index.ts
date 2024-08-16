import {mergeStepDocsAnd} from '../step';
import {docs as common} from '../typeorm-step';
import {markdown as step} from './step.md';

export const docs = {
	typeOrmTransactionalStep: mergeStepDocsAnd(step, {'${typeorm}\n': common.stepTypeOrm})
};
