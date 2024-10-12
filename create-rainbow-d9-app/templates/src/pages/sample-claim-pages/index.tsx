import ClaimAcceptanceIcon from '../../assets/claim-acceptance.svg?react';
import ClaimEvaluationIcon from '../../assets/claim-evaluation.svg?react';
import ClaimRegistrationIcon from '../../assets/claim-registration.svg?react';
import ClaimIcon from '../../assets/claim.svg?react';
import {AppMenuGroup, AppMenuType, buildMenuItemForRoute, Menus, registerPageIntlLabels} from '../../global-settings';
import './registration';
import './acceptance';
import './evaluation';
import {registerMockCodeTables} from '../../mock-services';

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

// for menu group
registerPageIntlLabels('claim')
	.lang('en-US')
	.labels({title: 'Claim', menu: {label: 'Claim'}})
	.lang('zh-CN')
	.labels({title: '理赔', menu: {label: '理赔'}});

Menus.register({
	code: 'claim', type: AppMenuType.GROUP,
	icon: <ClaimIcon/>, text: 'claim.menu.label',
	items: [
		buildMenuItemForRoute({
			code: 'claim-registration', icon: <ClaimRegistrationIcon/>, text: 'claim-registration.menu.label'
		}),
		buildMenuItemForRoute({
			code: 'claim-acceptance', icon: <ClaimAcceptanceIcon/>, text: 'claim-acceptance.menu.label'
		}),
		buildMenuItemForRoute({
			code: 'claim-evaluation', icon: <ClaimEvaluationIcon/>, text: 'claim-evaluation.menu.label'
		})
	]
} as AppMenuGroup, 200);
