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
}
