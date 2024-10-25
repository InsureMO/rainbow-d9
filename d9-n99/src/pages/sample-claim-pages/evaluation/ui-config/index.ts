import {SharedMarkdown} from '../../shared';
import {createAssessmentTab} from './assessment-tab';
import {markdown as bottomBar} from './bottom-bar.d9';
import {createDisbursementPlanTab} from './disbursement-plan-tab';
import {markdown as header} from './header.d9';
import {createIssuesTab} from './issues-tab';
import {markdown as page} from './page.d9';
import {markdown as tabs} from './tabs.d9';
import {createWorksheetTab} from './worksheet-tab';

const createHeader = () => {
	return header.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection);
};

const createTabs = () => {
	return tabs
		.replace('- Box::$$worksheet-tab', createWorksheetTab())
		.replace('- Box::$$issues-tab', createIssuesTab())
		.replace('- Box::$$assessment-tab', createAssessmentTab())
		.replace('- Box::$$disbursement-plan-tab', createDisbursementPlanTab());
};

const createBottomBar = () => {
	return bottomBar;
};

export const createMarkdown = () => {
	return page
		.replace('- Box::$$header', createHeader())
		.replace('- Box::$$tabs', createTabs())
		.replace('- Box::$$button-bar', createBottomBar());
};