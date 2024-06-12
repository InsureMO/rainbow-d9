import React from 'react';
import {Labels} from '../labels';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogNavigatorContainer,
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	NavigatorElementBadge,
	NavigatorElementContainer,
	NavigatorElementLabel,
	NavigatorElementsContainer,
	NavigatorElementTreeLine
} from './widgets';

export interface DialogNavigatorElementProps {
	element: ConfigurableElement;
	model: ConfigurableModel;
	level: number;
	last: Array<boolean>;
}

export const DialogNavigatorElement = (props: DialogNavigatorElementProps) => {
	const {element, model, level, last} = props;
	const {label, badge} = element;

	return <>
		<NavigatorElementContainer level={level}>
			{level !== 0 // level starts from 0
				? new Array(level + 1).fill(1).map((_, index) => {
					// first level node doesn't need tree line
					// last level node always needs tree line
					// other levels depend on whether is the last node of the ancestor level
					return index !== 0
						? <NavigatorElementTreeLine level={index}
						                            data-last-node={last[index]}
						                            data-last-level={index === level}
						                            key={index}/>
						: null;
				})
				: null}
			<NavigatorElementLabel level={level}>{label}</NavigatorElementLabel>
			{badge != null
				? <NavigatorElementBadge>{badge(model)}</NavigatorElementBadge>
				: null}
		</NavigatorElementContainer>
		{element.children != null
			? element.children
				.filter(element => element.visible == null || element.visible(model))
				.map((child, index, children) => {
					return <DialogNavigatorElement element={child} model={model}
					                               level={level + 1} last={[...last, index === children.length - 1]}
					                               key={child.code}/>;
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

	return <NavigatorElementsContainer>
		{elements
			.filter(element => element.visible == null || element.visible(model))
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
