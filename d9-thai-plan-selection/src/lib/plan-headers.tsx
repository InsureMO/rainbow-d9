import {BaseModel, PropertyPath} from '@rainbow-d9/n1';
import React from 'react';
import {PlanHeader} from './plan-header';
import {PlanDefs, PlanSelectionProps, SelectedPlans} from './types';
import {PlanSelectionTopLeftCorner} from './widgets';

export interface PlanHeadersProps {
	$root: BaseModel;
	/** $root + $p2r => plans */
	$p2r: PropertyPath;
	displayPlanDefs: PlanDefs;
	plans: SelectedPlans;
	planTitle?: PlanSelectionProps['planTitle'];
	planSubTitle?: PlanSelectionProps['planSubTitle'];
	currencySymbol?: PlanSelectionProps['currencySymbol'];
	premiumDescription?: PlanSelectionProps['premiumDescription'];
}

export const PlanHeaders = (props: PlanHeadersProps) => {
	const {
		$root, $p2r, displayPlanDefs, plans,
		planTitle, planSubTitle, currencySymbol, premiumDescription
	} = props;

	return <>
		<PlanSelectionTopLeftCorner/>
		{displayPlanDefs.map((planDef, displayIndex) => {
			return <PlanHeader $root={$root} $p2r={$p2r} plans={plans}
			                   displayIndex={displayIndex} planDef={planDef}
			                   planTitle={planTitle} planSubTitle={planSubTitle}
			                   currencySymbol={currencySymbol} premiumDescription={premiumDescription}
			                   key={planDef.code}/>;
		})}
	</>;
};