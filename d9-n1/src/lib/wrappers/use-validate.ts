import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
	ArrayElementEventTypes,
	ContainerEventTypes,
	RootEventTypes,
	useArrayElementEventBus,
	useContainerEventBus,
	useRootEventBus,
	useWrapperEventBus,
	WrapperEventTypes
} from '../events';
import {
	ModelHolder,
	MonitorNodeAttributes,
	NodeAttributeValues,
	NodeDef,
	NodeValidationScope,
	PropValue,
	Validated,
	ValidatedSet,
	ValidationFunctions,
	ValidationResult
} from '../types';
import {MUtils, NUtils, PPUtils, VUtils} from '../utils';

export const useValidate = (options: {
	props: NodeDef & ModelHolder;
	attributeValues: NodeAttributeValues;
	setAttributeValues: Dispatch<SetStateAction<NodeAttributeValues>>;
}) => {
	const {props, attributeValues, setAttributeValues} = options;

	const {fire} = useRootEventBus();
	const {on, off} = useWrapperEventBus();

	useEffect(() => {
		// handle validation request from value changed by myself
		const onValidate = async (from: PropValue, to: PropValue) => {
			const $handle = props.$valid?.$handle;
			if ($handle != null
				&& attributeValues[MonitorNodeAttributes.DISABLED] !== true
				&& attributeValues[MonitorNodeAttributes.VISIBLE] !== false) {
				// do validation only when
				// 1. handle is declared
				// 2. is not disabled
				// 3. is visible
				const absolutePath = PPUtils.absolute(props.$p2r, props.$pp);
				const result = await $handle({
					root: props.$root, model: props.$model,
					pathToRoot: props.$p2r, propertyPath: props.$pp, absolutePath, value: to,
					changedOn: absolutePath, from, to
				}) as ValidationResult;
				const current = (attributeValues[MonitorNodeAttributes.VALID] ?? {valid: true});
				if (result.valid !== current.valid || result.failReason != current.failReason) {
					// validation result changed
					setAttributeValues(attributes => ({...attributes, [MonitorNodeAttributes.VALID]: result}));
				}
				if (fire != null) {
					fire(RootEventTypes.VALIDATED, {
						root: props.$root, model: props.$model,
						pathToRoot: props.$p2r, propertyPath: props.$pp, absolutePath, value: to,
						...result
					});
				}
			} else if (attributeValues[MonitorNodeAttributes.VALID]?.valid === false) {
				// no validation needed, but current status is not valid
				// reset to valid (delete this attribute)
				setAttributeValues(attributes => {
					const attrs = {...attributes};
					delete attrs[MonitorNodeAttributes.VALID];
					return attrs;
				});
				if (fire != null) {
					fire(RootEventTypes.VALIDATED, {
						root: props.$root, model: props.$model,
						pathToRoot: props.$p2r, propertyPath: props.$pp,
						absolutePath: PPUtils.absolute(props.$p2r, props.$pp),
						value: to,
						valid: true
					});
				}
			}
		};
		on(WrapperEventTypes.VALIDATE, onValidate);
		return () => {
			off(WrapperEventTypes.VALIDATE, onValidate);
		};
	}, [
		fire, on, off,
		attributeValues, setAttributeValues,
		props.$valid?.$handle, props.$root, props.$model, props.$p2r, props.$pp
	]);
};

