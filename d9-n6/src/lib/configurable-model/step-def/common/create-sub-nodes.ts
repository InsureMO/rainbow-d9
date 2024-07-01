import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {AllInPipelineStepDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, JoinEndNodeModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions} from '../../types';
import {
	AnyErrorHandlePortModel,
	CatchableErrorHandlePortModel,
	ExposedErrorHandlePortModel,
	UncatchableErrorHandlePortModel
} from './port-widgets';
import {CommonStepDefsType, CreateSubNodesAndEndNodeOptions} from './types';
import {createSubNodesOfSingleRoute} from './utils';

export const createSubNodes: CommonStepDefsType['createSubNodes'] = (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
	const step = model.step as AllInPipelineStepDef;
	// error handles
	const errorHandles = step.errorHandles;
	if (errorHandles == null) {
		return (void 0);
	}

	const createAskSteps = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any'): (() => Undefinable<Array<PipelineStepDef>>) => {
		return (): Undefinable<Array<PipelineStepDef>> => {
			if (errorHandles[name] == null || !Array.isArray(errorHandles[name])) {
				return (void 0);
			}
			if (errorHandles[name].length === 0) {
				// create a default snippet step
				const defaultFirstStep: PipelineStepDef = DEFAULTS.createDefaultStep();
				(errorHandles[name] as Array<PipelineStepDef>).push(defaultFirstStep);
			}
			return errorHandles[name] as Array<PipelineStepDef>;
		};
	};
	return [
		{
			steps: createAskSteps('catchable'),
			findPortFromModel: () => model.getPort(CatchableErrorHandlePortModel.NAME) as CatchableErrorHandlePortModel,
			createPortFromModel: () => new CatchableErrorHandlePortModel()
		},
		{
			steps: createAskSteps('uncatchable'),
			findPortFromModel: () => model.getPort(UncatchableErrorHandlePortModel.NAME) as UncatchableErrorHandlePortModel,
			createPortFromModel: () => new UncatchableErrorHandlePortModel()
		},
		{
			steps: createAskSteps('exposed'),
			findPortFromModel: () => model.getPort(ExposedErrorHandlePortModel.NAME) as ExposedErrorHandlePortModel,
			createPortFromModel: () => new ExposedErrorHandlePortModel()
		},
		{
			steps: createAskSteps('any'),
			findPortFromModel: () => model.getPort(AnyErrorHandlePortModel.NAME) as AnyErrorHandlePortModel,
			createPortFromModel: () => new AnyErrorHandlePortModel()
		}
	].filter(({steps, ...rest}) => {
		return {steps: steps(), ...rest};
	}).filter(({steps}) => {
		return steps != null;
	}).map(({steps, findPortFromModel, createPortFromModel}) => {
		return createSubNodesOfSingleRoute({
			model, options, askSteps: steps, findPortFromModel, createPortFromModel
		});
	});
};

/**
 * include both common sub nodes and specific sub nodes
 */
export const createSubNodesAndEndNode: CommonStepDefsType['createSubNodesAndEndNode'] = (
	model: StepNodeModel, options: CreateSubNodesAndEndNodeOptions): Undefinable<HandledNodeModel> => {
	const {appendNode, appendLink, handlers, createSpecificSubNodes} = options;

	const step = model.step as AllInPipelineStepDef;
	const commonSubNodes = createSubNodes(model, options);
	const specificSubNodes = createSpecificSubNodes?.(model, options);
	const subNodes = [...(commonSubNodes ?? []), ...(specificSubNodes ?? [])];
	if (subNodes.length === 0) {
		// no sub nodes, no end node
		return (void 0);
	}

	// now create an end node for end sub nodes
	const endNode = new JoinEndNodeModel(step, model.file, {type: StepNodeEntityType.JOIN_END, subOf: step, handlers});
	appendNode(endNode);
	subNodes.forEach(node => {
		const link = endNode.endOf(node);
		appendLink(link);
	});
	const directLink = model.next(endNode);
	appendLink(directLink);

	return endNode;
};
