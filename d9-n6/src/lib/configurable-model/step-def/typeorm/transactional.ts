import {StandardPipelineStepRegisterKey, TypeOrmTransactionalPipelineStepDef} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefs} from '../common';
import {elementDatasource} from './element-datasource';
import {elementTransaction} from './element-transaction';
import {confirm, prepare, switchUse} from './funcs';
import {PortDatasource} from './port-datasource';
import {PortTransaction} from './port-transaction';
import {TypeOrmStepDefModel} from './types';

export interface TypeOrmTransactionalStepDefModel extends TypeOrmStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_TRANSACTIONAL;
}

export const TypeOrmTransactionalStepDefs =
	CommonStepDefs.createStepNodeConfigurer<TypeOrmTransactionalPipelineStepDef, TypeOrmTransactionalStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_TRANSACTIONAL,
		prepare: ['and', prepare()],
		switchUse: ['keep', switchUse],
		confirm: ['and', confirm((_model, def, _file, options): AndConfirmReturned => {
			return () => {
				CommonStepDefs.confirmSetsLikePipelineStep(def, options);
			};
		})],
		survivalAfterConfirm: ['and', (_def: TypeOrmTransactionalPipelineStepDef, property: string) => {
			return switchUse.includes(property);
		}],
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: CommonStepDefs.askSubSteps,
			askSubStepsWithCategory: CommonStepDefs.askSubStepsWithCategory,
			tryToRevealSubStep: CommonStepDefs.tryToRevealSubSteps
		},
		properties: [CommonStepDefs.createMainContentElement(elementDatasource, elementTransaction)],
		ports: [
			{key: 'datasource', port: PortDatasource},
			{key: 'transaction', port: PortTransaction},
			{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}
		],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.typeOrmTransactionalStep
	});
registerStepDef(TypeOrmTransactionalStepDefs);
