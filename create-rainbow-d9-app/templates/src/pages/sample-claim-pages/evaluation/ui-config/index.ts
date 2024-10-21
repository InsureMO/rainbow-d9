import {SharedMarkdown} from '../../shared';
import {markdown as assessmentTab} from './assessment-tab.d9';
import {markdown as disbursementPlanTab} from './disbursement-plan-tab.d9';
import {markdown as header} from './header.d9';
import {markdown as issuesTab} from './issues-tab.d9';
import {markdown as page} from './page.d9';
import {markdown as tabs} from './tabs.d9';
import {markdown as workbenchTab} from './workbench-tab.d9';

const createHeader = () => {
	return header.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection);
};

const createWorkbenchTab = () => {
	return workbenchTab
		.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$additional-base-section', SharedMarkdown.additionalBaseSection.replace('## Section::', '#### Section::'));
};

const createIssuesTab = () => {
	return issuesTab
		.replace('- Box::$$claim-issue-table-section', SharedMarkdown.claimIssueTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$query-letter-table-section', SharedMarkdown.queryLetterTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$internal-query-table-section', SharedMarkdown.internalQueryTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$escalation-table-section', SharedMarkdown.escalationTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$investigation-table-section', SharedMarkdown.investigationTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$underwriting-table-section', SharedMarkdown.underwritingByClaimTableSection.replace('## Section::', '#### Section::'));

};

const createAssessmentTab = () => {
	return assessmentTab;
};

const createDisbursementPlanTab = () => {
	return disbursementPlanTab;
};

const createTabs = () => {
	return tabs
		.replace('- Box::$$workbench-tab', createWorkbenchTab())
		.replace('- Box::$$issues-tab', createIssuesTab())
		.replace('- Box::$$assessment-tab', createAssessmentTab())
		.replace('- Box::$$disbursement-plan-tab', createDisbursementPlanTab());
};

export const createMarkdown = () => {
	return page
		.replace('- Box::$$header', createHeader())
		.replace('- Box::$$tabs', createTabs());
};