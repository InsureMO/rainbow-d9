import {MUtils, NodeDef, PPUtils, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useCustomGlobalEvent, useGlobalEventBus} from '../global';
import {useWizardEventBus, WizardEventBusProvider} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardProps, WizardSharedDef, WizardStepDef} from './types';
import {AWizard, WizardBody, WizardHeader} from './widgets';
import {WizardStepBody} from './wizard-step-body';
import {WizardStepTitle} from './wizard-step-title';

const redressStepMarker = (content: WizardStepDef) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	if (typeof content.title === 'string') {
		content.marker = content.title;
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};

interface WizardState {
	initialized: boolean;
	activeIndex: number;
	reachedIndex: number;
	sharedDef?: NodeDef;
	sharedAtLead?: boolean;
}

const InternalWizard = (props: WizardProps) => {
	const {
		$pp, $wrapped,
		reached = 0, freeWalk = false, omitWalker = false,
		balloon = true, emphasisActive = true,
		shared, contents,
		...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const {on, off, fire} = useWizardEventBus();
	const [state, setState] = useState<WizardState>({initialized: false, activeIndex: 0, reachedIndex: 0});
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const onStepActive = (index: number, marker: string) => {
			let found = (contents ?? []).find(content => content.marker === marker);
			if (found == null) {
				found = (contents ?? []).find((_, i) => i === index);
			}
			if (found == null) {
				return;
			}
			const foundIndex = (contents ?? []).indexOf(found);
			if (foundIndex === state.activeIndex) {
				return;
			} else {
				setState(state => {
					return {
						...state,
						activeIndex: foundIndex, reachedIndex: Math.max(foundIndex, state.reachedIndex)
					};
				});
				const key = `${GlobalEventPrefix.WIZARD_STEP_CHANGED}:${found.marker ?? ''}`;
				// noinspection JSIgnoredPromiseFromCall
				fireCustomEvent(key, GlobalEventPrefix.WIZARD_STEP_CHANGED, found.marker ?? '', {
					root: $wrapped.$root, model: $wrapped.$model
				});
			}
		};
		on(WizardEventTypes.ACTIVE_STEP, onStepActive);
		return () => {
			off(WizardEventTypes.ACTIVE_STEP, onStepActive);
		};
	}, [on, off, fireCustomEvent,
		state.activeIndex, state.reachedIndex,
		contents, $wrapped.$root, $wrapped.$model
	]);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (prefix !== GlobalEventPrefix.WIZARD_STEP) {
				return;
			}
			const check = VUtils.isInteger(clipped);
			if (check.test) {
				// only one wizard exists, otherwise leads confusion, since every wizard will repsond to this event
				fire(WizardEventTypes.ACTIVE_STEP, check.value, '');
			} else {
				// make sure marker is global unique
				fire(WizardEventTypes.ACTIVE_STEP, -1, (clipped ?? '').trim());
			}
		};
		onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, fire]);
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		if (reached == null || VUtils.isBlank(reached)) {
			setState({initialized: true, activeIndex: 0, reachedIndex: 0});
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
		const findSharedDef = async (def?: WizardSharedDef): Promise<{ def?: NodeDef; lead?: boolean }> => {
			if (def == null || def.body == null) {
				return {def: (void 0), lead: (void 0)};
			}
			const {$pp, body} = def;
			let foundDef: NodeDef | undefined;
			if (typeof body === 'function') {
				foundDef = await body();
			} else {
				foundDef = body;
			}
			if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
				foundDef.$pp = $pp;
			}
			return {def: foundDef, lead: def.lead};
		};

		(async () => {
			const reachedIndex = await findReachedIndex();
			const {def: sharedDef, lead: sharedAtLead} = await findSharedDef(shared);
			setState({
				initialized: true,
				activeIndex: reachedIndex, reachedIndex,
				sharedDef, sharedAtLead
			});
		})();
	}, [state.initialized, contents, reached, shared]);

	if (!state.initialized) {
		return null;
	}

	return <AWizard {...rest} data-disabled={$disabled} data-visible={$visible}
	                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<WizardHeader data-balloon={balloon}>
			{(contents ?? []).map((content, index) => {
				redressStepMarker(content);
				const $model = MUtils.getValue($wrapped.$model, $pp);
				return <WizardStepTitle key={content.marker}
				                        $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                        balloon={balloon} emphasisActive={emphasisActive}
				                        {...content}
				                        done={index < state.activeIndex} active={index === state.activeIndex}
				                        freeWalk={freeWalk} reachedIndex={state.reachedIndex} stepIndex={index}
				                        marker={content.marker}/>;
			})}
		</WizardHeader>
		<WizardBody>
			{(contents ?? []).map((content, index, all) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// marker already redressed in headers rendering
				return <WizardStepBody key={content.marker} def={content.body} $pp={content.$pp}
				                       $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                       active={index === state.activeIndex} omitWalker={omitWalker}
				                       shared={state.sharedDef} sharedAtLead={state.sharedAtLead}
				                       firstStep={index === 0} lastStep={index === all.length - 1}
				                       previousMarker={index !== 0 ? all[index - 1].marker : (void 0)}
				                       nextMarker={index !== all.length - 1 ? all[index + 1].marker : (void 0)}
				                       stepIndex={index} marker={content.marker}/>;
			})}
		</WizardBody>
	</AWizard>;
};

export const Wizard = (props: WizardProps) => {
	return <WizardEventBusProvider>
		<InternalWizard {...props}/>
	</WizardEventBusProvider>;
};

registerWidget({key: 'Wizard', JSX: Wizard, container: false, array: false});

export * from './types';
