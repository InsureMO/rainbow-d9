import {mock} from '../../../mock-services';
import {loadFromSessionAndBurn} from '../../../utils';
import {SharedServices} from '../shared';
import {Data} from './types';

const doLoadEvaluationData = async (_keyOrEvaluationId: string): Promise<Data> => {
	// TODO load evaluation data by evaluationId
	throw new Error('Not implemented');
};
const mockDoLoadMockEvaluationData = async (_keyOrRegistrationId: string): Promise<Data> => {
	return {
		registrationId: `${Math.floor(Math.random() * 1000000000000)}`,
		caseNo: `${Math.floor(Math.random() * 1000000000000)}`,
		registrationNo: `R${Math.floor(Math.random() * 1000000000000)}`,
		manualSubmit: true,
		status: 'submitted',
		claim: {},
		additional: {directBillingIndicator: 'N'},
		lifeAssuredInfo: {
			insuredList: [{
				name: 'Jones Smith', idType: 'passport', idNo: '374893737000112',
				nationality: 'CHN', gender: 'M', dob: '07/12/2001', occupation: 'accountant', ageAtEvent: 26
			}],
			medicalOrNotCodes: [{
				policyNo: 'K000017185', code: 'AMC-0032', codeCategory: 'Medical', liaCodeType: 'AMC',
				description: 'Medical Examination'
			}],
			claimHistory: [{
				claimNo: 'MED202300076', policyNo: 'K000017185', productCode: 'WPV6', productType: '',
				claimType: 'medical', eventDate: '14/10/2024', claimNature: '',
				diagnosis: '', claimStatus: 'cancelled', claimDecision: 'Approved',
				claimableAmount: 0, settleDate: '14/10/2024'
			}],
			underwritingHistory: [{
				policyNo: 'K000017185', productCode: 'WPV6', productType: '',
				businessType: 'nb', underwritingDecision: 'accepted', commencementDate: '14/10/2024',
				policyStatus: 'inforce', premiumStatus: 'paid', paymentFrequency: 'annual',
				sumAssured: 499999, unit: 1, level: 0, annualPremium: 423, autoUnderwritingIndicator: false
			}],
			policies: [{
				policyNo: 'K000017185',
				parties: [], products: []
			}]
		},
		claimIssues: [{
			title: 'Missing documents', generatedAt: '13/10/2024', generatedBy: 'system',
			lastUpdatedAt: '13/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}, {
			title: 'Missing documents', generatedAt: '14/10/2024', generatedBy: 'system',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		queryLetters: [{
			docNo: '101',
			docName: 'Query Letter',
			generatedAt: '14/10/2024', generatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		internalQueries: [{
			queryNo: '101',
			type: 'task',
			title: 'Please life assured.',
			assignee: SharedServices.Users.Chris.userId,
			generatedAt: '14/10/2024', generatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'open'
		}],
		escalations: [{
			escalatedTo: 'system',
			escalatedAt: '14/10/2024', escalatedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'wait'
		}],
		investigations: [{
			submittedTo: SharedServices.Users.David.userId,
			submittedAt: '14/10/2024', submittedBy: 'system',
			dueDate: '24/10/2024',
			lastUpdatedAt: '14/10/2024', lastUpdatedBy: 'system',
			status: 'wait'
		}],
		underwritingByClaimList: [{
			type: 'claim', caseNo: '9827765630001', policyNo: 'K000017187',
			applicationDate: '14/01/2024', dueDate: '14/01/2024',
			submittedBy: SharedServices.Users.David.userId, submittedAt: '14/01/2024',
			repliedBy: SharedServices.Users.Sally.userId, repliedAt: '14/01/2024',
			status: 'replied'
		}],
		assessment: {
			policies: [{
				policyNo: 'K000017187', totalDisbursementCurrency: 'SGD', totalDisbursementAmount: 24116,
				status: 'inforce', inceptionDate: '14/10/2024', lastReinstatementDate: '14/10/2024',
				premiumFrequency: '', anniversaryDate: '14/10/2024', statusAtEvent: 'inforce',
				products: [
					{
						code: 'GEMA01', name: 'COMPREHENSIVE CARE', claimDecision: 'Admit', claimDecisionReason: '',
						inForce: false, premiumWaive: false, waiveStartDate: '',
						totalPaymentCurrency: 'SGD', totalPaymentAmount: 24016,
						adjustmentItems: [{
							name: 'Death', paymentCurrency: 'SGD', paymentAmount: 200000,
							actualPaymentCurrency: 'SGD', actualPaymentAmount: 200000
						}, {
							name: 'Deductions(-)', paymentCurrency: 'SGD', paymentAmount: 1000,
							actualPaymentCurrency: 'SGD', actualPaymentAmount: 1000
						}, {
							name: 'Reversionary Bonus', paymentCurrency: 'SGD', paymentAmount: 5016,
							actualPaymentCurrency: 'SGD', actualPaymentAmount: 5016
						}],
						adjustmentFactors: [{
							name: 'Ward Level Adjustment', subName: 'Actual Ward Level', factor: 100
						}],
						liabilityEvaluations: [{
							name: 'Death', parameter: '',
							advancePayment: 0, evaluationPayment: 0, claimablePayment: 0,
							actualPayment: 0, remark: ''
						}],
						premiumWaives: [{
							name: 'GEM0170', lifeAssured: 'Johnson', waived: true,
							waiveStartDate: '14/10/2024 00:00:00', waiveEndDate: '14/10/2024 00:00:00', waivePremium: 0
						}],
						decreaseSumAssureds: [{
							name: 'GEM0170', lifeAssured: 'Johnson', decreased: true, decreasedSumAssured: 0,
							postSumAssured: 0, effectiveDate: '14/10/2024 00:00:00', refundedPremium: 0
						}]
					}
				],
				adjustmentItems: [{
					name: 'Refund Premium', evaluationPaymentCurrency: 'SGD', evaluationPaymentAmount: 1000,
					actualPaymentCurrency: 'SGD', actualPaymentAmount: 1000, remark: '',
					premiumCollectTo: '14/10/2024 00:00:00'
				}]
			}]
		},
		disbursementPlan: {
			totalDisbursementCurrency: 'SGD', totalDisbursementAmount: 25000,
			policies: [{
				policyNo: 'K000017187', policyCurrency: 'SGD',
				totalDisbursementCurrency: 'SGD', totalDisbursementAmount: 25000,
				allocatedDisbursementCurrency: 'SGD', allocatedDisbursementAmount: 0,
				totalAdjustmentCurrency: 'SGD', totalAdjustmentAmount: 0,
				products: [{
					code: 'GEM0170', disbursementAmountCurrency: 'SGD', disbursementAmount: 20000
				}, {
					code: 'GEMA17', disbursementAmountCurrency: 'SGD', disbursementAmount: 5000
				}],
				paymentPlans: [{
					payee: 'Jackie Su', relationship: 'spouse', idNo: 'A123456789',
					paymentMethod: 'cash', productCode: 'GEMA01', paymentType: 'lumpsum',
					percentage: 50, disbursementAmountCurrency: 'SGD', disbursementAmount: 200000,
					interestAmountCurrency: 'SGD', interestAmount: 200000,
					paymentAmountOnPaymentCurrency: 'SGD', paymentAmountOnPayment: 200000,
					paymentAmountOnPolicyCurrency: 'SGD', paymentAmountOnPolicy: 200000,
					pending: false
				}]
			}],
			benefitAmountAllocations: [{
				payee: 'Jackie Su', relationship: 'spouse', idType: 'passport', idNo: 'A123456789',
				gender: 'F', dob: '14/10/2000', mobile: '1234567890',
				usCitizenIndicator: true, bankruptcyIndicator: false,
				order: 1, share: 50,
				plans: [{
					disbursementMethod: 'cash', paymentType: 'lumpsum',
					paymentAmountOnPaymentCurrency: 'SGD', paymentAmountOnPayment: 200000, forexRate: 1,
					items: [{
						policyNo: 'K000017187', productCode: 'GEMA01', policyCurrency: 'SGD',
						balanceAmount: 250000, balancePercentage: 100,
						disbursementAmount: 200000, disbursementPercentage: 80,
						paymentAmount: 200000, pending: false,
						documentReceiveDate: '14/10/2024', estimatedApprovalDate: '14/10/2024', interestAmount: 200000
					}]
				}]
			}]
		},
		internalExternalQueries: [{
			task: 'Acceptance', queryType: 'Query Letter', subType: 'Follow up with customer', status: 'Replied',
			policyNo: 'K000017187', generatedBy: SharedServices.Users.Sally.userId, generatedAt: '14/10/2024',
			submissionContent: '', repliedBy: SharedServices.Users.Alexie.userId, repliedAt: '14/10/2024',
			replyComment: ''
		}],
		commentHistory: [{
			stage: 'Acceptance', commentedBy: SharedServices.Users.Alexie.userId, commentedAt: '14/10/2024 16:57:35',
			comment: 'There is outstanding premium for this policy. A very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment, a very long comment.'
		}, {
			stage: 'Evaluation', commentedBy: SharedServices.Users.Sally.userId, commentedAt: '14/10/2024 16:57:35',
			comment: 'Claim natue is illness, refuse accidental rider.'
		}]
	};
};

export const loadEvaluationData = async (keyOrEvaluationId: string): Promise<Data> => {
	const loaded: string | Data | undefined = loadFromSessionAndBurn(keyOrEvaluationId);
	if (loaded == null) {
		// not found from session, means given key is registrationId
		// should load from remote
		return await mock(doLoadEvaluationData).by(mockDoLoadMockEvaluationData)(keyOrEvaluationId);
	} else if (typeof loaded === 'string') {
		// found a string from session, means loaded is registrationId
		// should load from remote
		return await mock(doLoadEvaluationData).by(mockDoLoadMockEvaluationData)(keyOrEvaluationId);
	} else {
		// found a data from session, use it
		return loaded;
	}
};
