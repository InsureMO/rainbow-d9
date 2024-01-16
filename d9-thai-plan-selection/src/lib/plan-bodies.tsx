import {BaseModel, PropertyPath} from '@rainbow-d9/n1';
import React from 'react';
import {PlanElement} from './plan-element';
import {PlanCode, PlanDefs, PlanSelectionProps, SelectedPlans} from './types';
import {PlanDefOrdered} from './use-defs';
import {buildPlanOrElementDefCodesMap, PlanDefCodesMap} from './utils';

export interface PlanBodiesProps {
	$root: BaseModel;
	/** $root + $p2r => plans */
	$p2r: PropertyPath;
	displayPlanDefs: PlanDefs;
	orderedDefs: PlanDefOrdered;
	plans: SelectedPlans;
	elementTitle?: PlanSelectionProps['elementTitle'];
	elementOptionsValue?: PlanSelectionProps['elementOptionsValue'];
	elementNumberValue?: PlanSelectionProps['elementNumberValue'];
	elementNumberValueValidator?: PlanSelectionProps['elementNumberValueValidator'];
	elementFixedValue?: PlanSelectionProps['elementFixedValue'];
}

export const PlanBodies = (props: PlanBodiesProps) => {
	const {
		$root, $p2r, displayPlanDefs, orderedDefs, plans,
		elementTitle, elementOptionsValue, elementNumberValue, elementNumberValueValidator, elementFixedValue
	} = props;

	const displayPlanDefCodesMap = displayPlanDefs.reduce((map, def) => {
		map[def.code] = buildPlanOrElementDefCodesMap(() => def.elements ?? []);
		return map;
	}, {} as Record<PlanCode, PlanDefCodesMap>);

	return <>
		{(orderedDefs ?? []).map(orderedDef => {
			return <PlanElement orderedDef={orderedDef}
			                    displayPlanDefs={displayPlanDefs} displayPlanDefCodesMap={displayPlanDefCodesMap}
			                    elementTitle={elementTitle} elementLevel={0}
			                    plansModel={plans} $root={$root} $p2r={$p2r}
			                    elementOptionsValue={elementOptionsValue}
			                    elementNumberValue={elementNumberValue}
			                    elementNumberValueValidator={elementNumberValueValidator}
			                    elementFixedValue={elementFixedValue}
			                    key={orderedDef.code}/>;
		})}
	</>;
};