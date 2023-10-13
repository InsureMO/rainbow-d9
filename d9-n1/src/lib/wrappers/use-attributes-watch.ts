import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {RootEventTypes, useRootEventBus, useWrapperEventBus, WrapperEventTypes} from '../events';
import {
	ModelHolder,
	MonitorNodeAttributes,
	NodeAttributeValues,
	NodeDef,
	PropertyPath,
	PropValue,
	Reaction
} from '../types';
import {MUtils, N1Logger, PPUtils, VUtils} from '../utils';
import {Watches} from './types';
import {buildWatches} from './utils';

const shouldUpdateAttribute = (values: Partial<NodeAttributeValues>, attributeValues: NodeAttributeValues) => {
	switch (true) {
		case (values[MonitorNodeAttributes.DISABLED] != null && values[MonitorNodeAttributes.DISABLED] != (attributeValues[MonitorNodeAttributes.DISABLED] ?? false)):
			// disablement changed
			return true;
		case (values[MonitorNodeAttributes.VISIBLE] != null && values[MonitorNodeAttributes.VISIBLE] != (attributeValues[MonitorNodeAttributes.VISIBLE] ?? true)):
			// visibility changed
			return true;
		case (values[MonitorNodeAttributes.VALID] == null && attributeValues[MonitorNodeAttributes.VALID] != null) :
			// no validation now, but has been done before
			return true;
		case (values[MonitorNodeAttributes.VALID] != null && attributeValues[MonitorNodeAttributes.VALID] == null) :
			// done validation now, but has not been there last round
			return true;
		case (values[MonitorNodeAttributes.VALID] != null && attributeValues[MonitorNodeAttributes.VALID] != null) : {
			const validInThisRound = values[MonitorNodeAttributes.VALID].valid;
			const validInLastRound = attributeValues[MonitorNodeAttributes.VALID].valid;
			if (validInThisRound != validInLastRound) {
				return true;
			} else if (!validInLastRound && values[MonitorNodeAttributes.VALID].failReason != attributeValues[MonitorNodeAttributes.VALID].failReason) {
				return true;
			}
			// valid flags are same, and failed reason in two rounds are same
			return false;
		}
		case VUtils.isNotBlank(values[MonitorNodeAttributes.REACTION]):
			// reaction needs to be proceeded
			return true;
	}
	return false;
};

export const useAttributesWatch = (options: {
	props: NodeDef & ModelHolder;
	attributeValues: NodeAttributeValues;
	setAttributeValues: Dispatch<SetStateAction<NodeAttributeValues>>;
}) => {
	const {props, attributeValues, setAttributeValues} = options;

	const {on, off, fire} = useRootEventBus();
	const {fire: fireWrapper} = useWrapperEventBus();
	const [watches] = useState<Watches>(buildWatches(props));

	useEffect(() => {
		// handle monitor attributes, triggerred by value changed of other property
		const onValueChanged = async (absolutePath: PropertyPath, from: PropValue, to: PropValue) => {
			const watch = Object.keys(watches).find(watch => {
				const watchPath = PPUtils.absolute(props.$p2r, watch);
				return PPUtils.matches(watchPath, absolutePath);
			});
			if (watch != null) {
				N1Logger.debug(`Widget[${props.$wt}] catches change[on=${absolutePath}, from=${from}, to=${to}] based on watch[${watch}].`, 'AttributeWatchHook');
				const handles = watches[watch];
				const myAbsolutePath = PPUtils.absolute(props.$p2r, props.$pp);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const handledValuePairs = await Promise.all<{ name: string, value: any }>(Object.keys(handles)
					// do validation after all done, filter it here
					.filter(name => name !== MonitorNodeAttributes.VALID)
					.map(async (name: MonitorNodeAttributes) => {
						const value = await handles[name]({
							root: props.$root, model: props.$model,
							pathToRoot: props.$p2r, propertyPath: props.$pp, absolutePath: myAbsolutePath,
							value: MUtils.getValue(props.$model, props.$pp),
							changedOn: myAbsolutePath, from, to
						});
						if (name !== MonitorNodeAttributes.REACTION) {
							return {name, value};
						} else {
							let reactions = [];
							if (Array.isArray(value)) {
								if (value.includes(Reaction.CLEAR_VALUE)) {
									// includes clear value, drop repaint, since clear value leads repaint
									reactions = value.filter(v => v != Reaction.REPAINT);
								} else {
									reactions = value;
								}
							} else if (VUtils.isBlank(value)) {
								// do nothing
							} else {
								reactions = [value];
							}
							// distinct
							reactions = reactions.filter(reaction => VUtils.isNotBlank(reaction));
							reactions = [...new Set(reactions)];

							let ret = null;
							if (reactions.includes(Reaction.CLEAR_VALUE)) {
								// clear value
								const oldValue = MUtils.setValue(props.$model, props.$pp, null);
								// fire value change event, validation is not necessary here since it is reaction
								fire(RootEventTypes.VALUE_CHANGED, myAbsolutePath, oldValue, null);
								// assign a unique id, leading repaint
								ret = {name, value: VUtils.generateUniqueId()};
							}
							if (reactions.includes(Reaction.REPAINT)) {
								// assign a unique id, leading repaint
								if (ret == null) {
									ret = {name, value: VUtils.generateUniqueId()};
								}
							}
							reactions.filter(reaction => ![Reaction.CLEAR_VALUE, Reaction.REPAINT].includes(reaction))
								.forEach(reaction => {
									// fire wrapped event
									fireWrapper(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, reaction);
								});
							return ret;
						}
					}).filter(x => x != null));
				const values = handledValuePairs.reduce((values, {name, value}) => {
					values[name] = value;
					return values;
				}, {} as Partial<NodeAttributeValues>);
				if (handles[MonitorNodeAttributes.VALID] != null
					&& !values[MonitorNodeAttributes.DISABLED]
					&& values[MonitorNodeAttributes.VISIBLE]) {
					// do validation only when
					// 1. handle declared
					// 2. is not disabled
					// 3. is visible
					// handle change from somewhere others, pass my path and value to function
					values[MonitorNodeAttributes.VALID] = await handles[MonitorNodeAttributes.VALID]({
						root: props.$root, model: props.$model,
						pathToRoot: props.$p2r, propertyPath: props.$pp, absolutePath: myAbsolutePath,
						value: MUtils.getValue(props.$model, props.$pp),
						changedOn: myAbsolutePath, from, to
					});
				}
				// compare computed values with existing
				if (shouldUpdateAttribute(values, attributeValues)) {
					setAttributeValues(attributes => ({...attributes, ...values}));
				}
			}
		};
		on(RootEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			off(RootEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [
		on, off, fire, fireWrapper,
		attributeValues, setAttributeValues, watches,
		props.$wt, props.$root, props.$model, props.$p2r, props.$pp
	]);
};
