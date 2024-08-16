import {CommonStepDefModel} from '../common';

export interface TypeOrmStepDefModel extends CommonStepDefModel {
	datasource?: string;
	transaction?: string;
	temporary?: CommonStepDefModel['temporary'] & {
		datasourceByEnvs?: boolean;
		datasourceEnvKey?: string;
		datasourceCode?: string;
	};
}

export interface TypeOrmWithAutonomousStepDefModel extends TypeOrmStepDefModel {
	autonomous?: boolean;
}
