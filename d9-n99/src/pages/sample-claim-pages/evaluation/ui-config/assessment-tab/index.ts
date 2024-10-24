import {markdown as assessmentTab} from './assessment-tab.d9';
import {markdown as policyPaymentSummaryAdjustmentItemTable} from './policy-payment-summary-adjustment-item-table.d9';
import {markdown as policyPaymentSummaryProductTable} from './policy-payment-summary-product-table.d9';
import {markdown as policyPaymentSummarySection} from './policy-payment-summary.d9';

const createPaymentSummarySection = () => {
	return policyPaymentSummarySection
		.replace('- Box::$$products-table', policyPaymentSummaryProductTable)
		.replace('- Box::$$adjustment-items-table', policyPaymentSummaryAdjustmentItemTable);
};

export const createAssessmentTab = () => {
	return assessmentTab.replace('- Box::$$policy-payment-summary-section', createPaymentSummarySection());
};
