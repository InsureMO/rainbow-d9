import {markdown as claimHistoryTable} from './claim-history-table.d9';
import {markdown as lifeAssuredTable} from './life-assured-table.d9';
import {markdown as medicalOrNotTable} from './medical-or-not-table.d9';
import {markdown as section} from './section.d9';
import {markdown as underwritingHistoryTable} from './underwriting-history-table.d9';

export const createLifeAssuredSection = () => {
	return section
		.replace('- Box::$$life-assured-table', lifeAssuredTable)
		.replace('- Box::$$medical-or-not-table', medicalOrNotTable)
		.replace('- Box::$$claim-history-table', claimHistoryTable)
		.replace('- Box::$$underwriting-history-table', underwritingHistoryTable);
};
