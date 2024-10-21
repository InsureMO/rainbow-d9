import {SharedMarkdown} from '../../../shared';
import {markdown as issuesTab} from './issues-tab.d9';

export const createIssuesTab = () => {
	return issuesTab
		.replace('- Box::$$claim-issue-table-section', SharedMarkdown.claimIssueTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$query-letter-table-section', SharedMarkdown.queryLetterTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$internal-query-table-section', SharedMarkdown.internalQueryTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$escalation-table-section', SharedMarkdown.escalationTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$investigation-table-section', SharedMarkdown.investigationTableSection.replace('## Section::', '#### Section::'))
		.replace('- Box::$$underwriting-table-section', SharedMarkdown.underwritingByClaimTableSection.replace('## Section::', '#### Section::'));
};
