import React, {useEffect, useRef, useState} from 'react';
import {Accept, Back} from '../icons';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent} from '../types';
import {EditDialogEventBusProvider} from './edit-dialog-event-bus';
import {DialogHelpDesk} from './help-desk';
import {LayoutController} from './layout-controller';
import {DialogNavigator} from './navigator';
import {DialogSpecific} from './specific';
import {StateHolder} from './state-holder';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogContentContainer,
	EditDialogContentInitializer,
	EditorDialogCloseButton,
	EditorDialogCloser
} from './widgets';

export const DialogContentInitializer = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();

	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const container = ref.current.previousElementSibling;
		const {width} = container.getBoundingClientRect();
		fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width);
	}, [fire]);

	return <EditDialogContentInitializer ref={ref}/>;
};

export interface DialogContentProps {
	helpDoc: MarkdownContent;
	elements: Array<ConfigurableElement>;
	/** prepare model for editing */
	prepare: () => ConfigurableModel;
	/** write back */
	confirm: (model: ConfigurableModel) => void;
	/** discard change */
	discard: (model: ConfigurableModel) => void;
}

export interface DialogContentState {
	model: ConfigurableModel;
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		helpDoc, elements,
		prepare, confirm, discard
	} = props;

	const {fire} = usePlaygroundEventBus();
	const [state] = useState<DialogContentState>({model: prepare()});

	const onConfirmClicked = () => {
		confirm(state.model);
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};
	const onDiscardClicked = () => {
		discard(state.model);
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};

	return <EditDialogEventBusProvider>
		<StateHolder/>
		<LayoutController/>
		<EditDialogContentContainer>
			<EditorDialogCloser>
				<EditorDialogCloseButton data-role="confirm" onClick={onConfirmClicked}>
					<Accept/>
					{Labels.ConfirmContent}
				</EditorDialogCloseButton>
				<EditorDialogCloseButton data-role="discard" onClick={onDiscardClicked}>
					<Back/>
					{Labels.DiscardContent}
				</EditorDialogCloseButton>
			</EditorDialogCloser>
			<DialogHelpDesk helpDoc={helpDoc}/>
			<DialogSpecific elements={elements} model={state.model}/>
			<DialogNavigator elements={elements} model={state.model}/>
		</EditDialogContentContainer>
		<DialogContentInitializer/>
	</EditDialogEventBusProvider>;
};
