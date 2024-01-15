import {BaseModel, MUtils, PPUtils, PropValue, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {LabelLike} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import React from 'react';
import {PlanElement} from './plan-element';
import {PlanCode, PlanSelectionProps, SelectedPlans} from './types';
import {useDefs} from './use-defs';
import {
	buildPlanOrElementDefCodesMap,
	computeColumnWidth,
	findSelectedPlan,
	guardPlanSubTitle,
	guardPlanTitle,
	PlanDefCodesMap
} from './utils';
import {APlanSelection, PlanHeader, PlanHeaderSubTitle, PlanHeaderTitle, PlanSelectionTopLeftCorner} from './widgets';

export const PlanSelection = (props: PlanSelectionProps) => {
	const {
		$pp, $wrapped,
		columns = 3, columnWidth, lineHeaderWidth, maxHeight,
		defs,
		currencySymbol, premiumDescription,
		planTitle, planSubTitle, elementTitle, elementFixedValue,
		...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {initialized, defs: planDefs, orderedDefs} = useDefs(defs);
	if (!initialized) {
		return null;
	}

	const computedColumnCount = Math.min((planDefs ?? []).length, columns);
	const [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);

	// TODO there might be pages
	const displayPlanDefs = (planDefs ?? []).slice(0, computedColumnCount);
	const displayPlanDefCodesMap = displayPlanDefs.reduce((map, def) => {
		map[def.code] = buildPlanOrElementDefCodesMap(() => def.elements ?? []);
		return map;
	}, {} as Record<PlanCode, PlanDefCodesMap>);
	let plansData = MUtils.getValue($wrapped.$model, $pp) as unknown as SelectedPlans;
	if (plansData == null) {
		// guard plans instance model
		plansData = {};
		MUtils.setValue($wrapped.$model, $pp, plansData as unknown as PropValue);
	}

	return <APlanSelection {...rest} data-disabled={$disabled} data-visible={$visible}
	                       columnCount={computedColumnCount}
	                       computedColumnWidth={computedColumnWidth} computedLineHeaderWidth={computedLineHeaderWidth}
	                       maxHeight={maxHeight}
	                       id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<PlanSelectionTopLeftCorner/>
		{displayPlanDefs.map((planDef, displayIndex) => {
			const planData = findSelectedPlan(plansData, planDef.code);
			// merge instance data and definition data
			const model = {def: planDef, data: planData} as unknown as PropValue;
			const root = {$plans: model} as unknown as BaseModel;
			const $myWrapped: WrappedAttributes = {
				$root: root, $model: model, $p2r: '$plans',
				$onValueChange: VUtils.noop, $avs: {}
			};
			// index starts from 0
			const odd = displayIndex % 2 === 0;

			return <PlanHeader data-odd={odd} key={planDef.code}>
				<PlanHeaderTitle>
					{guardPlanTitle({def: planTitle, planDef}).map(label => {
						return <LabelLike key={nanoid()} label={label} $wrapped={$myWrapped}/>;
					})}
				</PlanHeaderTitle>
				<PlanHeaderSubTitle>
					{guardPlanSubTitle({def: planSubTitle, currencySymbol, premiumDescription, planDef}).map(label => {
						return <LabelLike key={nanoid()} label={label} $wrapped={$myWrapped}/>;
					})}
				</PlanHeaderSubTitle>
			</PlanHeader>;
		})}
		{(orderedDefs ?? []).map(orderedDef => {
			return <PlanElement orderedDef={orderedDef}
			                    displayPlanDefs={displayPlanDefs} displayPlanDefCodesMap={displayPlanDefCodesMap}
			                    elementTitle={elementTitle} elementLevel={0}
			                    plansModel={plansData}
			                    elementFixedValue={elementFixedValue}
			                    key={orderedDef.code}/>;
		})}
	</APlanSelection>;
};
