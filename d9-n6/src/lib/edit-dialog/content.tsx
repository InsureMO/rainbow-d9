import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {Back} from '../diagram';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {
	EditDialogCenterPart,
	EditDialogContentContainer,
	EditDialogLeftPart,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	EditDialogRightPart,
	EditorDialogCloser
} from './widgets';

export interface DialogContentProps {
	confirm: () => void;
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		confirm
	} = props;

	const {fire} = usePlaygroundEventBus();

	const onBackClicked = () => {
		confirm();
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};

	return <EditDialogContentContainer left={64}>
		<EditorDialogCloser onClick={onBackClicked}>
			<Back/>
			<IntlLabel keys={['o23', 'dialog', 'close']} value="Back to canvas"/>
		</EditorDialogCloser>
		<EditDialogLeftPart>
			<EditDialogPartContent minWidth={300}>
				<EditDialogPartHeader>
					<EditDialogPartTitle>
						<IntlLabel keys={['o23', 'dialog', 'docs', 'title']} value="Help Desk"/>
					</EditDialogPartTitle>
				</EditDialogPartHeader>
			</EditDialogPartContent>
		</EditDialogLeftPart>
		<EditDialogRightPart>
			<EditDialogPartContent>
				<EditDialogPartHeader>
					<EditDialogPartTitle>
						<IntlLabel keys={['o23', 'dialog', 'specific', 'title']} value="Specific Details"/>
					</EditDialogPartTitle>
				</EditDialogPartHeader>
			</EditDialogPartContent>
		</EditDialogRightPart>
		<EditDialogCenterPart>
			<EditDialogPartContent minWidth={300}>
				<EditDialogPartHeader>
					<EditDialogPartTitle>
					</EditDialogPartTitle>
				</EditDialogPartHeader>
			</EditDialogPartContent>
		</EditDialogCenterPart>
	</EditDialogContentContainer>;
};
