import {MUtils, PPUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PlanSelectionEventBusProvider} from './event/plan-selection-event-bus';
import {PlanBodies} from './plan-bodies';
import {PlanFooters} from './plan-footers';
import {PlanHeaders} from './plan-headers';
import {PlanSelectionValueHandler} from './plan-selection-value-handler';
import {PlanSelectionProps, SelectedPlans} from './types';
import {useDefs} from './use-defs';
import {useLayout} from './use-layout';
import {APlanSelection} from './widgets';

export const InternalPlanSelection = (props: PlanSelectionProps) => {
	const {
		$pp, $wrapped,
		columns = 3, columnWidth, lineHeaderWidth, maxHeight,
		currencySymbol, premiumDescription, buyText, buy,
		planTitle, planSubTitle, elementTitle,
		elementFixedValue, elementOptionsValue,
		elementNumberValue, elementNumberValueValidator,
		planOperators,
		calculate, calculationDelay = 1,
		...rest
	} = props;
	const {$root, $p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {initialized: planDefsInitialized, defs: planDefs, orderedDefs} = useDefs(props);
	const layout = useLayout(planDefsInitialized, planDefs, columns, columnWidth, lineHeaderWidth);
	if (!layout.initialized) {
		return null;
	}

	let plansData = MUtils.getValue($wrapped.$model, $pp) as unknown as SelectedPlans;
	if (plansData == null) {
		// guard plans instance model
		plansData = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		MUtils.setValue($wrapped.$model, $pp, plansData);
	}
	const $p2rOfPlans = PPUtils.concat($p2r, $pp);

	return <>
		<PlanSelectionValueHandler calculate={calculate} calculationDelay={calculationDelay}/>
		<APlanSelection {...rest} data-disabled={$disabled} data-visible={$visible}
		                columnCount={layout.computedColumnCount}
		                computedColumnWidth={layout.computedColumnWidth}
		                computedLineHeaderWidth={layout.computedLineHeaderWidth}
		                maxHeight={maxHeight}
		                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
			<PlanHeaders $root={$root} $p2r={$p2rOfPlans}
			             displayPlanDefs={layout.displayPlanDefs} plans={plansData}
			             planTitle={planTitle} planSubTitle={planSubTitle}
			             currencySymbol={currencySymbol} premiumDescription={premiumDescription}
			             pageCount={layout.pageCount} pageNumber={layout.pageNumber}/>
			<PlanBodies $root={$root} $p2r={$p2rOfPlans}
			            displayPlanDefs={layout.displayPlanDefs} orderedDefs={orderedDefs} plans={plansData}
			            elementTitle={elementTitle}
			            elementOptionsValue={elementOptionsValue}
			            elementNumberValue={elementNumberValue}
			            elementNumberValueValidator={elementNumberValueValidator}
			            elementFixedValue={elementFixedValue}/>
			<PlanFooters $root={$root} $p2r={$p2rOfPlans}
			             displayPlanDefs={layout.displayPlanDefs} plans={plansData}
			             planOperators={planOperators} buyText={buyText} buy={buy}/>
		</APlanSelection>
	</>;
};

export const PlanSelection = (props: PlanSelectionProps) => {
	return <PlanSelectionEventBusProvider>
		<InternalPlanSelection {...props}/>
	</PlanSelectionEventBusProvider>;
};
