import {MUtils, PPUtils, PropertyPath, VUtils} from '@rainbow-d9/n1';
import React, {Fragment, useEffect, useState} from 'react';
import {
	GlobalEventPrefix,
	GlobalEventTypes,
	useCustomGlobalEvent,
	useGlobalEventBus,
	useGlobalHandlers
} from '../global';
import {ModelCarrier} from '../types';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardProps, WizardStepDef} from './types';
import {findActiveOne} from './utils';

interface WizardControllerProps {
	// tabs property path, not for tab
	$pp: PropertyPath;
	$wrapped: WizardProps['$wrapped'];
	contents?: WizardProps['contents'];
	reached?: WizardProps['reached'];
}

interface WizardControllerState {
	initialized: boolean;
	activeIndex: number;
	reachedIndex: number;
}

export const WizardController = (props: WizardControllerProps) => {
	const {$pp, $wrapped, contents, reached} = props;

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const {on, off, fire} = useWizardEventBus();
	const [state, setState] = useState<WizardControllerState>({initialized: false, activeIndex: -1, reachedIndex: -1});
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const activeStep = async (options: {
			stepIndex: number, def?: WizardStepDef; first: boolean
		}, callback?: () => Promise<void>) => {
			const {stepIndex, def, first} = options;
			if (def.data != null) {
				const model = MUtils.getValue($wrapped.$model, PPUtils.concat($pp, def.$pp));
				await def.data({
					root: $wrapped.$root, model,
					absolutePath: PPUtils.absolute($wrapped.$p2r, PPUtils.concat($pp, def.$pp)), propertyPath: def.$pp,
					marker: def.marker, firstActive: first,
					global: globalHandlers
				});
				await new Promise<void>(resolve => {
					fire(WizardEventTypes.REFRESH_STEP_CONTENT, stepIndex, def?.marker, async (where: 'title' | 'body') => {
						if (where === 'body') {
							resolve();
						}
					});
				});
			}
			const reachedIndex = Math.max(stepIndex, state.reachedIndex);
			setState(state => {
				return {...state, activeIndex: stepIndex, reachedIndex};
			});
			await new Promise<void>(resolve => {
				fire(WizardEventTypes.ACTIVE_STEP, stepIndex, def?.marker, reachedIndex, async (where: 'title' | 'body' | 'share') => {
					if (where === 'body') {
						await callback?.();
						resolve();
					}
				});
			});
			const key = `${GlobalEventPrefix.WIZARD_STEP_CHANGED}:${def?.marker ?? ''}`;
			// noinspection JSIgnoredPromiseFromCall
			await fireCustomEvent(key, GlobalEventPrefix.WIZARD_STEP_CHANGED, def?.marker ?? '', {
				root: $wrapped.$root, model: $wrapped.$model
			});
		};
		// deal with active tab event from inside
		// and fire tab changed event when tab changed
		const createOnStepActive = (first: boolean) => async (index: number, marker: string, onActivated?: () => Promise<void>) => {
			const activeOne = findActiveOne(contents, index, marker);
			if (activeOne == null) {
				// do nothing
				return;
			}
			const [found, foundIndex] = activeOne;
			if (foundIndex === state.activeIndex) {
				if (first) {
					// use force since state active index is same as given tab index
					await activeStep({stepIndex: foundIndex, def: found, first: true});
				} else {
					// trigger callback directly
					// noinspection ES6MissingAwait
					onActivated?.();
				}
			} else {
				await activeStep({stepIndex: foundIndex, def: found, first: false}, onActivated);
			}
		};
		const onFirstStepActive = createOnStepActive(true);
		const onStepActive = createOnStepActive(false);
		on(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, onFirstStepActive);
		on(WizardEventTypes.TRY_ACTIVE_STEP, onStepActive);
		return () => {
			off(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, onFirstStepActive);
			off(WizardEventTypes.TRY_ACTIVE_STEP, onStepActive);
		};
	}, [
		on, off, fire, globalHandlers, fireCustomEvent, state.activeIndex, state.reachedIndex, contents,
		$pp, $wrapped.$root, $wrapped.$model, $wrapped.$p2r]);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string, _models?: ModelCarrier, callback?: () => Promise<void>) => {
			if (prefix !== GlobalEventPrefix.WIZARD_STEP) {
				return;
			}
			const check = VUtils.isInteger(clipped);
			if (check.test) {
				// only one wizard exists, otherwise leads confusion, since every wizard will repsond to this event
				fire(WizardEventTypes.TRY_ACTIVE_STEP, check.value, '', callback);
			} else {
				// make sure marker is global unique
				fire(WizardEventTypes.TRY_ACTIVE_STEP, -1, (clipped ?? '').trim(), callback);
			}
		};
		if (onGlobal != null) {
			onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		}
		return () => {
			if (offGlobal != null) {
				offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
			}
		};
	}, [onGlobal, offGlobal, fire]);
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		const findReachedIndex = async (): Promise<number> => {
			const find = (reached: string | number): number => {
				let foundIndex = (contents ?? []).findIndex(content => content.marker === reached);
				if (foundIndex === -1) {
					foundIndex = (contents ?? []).findIndex((_, index) => index == reached);
				}
				return foundIndex === -1 ? 0 : foundIndex;
			};
			if (typeof reached === 'function') {
				const reachedMarkerOrIndex = await reached();
				return find(reachedMarkerOrIndex);
			} else {
				return find(reached);
			}
		};
		(async () => {
			const reachedIndex = await findReachedIndex();
			setState({initialized: true, activeIndex: reachedIndex, reachedIndex});
			// fire only once to active tab
			fire(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, reachedIndex, '');
		})();
	}, [fire, contents, reached, state.initialized]);

	return <Fragment/>;
};
