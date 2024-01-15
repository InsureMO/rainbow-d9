import {BaseModel, PropValue, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {Icons, LabelLike} from '@rainbow-d9/n2';
import {nanoid} from 'nanoid';
import React from 'react';
import {PlanElementValues} from './plan-element-values';
import {PlanCode, PlanDefs, PlanElementCode, PlanMutableElementDef, PlanSelectionDef, SelectedPlans} from './types';
import {PlanElementDefOrdered} from './use-defs';
import {
	findPlanElementDef,
	findSelectedPlan,
	guardElementTitle,
	isCategoryPlanElementDef,
	PlanDefCodesMap
} from './utils';
import {PlanElementCell, PlanElementColumnHeader, PlanElementColumnHeaderTitle} from './widgets';

export interface PlanElementProps {
	orderedDef: PlanElementDefOrdered;
	displayPlanDefs: PlanDefs;
	displayPlanDefCodesMap: Record<PlanCode, PlanDefCodesMap>;
	elementTitle?: PlanSelectionDef['elementTitle'];
	elementLevel: number;
	ancestorCodes?: Array<PlanElementCode>;
	plansModel: SelectedPlans;
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
}

export const PlanElement = (props: PlanElementProps) => {
	const {
		orderedDef, displayPlanDefs, displayPlanDefCodesMap,
		elementTitle, elementLevel, ancestorCodes,
		plansModel,
		elementFixedValue
	} = props;

	const model = {def: orderedDef} as unknown as PropValue;
	const root = {$plans: model} as unknown as BaseModel;
	const $titleWrapped: WrappedAttributes = {
		$root: root, $model: model, $p2r: '$plans', $onValueChange: VUtils.noop, $avs: {}
	};

	const elementCode = orderedDef.code;
	// element codes from root to current element
	const elementCodes = ancestorCodes == null ? [elementCode] : [...ancestorCodes, elementCode];

	return <>
		<PlanElementColumnHeader>
			<PlanElementColumnHeaderTitle>
				{guardElementTitle({def: elementTitle, orderedDef, elementLevel}).map(label => {
					return <LabelLike key={nanoid()} label={label} $wrapped={$titleWrapped}/>;
				})}
			</PlanElementColumnHeaderTitle>
		</PlanElementColumnHeader>
		{displayPlanDefs.map((planDef, displayIndex) => {
			const odd = displayIndex % 2 === 0;
			const {code: planCode} = planDef;
			// get plan def codes map
			const planDefCodesMap = displayPlanDefCodesMap[planCode];
			// get element def from codes map
			const elementDef = findPlanElementDef(planDefCodesMap, elementCodes);
			const key = `${planCode}\t${elementCodes.join('\t')}`;
			if (elementDef == null) {
				return <PlanElementCell data-odd={odd} data-element-lack={true} key={key}>
					<Icons.Times/>
				</PlanElementCell>;
			} else if (isCategoryPlanElementDef(elementDef)) {
				return <PlanElementCell data-odd={odd} data-element-cateogry={true} key={key}>
					<Icons.Check/>
				</PlanElementCell>;
			} else {
				const planData = findSelectedPlan(plansModel, planDef.code);
				return <PlanElementCell data-odd={odd} key={key}>
					<PlanElementValues element={elementDef as PlanMutableElementDef} elementCodes={elementCodes}
					                   plan={planData}
					                   elementFixedValue={elementFixedValue}/>
				</PlanElementCell>;
			}
		})}
		{(orderedDef.children ?? []).map(childOrderedDef => {
			return <PlanElement orderedDef={childOrderedDef}
			                    displayPlanDefs={displayPlanDefs} displayPlanDefCodesMap={displayPlanDefCodesMap}
			                    elementTitle={elementTitle} elementLevel={elementLevel + 1} ancestorCodes={elementCodes}
			                    plansModel={plansModel}
			                    elementFixedValue={elementFixedValue}
			                    key={childOrderedDef.code}/>;
		})}
	</>;
};
