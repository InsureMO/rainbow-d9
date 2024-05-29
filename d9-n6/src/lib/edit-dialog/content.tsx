import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {Back} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent} from '../types';
import {DialogCenterPart} from './center';
import {EditDialogEventBusProvider} from './edit-dialog-event-bus';
import {DialogHelpDesk} from './help-desk';
import {LayoutController} from './layout-controller';
import {DialogRightPart} from './right';
import {StateHolder} from './state-holder';
import {EditDialogContentContainer, EditorDialogCloser} from './widgets';

export interface DialogContentProps {
	helpDoc: MarkdownContent;
	confirm: () => void;
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		helpDoc,
		confirm
	} = props;

	const {fire} = usePlaygroundEventBus();

	const onBackClicked = () => {
		confirm();
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};

	return <EditDialogEventBusProvider>
		<StateHolder/>
		<LayoutController/>
		<EditDialogContentContainer>
			<EditorDialogCloser onClick={onBackClicked}>
				<Back/>
				<IntlLabel keys={['o23', 'dialog', 'close']} value="Back to canvas"/>
			</EditorDialogCloser>
			<DialogHelpDesk helpDoc={helpDoc}/>
			<DialogRightPart/>
			<DialogCenterPart/>
		</EditDialogContentContainer>
	</EditDialogEventBusProvider>;
};
