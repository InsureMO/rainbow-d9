import {FileDef, StandardPipelineStepRegisterKey, TypeOrmBySnippetPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {ConfirmNodeOptions} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefs} from '../common';
import {elementDatasource} from './element-datasource';
import {confirmWithAutonomous, prepareWithAutonomous, switchUseWithAutonomous} from './funcs';
import {TypeOrmWithAutonomousStepDefModel} from './types';

export interface TypeOrmBySnippetStepDefModel extends TypeOrmWithAutonomousStepDefModel {
	use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET;
	snippet?: string;
}

export const TypeOrmBySnippetStepDefs =
	CommonStepDefs.createStepNodeConfigurer<TypeOrmBySnippetPipelineStepDef, TypeOrmBySnippetStepDefModel>({
		use: StandardPipelineStepRegisterKey.TYPEORM_BY_SNIPPET,
		prepare: ['and', prepareWithAutonomous((def, model) => model.snippet = def.snippet)],
		switchUse: ['keep', [...switchUseWithAutonomous, 'snippet']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', confirmWithAutonomous((model, def, _file: FileDef, _options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE SNIPPET
			return () => {
				def.snippet = model.snippet;
			};
		})],
		properties: [CommonStepDefs.createMainContentElement(elementDatasource)],
		// TODO PORTS
		ports: [],
		helpDocs: HelpDocs.typeOrmBySnippetStep
	});
registerStepDef(TypeOrmBySnippetStepDefs);
