import React, {CSSProperties, ReactNode, useEffect, useState} from 'react';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {DialogContainer, DialogWrapper} from './widgets';

export interface DialogState {
	visible: boolean;
	content?: ReactNode;
	wrapperStyle?: CSSProperties;
}

export const Dialog = () => {
	const {on, off} = useGlobalEventBus();
	const [dialog, setDialog] = useState<DialogState>({visible: false});
	const [functions] = useState({
		show: (content?: ReactNode, wrapperStyle?: CSSProperties) => {
			if (dialog.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setDialog({visible: true, content, wrapperStyle});
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			setDialog(({content, wrapperStyle}) => {
				return {visible: false, content, wrapperStyle};
			});
		}
	});
	useEffect(() => {
		on(GlobalEventTypes.SHOW_DIALOG, functions.show);
		on(GlobalEventTypes.HIDE_DIALOG, functions.hide);
		return () => {
			off(GlobalEventTypes.SHOW_DIALOG, functions.show);
			off(GlobalEventTypes.HIDE_DIALOG, functions.hide);
		};
	}, [on, off, functions.show, functions.hide]);

	const onTransitionEnd = () => {
		if (!dialog.visible) {
			setDialog({visible: false});
		}
	};

	return <DialogContainer visible={dialog.visible} onTransitionEnd={onTransitionEnd}>
		<DialogWrapper style={dialog.wrapperStyle}>
			{dialog.content}
		</DialogWrapper>
	</DialogContainer>;
};

export {DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogLabel} from './widgets';
export * from './yes-no-dialog';
