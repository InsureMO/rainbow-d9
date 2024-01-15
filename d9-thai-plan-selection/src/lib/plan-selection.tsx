import {BaseModel, MUtils, PPUtils, PropValue, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {LabelLike} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import React from 'react';
import {PlanSelectionProps, SelectedPlans} from './types';
import {useDefs} from './use-defs';
import {computeColumnWidth, findSelectedPlan, guardPlanSubTitle, guardPlanTitle} from './utils';
import {APlanSelection, PlanHeader, PlanHeaderSubTitle, PlanHeaderTitle, PlanSelectionTopLeftCorner} from './widgets';

export const PlanSelection = (props: PlanSelectionProps) => {
	const {
		$pp, $wrapped,
		columns = 3, columnWidth, lineHeaderWidth, maxHeight,
		defs,
		currencySymbol, premiumDescription,
		planTitle, planSubTitle,
		...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {initialized, defs: planDefs} = useDefs(defs);
	if (!initialized) {
		return null;
	}

	const computedColumnCount = Math.min((planDefs ?? []).length, columns);
	const [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);

	// TODO there might be pages
	const displayPlanDefs = (planDefs ?? []).slice(0, computedColumnCount);
	let plansModel = MUtils.getValue($wrapped.$model, $pp) as unknown as SelectedPlans;
	if (plansModel == null) {
		// guard plans instance model
		plansModel = [];
		MUtils.setValue($wrapped.$model, $pp, plansModel as unknown as PropValue);
	}

	return <APlanSelection {...rest} data-disabled={$disabled} data-visible={$visible}
	                       columnCount={computedColumnCount}
	                       computedColumnWidth={computedColumnWidth} computedLineHeaderWidth={computedLineHeaderWidth}
	                       maxHeight={maxHeight}
	                       id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<PlanSelectionTopLeftCorner/>
		{displayPlanDefs.map((planDef, index) => {
			const [data] = findSelectedPlan(planDef.code, plansModel);
			const model = {def: planDef, data};
			// read from definition data
			const $myWrapped: WrappedAttributes = {
				$root: model as unknown as BaseModel, $model: model as unknown as PropValue, $p2r: '.',
				$onValueChange: VUtils.noop, $avs: {}
			};
			// index starts from 0
			const odd = index % 2 === 0;

			return <PlanHeader data-odd={odd} key={planDef.code}>
				<PlanHeaderTitle>
					{guardPlanTitle(planTitle).map(label => {
						return <LabelLike key={nanoid()} label={label} $wrapped={$myWrapped}/>;
					})}
				</PlanHeaderTitle>
				<PlanHeaderSubTitle>
					{guardPlanSubTitle({def: planSubTitle, currencySymbol, premiumDescription}).map(label => {
						return <LabelLike key={nanoid()} label={label} $wrapped={$myWrapped}/>;
					})}
				</PlanHeaderSubTitle>
			</PlanHeader>;
		})}
	</APlanSelection>;
};
