import {Undefinable, useForceUpdate, useThrottler} from '@rainbow-d9/n1';
import React, {Fragment, ReactNode, useEffect, useRef, useState} from 'react';
import {ConfigChangesConfirmed, findStepDef, StepNodeConfigurer} from '../configurable-model';
import {PipelineStepDef} from '../definition';
import {StepNodeModel} from '../diagram';
import {Accept, Back} from '../icons';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {MarkdownContent, PlaygroundModuleAssistant} from '../types';
import {EditDialogEventBusProvider, EditDialogEventTypes, useEditDialogEventBus} from './edit-dialog-event-bus';
import {DialogHelpDesk} from './help-desk';
import {LayoutController} from './layout-controller';
import {DialogNavigator} from './navigator';
import {DialogSpecific} from './specific';
import {StateHolder} from './state-holder';
import {ConfigurableElement, ConfigurableModel} from './types';
import {
	EditDialogContentContainer,
	EditDialogContentInitializer,
	EditorDialogCloseButton,
	EditorDialogCloser
} from './widgets';

export const DialogContentInitializer = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const container = ref.current.previousElementSibling;
		const {width} = container.getBoundingClientRect();
		fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width);

		const observer = new ResizeObserver(() => {
			replace(() => {
				fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, container.getBoundingClientRect().width);
			}, 30);
		});
		observer.observe(container);
		return () => {
			observer.disconnect();
		};
	}, [fire, replace]);

	return <EditDialogContentInitializer ref={ref}/>;
};

export interface DialogWorkAreaProps {
	helpDoc: MarkdownContent;
	elements: Array<ConfigurableElement>;
	/**
	 * write back.
	 * return anchor of first invalid element if there is any validation failure.
	 * or returns undefined means successfully pass all validations, data was written back.
	 */
	confirm: (model: ConfigurableModel) => ConfigChangesConfirmed;
	/** discard change */
	discard: (model: ConfigurableModel) => void;
	model: ConfigurableModel;
	assistant: Required<PlaygroundModuleAssistant>;
}

export const DialogWorkArea = (props: DialogWorkAreaProps) => {
	const {helpDoc, elements, confirm, discard, model, assistant} = props;

	const {fire} = usePlaygroundEventBus();
	const {fire: fireDialog} = useEditDialogEventBus();

	const onConfirmClicked = () => {
		const anchors = confirm(model);
		if (anchors === true) {
			fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
		} else {
			//TODO TO SHOW ERROR MESSAGES FOR EACH INCORRECT ELEMENT
			//  AND FIGURE OUT THE FIRST INCORRECT ONE TO LOCATE
			fireDialog(EditDialogEventTypes.LOCATE_ELEMENT, anchors[0]);
		}
	};
	const onDiscardClicked = () => {
		discard(model);
		fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
	};

	return <EditDialogContentContainer>
		<EditorDialogCloser>
			<EditorDialogCloseButton data-role="confirm" onClick={onConfirmClicked}>
				<Accept/>
				{Labels.ConfirmContent}
			</EditorDialogCloseButton>
			<EditorDialogCloseButton data-role="discard" onClick={onDiscardClicked}>
				<Back/>
				{Labels.DiscardContent}
			</EditorDialogCloseButton>
		</EditorDialogCloser>
		<DialogHelpDesk helpDoc={helpDoc}/>
		<DialogSpecific elements={elements} model={model} assistant={assistant}/>
		<DialogNavigator elements={elements} model={model}/>
	</EditDialogContentContainer>;

};

export interface DialogContentProps {
	model: ConfigurableModel;
	helpDoc: MarkdownContent;
	elements: Array<ConfigurableElement>;
	/** write back, true means successfully */
	confirm: (model: ConfigurableModel) => ConfigChangesConfirmed;
	/** discard change */
	discard: (model: ConfigurableModel) => void;
	assistant: Required<PlaygroundModuleAssistant>;
	children?: ReactNode;
}

export interface DialogContentState {
	model: ConfigurableModel;
}

