import React from 'react';
import {Labels} from '../labels';
import {
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	EditDialogSpecificDetailsContainer
} from './widgets';

export const DialogSpecificDetails = () => {
	return <EditDialogSpecificDetailsContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>{Labels.SpecificDetails}</EditDialogPartTitle>
			</EditDialogPartHeader>
		</EditDialogPartContent>
	</EditDialogSpecificDetailsContainer>;
};
