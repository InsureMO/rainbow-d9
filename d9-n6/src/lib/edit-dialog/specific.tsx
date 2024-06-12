import {VUtils} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {ElementHelp} from '../icons';
import {Labels} from '../labels';
import {HelpDoc} from './help-doc';
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
	const {label, editor, helpDoc} = element;

	// const labelRef = useRef<HTMLDivElement>(null);
	const [showHelp, setShowHelp] = useState(false);
	// const [showHelpBadge, setShowHelpBadge] = useState(false);
	// useEffect(() => {
	// 	if (labelRef.current == null) {
	// 		return;
	// 	}
	// 	const label = labelRef.current;
	// 	const onMouseEnter = () => setShowHelpBadge(true);
	// 	const onMouseLeave = () => setShowHelpBadge(false);
	// 	const attachedElements: Array<HTMLElement> = [label];
	// 	label.addEventListener('mouseenter', onMouseEnter);
	// 	label.addEventListener('mouseleave', onMouseLeave);
	// 	let next = label.nextElementSibling as HTMLElement;
	// 	while (next != null && next.getAttribute('data-w') !== 'o23-playground-edit-dialog-specific-element-label') {
	// 		next.addEventListener('mouseenter', onMouseEnter);
	// 		next.addEventListener('mouseleave', onMouseLeave);
	// 		next = next.nextElementSibling as HTMLElement;
	// 	}
	// 	return () => {
	// 		attachedElements.forEach(element => {
	// 			element.removeEventListener('mouseenter', onMouseEnter);
	// 			element.removeEventListener('mouseleave', onMouseLeave);
	// 		});
	// 	};
	// });
	const onHelpBadgeClicked = () => setShowHelp(!showHelp);

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
		{editor != null ? editor(model) : <SpecificElementEditorPlaceholder/>}
		{hasHelpDoc
			? <SpecificElementHelpDoc data-visible={showHelp}>
				<HelpDoc content={helpDoc}/>
			</SpecificElementHelpDoc>
			: null}
	</>;
};
export const DialogSpecificElement = (props: DialogSpecificElementProps) => {
	const {element, model} = props;

	return <>
		<DialogSpecificElementWrapper {...props}/>
		{element.children != null
			? element.children
				.filter(element => element.visible == null || element.visible(model))
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
