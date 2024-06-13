import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {ElementHelp} from '../icons';
import {Labels} from '../labels';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {HelpDoc} from './help-doc';
import {useElementVisible} from './hooks';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	EditDialogSpecificDetailsContainer,
	SpecificElementEditorPlaceholder,
	SpecificElementHelpBadge,
	SpecificElementHelpDoc,
	SpecificElementLabel,
	SpecificElementsContainer
} from './widgets';

export interface DialogSpecificElementProps {
	element: ConfigurableElement;
	model: ConfigurableModel;
}

export const DialogSpecificElementWrapper = (props: DialogSpecificElementProps) => {
	const {element, model} = props;
	const {anchor, label, editor, helpDoc} = element;

	const {fire} = useEditDialogEventBus();
	const [showHelp, setShowHelp] = useState(false);
	const forceUpdate = useForceUpdate();

	const onHelpBadgeClicked = () => setShowHelp(!showHelp);
	const onValueChanged = () => {
		forceUpdate();
		fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor);
	};

	const hasHelpDoc = VUtils.isNotBlank(helpDoc);

	return <>
		<SpecificElementLabel>
			<span>{label}</span>
			{hasHelpDoc
				? <SpecificElementHelpBadge data-visible={true} onClick={onHelpBadgeClicked}>
					<ElementHelp/>
				</SpecificElementHelpBadge>
				: null}
		</SpecificElementLabel>
		{editor != null ? editor(model, onValueChanged) : <SpecificElementEditorPlaceholder/>}
		{hasHelpDoc
			? <SpecificElementHelpDoc data-visible={showHelp}>
				<HelpDoc content={helpDoc}/>
			</SpecificElementHelpDoc>
			: null}
	</>;
};
export const DialogSpecificElement = (props: DialogSpecificElementProps) => {
	const {element, model} = props;

	const visible = useElementVisible(element, model);
	if (!visible) {
		return null;
	}

	return <>
		<DialogSpecificElementWrapper {...props}/>
		{element.children != null
			? element.children
				.map((child) => {
					return <DialogSpecificElement element={child} model={model} key={child.code}/>;
				})
			: null}
	</>;
};

export interface DialogSpecificProps {
	elements: Array<ConfigurableElement>;
	model: ConfigurableModel;
}

export const DialogSpecificElements = (props: DialogSpecificProps) => {
	const {elements, model} = props;

	return <SpecificElementsContainer>
		{elements
			.filter(element => element.visible == null || element.visible(model))
			.map((element) => {
				return <DialogSpecificElement element={element} model={model} key={element.code}/>;
			})}
	</SpecificElementsContainer>;
};

export const DialogSpecific = (props: DialogSpecificProps) => {
	return <EditDialogSpecificDetailsContainer>
		<EditDialogPartContent>
			<EditDialogPartHeader>
				<EditDialogPartTitle>{Labels.Specific}</EditDialogPartTitle>
			</EditDialogPartHeader>
			<EditDialogPartBody>
				<DialogSpecificElements {...props}/>
			</EditDialogPartBody>
		</EditDialogPartContent>
	</EditDialogSpecificDetailsContainer>;
};
