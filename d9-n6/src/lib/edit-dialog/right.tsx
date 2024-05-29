import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {EditDialogPartContent, EditDialogPartHeader, EditDialogPartTitle, EditDialogRightPart} from './widgets';

export const DialogRightPart = () => {
	return <EditDialogRightPart>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'specific', 'title']} value="Specific Details"/>
				</EditDialogPartTitle>
			</EditDialogPartHeader>
		</EditDialogPartContent>
	</EditDialogRightPart>;
};
