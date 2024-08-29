import {DiagramEngine} from '@projectstorm/react-diagrams';
import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {MouseEvent, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {
	findStepDef,
	FirstSubStepPortModel,
	FirstSubStepPortWidget,
	reconfigureStepDefOperators
} from '../../configurable-model';
import {PipelineStepDef} from '../../definition';
import {StepDialogContent} from '../../edit-dialog';
import {InsertRoute, InsertStep, Otherwise, RemoveRoute, RemoveStep} from '../../icons';
import {askUseBadge, Labels} from '../../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../../playground-event-bus';
import {PlaygroundCssVars} from '../../widgets';
import {
	NextStepPortModel,
	NextStepPortWidget,
	NodeBody,
	NodeHeader,
	NodeSecondTitle,
	NodeTitle,
	NodeTitleSpreader,
	NodeWrapper,
	PreviousStepPortModel,
	PreviousStepPortWidget
} from '../common';
import {StepNodeModel} from './node-model';

export interface StepNodeWidgetProps {
	// node and engine props are required
	node: StepNodeModel;
	engine: DiagramEngine;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StepNodeContainer = styled(NodeWrapper).attrs(
	({'data-use': use}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-step-node',
			style: {
				'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
				'--border': PlaygroundCssVars[`NODE_STEP_${(use ?? '').trim().toUpperCase().replace(/-/g, '_')}_BORDER`] ?? PlaygroundCssVars.NODE_STEP_BORDER,
				'--background-color': PlaygroundCssVars.NODE_BACKGROUND
			}
		};
	})`
    &:hover {
        > div[data-w=o23-playground-step-node-operators] {
            opacity: 1;
            pointer-events: auto;
        }
    }
`;
export const StepNodeHeader = styled(NodeHeader).attrs<{ 'data-use'?: string }>(
	({'data-use': use}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-step-node-header',
			style: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
				'--background': PlaygroundCssVars[`NODE_STEP_${(use ?? '').trim().toUpperCase().replace(/-/g, '_')}_TITLE_BACKGROUND`] ?? PlaygroundCssVars.NODE_STEP_TITLE_BACKGROUND,
				'--padding': PlaygroundCssVars.NODE_TITLE_PADDING
			}
		};
	})``;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StepNodeTitle = styled(NodeTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_STEP_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_STEP_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_STEP_TITLE_FONT_WEIGHT
	}
})``;
export const StepNodeSecondTitle = styled(NodeSecondTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-second-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT
	}
})`
    &:before, &:after {
        display: inline-block;
        position: relative;
        margin-top: 3px;
    }

    &:before {
        content: '〔';
        margin-right: 2px;
    }

    &:after {
        content: '〕';
        margin-left: 2px;
    }
`;
export const StepNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_STEP_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_STEP_BODY_PADDING
	}
})`
`;
// noinspection CssUnresolvedCustomProperty
export const StepNodeOperators = styled.div.attrs<{ position: 'top' | 'bottom' }>(
	({position}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-step-node-operators',
			style: {
				'--top': position === 'top' ? `calc(-1 * ${PlaygroundCssVars.NODE_STEP_OPERATORS_HEIGHT})` : '100%',
				'--align-items': position === 'top' ? 'flex-start' : 'flex-end'
			}
		};
	})<{ position: 'top' | 'bottom' }>`
    display: flex;
    position: absolute;
    top: var(--top);
    left: 0;
    width: 100%;
    height: ${PlaygroundCssVars.NODE_STEP_OPERATORS_HEIGHT};
    align-items: var(--align-items);
    cursor: default;
    opacity: 0;
    pointer-events: none;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    > span {
        flex-grow: 1;
    }
`;
export const StepNodeOperator = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-step-node-operator'})`
    display: flex;
    position: relative;
    align-items: center;
    height: ${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT};
    padding-left: calc(${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT} * 0.3);
    padding-right: calc(${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT} * 0.3);
    color: ${PlaygroundCssVars.NODE_STEP_OPERATOR_COLOR};
    border: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;

    &[data-insert-step] {
        border-top-right-radius: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER_RADIUS};
        border-bottom-right-radius: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER_RADIUS};
    }

    &[data-remove-route],
    &[data-remove-otherwise],
    &[data-remove-step] {
        color: ${PlaygroundCssVars.NODE_STEP_OPERATOR_DANGER_COLOR};
        border-radius: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER_RADIUS};
        border-color: ${PlaygroundCssVars.NODE_STEP_OPERATOR_DANGER_COLOR};
    }

    &[data-remove-route]:not(:last-child),
    &[data-remove-otherwise]:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        + div[data-w=o23-playground-step-node-operator] {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }

    &:first-child {
        border-top-left-radius: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER_RADIUS};
        border-bottom-left-radius: ${PlaygroundCssVars.NODE_STEP_OPERATOR_BORDER_RADIUS};
    }

    &:hover {
        color: ${CssVars.INVERT_COLOR};
        background-color: ${PlaygroundCssVars.NODE_STEP_OPERATOR_COLOR};;
        z-index: 1;

        &[data-remove-route],
        &[data-remove-otherwise],
        &[data-remove-step] {
            background-color: ${PlaygroundCssVars.NODE_STEP_OPERATOR_DANGER_COLOR};
        }

        > svg {
            margin-right: calc(${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT} * 0.3);
        }

        > span {
            width: auto;
        }
    }

    > svg {
        height: calc(${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT} * 0.6);
        width: calc(${PlaygroundCssVars.NODE_STEP_OPERATOR_HEIGHT} * 0.6);
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        width: 0;
        white-space: nowrap;
        overflow: hidden;
    }

    + div[data-w=o23-playground-step-node-operator] {
        margin-left: -1px;
    }