export const DialogContent = (props: DialogContentProps) => {
	const {
		model,
		helpDoc, elements,
		confirm, discard, assistant,
		children
	} = props;

	const [state] = useState<DialogContentState>({model});

	return <EditDialogEventBusProvider>
		{children}
		<StateHolder/>
		<LayoutController/>
		<DialogWorkArea helpDoc={helpDoc} elements={elements} confirm={confirm} discard={discard} model={state.model}
		                assistant={assistant}/>
		<DialogContentInitializer/>
	</EditDialogEventBusProvider>;
};

export const StepUseHandler = (props: { repaint: () => void }) => {
	const {repaint} = props;

	const {on, off} = useEditDialogEventBus();
	useEffect(() => {
		const onElementValueChanged = (anchor: string) => {
			if (anchor === 'use') {
				repaint();
			}
		};
		on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		return () => {
			off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		};
	}, [on, off, repaint]);

	return <Fragment/>;
};

/**
 * for all reconfigure functions, return null/undefined means no change, return a value means change.
 * the first returns not null/undefined is efficient.
 */
export interface StepDefsReconfigurer {
	prepare: (prepare: StepNodeConfigurer['prepare'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['prepare']>;
	confirm: (confirm: StepNodeConfigurer['confirm'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['confirm']>;
	discard?: (discard: StepNodeConfigurer['discard'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['discard']>;
	properties: (properties: Array<ConfigurableElement>, model: StepNodeModel) => Undefinable<Array<ConfigurableElement>>;
}

const StepDefsReconfigurers: Array<StepDefsReconfigurer> = [];
export const registerStepDefsReconfigurers = (...configurers: Array<StepDefsReconfigurer>) => {
	(configurers || []).forEach(configurer => {
		if (!StepDefsReconfigurers.includes(configurer)) {
			StepDefsReconfigurers.push(configurer);
		}
	});
};

const reconfigureStepDefProperties = (properties: Array<ConfigurableElement>, model: StepNodeModel): Array<ConfigurableElement> => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.properties(properties, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return properties;
};
const reconfigureStepDefPrepare = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(prepare: StepNodeConfigurer<F, M>['prepare'], model: StepNodeModel): StepNodeConfigurer<F, M>['prepare'] => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.prepare(prepare, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return prepare;
};
const reconfigureStepDefConfirm = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(confirm: StepNodeConfigurer<F, M>['confirm'], model: StepNodeModel): StepNodeConfigurer<F, M>['confirm'] => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.confirm(confirm, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return confirm;
};
const reconfigureStepDefDiscard = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(discard: StepNodeConfigurer<F, M>['discard'], model: StepNodeModel): StepNodeConfigurer<F, M>['discard'] => {
	for (const reconfigurer of StepDefsReconfigurers) {
		if (reconfigurer.discard != null) {
			const reconfigured = reconfigurer.discard(discard, model);
			if (reconfigured != null) {
				return reconfigured;
			}
		}
	}
	return discard;
};

export const StepDialogContent = (props: { model: StepNodeModel }) => {
	const {model: nodeModel} = props;

	const {step: def, file} = nodeModel;
	// create a configurable model from step def, and put into state
	const [configurableModel] = useState<ConfigurableModel>(reconfigureStepDefPrepare(findStepDef(def.use).prepare, nodeModel)(def));
	const forceUpdate = useForceUpdate();

	// find step defs for editing
	const {use} = configurableModel;
	const StepDefs = findStepDef(use);

	const onConfirm = (model: ConfigurableModel) => {
		return reconfigureStepDefConfirm(StepDefs.confirm, nodeModel)(model, def, file, {
			handlers: nodeModel.handlers, assistant: nodeModel.assistant
		});
	};
	const onDiscard = (model: ConfigurableModel) => {
		reconfigureStepDefDiscard(StepDefs.discard, nodeModel)(model);
	};
	const elements = reconfigureStepDefProperties(StepDefs.properties, nodeModel);

	return <DialogContent model={configurableModel}
	                      helpDoc={StepDefs.helpDocs} elements={elements}
	                      confirm={onConfirm} discard={onDiscard}
	                      assistant={nodeModel.assistant}>
		<StepUseHandler repaint={forceUpdate}/>
	</DialogContent>;
};
