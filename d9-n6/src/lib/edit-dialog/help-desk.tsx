import {IntlLabel} from '@rainbow-d9/n2';
import React, {useEffect, useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ArrowLeft, ArrowRight} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent} from '../types';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {useHelpDeskOpened} from './state-holder';
import {
	EditDialogHelpDocCloseHandle,
	EditDialogHelpDocContainer,
	EditDialogHelpDocOpenHandle,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	HelpDocContainer
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

	return <EditDialogHelpDocCloseHandle opened={opened} onClick={onCloseHelpDesk}>
		<ArrowLeft/>
	</EditDialogHelpDocCloseHandle>;
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

	return <EditDialogHelpDocOpenHandle opened={opened} onClick={onOpenHelpDesk}>
		<ArrowRight/>
	</EditDialogHelpDocOpenHandle>;
};

export interface DialogHelpDeskProps {
	helpDoc: MarkdownContent;
}

export interface DialogHelpDeskState {
	docWidth?: number;
}

export const DialogHelpDesk = (props: DialogHelpDeskProps) => {
	const {helpDoc} = props;

	const [state, setState] = useState<DialogHelpDeskState>({});
	const {on, off} = usePlaygroundEventBus();
	useEffect(() => {
		const onInitHelpDocWidth = (width: number) => {
			setState(state => ({...state, docWidth: width}));
		};
		on(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, onInitHelpDocWidth);
		return () => {
			off(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, onInitHelpDocWidth);
		};
	}, [on, off]);

	return <EditDialogHelpDocContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'docs', 'title']} value="Help Desk"/>
				</EditDialogPartTitle>
				<CloseHandle/>
			</EditDialogPartHeader>
			<EditDialogPartBody>
				<OpenHandle/>
				<HelpDocContainer width={state.docWidth}>
					<Markdown className="markdown-body" remarkPlugins={[remarkGfm]}>
						{helpDoc}
					</Markdown>
				</HelpDocContainer>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogHelpDocContainer>;
};
