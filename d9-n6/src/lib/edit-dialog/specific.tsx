import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {ElementHelp} from '../icons';
import {Labels} from '../labels';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {HelpDoc} from './help-doc';
import {useElementVisible} from './hooks';
import {useElementValueChangeBy} from './hooks/use-element-changed-by';
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
	const {anchor, label, editor: Editor, helpDoc, group} = element;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useEditDialogEventBus();
	const [showHelp, setShowHelp] = useState(false);
	useElementValueChangeBy(element);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onLocateElement = (anchorToLocate: string) => {
			if (anchor !== anchorToLocate) {
				return;
			}
			if (ref.current != null) {
				ref.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
			}
		};
		on(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
		return () => {
			off(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
		};
	}, [on, off, anchor]);

	const onHelpBadgeClicked = () => setShowHelp(!showHelp);
	const onValueChanged = () => {
		forceUpdate();
		fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor);
	};

	const hasHelpDoc = VUtils.isNotBlank(helpDoc);

	return <>
		<SpecificElementLabel data-group={group} ref={ref}>
			<span>{label}</span>
			{hasHelpDoc
				? <SpecificElementHelpBadge data-visible={true} onClick={onHelpBadgeClicked}>
					<ElementHelp/>
				</SpecificElementHelpBadge>
				: null}
		</SpecificElementLabel>
		{Editor != null ? <Editor model={model} onValueChanged={onValueChanged}/> : <SpecificElementEditorPlaceholder/>}
		{hasHelpDoc
			? <SpecificElementHelpDoc data-visible={showHelp}>
				<HelpDoc content={helpDoc}/>
			</SpecificElementHelpDoc>
			: <SpecificElementHelpDoc/>}
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
