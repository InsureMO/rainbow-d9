import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
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
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'specific', 'title']} value="Specific Details"/>
				</EditDialogPartTitle>
			</EditDialogPartHeader>
		</EditDialogPartContent>
	</EditDialogSpecificDetailsContainer>;
};
