import ClaimAcceptanceIcon from '../../assets/claim-acceptance.svg?react';
import ClaimEvaluationIcon from '../../assets/claim-evaluation.svg?react';
import ClaimRegistrationIcon from '../../assets/claim-registration.svg?react';
import ClaimIcon from '../../assets/claim.svg?react';
import {AppMenuGroup, AppMenuType, buildMenuItemForRoute, Menus} from '../../global-settings';
import './shared';
import './registration';
import './acceptance';
import './evaluation';

Menus.register({
	code: 'claim', type: AppMenuType.GROUP,
	icon: <ClaimIcon/>, text: 'claim.menu.label',
	items: [
		buildMenuItemForRoute({
			code: 'claim-registration', icon: <ClaimRegistrationIcon/>, text: 'claim.registration.menu.label'
		}),
		buildMenuItemForRoute({
			code: 'claim-acceptance', icon: <ClaimAcceptanceIcon/>, text: 'claim.acceptance.menu.label'
		}),
		buildMenuItemForRoute({
			code: 'claim-evaluation', icon: <ClaimEvaluationIcon/>, text: 'claim.evaluation.menu.label'
		})
	]
} as AppMenuGroup, 200);
