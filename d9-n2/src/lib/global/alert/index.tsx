import React, {ReactNode, useEffect, useState} from 'react';
import {ButtonInk} from '../../button';
import {IntlLabel, toIntlLabel} from '../../intl-label';
import {UnwrappedButton} from '../../unwrapped/button';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {AlertBody, AlertContainer, AlertDialog, AlertFooter} from './widgets';

export interface AlertState {
	visible: boolean;
	content?: ReactNode;
	onHide?: () => void;
}

export const Alert = () => {
	const {on, off, fire} = useGlobalEventBus();
	const [alert, setAlert] = useState<AlertState>({visible: false});
	useEffect(() => {
		const show = (content?: ReactNode, onHide?: () => void) => {
			if (alert.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setAlert({visible: true, content, onHide});
		};
		const hide = () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			const onHide = alert.onHide;
			setAlert({visible: false, content: alert.content});
			if (onHide != null) {
				onHide();
			}
		};

		on(GlobalEventTypes.SHOW_ALERT, show);
		on(GlobalEventTypes.HIDE_ALERT, hide);
		return () => {
			off(GlobalEventTypes.SHOW_ALERT, show);
			off(GlobalEventTypes.HIDE_ALERT, hide);
		};
	}, [on, off, alert.content, alert.onHide, alert.visible]);

	const onHideClicked = () => fire && fire(GlobalEventTypes.HIDE_ALERT);

	return <AlertContainer visible={alert.visible}>
		<AlertDialog visible={alert.visible}>
			<AlertBody>
				{toIntlLabel(alert.content)}
			</AlertBody>
			<AlertFooter>
				<UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onHideClicked}>
					<IntlLabel keys={['alert', 'confirm']} value="Ok"/>
				</UnwrappedButton>
			</AlertFooter>
		</AlertDialog>
	</AlertContainer>;
};

export {AlertLabel} from './widgets';
