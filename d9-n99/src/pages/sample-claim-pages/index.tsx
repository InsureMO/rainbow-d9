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
