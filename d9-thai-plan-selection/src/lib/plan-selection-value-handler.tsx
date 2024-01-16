import {useThrottler} from '@rainbow-d9/n1';
import React, {useEffect, useRef} from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlansChangedEventOptions, PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {CalculationEvent, PlanSelectionProps} from './types';

export interface PlanSelectionValueHandlerProps {
	calculationDelay?: number;
	calculate: PlanSelectionProps['calculate'];
}

export const PlanSelectionValueHandler = (props: PlanSelectionValueHandlerProps) => {
	const {calculationDelay = 1, calculate} = props;

	const {on, off, fire} = usePlanSelectionEventBus();
	const changes = useRef<CalculationEvent>(null);
	const {replace} = useThrottler();

	useEffect(() => {
		const onElementValueChanged = (options: PlansChangedEventOptions) => {
			const {root, model, ...rest} = options;
			if (changes.current == null) {
				changes.current = {root, model, changes: [rest]};
			} else {
				changes.current.changes.push(rest);
			}
			replace(() => {
				const event = changes.current;
				// clear
				changes.current = null;
				if (calculate != null) {
					(async () => {
						await calculate(event);
						event.changes.map(change => change.planDef)
							.forEach(planDef => fire(PlanSelectionEventTypes.PREMIUM_CALCULATED, {planDef}));
					})();
				}
			}, calculationDelay * 1000);
		};
		on(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		return () => {
			off(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		};
	}, [on, off, fire, replace, changes, calculate, calculationDelay]);

	return <></>;
};
