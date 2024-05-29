import React, {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';

export const useHelpDeskOpened = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
	const {on, off} = useEditDialogEventBus();
	const [helpDeskOpened, setHelpDeskOpened] = useState(false);
	useEffect(() => {
		const onOpenHelpDesk = () => setHelpDeskOpened(true);
		const onCloseHelpDesk = () => setHelpDeskOpened(false);
		on(EditDialogEventTypes.OPEN_HELP_DESK, onOpenHelpDesk);
		on(EditDialogEventTypes.CLOSE_HELP_DESK, onCloseHelpDesk);
		return () => {
			off(EditDialogEventTypes.OPEN_HELP_DESK, onOpenHelpDesk);
			off(EditDialogEventTypes.CLOSE_HELP_DESK, onCloseHelpDesk);
		};
	}, [on, off, helpDeskOpened]);
	return [helpDeskOpened, setHelpDeskOpened];
};

export const StateHolder = () => {
	const {on, off} = useEditDialogEventBus();
	const [helpDeskOpened] = useHelpDeskOpened();
	useEffect(() => {
		const onAskHelpDeskOpened = (callback: (opened: boolean) => void) => {
			callback(helpDeskOpened);
		};
		on(EditDialogEventTypes.ASK_HELP_DESK_OPENED, onAskHelpDeskOpened);
		return () => {
			off(EditDialogEventTypes.ASK_HELP_DESK_OPENED, onAskHelpDeskOpened);
		};
	}, [on, off, helpDeskOpened]);

	return <Fragment/>;
};