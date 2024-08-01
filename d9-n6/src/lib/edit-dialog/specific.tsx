import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Collapse, ElementHelp, Expand} from '../icons';
import {Labels} from '../labels';
import {PlaygroundModuleAssistant} from '../types';
import {EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {HelpDoc} from './help-doc';
import {useElementVisible} from './hooks';
import {useElementValueChangeBy} from './hooks/use-element-changed-by';
import {
	DialogSpecificElementEventBusProvider,
	DialogSpecificElementEventTypes,
	useDialogSpecificElementEventBus
} from './specific-element-event-bus';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogPartBody,
	EditDialogPartContent,
	EditDialogPartHeader,
	EditDialogPartTitle,
	EditDialogSpecificDetailsContainer,
	SpecificElementBadge,
	SpecificElementEditorPlaceholder,
	SpecificElementGroupHeader,
	SpecificElementHelpDoc,
	SpecificElementLabel,
	SpecificElementsContainer
} from './widgets';

export interface DialogSpecificElementProps {
	element: ConfigurableElement;
	model: ConfigurableModel;
	visible: boolean;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface DialogSpecificElementWrapperProps extends DialogSpecificElementProps {
	askParentExpand: () => void;
}

export const DialogSpecificElementWrapper = (props: DialogSpecificElementWrapperProps) => {
	const {element, model, visible = true, assistant, askParentExpand} = props;
	const {
		anchor, label, editor: Editor, helpDoc,
		group, collapsible = false
	} = element;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useEditDialogEventBus();
	const {on: onElement, off: offElement, fire: fireElement} = useDialogSpecificElementEventBus();
	const [collapsed, setCollapsed] = useState(element.collapsed ?? false);
	const [showHelp, setShowHelp] = useState(false);
	useElementValueChangeBy(element);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onLocateElement = (anchorToLocate: string) => {
			if (anchor !== anchorToLocate) {
				return;
			}
			if (ref.current != null) {
				if (!visible) {
					askParentExpand();
				}
				setTimeout(() => {
					ref.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
				}, 30);
			}
		};
		on(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
		return () => {
			off(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
		};
	}, [on, off, fireElement, anchor, visible, askParentExpand]);
	useEffect(() => {
		const onAskExpand = () => {
			if (!visible) {
				askParentExpand();
			}
			setCollapsed(false);
			fireElement(DialogSpecificElementEventTypes.EXPAND);
		};
		onElement(DialogSpecificElementEventTypes.ASK_EXPAND, onAskExpand);
		return () => {
			offElement(DialogSpecificElementEventTypes.ASK_EXPAND, onAskExpand);
		};
	}, [onElement, offElement, fireElement, visible, askParentExpand]);

	const onHelpBadgeClicked = () => setShowHelp(!showHelp);
	const onExpandClicked = () => {
		setCollapsed(!collapsed);
		fireElement(DialogSpecificElementEventTypes.EXPAND);
	};
	const onCollapseClicked = () => {
		setCollapsed(!collapsed);
		fireElement(DialogSpecificElementEventTypes.COLLAPSE);
	};
	const onValueChanged = (repaint = true) => {
		if (repaint) {
			forceUpdate();
		}
		fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor);
	};

	const hasHelpDoc = VUtils.isNotBlank(helpDoc);

	return <>
		<SpecificElementLabel data-group={group} data-visible={visible} ref={ref}>
			<span>{label}</span>
			{hasHelpDoc
				? <SpecificElementBadge onClick={onHelpBadgeClicked} data-role="help">
					<ElementHelp/>
				</SpecificElementBadge>
				: null}
		</SpecificElementLabel>
		{(group && collapsible)
			? <SpecificElementGroupHeader data-visible={visible}>
				{collapsed
					? <SpecificElementBadge onClick={onExpandClicked} data-role="expand">
						<Expand/>
					</SpecificElementBadge>
					: <SpecificElementBadge onClick={onCollapseClicked} data-role="collapse">
						<Collapse/>
					</SpecificElementBadge>}
			</SpecificElementGroupHeader>
			: null}
		{(group && !collapsible)
			? <SpecificElementEditorPlaceholder data-visible={visible}/>
			: null}
		{(!group && Editor != null)
			? <Editor model={model} onValueChanged={onValueChanged} assistant={assistant}/>
			: null}
		{hasHelpDoc
			? <SpecificElementHelpDoc data-visible={visible && showHelp}>
				<HelpDoc content={helpDoc}/>
			</SpecificElementHelpDoc>
			: null}
	</>;
};

export const DialogSpecificElementInitExpand = (props: { element: ConfigurableElement }) => {
	const {element} = props;
	const {fire} = useDialogSpecificElementEventBus();
	useEffect(() => {
		// only once
		if (element.group !== true || element.collapsible !== true || element.collapsed !== true) {
			// init collapse only works when it is a group, collapsible and defined as initial collapse
			return;
		}
		fire(DialogSpecificElementEventTypes.COLLAPSE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Fragment/>;
};

export const DialogSpecificElement = (props: DialogSpecificElementProps) => {
	const {element, model, assistant} = props;

	const {on, off, fire} = useDialogSpecificElementEventBus();
	const [visible, setVisible] = useState(props.visible ?? true);
	useEffect(() => {
		const onExpand = () => setVisible(true);
		const onCollapse = () => setVisible(false);
		on && on(DialogSpecificElementEventTypes.EXPAND, onExpand);
		on && on(DialogSpecificElementEventTypes.COLLAPSE, onCollapse);
		return () => {
			off && off(DialogSpecificElementEventTypes.EXPAND, onExpand);
			off && off(DialogSpecificElementEventTypes.COLLAPSE, onCollapse);
		};
	}, [on, off]);
	const elementVisible = useElementVisible(element, model);
	if (!elementVisible) {
		return null;
	}

	const askParentExpand = () => fire(DialogSpecificElementEventTypes.ASK_EXPAND);

	return <DialogSpecificElementEventBusProvider>
		<DialogSpecificElementWrapper {...props} visible={visible} askParentExpand={askParentExpand}/>
		{element.children != null
			? element.children
				.map((child) => {
					return <DialogSpecificElement element={child} model={model} visible={visible}
					                              assistant={assistant}
					                              key={child.code}/>;
				})
			: null}
		<DialogSpecificElementInitExpand element={element}/>
	</DialogSpecificElementEventBusProvider>;
};

export interface DialogSpecificProps {
	elements: Array<ConfigurableElement>;
	model: ConfigurableModel;
	assistant: Required<PlaygroundModuleAssistant>;
}

export const DialogSpecificElements = (props: DialogSpecificProps) => {
	const {elements, model, assistant} = props;

	return <SpecificElementsContainer>
		{elements
			.map((element) => {
				// top level, always visible
				return <DialogSpecificElement element={element} model={model} visible={true}
				                              assistant={assistant}
				                              key={element.code}/>;
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
