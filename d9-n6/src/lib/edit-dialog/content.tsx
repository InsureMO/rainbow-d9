import {IntlLabel} from '@rainbow-d9/n2';
import React, {useEffect, useRef, useState} from 'react';
import {Back} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent} from '../types';
import {EditDialogEventBusProvider} from './edit-dialog-event-bus';
import {DialogHelpDesk} from './help-desk';
import {LayoutController} from './layout-controller';
import {DialogNavigator} from './navigator';
import {DialogSpecificDetails} from './specific-details';
import {StateHolder} from './state-holder';
import {ConfigurableElement, ConfigurableModel} from './types';
import {EditDialogContentContainer, EditDialogContentInitializer, EditorDialogCloser} from './widgets';

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
}

export interface DialogContentState {
	model: ConfigurableModel;
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		helpDoc, elements,
		prepare, confirm
	} = props;

	const {fire} = usePlaygroundEventBus();
	const [state] = useState<DialogContentState>({model: prepare()});

	const onBackClicked = () => {
		confirm(state.model);
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
			<DialogSpecificDetails/>
			<DialogNavigator elements={elements} model={state.model}/>
		</EditDialogContentContainer>
		<DialogContentInitializer/>
	</EditDialogEventBusProvider>;
};
