import {markdown as additionalBaseSection} from './additional-base-section.d9';
import {markdown as claimBaseSection} from './claim-base-section.d9';
import {markdown as claimIssueTableSection} from './claim-issue-table-section.d9';
import {markdown as escalationTableSection} from './escalation-table-section.d9';
import {markdown as insuredBaseSection} from './insured-base-section.d9';
import {markdown as internalQueryTableSection} from './internal-query-table-section.d9';
import {markdown as investigationTableSection} from './investigation-table-section.d9';
import {markdown as queryLetterTableSection} from './query-letter-table-section.d9';
import {markdown as registrationBaseSection} from './registration-base-section.d9';
import {markdown as reporterBaseSection} from './reporter-base-section.d9';
import {markdown as underwritingByClaimTableSection} from './underwriting-by-claim-table-section.d9';

export const SharedMarkdown = {
	registrationBaseSection, insuredBaseSection, claimBaseSection, additionalBaseSection, reporterBaseSection,
	claimIssueTableSection, queryLetterTableSection, internalQueryTableSection,
	escalationTableSection, investigationTableSection, underwritingByClaimTableSection
};
