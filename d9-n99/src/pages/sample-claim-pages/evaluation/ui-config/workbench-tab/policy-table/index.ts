import {markdown as agreementTable} from './agreement-table.d9';
import {markdown as exclusionTable} from './exclusion-table.d9';
import {markdown as loadingTable} from './loading-table.d9';
import {markdown as partyTable} from './party-table.d9';
import {markdown as productTable} from './product-table.d9';
import {markdown as riskRelatedCSHistoryTable} from './risk-related-cs-history-table.d9';
import {markdown as section} from './section.d9';

export const createPolicyTable = () => {
	return section
		.replace('- Box::$$party-table', partyTable)
		.replace('- Box::$$product-table', productTable)
		.replace('- Box::$$loading-table', loadingTable)
		.replace('- Box::$$exclusion-table', exclusionTable)
		.replace('- Box::$$agreement-table', agreementTable)
		.replace('- Box::$$risk-related-cs-history-table', riskRelatedCSHistoryTable);
};
