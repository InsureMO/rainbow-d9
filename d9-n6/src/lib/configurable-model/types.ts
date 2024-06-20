import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef, PipelineStepRegisterKey} from '../definition';
import {NodeHandlers, StepNodeModel} from '../diagram';
import {ConfigurableElement, ConfigurableElementAnchor, ConfigurableModel} from '../edit-dialog';

export interface FileNodeConfigurer<D extends FileDef = FileDef, M extends ConfigurableModel = ConfigurableModel> {
	prepare: (def: D) => M;
	confirm: (model: M, def: D, handlers: NodeHandlers) => ConfigurableElementAnchor | true;
	discard: (model: M) => void;
	elements: Array<ConfigurableElement>;
}

export interface StepNodeConfigurer<D extends PipelineStepDef = PipelineStepDef, F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel> {
	use: PipelineStepRegisterKey;
	/** prepare configurable model for popup edit dialog */
	prepare: (def: F) => M;
	/** confirm the changes from edit dialog */
	confirm: (model: D, def: F, file: FileDef, handlers: NodeHandlers) => ConfigurableElementAnchor | true;
	/** discard the changes from edit dialog */
	discard: (model: D) => void;
	/** create nodes for sub steps */
	createSubNodes: (node: StepNodeModel) => Undefinable<StepNodeModel>;
}
