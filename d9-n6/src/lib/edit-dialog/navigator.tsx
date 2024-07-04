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

export const DialogNavigatorElementChildren = (props: DialogNavigatorElementProps) => {
	const {element, model, level} = props;

	if (element.children == null || element.children.length === 0) {
		return null;
	}

	return <NavigatorElementChildren level={level}>
		{element.children.map((child) => {
			return <DialogNavigatorElement element={child} model={model} level={level + 1} key={child.code}/>;
		})}
	</NavigatorElementChildren>;
};

export const DialogNavigatorElement = (props: DialogNavigatorElementProps) => {
	const {element, model} = props;

	const visible = useElementVisible(element, model);
	if (!visible) {
		return null;
	}

	return <>
		<DialogNavigatorElementWrapper {...props}/>
		<DialogNavigatorElementChildren {...props}/>
	</>;
};

export interface DialogNavigatorProps {
	elements: Array<ConfigurableElement>;
	model: ConfigurableModel;
}

export const DialogNavigatorElements = (props: DialogNavigatorProps) => {
	const {elements, model} = props;

	return <NavigatorElementsContainer>
		{elements.map((element) => {
			return <DialogNavigatorElement element={element} model={model} level={0} key={element.code}/>;
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
