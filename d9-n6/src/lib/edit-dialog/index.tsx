import React, {ReactNode, useEffect, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditDialogContainer, EditDialogWrapper} from './widgets';

export interface EditDialogState {
	visible: boolean;
	content?: ReactNode;
}

export const EditDialog = () => {
	const {on, off} = usePlaygroundEventBus();
	const [state, setState] = useState<EditDialogState>({visible: false});

	const [functions] = useState({
		show: (content: ReactNode) => {
			if (state.visible) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			setState({visible: true, content});
		},
		hide: () => {
			document.body.style.paddingRight = '';
			document.body.style.overflowY = '';
			setState(({content}) => ({visible: false, content}));
		}
	});
	useEffect(() => {
		on(PlaygroundEventTypes.SHOW_EDIT_DIALOG, functions.show);
		on(PlaygroundEventTypes.HIDE_EDIT_DIALOG, functions.hide);
		return () => {
			off(PlaygroundEventTypes.SHOW_EDIT_DIALOG, functions.show);
			off(PlaygroundEventTypes.HIDE_EDIT_DIALOG, functions.hide);
		};
	}, [on, off, functions.show, functions.hide]);

	const onTransitionEnd = () => {
		if (!state.visible) {
			setState({visible: false});
		}
	};

	return <EditDialogContainer visible={state.visible} onTransitionEnd={onTransitionEnd}>
		<EditDialogWrapper>
			{state.content}
		</EditDialogWrapper>
	</EditDialogContainer>;
};

export * from './content';
export * from './types';
