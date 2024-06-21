import {useThrottler} from '@rainbow-d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {Accept, Back} from '../icons';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent} from '../types';
import {EditDialogEventBusProvider, EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {DialogHelpDesk} from './help-desk';
import {LayoutController} from './layout-controller';
import {DialogNavigator} from './navigator';
import {DialogSpecific} from './specific';
import {StateHolder} from './state-holder';
import {ConfigurableElement, ConfigurableElementAnchor, ConfigurableModel} from './types';
import {
	EditDialogContentContainer,
	EditDialogContentInitializer,
	EditorDialogCloseButton,
	EditorDialogCloser
} from './widgets';

export const DialogContentInitializer = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const container = ref.current.previousElementSibling;
		const {width} = container.getBoundingClientRect();
		fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width);

		const observer = new ResizeObserver(() => {
			replace(() => {
				fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, container.getBoundingClientRect().width);
			}, 30);
		});
		observer.observe(container);
		return () => {
			observer.disconnect();
		};
	}, [fire, replace]);

	return <EditDialogContentInitializer ref={ref}/>;
};

export interface DialogWorkAreaProps {
	helpDoc: MarkdownContent;
	elements: Array<ConfigurableElement>;
	/**
	 * write back.
	 * return anchor of first invalid element if there is any validation failure.
	 * or returns undefined means successfully pass all validations, data was written back.
	 */
	confirm: (model: ConfigurableModel) => ConfigurableElementAnchor | true;
	/** discard change */
	discard: (model: ConfigurableModel) => void;
	model: ConfigurableModel;
}

export const DialogWorkArea = (props: DialogWorkAreaProps) => {
	const {helpDoc, elements, confirm, discard, model} = props;

	const {fire} = usePlaygroundEventBus();
	const {fire: fireDialog} = useEditDialogEventBus();

	const onConfirmClicked = () => {
		const anchor = confirm(model);
		if (anchor === true) {
			fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
		} else {
			fireDialog(EditDialogEventTypes.LOCATE_ELEMENT, anchor);
		}
	};
	const onDiscardClicked = () => {
		discard(model);
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};

	return <EditDialogContentContainer>
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
		<DialogSpecific elements={elements} model={model}/>
		<DialogNavigator elements={elements} model={model}/>
	</EditDialogContentContainer>;

};

export interface DialogContentProps {
	helpDoc: MarkdownContent;
	elements: Array<ConfigurableElement>;
	/** prepare model for editing */
	prepare: () => ConfigurableModel;
	/** write back, true means successfully */
	confirm: (model: ConfigurableModel) => ConfigurableElementAnchor | true;
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

	const [state] = useState<DialogContentState>({model: prepare()});

	return <EditDialogEventBusProvider>
		<StateHolder/>
		<LayoutController/>
		<DialogWorkArea helpDoc={helpDoc} elements={elements} confirm={confirm} discard={discard} model={state.model}/>
		<DialogContentInitializer/>
	</EditDialogEventBusProvider>;
};
