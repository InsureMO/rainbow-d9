import React, {Fragment, useEffect, useState} from 'react';
import {
	ArrayElementEventTypes,
	ContainerEventTypes,
	RootEventTypes,
	useArrayElementEventBus,
	useContainerEventBus,
	useRootEventBus
} from '../events';
import {NodeUniqueKey, NodeValidationScope, Validated, ValidatedSet} from '../types';
import {N1Logger} from '../utils';

export interface RootValidationEventState {
	byIds: Record<NodeUniqueKey, { validate: () => Promise<Validated>, scopes: Array<NodeValidationScope> }>;
	byScopes: Record<NodeValidationScope, Record<NodeUniqueKey, true>>;
}

export const ValidationEventHolder = () => {
	const {on, off, fire} = useRootEventBus();
	const [validationEventState] = useState<RootValidationEventState>({byIds: {}, byScopes: {}});

	useEffect(() => {
		const onValidate = async (scopes: Array<NodeValidationScope>, onValidate: (validated: ValidatedSet) => void) => {
			if (scopes == null || scopes.length === 0) {
				// validate all
				const validated: Array<Validated> = await Promise.all<Validated>(
					Object.values(validationEventState.byIds).map(({validate}) => validate()));
				onValidate({
					failed: validated.filter(validated => !validated.valid),
					passed: validated.filter(validated => validated.valid)
				});
			} else {
				// validate given scopes
				const validated: Array<Validated> = await Promise.all<Validated>(
					scopes.map(scope => Object.keys(validationEventState[scope]))
						.flat()
						.reduce((ids, id) => {
							if (ids.map[id] == null) {
								ids.list.push(id);
							}
							return ids;
						}, {map: {}, list: []} as { map: Record<NodeUniqueKey, boolean>, list: Array<NodeUniqueKey> })
						.list
						.map(id => validationEventState.byIds[id]?.validate)
						.filter(validate => validate != null)
						.map(validate => validate()));
				onValidate({
					failed: validated.filter(validated => !validated.valid),
					passed: validated.filter(validated => validated.valid)
				});
			}
		};
		const onRegisterValidatable = (uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>) => {
			validationEventState.byIds[uniqueId] = {validate, scopes};
			(scopes || []).forEach(scope => {
				if (validationEventState.byScopes[scope] == null) {
					validationEventState.byScopes[scope] = {};
				}
				validationEventState.byScopes[scope][uniqueId] = true;
			});
		};
		const onUnregisterValidatable = (uniqueId: NodeUniqueKey) => {
			const {scopes = []} = validationEventState.byIds[uniqueId] || {};
			delete validationEventState.byIds[uniqueId];
			(scopes || []).forEach(scope => {
				if (validationEventState.byScopes[scope] != null) {
					delete validationEventState.byScopes[scope][uniqueId];
				}
			});
		};
		on(RootEventTypes.VALIDATE, onValidate);
		on(RootEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
		on(RootEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		return () => {
			off(RootEventTypes.VALIDATE, onValidate);
			off(RootEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
			off(RootEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		};
	}, [on, off, fire, validationEventState]);

	return <Fragment />;
};

export type FixedScopeValidationEventState = Record<NodeUniqueKey, () => Promise<Validated>>;

export const useFixedScopeValidationEventHandlers = () => {
	const [state] = useState<FixedScopeValidationEventState>({});
	const [handlers] = useState(() => {
		return {
			onValidate: async (onValidate: (validated: ValidatedSet) => void) => {
				// validate all
				const validated: Array<Validated> = await Promise.all<Validated>(
					Object.values(state).map(validate => validate()));
				onValidate({
					failed: validated.filter(validated => !validated.valid),
					passed: validated.filter(validated => validated.valid)
				});
			},
			onRegisterValidatable: (uniqueId: NodeUniqueKey, validate: () => Promise<Validated>) => {
				N1Logger.debug(`[${uniqueId}] registered.`, 'FixedScopeValidationEventHandlersHook');
				state[uniqueId] = validate;
			},
			onUnregisterValidatable: (uniqueId: NodeUniqueKey) => {
				N1Logger.debug(`[${uniqueId}] unregistered.`, 'FixedScopeValidationEventHandlersHook');
				delete state[uniqueId];
			}
		};
	});
	return {state, ...handlers};
};
export const ContainerValidationEventHolder = () => {
	const {on, off} = useContainerEventBus();
	const {state, onValidate, onRegisterValidatable, onUnregisterValidatable} = useFixedScopeValidationEventHandlers();

	useEffect(() => {
		on(ContainerEventTypes.VALIDATE, onValidate);
		on(ContainerEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
		on(ContainerEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		return () => {
			off(ContainerEventTypes.VALIDATE, onValidate);
			off(ContainerEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
			off(ContainerEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		};
	}, [on, off, state, onValidate, onRegisterValidatable, onUnregisterValidatable]);

	return <Fragment />;
};

export const ArrayElementValidationEventHolder = () => {
	const {on, off} = useArrayElementEventBus();
	const {state, onValidate, onRegisterValidatable, onUnregisterValidatable} = useFixedScopeValidationEventHandlers();

	useEffect(() => {
		on(ArrayElementEventTypes.VALIDATE, onValidate);
		on(ArrayElementEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
		on(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		return () => {
			off(ArrayElementEventTypes.VALIDATE, onValidate);
			off(ArrayElementEventTypes.REGISTER_VALIDATABLE, onRegisterValidatable);
			off(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, onUnregisterValidatable);
		};
	}, [on, off, state, onValidate, onRegisterValidatable, onUnregisterValidatable]);

	return <Fragment />;
};