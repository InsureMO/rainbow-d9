export const enUSIntlLabels = {
	title: 'Claim', menu: {label: 'Claim'},
	registration: {
		menu: {label: 'Registration'}, title: 'Registration',
		'find-insured': {title: 'Claim - Registration - Find Insured'},
		create: {title: 'Claim - Registration - Create'},
		'case-no': 'Registration of Case No.:',
		criteria: {
			keywords: {placeholder: 'Enter to trigger search, could be registration No., policy No. or insured name.'}
		},
		results: {'related-policies': 'Related Policies', 'ongoing-claims': 'Ongoing Claims'},
		action: {register: 'Register'}
	},
	acceptance: {
		menu: {label: 'Acceptance'}, title: 'Acceptance',
		find: {title: 'Claim - Acceptance - Find'},
		'claim-entry': {title: 'Claim - Acceptance - Claim Entry', 'case-no': 'Claim Entry of Case No.:'},
		'policy-acceptance': {
			title: 'Claim - Acceptance - Policy Acceptance', 'case-no': 'Policy Acceptance of Case No.:'
		}
	},
	evaluation: {
		menu: {label: 'Evaluation'}, title: 'Evaluation', 'case-no': 'Evaluation of Case No.:'
	},
	reg: {
		'case-no': 'Case No.', 'reg-no': 'Registration No.',
		'submission-channel': 'Submission Channel',
		'manual-register': 'Manual Registration',
		status: 'Case Status'
	},
	insured: {title: 'Insured Information'},
	claim: {
		title: 'Claim Information', type: 'Claim Type', 'notification-date': 'Notification Date',
		'event-date': 'Event Date', nature: 'Claim Nature', 'incident-code': 'Incident Code',
		'case-classification': 'Case Classification', 'previous-case-no': 'Previous Case No.',
		'diagnosis-code': 'Diagnosis Code', details: 'Event Details',
		'type-required': 'Claim type is required.',
		'notification-date-required': 'Notification date is required.',
		'event-date-required': 'Event date is required.',
		'nature-required': 'Claim nature is required.'
	},
	additional: {
		title: 'Additional Information',
		'hospital-code': 'Hospital Code',
		'admission-date': 'Admission Date',
		'discharge-date': 'Discharge Date',
		'treat-place': 'Place of Treatment',
		'foreign-hospital': 'Foreign Hospital',
		'doctor-code': 'Doctor Code',
		'unknown-pre-existing-conditions': 'Unknown Pre-existing Conditions',
		'chronic-disease': 'Chronic Disease',
		'actual-ward-level': 'Actual Ward Level',
		'voluntary-ward-upgrade': 'Voluntary Ward Upgrade',
		'direct-billing-indicator': 'Direct Billing Indicator'
	},
	reporter: {
		title: 'Reporter Information', relationship: 'Relationship with Insured', via: 'Report Via',
		name: 'Reporter Name', 'type-of-pass': 'Type of Pass',
		'notification-method': 'Notification Method', 'handling-producer': 'Handling Producer',
		'producer-mobile': 'Producer Mobile No.', 'producer-email': 'Producer Email'
	},
	'actions-and-supporting': 'Actions & Supporting:',
	'claim-issue': {
		title: 'Claim Issue', headline: 'Title', raised: 'Generated', 'last-updated': 'Last Updated', status: 'Status',
		description: 'Description',
		'add-title': 'Add a Manual Issue'
	},
	'query-letter': {
		title: 'Query Letter', 'doc-no': 'Doc. No.', 'doc-name': 'Doc. Name', due: 'Due Date',
		raised: 'Generated', 'last-updated': 'Last Updated', status: 'Status'
	},
	'internal-query': {
		title: 'Internal Query', 'query-no': 'Query No.', 'query-type': 'Type', 'query-title': 'Title',
		assignee: 'Assignee', due: 'Due Date',
		raised: 'Generated', 'last-updated': 'Last Updated', status: 'Status'
	},
	'escalation': {
		title: 'Escalation', to: 'Escalated To', due: 'Due Date',
		raised: 'Escalated', 'last-updated': 'Last Updated', status: 'Status',
		headline: 'Title', description: 'Description',
		'add-title': 'Raise an Escalation'
	},
	'investigation': {
		title: 'Investigation', to: 'Submitted To', due: 'Due Date',
		raised: 'Submitted', 'last-updated': 'Last Updated', status: 'Status',
		headline: 'Title', description: 'Description',
		'add-title': 'Request an Investigation'
	},
	'acceptance-decision': {
		title: 'Acceptance Decision',
		'policy-title': 'Policy Information of Policy No.', 'policy-holder': 'Policy Holder',
		'current-status': 'Current Policy Status', 'status-at-event': 'Policy Status at Event Date',
		currency: 'Policy Currency', 'bankruptcy-involved': 'Bankruptcy Involved',
		'service-agent': 'Service Agent', 'service-agent-mobile': 'Service Agent Mobile',
		product: {
			name: 'Product Name', acceptable: 'Acceptable', accept: 'Accept', 'notified-amount': 'Notified Amount',
			'sum-assured': 'Sum Assured',
			'status-at-event': 'Product Status at Event Date', 'current-status': 'Current Product Status',
			'commencement-date': 'Commencement Date', 'expiry-date': 'Expiry Date',
			reinsurance: 'Reinsurance'
		},
		'summary-title': 'Decision', decision: 'Decision', reason: 'Reason',
		'price-eff-date': 'Price Effective Date(ILP)', 'comment-to-client': 'Comments to Client'
	},
	'claim-workbench': {
		title: 'Claim Workbench',
		'life-assured-info': {
			title: 'Life Assured Info', 'age-at-event': 'Age at Event Date',
			'medical-or-not': {
				title: 'Medical/Non-Medical Code Information', code: 'Code', 'code-category': 'Code Category',
				'lia-code-type': 'LIA Code Type', description: 'Medical/Non-Medical Code Description'
			},
			'claim-history': {
				title: 'Claim History',
				'product-code': 'Product Code', 'product-type': 'Product Type',
				'claim-type': 'Claim Type', 'event-date': 'Event Date', 'claim-nature': 'Claim Nature',
				'diagnosis': 'Diagnostic Code', 'claim-status': 'Claim Status',
				'claim-decision': 'Claim Decision', 'claimable-amount': 'Claimable Amount',
				'settle-date': 'Settle Date'
			},
			'underwriting-history': {
				title: 'Underwriting History',
				'product-code': 'Product Code', 'product-type': 'Product Type', 'business-type': 'Business Type',
				'underwriting-decision': 'UW Decision', 'commencement-date': 'Commencement Date',
				'policy-status': 'Policy Status', 'premium-status': 'Premium Status',
				'payment-frequency': 'Payment Frequency', 'sa-unit-level': 'SA / Unit / Level',
				'annual-premium': 'Annual Premium',
				'auto-underwriting-indicator': 'Auto UW Indicator'
			}
		},
		policies: {
			title: 'Policy Basic Information'
		},
		policy: {
			title: 'Policy Information of Policy No.:',
			'proposal-date': 'Proposal Date', 'issue-date': 'Issue Date',
			'risk-commencement-date': 'Risk Commencement Date', currency: 'Currency',
			status: 'Policy Status', 'lapse-date': 'Lapse Date', 'reinstatement-date': 'Reinstatement Date',
			'installment-premium': 'Installment Premium', 'next-due-date': 'Next Due Date',
			'outstanding-premium': 'Outstanding Premium', 'policy-frequency': 'Policy Frequency',
			'policy-loan': 'Policy Loan', 'sales-channel': 'Sales Channel', 'service-agent': 'Service Agent',
			party: {
				title: 'Parties',
				role: 'Party Role', name: 'Customer Name', 'id-type-and-no': 'ID Type / No.',
				'relation-with-holder': 'Relation with PH', 'annual-income': 'Annual Income',
				'smoker-status': 'Smoker Status', 'risk-indicator': 'Risk Indicator',
				'medical-report': 'Medical Report', declaration: 'Declaration'
			},
			product: {
				title: 'Products',
				'name': 'Product', 'life-assured': 'Life Assured',
				'risk-commencement-date': 'Risk Commencement Date', status: 'Policy Status',
				'reinstatement-date': 'Reinstatement Date', 'coverage-period': 'Coverage Period',
				'payment-period': 'Payment Period', 'sa-unit-level': 'SA / Unit / Level',
				'installment-premium': 'Installment Premium', 'underwriting-decision': 'Underwriting Decision',
				'loading': 'Loading', 'agreement': 'Agreement',
				'lapse-terminate-date': 'Lapse / Terminate Date',
				'inception-to-event-duration': 'Duration from Inception to Event',
				'reinstatement-to-event-duration': 'Duration from Reinstatement to Event'
			},
			loading: {
				title: 'Loading',
				'product-code': 'Product Code', 'product-type': 'Product Type', category: 'Loading Category',
				'occupation-class': 'Occupation Class', type: 'Loading Type', period: 'Loading Period',
				'extra-premium': 'Extra Premium'
			},
			exclusion: {
				title: 'Exclusion',
				'product-code': 'Product Code', 'product-type': 'Product Type', category: 'Loading Category',
				'occupation-class': 'Occupation Class', type: 'Loading Type', period: 'Loading Period',
				'extra-premium': 'Extra Premium'
			},
			agreement: {
				title: 'Agreement',
				'product-code': 'Product Code', 'product-type': 'Product Type', type: 'Agreement Type',
				'life-assured': 'Life Assured', code: 'Agreement Code', comment: 'Agreement Comment',
				'review-period': 'Review Period (Month)', content: 'Content'
			},
			'risk-related-cs-history': {
				title: 'Risk Related CS History',
				'product-code': 'Product Code', 'product-type': 'Product Type', item: 'CS Item',
				'application-date': 'CS Application Date', status: 'CS Status',
				'auto-underwriting-indicator': 'Auto UW Indicator', 'underwriting-decision': 'UW Decision',
				'underwriting-completion-date': 'UW Completion Date', underwriter: 'Underwriter'
			}
		},
		assessment: {
			title: 'Assessment Information'
		},
		'disbursement-plan': {
			title: 'Disbursement Plan'
		},
		queries: {
			title: 'Internal and External Query'
		}
	},
	'assessment': {
		title: 'Assessment'
	},
	'disbursement-plan': {
		title: 'Disbursement Plan'
	},
	action: {
		image: 'Image', 'doc-checklist': 'Document Checklist', 'medical-bill': 'Medical Bill', history: 'History',
		'edit-case': 'Edit Case Info', 'accept-policy': 'Accept Policy',
		'change-insured': 'Change Insured', 'search-reporter': 'Search Reporter',
		'generate-issues-as-internal-query': 'Generate Internal Query',
		'generate-issues-as-query-letter': 'Generate Query Letter',
		'add-claim-issue': 'Add a Manual Issue',
		'add-escalation': 'Raise an Escalation',
		'add-investigation': 'Request an Investigation',
		reply: 'Reply', reminder: 'Reminder', withdraw: 'Withdraw',
		comment: 'Comment',
		'reload-policy': 'Reload Policy'
	}
};
