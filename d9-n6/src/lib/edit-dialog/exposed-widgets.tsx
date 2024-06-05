import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ElementBanned, ElementChecked, ElementMissed} from '../icons';
import {
	NavigatorConfigurableElementBadgeBanned,
	NavigatorConfigurableElementBadgeChecked,
	NavigatorConfigurableElementBadgeMissed
} from './widgets';

export const ConfigurableElementBadgeChecked = () => {
	return <NavigatorConfigurableElementBadgeChecked>
		<IntlLabel keys={['o23', 'variable', 'checked']} value={<ElementChecked/>}/>
	</NavigatorConfigurableElementBadgeChecked>;
};
export const ConfigurableElementBadgeMissed = () => {
	return <NavigatorConfigurableElementBadgeMissed>
		<IntlLabel keys={['o23', 'variable', 'missed']} value={<ElementMissed/>}/>
	</NavigatorConfigurableElementBadgeMissed>;
};
export const ConfigurableElementBadgeBanned = () => {
	return <NavigatorConfigurableElementBadgeBanned>
		<IntlLabel keys={['o23', 'variable', 'banned']} value={<ElementBanned/>}/>
	</NavigatorConfigurableElementBadgeBanned>;
};
