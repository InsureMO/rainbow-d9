import {markdown as assessmentTab} from './assessment-tab.d9';
import {markdown as policyPaymentSummarySection} from './policy-payment-summary.d9';

export const createAssessmentTab = () => {
	return assessmentTab.replace('- Box::$$policy-payment-summary-section', policyPaymentSummarySection);
};
