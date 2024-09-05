import React, {Fragment, useEffect} from 'react';
import {BridgeEventListener, RootEventTypes, useBridgeEventBus, useRootEventBus, ValidatedOptions} from '../events';
import {BaseModel, NodeValidationScope, PropertyPath, PropValue, ValidatedSet} from '../types';
import {VUtils} from '../utils';

// noinspection JSUnusedGlobalSymbols
export enum BridgeToRootEventTypes {
	NOTIFY_VALUE_CHANGED = 'notify-value-changed',
	PERFORM_VALIDATE = 'perform-validate',
	LISTEN_VALUE_CHANGED = 'listen-value-changed',
	LISTEN_VALIDATED = 'listen-validated',
	/**
	 * for bridge to notify root that theme has been changed.
	 *
	 */
	THEME_CHANGED = 'theme-changed'
}

export interface ValueChangedNotification {
	absolutePath: PropertyPath;
	from: PropValue;
	to: PropValue;
}

export interface ValidateRequest {
	scopes?: Array<NodeValidationScope>;
	onValidated?: (validated: ValidatedSet) => void;
}

/**
 * undercover in
 * @constructor
 */
export const RootToBridgeUndercover = () => {
	const bridge = useBridgeEventBus();
	const root = useRootEventBus();
	useEffect(() => {
		if (bridge.on == null) {
			// there is no bridge event bus around
			return;
		}

		const onNotifyValueChanged: BridgeEventListener<ValueChangedNotification> = (args) => {
			const {absolutePath, from, to} = args;
			root.fire(RootEventTypes.VALUE_CHANGED, absolutePath, from, to);
		};
		const onValidateRequest: BridgeEventListener<ValidateRequest> = (args) => {
			const {scopes, onValidated} = args;
			root.fire(RootEventTypes.VALIDATE, scopes, onValidated ?? VUtils.noop);
		};
		const onValidated = <R extends BaseModel, M extends PropValue, V extends PropValue>(options: ValidatedOptions<R, M, V>) => {
			bridge.fire(BridgeToRootEventTypes.LISTEN_VALIDATED, options);
		};
		const onValueChanged = (absolutePath: PropertyPath, from: PropValue, to: PropValue) => {
			bridge.fire(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, {absolutePath, from, to});
		};
		const onThemeChanged: BridgeEventListener<string> = (args) => {
			root.fire(RootEventTypes.THEME_CHANGED, args);
		};
		bridge.on<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
		bridge.on<ValidateRequest>(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
		bridge.on(BridgeToRootEventTypes.THEME_CHANGED, onThemeChanged);
		root.on(RootEventTypes.VALIDATED, onValidated);
		root.on(RootEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			bridge.off<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
			bridge.off<ValidateRequest>(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
			bridge.off(BridgeToRootEventTypes.THEME_CHANGED, onThemeChanged);
			root.off(RootEventTypes.VALIDATED, onValidated);
			root.off(RootEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [bridge, root]);

	return <Fragment/>;
};