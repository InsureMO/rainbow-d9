import {CommonStepDefModel} from '../common';

export interface TypeOrmStepDefModel extends CommonStepDefModel {
	datasource?: string;
	transaction?: string;
}

export interface TypeOrmWithAutonomousStepDefModel extends TypeOrmStepDefModel {
	autonomous?: boolean;
}
