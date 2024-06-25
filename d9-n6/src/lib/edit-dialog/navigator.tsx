import React, {useEffect, useRef, useState} from 'react';
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
	NavigatorElementChildrenTreeLine,
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

export const DialogNavigatorElementChildrenTreeLine = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState(0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		let height = 0;
		let ignored = ref.current.previousElementSibling;
		if (ignored.tagName === 'SPAN') {
			height += ignored.getBoundingClientRect().height;
			ignored = ignored.previousElementSibling;
		}
		height += ignored.getBoundingClientRect().height;
		if (offset !== height) {
			setOffset(height);
		}
	});

	return <NavigatorElementChildrenTreeLine offset={offset} ref={ref}/>;
};
export const DialogNavigatorElementChildren = (props: DialogNavigatorElementProps) => {
	const {element, model, level, last} = props;

	if (element.children == null || element.children.length === 0) {
		return null;
	}

	return <NavigatorElementChildren>
		{element.children
			.map((child, index, children) => {
				return <DialogNavigatorElement element={child} model={model}
				                               level={level + 1} last={[...last, index === children.length - 1]}
				                               key={child.code}/>;
			})}
		<DialogNavigatorElementChildrenTreeLine/>
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
