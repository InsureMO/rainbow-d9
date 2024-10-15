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
		/** this is a display property, never submit to server side */
		generatedByName?: string;
	}

	export interface WithLastUpdated {
		lastUpdatedAt?: string;
		lastUpdatedBy?: string;
		/** this is a display property, never submit to server side */
		lastUpdatedByName?: string;
	}

	export interface ClaimIssue extends Selectable, WithGenerated, WithLastUpdated {
		issueId?: string;
		title?: string;
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
		/** this is a display property, never submit to server side */
		assigneeName?: string;
		/** this is a display property, never submit to server side */
		assigneeDepartmentName?: string;
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
		/** this is a display property, never submit to server side */
		escalatedToName?: string;
	}

	export interface WithEscalated {
		escalatedAt?: string;
		escalatedBy?: string;
		/** this is a display property, never submit to server side */
		escalatedByName?: string;
	}

	export interface Escalation extends WithEscalatedTo, WithEscalated, WithLastUpdated {
		escalationId?: string;
		escalatedBy?: string;
		dueDate?: string;
		status?: string;
	}

	export type Escalations = Array<Escalation>;

	export interface WithSubmittedTo {
		submittedTo?: string;
		/** this is a display property, never submit to server side */
		submittedToName?: string;
	}

	export interface WithSubmitted {
		submittedAt?: string;
		submittedBy?: string;
		/** this is a display property, never submit to server side */
		submittedByName?: string;
	}

	export interface Investigation extends WithSubmittedTo, WithSubmitted, WithLastUpdated {
		investigationId?: string;
		dueDate?: string;
		status?: string;
	}

	export type Investigations = Array<Investigation>;
}
