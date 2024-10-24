export namespace Claim {
	export interface Insured {
		customerId?: string;
		name?: string;
		gender?: string;
		idType?: string;
		idNo?: string;
		dob?: string;
	}

	export interface Claim {
		type?: string;
		notificationDate?: string;
		eventDate?: string;
		nature?: string;
		incidentCode?: string;
		caseClassification?: string;
		previousCaseNo?: string;
		diagnosisCode?: string;
		details?: string;
	}

	export interface Additional {
		hospitalCode?: string;
		admissionDate?: string;
		dischargeDate?: string;
		placeOfTreatment?: string;
		foreignHospital?: string;
		doctorCode?: string;
		unknownPreExistingConditions?: string;
		chronicDisease?: string;
		actualWardLevel?: string;
		voluntaryWardUpgrade?: string;
		directBillingIndicator?: string;
	}

	export interface Reporter {
		relationship?: string;
		via?: string;
		name?: string;
		idType?: string;
		typeOfPass?: string;
		idNo?: string;
		postcode?: string;
		address1?: string;
		address2?: string;
		address3?: string;
		address4?: string;
		mobile?: string;
		email?: string;
		notificationMethod?: string;
		handlingProducer?: string;
		producerMobile?: string;
		producerEmail?: string;
	}

	export interface Selectable {
		/** this is a control property, never submit to server side */
		selected?: boolean;
	}

	export interface WithGenerated {
		generatedAt?: string;
		generatedBy?: string;
	}

	export interface WithLastUpdated {
		lastUpdatedAt?: string;
		lastUpdatedBy?: string;
	}

	export interface ClaimIssue extends Selectable, WithGenerated, WithLastUpdated {
		issueId?: string;
		title?: string;
		description?: string;
		status?: string;
	}

	export type ClaimIssues = Array<ClaimIssue>;

	export interface QueryLetter extends WithGenerated, WithLastUpdated {
		letterId?: string;
		docNo?: string;
		docName?: string;
		dueDate?: string;
		status?: string;
	}

	export type QueryLetters = Array<QueryLetter>;

	export interface WithAssignee {
		assignee?: string;
	}

	export interface InternalQuery extends WithAssignee, WithGenerated, WithLastUpdated {
		queryId?: string;
		queryNo?: string;
		type?: string;
		title?: string;
		dueDate?: string;
		status?: string;
	}

	export type InternalQueries = Array<InternalQuery>;

	export interface WithEscalatedTo {
		escalatedTo?: string;
	}

	export interface WithEscalated {
		escalatedAt?: string;
		escalatedBy?: string;
	}

	export interface Escalation extends WithEscalatedTo, WithEscalated, WithLastUpdated {
		escalationId?: string;
		title?: string;
		description?: string;
		dueDate?: string;
		status?: string;
	}

	export type Escalations = Array<Escalation>;

	export interface WithSubmittedTo {
		submittedTo?: string;
	}

	export interface WithSubmitted {
		submittedAt?: string;
		submittedBy?: string;
	}

	export interface Investigation extends WithSubmittedTo, WithSubmitted, WithLastUpdated {
		investigationId?: string;
		title?: string;
		description?: string;
		dueDate?: string;
		status?: string;
	}

	export type Investigations = Array<Investigation>;

	export interface WithReplied {
		repliedAt?: string;
		repliedBy?: string;
	}

	export interface UnderwritingByClaim extends WithSubmitted, WithReplied {
		type?: string;
		caseNo?: string;
		policyNo?: string;
		applicationDate?: string;
		dueDate?: string;
		status?: string;
	}

	export type UnderwritingByClaimList = Array<UnderwritingByClaim>;

	export interface AcceptanceOnPolicyProduct {
		code?: string;
		name?: string;
		acceptable?: boolean;
		accept?: boolean;
		notifiedAmount?: number;
		sumAssured?: number;
		insuredName?: string;
		currentStatus?: string;
		statusAtEvent?: string;
		commencementDate?: string;
		expiryDate?: string;
		reinsuranceIndicator?: boolean;
	}

	export interface AcceptanceOnPolicy {
		policyId?: string;
		policyNo?: string;
		accepted?: boolean;
		freeze?: boolean;
		policyHolderName?: string;
		currentStatus?: string;
		statusAtEvent?: string;
		currency?: string;
		bankruptcyInvolved?: boolean;
		serviceAgentName?: string;
		serviceAgentMobile?: string;
		products?: Array<AcceptanceOnPolicyProduct>;
	}

	export interface AcceptanceDecision {
		decision?: string;
		reason?: string;
		/** ILP */
		priceEffectiveDate?: string;
		commentToClient?: string;
		policies?: Array<AcceptanceOnPolicy>;
	}

	export interface LifeAssuredInsured {
		name?: string;
		idType?: string;
		idNo?: string;
		nationality?: string;
		gender?: string;
		dob?: string;
		occupation?: string;
		ageAtEvent?: number;
	}

	export interface LifeAssuredMedicalOrNotCode {
		policyNo?: string;
		code?: string;
		codeCategory?: string;
		liaCodeType?: string;
		description?: string;
	}

	export interface LifeAssuredClaimHistory {
		claimNo?: string;
		policyNo?: string;
		productCode?: string;
		productType?: string;
		claimType?: string;
		eventDate?: string;
		claimNature?: string;
		diagnosis?: string;
		claimStatus?: string;
		claimDecision?: string;
		claimableAmount?: number;
		settleDate?: string;
	}

	export interface LifeAssuredUnderwritingHistory {
		policyNo?: string;
		productCode?: string;
		productType?: string;
		businessType?: string;
		underwritingDecision?: string;
		commencementDate?: string;
		policyStatus?: string;
		premiumStatus?: string;
		paymentFrequency?: string;
		sumAssured?: number;
		unit?: number;
		level?: number;
		annualPremium?: number;
		autoUnderwritingIndicator?: boolean;
	}

	export interface LifeAssuredPolicyParty {
		role?: string;
		name?: string;
		idType?: string;
		idNo?: string;
		dob?: string;
		gender?: string;
		relationshipWithPH?: string;
		annualIncome?: number;
		occupation?: string;
		smokerStatus?: string;
		riskIndicator?: string;
		medicalReport?: string;
		declaration?: string;
	}

	export interface LifeAssuredPolicyProduct {
		code?: string;
		name?: string;
		lifeAssured?: string;
		riskCommencementDate?: string;
		status?: string;
		reinstatementDate?: string;
		coveragePeriod?: string;
		paymentPeriod?: string;
		sumAssured?: number;
		unit?: number;
		level?: number;
		installmentPremium?: number;
		underwritingDecision?: string;
		loadings?: boolean;
		agreement?: boolean;
		reinsurance?: boolean;
		durationFromInception?: string;
		reinstatementDateToEventDate?: string;
	}

	export interface LifeAssuredPolicyLoading {
		policyNo?: string;
		productCode?: string;
		productType?: string;
		category?: string;
		occupationClass?: string;
		type?: string;
		period?: string;
		extraPremium?: number;
	}

	export interface LifeAssuredPolicyExclusion {
		policyNo?: string;
		productCode?: string;
		productType?: string;
		category?: string;
		occupationClass?: string;
		type?: string;
		period?: string;
		extraPremium?: number;
	}

	export interface LifeAssuredPolicyAgreement {
		policyNo?: string;
		productCode?: string;
		productType?: string;
		type?: string;
		lifeAssured?: string;
		code?: string;
		comment?: string;
		reviewPeriodInMonth?: number;
		content?: string;
	}

	export interface LifeAssuredPolicyRiskRelatedCSHistory {
		csNo?: string;
		policyNo?: string;
		productCode?: string;
		productType?: string;
		item?: string;
		applicationDate?: string;
		status?: string;
		autoUnderwritingIndicator?: boolean;
		underwritingDecision?: string;
		underwritingCompletionDate?: string;
		underwriter?: string;
	}

	export interface LifeAssuredPolicy {
		policyNo?: string;
		proposalDate?: string;
		issueDate?: string;
		riskCommencementDate?: string;
		currency?: string;
		status?: string;
		lapseDate?: string;
		reinstatementDate?: string;
		installmentPremium?: boolean;
		nextDueDate?: string;
		outstandingPremium?: number;
		policyFrequency?: string;
		policyLoan?: number;
		salesChannel?: string;
		serviceAgent?: string;
		parties?: Array<LifeAssuredPolicyParty>;
		products?: Array<LifeAssuredPolicyProduct>;
		loadings?: Array<LifeAssuredPolicyLoading>;
		exclusions?: Array<LifeAssuredPolicyExclusion>;
		agreements?: Array<LifeAssuredPolicyAgreement>;
		riskRelatedCSHistory?: Array<LifeAssuredPolicyRiskRelatedCSHistory>;
	}

	export interface LifeAssuredInfo {
		insuredList?: Array<LifeAssuredInsured>;
		medicalOrNotCodes?: Array<LifeAssuredMedicalOrNotCode>;
		claimHistory?: Array<LifeAssuredClaimHistory>;
		underwritingHistory?: Array<LifeAssuredUnderwritingHistory>;
		policies?: Array<LifeAssuredPolicy>;
	}

	export interface AssessmentPolicyProductAdjustmentItem {
		name?: string;
		evaluationCurrency?: string;
		evaluationAmount?: number;
		adjustmentCurrency?: string;
		adjustmentAmount?: number;
		paymentCurrency?: string;
		paymentAmount?: number;
		actualPaymentCurrency?: string;
		actualPaymentAmount?: number;
		remark?: string;
	}

	export interface AssessmentPolicyProductAdjustmentFactor {
		name?: string;
		subName?: string;
		cause?: string;
		factor?: number;
	}

	export interface AssessmentPolicyProductLiabilityEvaluation {
		/** this is a control property, never submit to server side */
		selected?: boolean;
		sequence?: number;
		name?: string;
		parameter?: string;
		advancePayment?: number;
		evaluationPayment?: number;
		claimablePayment?: number;
		actualPayment?: number;
		remark?: string;
	}

	export interface AssessmentPolicyProduct {
		code?: string;
		name?: string;
		claimDecision?: string;
		claimDecisionReason?: string;
		inForce?: boolean;
		premiumWaive?: boolean;
		waiveStartDate?: string;
		totalPaymentCurrency?: string;
		totalPaymentAmount?: number;
		adjustmentItems?: Array<AssessmentPolicyProductAdjustmentItem>;
		adjustmentFactors?: Array<AssessmentPolicyProductAdjustmentFactor>;
		liabilityEvaluations?: Array<AssessmentPolicyProductLiabilityEvaluation>;
	}

	export interface AssessmentPolicyAdjustmentItem {
		name?: string;
		premiumCollectTo?: string;
		evaluationPaymentCurrency?: string;
		evaluationPaymentAmount?: number;
		actualPaymentCurrency?: string;
		actualPaymentAmount?: number;
		remark?: string;
	}

	export interface AssessmentPolicy {
		policyNo?: string;
		status?: string;
		inceptionDate?: string;
		lastReinstatementDate?: string;
		premiumFrequency?: string;
		anniversaryDate?: string;
		statusAtEvent?: string;
		totalDisbursementCurrency?: string;
		totalDisbursementAmount?: number;
		products?: Array<AssessmentPolicyProduct>;
		adjustmentItems?: Array<AssessmentPolicyAdjustmentItem>;
	}

	export interface Assessment {
		policies?: Array<AssessmentPolicy>;
	}

	export interface DisbursementPlanPolicyProduct {
		code?: string;
		name?: string;
		disbursementAmountCurrency?: string;
		disbursementAmount?: number;
	}

	export interface DisbursementPlanPolicyPaymentPlan {
		payee?: string;
		relationship?: string;
		idNo?: string;
		paymentMethod?: string;
		productCode?: string;
		paymentType?: string;
		percentage?: number;
		disbursementAmountCurrency?: string;
		disbursementAmount?: number;
		interestAmountCurrency?: string;
		interestAmount?: number;
		paymentAmountOnPaymentCurrency?: string;
		paymentAmountOnPayment?: number;
		paymentAmountOnPolicyCurrency?: string;
		paymentAmountOnPolicy?: number;
		pending?: boolean;
	}

	export interface DisbursementPlanPolicy {
		policyNo?: string;
		policyCurrency?: string;
		totalDisbursementCurrency?: string;
		totalDisbursementAmount?: number;
		allocatedDisbursementCurrency?: string;
		allocatedDisbursementAmount?: number;
		totalAdjustmentCurrency?: string;
		totalAdjustmentAmount?: number;
		products?: Array<DisbursementPlanPolicyProduct>;
		paymentPlans?: Array<DisbursementPlanPolicyPaymentPlan>;
	}

	export interface DisbursementPlanBenefitAmountAllocation {
		payee?: string;
		relationship?: string;
		idNo?: string;
		paymentMethod?: string;
		policyNo?: string;
		productCode?: string;
		paymentType?: string;
		percentage?: number;
		disbursementAmountCurrency?: string;
		disbursementAmount?: number;
		interestAmountCurrency?: string;
		interestAmount?: number;
		paymentAmountOnPaymentCurrency?: string;
		paymentAmountOnPayment?: number;
		paymentAmountOnPolicyCurrency?: string;
		paymentAmountOnPolicy?: number;
		pending?: boolean;
	}

	export interface DisbursementPlan {
		totalDisbursementCurrency?: string;
		totalDisbursementAmount?: number;
		policies?: Array<DisbursementPlanPolicy>;
		benefitAmountAllocations?: Array<DisbursementPlanBenefitAmountAllocation>;
	}

	export interface InternalExternalQuery {
		task?: string;
		queryType?: string;
		subType?: string;
		status?: string;
		policyNo?: string;
		generatedBy?: string;
		generatedAt?: string;
		submissionContent?: string;
		repliedBy?: string;
		repliedAt?: string;
		replyComment?: string;
	}

	export type InternalExternalQueries = Array<InternalExternalQuery>;

	export interface CommentHistory {
		stage?: string;
		commentedBy?: string;
		commentedAt?: string;
		comment?: string;
	}

	export type CommentHistoryList = Array<CommentHistory>
}
