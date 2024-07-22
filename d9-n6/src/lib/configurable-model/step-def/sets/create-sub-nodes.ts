import {Undefinable} from '@rainbow-d9/n1';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';

export const createSubNodes: StepNodeConfigurer['createSubNodes'] =
	(model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
		return CommonStepDefs.createSetsLikeSubNodesAndEndNode(model, options);
	};
