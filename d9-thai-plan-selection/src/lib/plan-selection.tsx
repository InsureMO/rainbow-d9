import {MUtils, PPUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PlanSelectionEventBusProvider} from './event/plan-selection-event-bus';
import {PlanBodies} from './plan-bodies';
import {PlanFooters} from './plan-footers';
import {PlanHeaders} from './plan-headers';
import {PlanSelectionValueHandler} from './plan-selection-value-handler';
import {PlanSelectionProps, SelectedPlans} from './types';
import {useDefs} from './use-defs';
import {computeColumnWidth} from './utils';
import {APlanSelection} from './widgets';

export const PlanSelection = (props: PlanSelectionProps) => {
	const {
		$pp, $wrapped,
		columns = 3, columnWidth, lineHeaderWidth, maxHeight,
		defs,
		currencySymbol, premiumDescription, buyText, buy,
		planTitle, planSubTitle, elementTitle,
		elementOptionsValue, elementNumberValue, elementNumberValueValidator, elementFixedValue,
		planOperators,
		calculate, calculationDelay = 1,
		...rest
	} = props;
	const {$root, $p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {initialized, defs: planDefs, orderedDefs} = useDefs(defs);
	if (!initialized) {
		return null;
	}

	const computedColumnCount = Math.min((planDefs ?? []).length, columns);
	const [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);

	// TODO there might be pages
	const displayPlanDefs = (planDefs ?? []).slice(0, computedColumnCount);
	let plansData = MUtils.getValue($wrapped.$model, $pp) as unknown as SelectedPlans;
	if (plansData == null) {
		// guard plans instance model
		plansData = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		MUtils.setValue($wrapped.$model, $pp, plansData);
	}
	const $p2rOfPlans = PPUtils.concat($p2r, $pp);

	return <PlanSelectionEventBusProvider>
		<PlanSelectionValueHandler calculate={calculate} calculationDelay={calculationDelay}/>
		<APlanSelection {...rest} data-disabled={$disabled} data-visible={$visible}
		                columnCount={computedColumnCount}
		                computedColumnWidth={computedColumnWidth} computedLineHeaderWidth={computedLineHeaderWidth}
		                maxHeight={maxHeight}
		                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
			<PlanHeaders $root={$root} $p2r={$p2rOfPlans}
			             displayPlanDefs={displayPlanDefs} plans={plansData}
			             planTitle={planTitle} planSubTitle={planSubTitle}
			             currencySymbol={currencySymbol} premiumDescription={premiumDescription}/>
			<PlanBodies $root={$root} $p2r={$p2rOfPlans}
			            displayPlanDefs={displayPlanDefs} orderedDefs={orderedDefs} plans={plansData}
			            elementTitle={elementTitle}
			            elementOptionsValue={elementOptionsValue}
			            elementNumberValue={elementNumberValue}
			            elementNumberValueValidator={elementNumberValueValidator}
			            elementFixedValue={elementFixedValue}/>
			<PlanFooters $root={$root} $p2r={$p2rOfPlans}
			             displayPlanDefs={displayPlanDefs} plans={plansData}
			             planOperators={planOperators} buyText={buyText} buy={buy}/>
		</APlanSelection>
	</PlanSelectionEventBusProvider>;
};
