import {SharedMarkdown} from '../../../shared';
import {createLifeAssuredSection} from './life-assured';
import {createPolicyTable} from './policy-table';
import {markdown as workbenchTab} from './workbench-tab.d9';

export const createWorkbenchTab = () => {
	return workbenchTab
		.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$additional-base-section', SharedMarkdown.additionalBaseSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$life-assured-section', createLifeAssuredSection())
		.replace('- Box::$$policy-section', createPolicyTable());
};
