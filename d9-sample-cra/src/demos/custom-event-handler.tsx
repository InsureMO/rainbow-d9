import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {Fragment, useEffect} from 'react';

export const CustomEventHandler = () => {
	const {on, off} = useGlobalEventBus();
	useEffect(() => {
		const onCustomEvent = <R, M>(key: string, prefix: string, clipped: string, _models?: {
			root: R;
			model: M;
		}) => {
			if (prefix !== GlobalEventPrefix.CUSTOM) {
				console.log(`Custom event[key=${key}, prefix=${prefix}, clipped=${clipped}] captured.`);
			} else {
				alert(clipped);
			}
		};
		on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off]);

	return <Fragment/>;
};
