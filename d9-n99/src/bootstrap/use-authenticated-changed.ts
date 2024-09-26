import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {AppEventTypes, useAppEventBus} from './app-event-bus';

export const useAuthenticatedChanged = () => {
	const {on, off} = useAppEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onAuthenticatedChanged = () => forceUpdate();
		on(AppEventTypes.AUTHENTICATED_CHANGED, onAuthenticatedChanged);
		return () => {
			off(AppEventTypes.AUTHENTICATED_CHANGED, onAuthenticatedChanged);
		};
	}, [on, off, forceUpdate]);
};