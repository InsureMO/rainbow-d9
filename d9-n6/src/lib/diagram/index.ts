import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
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

const Factories: { ports: Array<EnginePortFactory>, nodes: Array<EngineNodeFactory> } = {
	ports: [],
	nodes: []
};

export const registerPortFactory = (...factories: Array<EnginePortFactory>) => {
	Factories.ports.push(...factories);
};
export const registerNodeFactory = (...factories: Array<EngineNodeFactory>) => {
	Factories.nodes.push(...factories);
};

export const initEngine = (engine: DiagramEngine) => {
	const portFactories = engine.getPortFactories();
	portFactories.registerFactory(new NextStepPortFactory());
	portFactories.registerFactory(new PreviousStepPortFactory());
	Factories.ports.forEach(factory => portFactories.registerFactory(factory));

	const nodeFactories = engine.getNodeFactories();
	nodeFactories.registerFactory(new StartNodeFactory());
	nodeFactories.registerFactory(new StepNodeFactory());
	nodeFactories.registerFactory(new EndNodeFactory());
	nodeFactories.registerFactory(new JoinEndNodeFactory());
	Factories.nodes.forEach(factory => nodeFactories.registerFactory(factory));
};
