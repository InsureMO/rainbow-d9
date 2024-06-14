import React from 'react';
import {Labels} from '../labels';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {useElementValueChange, useElementVisible} from './hooks';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogNavigatorContainer,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	NavigatorElementBadge,
	NavigatorElementChildren,
	NavigatorElementContainer,
	NavigatorElementLabel,
	NavigatorElementsContainer
} from './widgets';

export interface DialogNavigatorElementProps {
	element: ConfigurableElement;
	model: ConfigurableModel;
	level: number;
	last: Array<boolean>;
}

export const DialogNavigatorElementWrapper = (props: DialogNavigatorElementProps) => {
	const {element, model, level} = props;
	const {label, badge} = element;

	const {fire} = useEditDialogEventBus();
	useElementValueChange(element);

	const onClicked = () => {
		fire(EditDialogEventTypes.LOCATE_ELEMENT, element.anchor);
	};

	return <NavigatorElementContainer level={level} onClick={onClicked}>
		<NavigatorElementLabel level={level}>{label}</NavigatorElementLabel>
		{badge != null
			? <NavigatorElementBadge>{badge(model)}</NavigatorElementBadge>
			: null}
	</NavigatorElementContainer>;
};

export const DialogNavigatorElement = (props: DialogNavigatorElementProps) => {
	const {element, model, level, last} = props;

	const visible = useElementVisible(element, model);
	if (!visible) {
		return null;
	}

	return <>
		<DialogNavigatorElementWrapper {...props}/>
		{element.children != null
			? <NavigatorElementChildren>
				{element.children
					.map((child, index, children) => {
						return <DialogNavigatorElement element={child} model={model}
						                               level={level + 1} last={[...last, index === children.length - 1]}
						                               key={child.code}/>;
					})}
			</NavigatorElementChildren>
			: null}
	</>;
};

export interface DialogNavigatorProps {
	elements: Array<ConfigurableElement>;
	model: ConfigurableModel;
}

export const DialogNavigatorElements = (props: DialogNavigatorProps) => {
	const {elements, model} = props;

	return <NavigatorElementsContainer>
		{elements
			.map((element, index, elements) => {
				return <DialogNavigatorElement element={element} model={model}
				                               level={0}
				                               last={[index === elements.length - 1]}
				                               key={element.code}/>;
			})}
	</NavigatorElementsContainer>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DialogNavigator = (props: DialogNavigatorProps) => {
	return <EditDialogNavigatorContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>{Labels.Navigator}</EditDialogPartTitle>
			</EditDialogPartHeader>
			<EditDialogPartBody>
				<DialogNavigatorElements {...props}/>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogNavigatorContainer>;
};
