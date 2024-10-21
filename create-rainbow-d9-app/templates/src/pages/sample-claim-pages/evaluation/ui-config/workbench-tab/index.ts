import {SharedMarkdown} from '../../../shared';
import {createAssessmentSection} from './assessment';
import {createCommentHistoryTimeline} from './comment-history';
import {createDisbursementPlanSection} from './disbursement-plan';
import {createInternalExternalQueryTable} from './internal-external-query';
import {createLifeAssuredSection} from './life-assured';
import {createPolicyTable} from './policy-table';
import {markdown as workbenchTab} from './workbench-tab.d9';

export const createWorkbenchTab = () => {
	return workbenchTab
		.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$additional-base-section', SharedMarkdown.additionalBaseSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$life-assured-section', createLifeAssuredSection())
		.replace('- Box::$$policy-section', createPolicyTable())
		.replace('- Box::$$assessment-section', createAssessmentSection())
		.replace('- Box::$$disbursement-plan-section', createDisbursementPlanSection())
		.replace('- Box::$$internal-external-query-table', createInternalExternalQueryTable())
		.replace('- Box::$$comment-history-timeline', createCommentHistoryTimeline());
};
