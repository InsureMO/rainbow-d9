import {markdown as productAdjustmentFactorTable} from './adjustment-factor-table.d9';
import {markdown as assessmentTab} from './assessment-tab.d9';
import {markdown as productClaimDecisionSection} from './claim-decision-section.d9';
import {markdown as productDecreasedSATable} from './decrease-sa-table.d9';
import {markdown as productLiabilityEvaluationTable} from './liability-evaluation-table.d9';
import {markdown as policyAdjustmentItemTable} from './policy-adjustment-item-table.d9';
import {markdown as policyPaymentSummarySection} from './policy-payment-summary.d9';
import {markdown as productWaivePremiumTable} from './premium-waive-table.d9';
import {markdown as productAdjustmentItemTable} from './product-adjustment-item-table.d9';
import {markdown as productBasicSection} from './product-basic-section.d9';
import {markdown as productTable} from './product-table.d9';

const createProductTable = () => {
	return productTable
		.replace('\t- Box::$$basic-section', productBasicSection.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$adjustment-factor-table', productAdjustmentFactorTable.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$liability-evaluation-table', productLiabilityEvaluationTable.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$adjustment-item-table', productAdjustmentItemTable.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$claim-decision-section', productClaimDecisionSection.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$premium-waive-table', productWaivePremiumTable.split('\n').map(line => `\t${line}`).join('\n'))
		.replace('\t- Box::$$decrease-sa-table', productDecreasedSATable.split('\n').map(line => `\t${line}`).join('\n'));
};
const createPaymentSummarySection = () => {
	return policyPaymentSummarySection
		.replace('- Box::$$products-table', createProductTable())
		.replace('- Box::$$adjustment-items-table', policyAdjustmentItemTable);
};

export const createAssessmentTab = () => {
	return assessmentTab.replace('- Box::$$policy-payment-summary-section', createPaymentSummarySection());
};
