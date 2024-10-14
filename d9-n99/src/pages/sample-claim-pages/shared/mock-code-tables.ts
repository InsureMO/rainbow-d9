import {registerMockCodeTables} from '../../../mock-services';

registerMockCodeTables({
	gender: [
		{label: 'Male', value: 'M'},
		{label: 'Female', value: 'F'}
	],
	idType: [
		{label: 'Identity Card', value: 'idCard'},
		{label: 'Passport', value: 'passport'},
		{label: 'Driving License', value: 'drivingLicense'},
		{label: 'Military ID', value: 'militaryId'},
		{label: 'Officer ID', value: 'officerId'},
		{label: 'Others', value: 'others'}
	],
	registrationStatus: [
		{label: 'Draft', value: 'draft'},
		{label: 'Submitted', value: 'submitted'},
		{label: 'Accepted', value: 'accepted'},
		{label: 'Rejected', value: 'rejected'}
	],
	claimType: [
		{label: 'Accident', value: 'accident'},
		{label: 'Death', value: 'death'},
		{label: 'Health', value: 'health'},
		{label: 'Medical', value: 'medical'}
	],
	relationshipWithInsured: [
		{label: 'Self', value: 'self'},
		{label: 'Spouse', value: 'spouse'},
		{label: 'Child', value: 'child'},
		{label: 'Parent', value: 'parent'}
	],
	notificationMethod: [
		{label: 'Email', value: 'email'},
		{label: 'SMS', value: 'sms'}
	]
});
