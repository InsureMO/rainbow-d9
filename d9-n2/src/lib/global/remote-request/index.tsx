import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {Spinner} from '../../icons';
import {N2Logger} from '../../utils';
import {AlertLabel} from '../alert';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {RemoteRequestContainer} from './widgets';

export interface RemoteRequestProps {
	clearAccount: () => void;
	on200?: () => void;
	on401: () => void;
	on403: () => void;
}

export const RemoteRequest = (props: RemoteRequestProps) => {
	const {clearAccount, on200: doOn200, on401: doOn401, on403: doOn403} = props;

	const {on, off, fire} = useGlobalEventBus();
	const [count] = useState<{ value: number }>({value: 0});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const on401 = () => {
			if (fire != null) {
				fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>Unauthorized.</AlertLabel>, () => {
					clearAccount();
					doOn401();
				});
			}
		};
		const on403 = () => {
			if (fire != null) {
				fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>Access denied.</AlertLabel>, () => {
					doOn403();
				});
			}
		};
		const onOtherError = () => {
			if (fire != null) {
				fire(GlobalEventTypes.SHOW_ALERT, <AlertLabel>
					Unpredicted error occurred, contact your administrator for more details.
				</AlertLabel>);
			}
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
				if (doOn200 != null) {
					doOn200();
				}
				if (success != null) {
					success(data);
				}
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
				if (failure != null) {
					failure(e);
				}
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
		<Spinner/>
	</RemoteRequestContainer>;
};
