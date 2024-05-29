import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {NextStepPortFactory, PreviousStepPortFactory} from './common';
import {EndNodeFactory} from './end-node';
import {StartNodeFactory} from './start-node';

export * from './common';
export * from './start-node';
export * from './end-node';

export const initEngine = (engine: DiagramEngine) => {
	const portFactories = engine.getPortFactories();
	portFactories.registerFactory(new NextStepPortFactory());
	portFactories.registerFactory(new PreviousStepPortFactory());

	const nodeFactories = engine.getNodeFactories();
	nodeFactories.registerFactory(new StartNodeFactory());
	nodeFactories.registerFactory(new EndNodeFactory());
};
