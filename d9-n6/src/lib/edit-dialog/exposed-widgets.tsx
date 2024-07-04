import React from 'react';
import {Labels} from '../labels';
import {NavigatorElementBadgeWrapper} from './widgets';

export const ConfigurableElementBadgeChecked = () => {
	return <NavigatorElementBadgeWrapper data-role="checked">
		{Labels.BadgeChecked}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeMissed = () => {
	return <NavigatorElementBadgeWrapper data-role="missed">
		{Labels.BadgeMissed}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeBanned = () => {
	return <NavigatorElementBadgeWrapper data-role="banned">
		{Labels.BadgeBanned}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeAll = () => {
	return <NavigatorElementBadgeWrapper data-role="all">
		{Labels.All}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeIgnored = () => {
	return <NavigatorElementBadgeWrapper data-role="ignored">
		{Labels.Ignored}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeNotAvailable = () => {
	return <NavigatorElementBadgeWrapper data-role="not-available">
		{Labels.NotAvailable}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeCount = (props: { count: number }) => {
	return <NavigatorElementBadgeWrapper data-role="count">
		{props.count}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeSnippet = () => {
	return <NavigatorElementBadgeWrapper data-role="snippet">
		{Labels.Snippet}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeSteps = () => {
	return <NavigatorElementBadgeWrapper data-role="steps">
		{Labels.Steps}
	</NavigatorElementBadgeWrapper>;
};
export const ConfigurableElementBadgeAsIs = () => {
	return <NavigatorElementBadgeWrapper data-role="as-is">
		{Labels.AsIs}
	</NavigatorElementBadgeWrapper>;
};
