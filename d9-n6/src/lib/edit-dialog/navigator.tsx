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
	NavigatorConfigurableElementTreeLine,
	NavigatorDialogNavigatorElementsContainer
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
		<NavigatorConfigurableElementContainer level={level}>
			{level !== 0 // level starts from 0
				? new Array(level + 1).fill(1).map((_, index) => {
					// first level node doesn't need tree line
					// last level node always needs tree line
					// other levels depend on whether is the last node of the ancestor level
					return index !== 0
						? <NavigatorConfigurableElementTreeLine level={index}
						                                        data-last-node={last[index]}
						                                        data-last-level={index === level}
						                                        key={index}/>
						: null;
				})
				: null}
			<NavigatorConfigurableElementLabel level={level}>{label}</NavigatorConfigurableElementLabel>
			{badge != null
				? <NavigatorConfigurableElementBadge>{badge(model)}</NavigatorConfigurableElementBadge>
				: null}
		</NavigatorConfigurableElementContainer>
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

	return <NavigatorDialogNavigatorElementsContainer>
		{elements
			.filter(element => element.visible == null || element.visible(model))
			.map((element, index, elements) => {
			return <DialogNavigatorElement element={element} model={model}
			                               level={0}
			                               last={[index === elements.length - 1]}
			                               key={element.code}/>;
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
