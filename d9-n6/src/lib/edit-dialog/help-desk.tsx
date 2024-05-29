import {IntlLabel} from '@rainbow-d9/n2';
import React, {useEffect} from 'react';
import {ArrowLeft, ArrowRight} from '../icons';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {useHelpDeskOpened} from './state-holder';
import {
	EditDialogLeftPart,
	EditDialogLeftPartCloseHandle,
	EditDialogLeftPartOpenHandle,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle
} from './widgets';

export const CloseHandle = () => {
	const {fire} = useEditDialogEventBus();
	const [opened, setOpened] = useHelpDeskOpened();
	useEffect(() => {
		fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened: boolean) => setOpened(opened));
	}, [fire, setOpened]);

	const onCloseHelpDesk = () => {
		setOpened(false);
		fire(EditDialogEventTypes.CLOSE_HELP_DESK);
	};

	return <EditDialogLeftPartCloseHandle opened={opened} onClick={onCloseHelpDesk}>
		<ArrowLeft/>
	</EditDialogLeftPartCloseHandle>;
};

export const OpenHandle = () => {
	const {fire} = useEditDialogEventBus();
	const [opened, setOpened] = useHelpDeskOpened();
	useEffect(() => {
		fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened: boolean) => setOpened(opened));
	}, [fire, setOpened]);

	const onOpenHelpDesk = () => {
		setOpened(true);
		fire(EditDialogEventTypes.OPEN_HELP_DESK);
	};

	return <EditDialogLeftPartOpenHandle opened={opened} onClick={onOpenHelpDesk}>
		<ArrowRight/>
	</EditDialogLeftPartOpenHandle>;
};

export const DialogHelpDesk = () => {
	return <EditDialogLeftPart>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'docs', 'title']} value="Help Desk"/>
				</EditDialogPartTitle>
				<CloseHandle/>
			</EditDialogPartHeader>
			<EditDialogPartBody>
				<OpenHandle/>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogLeftPart>;
};
