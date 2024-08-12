import {CommonStepDefModel} from '../common';

export interface TypeOrmStepDefModel extends CommonStepDefModel {
	datasource?: string;
	transaction?: string;
}

export interface TypeOrmOperationStepDefModel extends TypeOrmStepDefModel {
	autonomous?: boolean;
}
