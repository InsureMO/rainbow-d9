import React, {ReactNode} from 'react';
import {
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeMissed,
	ConfigurableElementBadgeNo,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementBadgeUseDefault,
	ConfigurableElementBadgeYes,
	ConfigurableModel
} from '../../../edit-dialog';

export interface CreateOneOrAnotherBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
	one: ReactNode;
	another: ReactNode;
}

// one or another
export const createOneOrAnotherBadge = <M extends ConfigurableModel>(options: CreateOneOrAnotherBadgeOptions<M>) =>
	(model: M): ReactNode => options.check(model) ? options.one : options.another;

// check or another
export interface CreateCheckOrAnotherBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
	another: ReactNode;
}

export const createCheckOrAnotherBadge = <M extends ConfigurableModel>(options: CreateCheckOrAnotherBadgeOptions<M>) =>
	createOneOrAnotherBadge({...options, one: <ConfigurableElementBadgeChecked/>});

export interface CreateCheckBadgeOptions<M extends ConfigurableModel> {
	check: (model: M) => boolean;
}

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
// yes or no
export const createYesOrNoBadge = <M extends ConfigurableModel>(options: CreateCheckBadgeOptions<M>) =>
	createOneOrAnotherBadge({...options, one: <ConfigurableElementBadgeYes/>, another: <ConfigurableElementBadgeNo/>});

// value or another
export interface CreateValueOrAnotherBadgeOptions<M extends ConfigurableModel> extends CreateCheckOrAnotherBadgeOptions<M> {
	one: (model: M) => ReactNode;
}

export const createValueOrAnotherBadge = <M extends ConfigurableModel>(options: CreateValueOrAnotherBadgeOptions<M>) =>
	(model: M): ReactNode => options.check(model) ? options.one(model) : options.another;

export interface CreateValueBadgeOptions<M extends ConfigurableModel> extends CreateCheckBadgeOptions<M> {
	one: (model: M) => ReactNode;
}

export const createValueOrMissBadge = <M extends ConfigurableModel>(options: CreateValueBadgeOptions<M>) =>
	createValueOrAnotherBadge({...options, another: <ConfigurableElementBadgeMissed/>});
