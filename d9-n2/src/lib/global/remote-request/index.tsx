import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {N2Logger} from '../../utils';
import {AlertLabel} from '../alert';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {RemoteRequestContainer} from './widgets';

export const Spinner = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path
			d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
	</svg>;
};

export const RemoteRequest = (props: {
	clearAccount: () => void;
	on200?: () => void;
	on401: () => void;
	on403: () => void;
}) => {
	const {clearAccount, on200: doOn200, on401: doOn401, on403: doOn403} = props;

	const {on, off, fire} = useGlobalEventBus();
	const [count] = useState<{ value: number }>({value: 0});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const on401 = () => {
			fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>Unauthorized.</AlertLabel>, () => {
				clearAccount();
				doOn401();
			});
		};
		const on403 = () => {
			fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>Access denied.</AlertLabel>, () => {
				doOn403();
			});
		};
		const onOtherError = () => {
			fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>
				Unpredicted error occurred, contact your administrator for more details.
			</AlertLabel>);
		};
		const onInvokeRemoteRequest = async (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			request: () => Promise<any>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			success?: (data?: any) => void,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			failure?: (error?: any) => void,
			disableAlert?: boolean
		) => {
			count.value = count.value + 1;
			if (count.value === 1) {
				forceUpdate();
			}
			try {
				const data = await request();
				doOn200 && doOn200();
				success && success(data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				N2Logger.error(e, 'RemoteRequest');
				if (!disableAlert) {
					if (e.status === 401) {
						on401();
						return;
					} else if (e.status === 403) {
						on403();
					} else {
						onOtherError();
					}
				}
				failure && failure(e);
			} finally {
				count.value = count.value - 1;
				if (count.value === 0) {
					forceUpdate();
				}
			}
		};
		on(GlobalEventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
		return () => {
			off(GlobalEventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
		};
	}, [on, off, fire, forceUpdate, clearAccount, doOn200, doOn401, doOn403, count]);

	return <RemoteRequestContainer visible={count.value > 0}>
		<Spinner />
	</RemoteRequestContainer>;
};
