import React, {ReactNode} from 'react';
import {
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeMissed,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementBadgeUseDefault,
	ConfigurableModel
} from '../../../edit-dialog';

export interface CreateOneOrAnotherBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
	one: ReactNode;
	another: ReactNode;
}

export interface CreateCheckOrAnotherBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
	another: ReactNode;
}

export interface CreateCheckBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
}

export const createOneOrAnotherBadge = <M extends ConfigurableModel>(options: CreateOneOrAnotherBadgeOptions<M>) =>
	(model: M): ReactNode => options.check(model) ? options.one : options.another;
export const createCheckOrAnotherBadge = <M extends ConfigurableModel>(options: CreateCheckOrAnotherBadgeOptions<M>) =>
	createOneOrAnotherBadge({...options, one: <ConfigurableElementBadgeChecked/>});
export const createCheckOrMissBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createCheckOrAnotherBadge({...options, another: <ConfigurableElementBadgeMissed/>});
export const createCheckOrBanBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createCheckOrAnotherBadge({...options, another: <ConfigurableElementBadgeBanned/>});
export const createCheckOrNotAvailableBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createCheckOrAnotherBadge({...options, another: <ConfigurableElementBadgeNotAvailable/>});
export const createCheckOrUseDefaultBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createCheckOrAnotherBadge({...options, another: <ConfigurableElementBadgeUseDefault/>});
export const createCheckOrIgnoreBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createCheckOrAnotherBadge({...options, another: <ConfigurableElementBadgeIgnored/>});
