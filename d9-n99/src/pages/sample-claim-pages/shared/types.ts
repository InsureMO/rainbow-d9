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

	export interface ClaimIssue {
		issueId?: string;
		/** this is a control property, never submit to server side */
		selected?: boolean;
		type?: string;
		generatedAt?: string;
		generatedBy?: string;
		lastUpdatedAt?: string;
		lastUpdatedBy?: string;
		status?: string;
	}

	export type ClaimIssues = Array<ClaimIssue>;

	export interface QueryLetter {
		letterId?: string;
		docNo?: string;
		docName?: string;
		generatedAt?: string;
		generatedBy?: string;
		dueDate?: string;
		lastUpdatedAt?: string;
		lastUpdatedBy?: string;
		status?: string;
	}

	export type QueryLetters = Array<QueryLetter>;

	export interface InternalQuery {
	}

	export type InternalQueries = Array<InternalQuery>;

	export interface Escalation {
	}

	export type Escalations = Array<Escalation>;

	export interface Investigation {
	}

	export type Investigations = Array<Investigation>;
}
