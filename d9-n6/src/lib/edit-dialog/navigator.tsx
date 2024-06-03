import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogNavigatorContainer,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	NavigatorConfigurableElementBadge,
	NavigatorConfigurableElementContainer,
	NavigatorConfigurableElementLabel,
	NavigatorDialogNavigatorElementsContainer
} from './widgets';

export interface DialogNavigatorElementProps {
	element: ConfigurableElement;
	model: ConfigurableModel;
	level: number;
}

export const DialogNavigatorElement = (props: DialogNavigatorElementProps) => {
	const {element, model, level} = props;
	const {label, badge} = element;

	return <>
		<NavigatorConfigurableElementContainer level={0}>
			<NavigatorConfigurableElementLabel>{label}</NavigatorConfigurableElementLabel>
			{badge != null
				? <NavigatorConfigurableElementBadge>{badge(model)}</NavigatorConfigurableElementBadge>
				: null}
		</NavigatorConfigurableElementContainer>
		{element.children != null
			? element.children.map(child => {
				return <DialogNavigatorElement element={child} model={model} level={level + 1} key={element.code}/>;
			})
			: null}
	</>;
};

export interface DialogNavigatorProps {
	elements: Array<ConfigurableElement>;
	model: ConfigurableModel;
}

export const DialogNavigatorElements = (props: DialogNavigatorProps) => {
	const {elements, model} = props;

	return <NavigatorDialogNavigatorElementsContainer>
		{elements.map(element => {
			return <DialogNavigatorElement element={element} model={model} level={0} key={element.code}/>;
		})}
	</NavigatorDialogNavigatorElementsContainer>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogNavigator = (props: DialogNavigatorProps) => {
	return <EditDialogNavigatorContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>
					<IntlLabel keys={['o23', 'dialog', 'navigator', 'title']} value="Configurable Elements"/>
				</EditDialogPartTitle>
			</EditDialogPartHeader>
			<EditDialogPartBody>
				<DialogNavigatorElements {...props}/>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogNavigatorContainer>;
};