export const useValidationRegistration = (options: {
	props: NodeDef & ModelHolder;
	attributeValues: NodeAttributeValues;
	setAttributeValues: Dispatch<SetStateAction<NodeAttributeValues>>;
}) => {
	const {props, attributeValues, setAttributeValues} = options;

	const {fire: fireRoot} = useRootEventBus();
	const {fire: fireContainer} = useContainerEventBus();
	const {fire: fireArrayElement} = useArrayElementEventBus();
	const [uniqueId] = useState(NUtils.generateReactKey());

	useEffect(() => {
		if (props.$valid?.$handle == null) {
			// no validation
			return;
		}
		if (attributeValues[MonitorNodeAttributes.DISABLED] === true || attributeValues[MonitorNodeAttributes.VISIBLE] === false) {
			// is disabled or not visible, validation is no longer relevant
			if (fireRoot != null) {
				fireRoot(RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
			if (fireContainer != null) {
				fireContainer(ContainerEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
			if (fireArrayElement != null) {
				fireArrayElement(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
			return;
		}

		const scopes = props.$validationScopes || [];
		const validate = (): Promise<Validated> => {
			return new Promise<Validated>(resolve => {
				const $handle = props.$valid?.$handle;
				const absolutePath = PPUtils.absolute(props.$p2r, props.$pp);
				if ($handle == null) {
					resolve({path: absolutePath, valid: true});
				} else {
					(async () => {
						const {$root, $model} = props;
						const value = MUtils.getValue($model, props.$pp);
						// handle directly function call, normally programmatic invoked.
						// there is no value change, always use current value to do validation
						const result = await $handle({
							root: $root, model: $model,
							pathToRoot: props.$p2r, propertyPath: props.$pp, absolutePath, value,
							changedOn: absolutePath, to: value
						});
						const current = (attributeValues[MonitorNodeAttributes.VALID] ?? {valid: true});
						if (result.valid !== current.valid || result.failReason != current.failReason) {
							// validation result changed
							setAttributeValues(attributes => ({...attributes, [MonitorNodeAttributes.VALID]: result}));
						}
						resolve({path: absolutePath, ...result});
					})();
				}
			});
		};
		if (fireRoot != null) {
			fireRoot(RootEventTypes.REGISTER_VALIDATABLE, uniqueId, scopes, validate);
		}
		if (fireContainer != null) {
			fireContainer(ContainerEventTypes.REGISTER_VALIDATABLE, uniqueId, validate);
		}
		if (fireArrayElement != null) {
			fireArrayElement(ArrayElementEventTypes.REGISTER_VALIDATABLE, uniqueId, validate);
		}
		return () => {
			if (fireRoot != null) {
				fireRoot(RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
			if (fireContainer != null) {
				fireContainer(ContainerEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
			if (fireArrayElement != null) {
				fireArrayElement(ArrayElementEventTypes.UNREGISTER_VALIDATABLE, uniqueId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		fireRoot, fireContainer, fireArrayElement,
		attributeValues, setAttributeValues, uniqueId,
		props, props.$valid?.$handle, props.$root, props.$model, props.$p2r, props.$pp]);
};

export const useValidationFunctions = (def: NodeDef): ValidationFunctions => {
	const {fire: fireRoot} = useRootEventBus();
	const {fire: fireContainer} = useContainerEventBus();
	const {fire: fireArrayElement} = useArrayElementEventBus();

	const validate = (scopes: Array<NodeValidationScope>): Promise<ValidatedSet> => {
		return new Promise<ValidatedSet>(resolve => {
			if (fireRoot != null) {
				fireRoot(RootEventTypes.VALIDATE, scopes ?? [], resolve);
			}
		});
	};

	const functions: ValidationFunctions = {
		$given: (scopes?: Array<NodeValidationScope>): Promise<ValidatedSet> => validate(scopes ?? []),
		$mine: (): Promise<ValidatedSet> => {
			const validScopes = (def.$validationScopes || []).filter(scope => VUtils.isNotBlank(scope));
			if (validScopes.length !== 0) {
				return validate(validScopes);
			} else if (functions.$arrayElement != null) {
				return functions.$arrayElement();
			} else if (functions.$closestContainer != null) {
				return functions.$closestContainer();
			} else {
				return functions.$all();
			}
		},
		$all: (): Promise<ValidatedSet> => validate([])
	};
	if (fireArrayElement != null) {
		// only for in array element
		functions.$arrayElement = (): Promise<ValidatedSet> => {
			return new Promise<ValidatedSet>(resolve => {
				fireArrayElement(ArrayElementEventTypes.VALIDATE, resolve);
			});
		};
	}
	if (fireContainer != null) {
		// only for closest container
		functions.$closestContainer = (): Promise<ValidatedSet> => {
			return new Promise<ValidatedSet>(resolve => {
				fireContainer(ContainerEventTypes.VALIDATE, resolve);
			});
		};
	}

	return functions;
};
