import React, {useEffect} from 'react';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {useHelpDeskOpened} from './state-holder';
import {EditDialogLayoutControllerHandle} from './widgets';

export const LayoutController = () => {
	const {fire} = useEditDialogEventBus();
	const [opened, setOpened] = useHelpDeskOpened();
	useEffect(() => {
		fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened: boolean) => setOpened(opened));
	}, [fire, setOpened]);

	return <EditDialogLayoutControllerHandle opened={opened}/>;
};
