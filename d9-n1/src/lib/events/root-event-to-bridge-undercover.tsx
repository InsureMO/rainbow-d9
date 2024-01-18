import React, {Fragment, useEffect} from 'react';
import {BaseModel, NodeValidationScope, PropertyPath, PropValue, ValidatedSet} from '../types';
import {VUtils} from '../utils';
import {BridgeEventListener, useBridgeEventBus} from './bridge-event-bus';
import {RootEventTypes, useRootEventBus, ValidatedOptions} from './root-event-bus';

export enum BridgeToRootEventTypes {
	NOTIFY_VALUE_CHANGED = 'notify-value-changed',
	PERFORM_VALIDATE = 'perform-validate',
	LISTEN_VALUE_CHANGED = 'listen-value-changed',
	LISTEN_VALIDATED = 'listen-validated'
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

export const RootEventToBridgeUndercover = () => {
	const bridge = useBridgeEventBus();
	const root = useRootEventBus();
	useEffect(() => {
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
		bridge.on && bridge.on<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
		bridge.on && bridge.on<ValidateRequest>(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
		root.on(RootEventTypes.VALIDATED, onValidated);
		root.on(RootEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			bridge.off && bridge.off<ValueChangedNotification>(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, onNotifyValueChanged);
			bridge.off && bridge.off<ValidateRequest>(BridgeToRootEventTypes.PERFORM_VALIDATE, onValidateRequest);
			root.off(RootEventTypes.VALIDATED, onValidated);
			root.off(RootEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [bridge, root]);

	return <Fragment/>;
};