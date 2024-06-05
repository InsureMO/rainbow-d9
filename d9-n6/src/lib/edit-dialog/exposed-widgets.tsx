import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {NavigatorConfigurableElementBadgeChecked, NavigatorConfigurableElementBadgeMissed} from './widgets';

export const ConfigurableElementBadgeChecked = () => {
	return <NavigatorConfigurableElementBadgeChecked>
		<IntlLabel keys={['o23', 'variable', 'yes-sign']} value="✓"/>
	</NavigatorConfigurableElementBadgeChecked>;
};
export const ConfigurableElementBadgeMissed = () => {
	return <NavigatorConfigurableElementBadgeMissed>
		<IntlLabel keys={['o23', 'variable', 'no-sign']} value="✗"/>
	</NavigatorConfigurableElementBadgeMissed>;
};
