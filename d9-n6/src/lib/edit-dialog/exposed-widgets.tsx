import React from 'react';
import {Labels} from '../labels';
import {NavigatorConfigurableElementBadgeWrapper} from './widgets';

export const ConfigurableElementBadgeChecked = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="checked">
		{Labels.BadgeChecked}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeMissed = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="missed">
		{Labels.BadgeMissed}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeBanned = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="banned">
		{Labels.BadgeBanned}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeAll = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="all">
		{Labels.All}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeIgnored = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="ignored">
		{Labels.Ignored}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeNotAvailable = () => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="not-available">
		{Labels.NotAvailable}
	</NavigatorConfigurableElementBadgeWrapper>;
};
export const ConfigurableElementBadgeCount = (props: { count: number }) => {
	return <NavigatorConfigurableElementBadgeWrapper data-role="count">
		{props.count}
	</NavigatorConfigurableElementBadgeWrapper>;
};
