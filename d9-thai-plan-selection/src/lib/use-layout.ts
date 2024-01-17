import {useEffect, useState} from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanDefs, PlanSelectionProps} from './types';
import {computeColumnWidth} from './utils';

export interface PlanSelectionLayout {
	initialized: boolean;
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
	planDefsInitialized: boolean, planDefs: PlanDefs,
	columns?: number, columnWidth?: PlanSelectionProps['columnWidth'], lineHeaderWidth?: PlanSelectionProps['lineHeaderWidth']
): PlanSelectionLayout => {
	const {on, off} = usePlanSelectionEventBus();
	const [state, setState] = useState<PlanSelectionLayout>({
		initialized: false, displayPlanDefs: [],
		computedColumnCount: -1, computedColumnWidth: -1, computedLineHeaderWidth: -1
	});
	useEffect(() => {
		if (!planDefsInitialized) {
			return;
		}

		const defs = planDefs ?? [];
		const planCount = defs.length;
		let computedColumnCount = Math.min(planCount, columns);
		let computedColumnWidth: number | string;
		let computedLineHeaderWidth: number | string;
		if (computedColumnCount <= 0) {
			computedColumnCount = planCount;
			[computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(-1, columnWidth, lineHeaderWidth);
			setState({
				initialized: true, displayPlanDefs: defs,
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
						initialized: true, displayPlanDefs, pageCount, pageNumber, pageSize: computedColumnCount,
						computedColumnCount, computedColumnWidth, computedLineHeaderWidth
					};
				});
			} else {
				setState({
					initialized: true, displayPlanDefs: defs,
					computedColumnCount, computedColumnWidth, computedLineHeaderWidth
				});
			}
		}
	}, [planDefsInitialized, planDefs, columns, columnWidth, lineHeaderWidth]);
	useEffect(() => {
		const onSwitchPage = (pageNumber: number) => {
			const defs = planDefs ?? [];
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
	}, [on, off, planDefs, columnWidth, lineHeaderWidth]);

	return state;
};
