import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LabelModel, LinkModel, PortModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {
	AnyErrorHandlePortFactory,
	CatchableErrorHandlePortFactory,
	EndOfMeJoinLinkFactory,
	ErrorHandlesLinkFactory,
	ExposedErrorHandlePortFactory,
	FirstSubStepPortFactory,
	LastSubStepJoinLinkFactory,
	LastSubStepJoinPortFactory,
	StepsLinkFactory,
	StepsPortFactory,
	UncatchableErrorHandlePortFactory
} from '../configurable-model';
import {NextStepPortFactory, PreviousStepPortFactory} from './common';
import {EndNodeFactory} from './end-node';
import {JoinEndNodeFactory} from './join-end-node';
import {HandledNodeModel} from './node-handlers';
import {StartNodeFactory} from './start-node';
import {StepNodeFactory} from './step-node';

export * from './common';
export * from './start-node';
export * from './step-node';
export * from './end-node';
export * from './join-end-node';

export * from './node-handlers';

export abstract class EnginePortFactory<M extends PortModel = PortModel> extends AbstractModelFactory<M, DiagramEngine> {
}

export abstract class EngineNodeFactory<M extends HandledNodeModel = HandledNodeModel> extends AbstractReactFactory<M, DiagramEngine> {
}

export abstract class EngineLinkFactory<M extends LinkModel = LinkModel> extends AbstractReactFactory<M, DiagramEngine> {
}

export abstract class EngineLabelFactory<M extends LabelModel = LabelModel> extends AbstractReactFactory<M, DiagramEngine> {
}

const Factories: {
	ports: Array<EnginePortFactory>, nodes: Array<EngineNodeFactory>,
	links: Array<EngineLinkFactory>, labels: Array<EngineLabelFactory>
} = {
	ports: [], nodes: [], links: [], labels: []
};

export const registerPortFactory = (...factories: Array<EnginePortFactory>) => {
	Factories.ports.push(...factories);
};
export const registerNodeFactory = (...factories: Array<EngineNodeFactory>) => {
	Factories.nodes.push(...factories);
};
export const registerLinkFactory = (...factories: Array<EngineLinkFactory>) => {
	Factories.links.push(...factories);
};
export const registerLabelFactory = (...factories: Array<EngineLabelFactory>) => {
	Factories.labels.push(...factories);
};

export const initEngine = (engine: DiagramEngine) => {
	const portFactories = engine.getPortFactories();
	portFactories.registerFactory(new NextStepPortFactory());
	portFactories.registerFactory(new PreviousStepPortFactory());
	portFactories.registerFactory(new StepsPortFactory());
	portFactories.registerFactory(new CatchableErrorHandlePortFactory());
	portFactories.registerFactory(new UncatchableErrorHandlePortFactory());
	portFactories.registerFactory(new ExposedErrorHandlePortFactory());
	portFactories.registerFactory(new AnyErrorHandlePortFactory());
	portFactories.registerFactory(new FirstSubStepPortFactory());
	portFactories.registerFactory(new LastSubStepJoinPortFactory());
	Factories.ports.forEach(factory => portFactories.registerFactory(factory));

	const nodeFactories = engine.getNodeFactories();
	nodeFactories.registerFactory(new StartNodeFactory());
	nodeFactories.registerFactory(new StepNodeFactory());
	nodeFactories.registerFactory(new EndNodeFactory());
	nodeFactories.registerFactory(new JoinEndNodeFactory());
	Factories.nodes.forEach(factory => nodeFactories.registerFactory(factory));

	const linkFactories = engine.getLinkFactories();
	linkFactories.registerFactory(new StepsLinkFactory());
	linkFactories.registerFactory(new ErrorHandlesLinkFactory());
	linkFactories.registerFactory(new EndOfMeJoinLinkFactory());
	linkFactories.registerFactory(new LastSubStepJoinLinkFactory());
	Factories.links.forEach(factory => linkFactories.registerFactory(factory));

	const labelFactories = engine.getLabelFactories();
	Factories.labels.forEach(factory => labelFactories.registerFactory(factory));
};
