import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanDefs, PlanSelectionGlobalEventPrefix, PlanSelectionProps} from './types';
import {loadDefs, PlanDefOrdered} from './use-defs';
import {computeColumnWidth} from './utils';

export interface PlanSelectionLayout {
	initialized: boolean;
	defs?: PlanDefs;
	orderedDefs?: PlanDefOrdered;
	displayPlanDefs: PlanDefs;
	computedColumnCount: number;
	computedColumnWidth: PlanSelectionProps['columnWidth'];
	computedLineHeaderWidth: PlanSelectionProps['lineHeaderWidth'];
	/** available only if pageable */
	pageCount?: number;
	pageNumber?: number;
	pageSize?: number;
}

export const useLayout = (
	marker: string,
	defs: PlanSelectionProps['defs'],
	$root: BaseModel, $model: PropValue,
	valuesInit?: PlanSelectionProps['valuesInit'], valuesClear?: PlanSelectionProps['valuesClear'],
	columns?: number, columnWidth?: PlanSelectionProps['columnWidth'], lineHeaderWidth?: PlanSelectionProps['lineHeaderWidth']
): PlanSelectionLayout => {
	const globalHandlers = useGlobalHandlers();
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const {on, off} = usePlanSelectionEventBus();
	const [state, setState] = useState<PlanSelectionLayout>({
		initialized: false, displayPlanDefs: [],
		computedColumnCount: -1, computedColumnWidth: -1, computedLineHeaderWidth: -1
	});
	useEffect(() => {
		const layout = (defs: PlanDefs, orderedDefs: PlanDefOrdered) => {
			defs = defs ?? [];
			const planCount = defs.length;
			let computedColumnCount = Math.min(planCount, columns);
			let computedColumnWidth: number | string;
			let computedLineHeaderWidth: number | string;
			if (computedColumnCount <= 0) {
				computedColumnCount = planCount;
				[computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(-1, columnWidth, lineHeaderWidth);
				setState({
					initialized: true, defs, orderedDefs, displayPlanDefs: defs,
					computedColumnCount, computedColumnWidth, computedLineHeaderWidth
				});
			} else {
				[computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);
				if (computedColumnCount < planCount) {
					// pageable
					const pageCount = Math.ceil(planCount / computedColumnCount);
					setState(state => {
						const originalPageNumber = state.pageNumber;
						let pageNumber: number;
						if (originalPageNumber == null) {
							pageNumber = 1;
						} else if (originalPageNumber > pageCount) {
							pageNumber = pageCount;
						} else {
							pageNumber = originalPageNumber;
						}
						const displayPlanDefs = defs.slice((pageNumber - 1) * computedColumnCount, pageNumber * computedColumnCount);
						return {
							initialized: true,
							defs, orderedDefs, displayPlanDefs,
							pageCount, pageNumber, pageSize: computedColumnCount,
							computedColumnCount, computedColumnWidth, computedLineHeaderWidth
						};
					});
				} else {
					setState({
						initialized: true, defs, orderedDefs, displayPlanDefs: defs,
						computedColumnCount, computedColumnWidth, computedLineHeaderWidth
					});
				}
			}
		};
		if (!state.initialized) {
			(async () => {
				const {defs: loadedDefs, orderedDefs} = await loadDefs({
					defs, $root, $model, globalHandlers
				}, async (defs) => {
					if (valuesInit != null) {
						await valuesInit({defs, root: $root, model: $model, global: globalHandlers});
					}
				});
				layout(loadedDefs, orderedDefs);
			})();
		}
		const onCustomEvent = async (_key: string, prefix: string, clipped: string) => {
			if (!state.initialized || prefix !== PlanSelectionGlobalEventPrefix.RELOAD_DEFS || clipped !== marker) {
				return;
			}
			// setState(state => ({initialized: false, marker: state.marker}));
			const {defs: loadedDefs, orderedDefs} = await loadDefs({
				defs, $root, $model, globalHandlers
			}, async (defs) => {
				if (valuesClear != null) {
					await valuesClear({defs, root: $root, model: $model, global: globalHandlers});
				}
			});
			layout(loadedDefs, orderedDefs);
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [
		onGlobal, offGlobal, globalHandlers,
		state.initialized,
		marker, defs, $root, $model, valuesInit, valuesClear,
		columns, columnWidth, lineHeaderWidth
	]);
	useEffect(() => {
		const onSwitchPage = (pageNumber: number) => {
			const defs = state.defs ?? [];
			setState(state => {
				const displayPlanDefs = defs.slice((pageNumber - 1) * state.pageSize, pageNumber * state.pageSize);
				const computedColumnCount = displayPlanDefs.length;
				const [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);
				return {
					...state, displayPlanDefs, pageNumber,
					computedColumnCount, computedColumnWidth, computedLineHeaderWidth
				};
			});
		};
		on(PlanSelectionEventTypes.SWITCH_PAGE, onSwitchPage);
		return () => {
			off(PlanSelectionEventTypes.SWITCH_PAGE, onSwitchPage);
		};
	}, [on, off, state.defs, state.orderedDefs, columnWidth, lineHeaderWidth]);

	return state;
};
