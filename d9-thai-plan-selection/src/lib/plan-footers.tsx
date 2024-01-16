import {BaseModel, PPUtils, PropertyPath, PropValue, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {LabelLike} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import React from 'react';
import {PlanDefs, PlanSelectionProps, SelectedPlans} from './types';
import {createPlanModelProxy, findSelectedPlan, guardPlanOperators} from './utils';
import {PlanFooter, PlanFooterOperator, PlanSelectionBottomLeftCorner} from './widgets';

export interface PlanFooterProps {
	$root: BaseModel;
	/** $root + $p2r => plans */
	$p2r: PropertyPath;
	displayPlanDefs: PlanDefs;
	plans: SelectedPlans;
	planOperators?: PlanSelectionProps['planOperators'];
	buyText?: PlanSelectionProps['buyText'];
	buy?: PlanSelectionProps['buy'];
}

export const PlanFooters = (props: PlanFooterProps) => {
	const {
		$root, $p2r, displayPlanDefs, plans,
		planOperators, buyText, buy
	} = props;

	return <>
		<PlanSelectionBottomLeftCorner/>
		{displayPlanDefs.map((planDef, displayIndex) => {
			const planData = findSelectedPlan(plans, planDef.code);
			// index starts from 0
			const odd = displayIndex % 2 === 0;
			// merge instance data and definition data
			const model = createPlanModelProxy(planData, planDef) as unknown as PropValue;
			const $myWrapped: WrappedAttributes = {
				$root, $model: model, $p2r: PPUtils.concat($p2r, planDef.code),
				$onValueChange: VUtils.noop, $avs: {}
			};
			return <PlanFooter data-odd={odd} key={planDef.code}>
				<PlanFooterOperator>
					{guardPlanOperators({
						def: planOperators, planDef, planModel: planData, text: buyText, click: buy
					}).map(label => {
						return <LabelLike key={nanoid()} label={label} $wrapped={$myWrapped}/>;
					})}
				</PlanFooterOperator>
			</PlanFooter>;
		})}
	</>;
};