import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {
	EditDialogNavigatorContainer,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle
} from './widgets';

export const DialogNavigator = () => {
	return <EditDialogNavigatorContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'navigator', 'title']} value="Configurable Elements"/>
				</EditDialogPartTitle>
			</EditDialogPartHeader>
		</EditDialogPartContent>
	</EditDialogNavigatorContainer>;
};
