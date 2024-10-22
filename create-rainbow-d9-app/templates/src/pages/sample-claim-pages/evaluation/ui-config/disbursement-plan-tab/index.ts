import {createBenefitAmountAllocationTable} from './benefit-amount-allocation';
import {markdown as disbursementPlanTab} from './disbursement-plan-tab.d9';
import {createSummaryTable} from './summary';

export const createDisbursementPlanTab = () => {
	return disbursementPlanTab
		.replace('- Box:$$summary-table', createSummaryTable())
		.replace('- Box:$$benefit-amount-allocation-table', createBenefitAmountAllocationTable());
};