`;

export const StepNodeWidget = (props: StepNodeWidgetProps) => {
	const {node, engine} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = usePlaygroundEventBus();
	useEffect(() => {
		const onLocate = (step: PipelineStepDef) => {
			if (node.step !== step) {
				return;
			}
			if (ref.current?.closest('div.o23-playground-editor-content') != null) {
				// since there is an editor-content-backend
				ref.current?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
			}
		};
		on(PlaygroundEventTypes.DO_LOCATE_STEP_NODE, onLocate);
		return () => {
			off(PlaygroundEventTypes.DO_LOCATE_STEP_NODE, onLocate);
		};
	}, [on, off, node.step]);

	const {step: def, file} = node;
	const {use} = def;
	const StepDefs = findStepDef(use);

	const onDoubleClicked = () => {
		fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, <StepDialogContent model={node}/>);
	};
	const onOperatorsClicked = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const operators = reconfigureStepDefOperators(StepDefs.operators, node)(node, def);
	const onPrependStepClicked = () => {
		operators.prependStep?.(node, def);
	};
	const onAppendStepClicked = () => {
		operators.appendStep?.(node, def);
	};
	const onRemoveStepClicked = () => {
		operators.remove?.(node, def);
	};
	const onPrependRouteClicked = () => {
		operators.prependRoute?.(node, def);
	};
	const onAppendRouteClicked = () => {
		operators.appendRoute?.(node, def);
	};
	const onRemoveRouteClicked = () => {
		operators.removeRoute?.(node, def);
	};
	const onAddOtherwiseClicked = () => {
		operators.addOtherwise?.(node, def);
	};
	const onRemoveOtherwiseClicked = () => {
		operators.removeOtherwise?.(node, def);
	};

	const name = (def.name ?? '').trim() || Labels.StepNodeNoname;
	const isFirstSubStep = node.isFirstSubStep();
	const canPrependStep = operators.prependStep != null;
	const canAppendStep = operators.appendStep != null;
	const canRemoveStep = operators.remove != null;
	const canPrependRoute = operators.prependRoute != null;
	const canAppendRoute = operators.appendRoute != null;
	const canRemoveRoute = operators.removeRoute != null;
	const canAddOtherwise = operators.addOtherwise != null;
	const canRemoveOtherwise = operators.removeOtherwise != null;

	return <StepNodeContainer onDoubleClick={onDoubleClicked} data-use={use} ref={ref}>
		{isFirstSubStep
			? <FirstSubStepPortWidget port={node.getPort(FirstSubStepPortModel.NAME) as FirstSubStepPortModel}
			                          engine={engine}/>
			: <PreviousStepPortWidget port={node.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel}
			                          engine={engine}/>}
		<StepNodeHeader data-use={use}>
			<StepNodeTitle>{name}</StepNodeTitle>
			<NodeTitleSpreader/>
			<StepNodeSecondTitle>{askUseBadge(use)}</StepNodeSecondTitle>
		</StepNodeHeader>
		<StepNodeBody data-use={use}>
			{StepDefs.ports.map(({key, port: StepPort}) => {
				return <StepPort step={def} file={file} node={node} engine={engine} key={key}/>;
			})}
		</StepNodeBody>
		<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
		<StepNodeOperators position="top" onClick={onOperatorsClicked} onDoubleClick={onOperatorsClicked}>
			{canPrependRoute ? <StepNodeOperator data-insert-route onClick={onPrependRouteClicked}>
				<InsertRoute/>
				<span>{Labels.PrependRoute}</span>
			</StepNodeOperator> : null}
			{canPrependStep ? <StepNodeOperator data-insert-step onClick={onPrependStepClicked}>
				<InsertStep/>
				<span>{Labels.PrependStep}</span>
			</StepNodeOperator> : null}
			<span/>
			{canRemoveRoute ? <StepNodeOperator data-remove-route onClick={onRemoveRouteClicked}>
				<RemoveRoute/>
				<span>{Labels.RemoveRoute}</span>
			</StepNodeOperator> : null}
			{canRemoveOtherwise ? <StepNodeOperator data-remove-otherwise onClick={onRemoveOtherwiseClicked}>
				<RemoveRoute/>
				<span>{Labels.RemoveOtherwise}</span>
			</StepNodeOperator> : null}
			{canRemoveStep ? <StepNodeOperator data-remove-step onClick={onRemoveStepClicked}>
				<RemoveStep/>
				<span>{Labels.RemoveStep}</span>
			</StepNodeOperator> : null}
		</StepNodeOperators>
		<StepNodeOperators position="bottom">
			{canAppendRoute ? <StepNodeOperator data-insert-route onClick={onAppendRouteClicked}>
				<InsertRoute/>
				<span>{Labels.AppendRoute}</span>
			</StepNodeOperator> : null}
			{canAddOtherwise ? <StepNodeOperator data-add-otherwise onClick={onAddOtherwiseClicked}>
				<Otherwise/>
				<span>{Labels.AddOtherwise}</span>
			</StepNodeOperator> : null}
			{canAppendStep ? <StepNodeOperator data-insert-step onClick={onAppendStepClicked}>
				<InsertStep/>
				<span>{Labels.AppendStep}</span>
			</StepNodeOperator> : null}
		</StepNodeOperators>
	</StepNodeContainer>;
};
