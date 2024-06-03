import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogNavigatorContainer,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle
} from './widgets';

export interface DialogNavigatorProps {
	elements?: Array<ConfigurableElement>;
	model: ConfigurableModel;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogNavigator = (_props: DialogNavigatorProps) => {
	// const {elements, model} = props;
	return <EditDialogNavigatorContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'navigator', 'title']} value="Configurable Elements"/>
				</EditDialogPartTitle>
			</EditDialogPartHeader>
			<EditDialogPartBody>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogNavigatorContainer>;
};
