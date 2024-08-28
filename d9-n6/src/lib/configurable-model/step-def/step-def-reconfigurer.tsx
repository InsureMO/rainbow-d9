import {Undefinable} from '@rainbow-d9/n1';
import {PipelineStepDef} from '../../definition';
import {StepNodeModel} from '../../diagram';
import {ConfigurableElement, ConfigurableModel} from '../../edit-dialog';
import {StepNodeConfigurer} from '../index';

/**
 * for all reconfigure functions, return null/undefined means no change, return a value means change.
 * the first returns not null/undefined is efficient.
 */
export interface StepDefsReconfigurer {
	prepare: (prepare: StepNodeConfigurer['prepare'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['prepare']>;
	confirm: (confirm: StepNodeConfigurer['confirm'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['confirm']>;
	discard?: (discard: StepNodeConfigurer['discard'], model: StepNodeModel) => Undefinable<StepNodeConfigurer['discard']>;
	properties: (properties: Array<ConfigurableElement>, model: StepNodeModel) => Undefinable<Array<ConfigurableElement>>;
	operators?: (operators: StepNodeConfigurer['operators'], node: StepNodeModel) => Undefinable<StepNodeConfigurer['operators']>;
}

const StepDefsReconfigurers: Array<StepDefsReconfigurer> = [];
export const registerStepDefsReconfigurers = (...configurers: Array<StepDefsReconfigurer>) => {
	(configurers || []).forEach(configurer => {
		if (!StepDefsReconfigurers.includes(configurer)) {
			StepDefsReconfigurers.push(configurer);
		}
	});
};
export const reconfigureStepDefProperties = (properties: Array<ConfigurableElement>, model: StepNodeModel): Array<ConfigurableElement> => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.properties(properties, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return properties;
};
export const reconfigureStepDefPrepare = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(prepare: StepNodeConfigurer<F, M>['prepare'], model: StepNodeModel): StepNodeConfigurer<F, M>['prepare'] => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.prepare(prepare, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return prepare;
};
export const reconfigureStepDefConfirm = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(confirm: StepNodeConfigurer<F, M>['confirm'], model: StepNodeModel): StepNodeConfigurer<F, M>['confirm'] => {
	for (const reconfigurer of StepDefsReconfigurers) {
		const reconfigured = reconfigurer.confirm(confirm, model);
		if (reconfigured != null) {
			return reconfigured;
		}
	}
	return confirm;
};
export const reconfigureStepDefDiscard = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(discard: StepNodeConfigurer<F, M>['discard'], model: StepNodeModel): StepNodeConfigurer<F, M>['discard'] => {
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
export const reconfigureStepDefOperators = <F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel>(operators: StepNodeConfigurer<F, M>['operators'], model: StepNodeModel): StepNodeConfigurer<F, M>['operators'] => {
	return StepDefsReconfigurers.reduce((operators, reconfigurer) => reconfigurer.operators?.(operators, model) ?? operators, operators);
};
