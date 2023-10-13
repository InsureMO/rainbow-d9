import {useState} from 'react';
import {RootEventTypes, useRootEventBus, useWrapperEventBus, WrapperEventTypes} from '../events';
import {OnValueChanged, PropertyPath, PropValue} from '../types';
import {useThrottler} from './use-throttler';

const VALUE_CHANGED_OPTIONS = {
	DELAY_MS: 150
};

const askOldValue = (options: { stateOldValue: PropValue, currentOldValue: PropValue }): PropValue => {
	const {stateOldValue, currentOldValue} = options;
	if (stateOldValue == null) {
		return currentOldValue;
	} else if (stateOldValue != currentOldValue) {
		return stateOldValue;
	} else {
		return currentOldValue;
	}
};
export const useValueChanged = (): OnValueChanged => {
	const {fire} = useRootEventBus();
	const {fire: fireWrapper} = useWrapperEventBus();
	const [values] = useState({} as Record<PropertyPath, PropValue>);
	const {replace} = useThrottler();

	return (options: { absolutePath: PropertyPath; oldValue: PropValue; newValue: PropValue; }) => {
		const {absolutePath, newValue} = options;
		// compare old values from state/parameters, get the old one
		const oldValue = askOldValue({stateOldValue: values[absolutePath], currentOldValue: options.oldValue});
		// cache it
		values[absolutePath] = oldValue;
		// use throttler to avoid too many events
		replace(() => {
			// use promise to avoid appearing choppy
			// noinspection JSIgnoredPromiseFromCall
			new Promise<void>(resolve => {
				// clear cached old value
				delete values[absolutePath];
				// notify value change first
				fire(RootEventTypes.VALUE_CHANGED, absolutePath, oldValue, newValue);
				// do my validation
				fireWrapper(WrapperEventTypes.VALIDATE, oldValue, newValue);
				resolve();
			});
		}, VALUE_CHANGED_OPTIONS.DELAY_MS);
	};
};

export const setValueChangedDelay = (delayInMilliseconds: number) => VALUE_CHANGED_OPTIONS.DELAY_MS = delayInMilliseconds;