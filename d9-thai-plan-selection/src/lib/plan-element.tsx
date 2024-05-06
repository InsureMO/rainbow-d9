import {BaseModel, PPUtils, PropertyPath, PropValue, useForceUpdate, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {Icons, LabelLike} from '@rainbow-d9/n2';
import React from 'react';
import {PlanElementCell} from './plan-element-cell';
import {PlanElementValues} from './plan-element-values';
import {PlanCode, PlanDefs, PlanElementCode, PlanMutableElementDef, PlanSelectionDef, SelectedPlans} from './types';
import {PlanElementDefOrdered} from './use-defs';
import {
	createPlanModelProxy,
	findPlanElementDef,
	findSelectedPlan,
	guardElementTitle,
	isCategoryPlanElementDef,
	PlanDefCodesMap
} from './utils';
import {PlanElementColumnHeader, PlanElementColumnHeaderTitle} from './widgets';

export interface PlanElementProps {
	orderedDef: PlanElementDefOrdered;
	displayPlanDefs: PlanDefs;
	displayPlanDefCodesMap: Record<PlanCode, PlanDefCodesMap>;
	elementTitle?: PlanSelectionDef['elementTitle'];
	elementLevel: number;
	ancestorCodes?: Array<PlanElementCode>;
	ancestorCollapsed?: boolean;
	/** $root + $p2r => plansModel */
	plansModel: SelectedPlans;
	$root: BaseModel;
	$p2r: PropertyPath;
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
	elementOptionsValue?: PlanSelectionDef['elementOptionsValue'];
	elementNumberValue?: PlanSelectionDef['elementNumberValue'];
	elementNumberValueValidator?: PlanSelectionDef['elementNumberValueValidator'];
}

export const PlanElement = (props: PlanElementProps) => {
	const {
		orderedDef, displayPlanDefs, displayPlanDefCodesMap,
		elementTitle, elementLevel, ancestorCollapsed, ancestorCodes,
		plansModel, $root, $p2r,
		elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator
	} = props;

	const forceUpdate = useForceUpdate();

	const model = createPlanModelProxy(plansModel, orderedDef) as unknown as PropValue;
	const $titleWrapped: WrappedAttributes = {$root, $model: model, $p2r, $onValueChange: VUtils.noop, $avs: {}};

	const elementCode = orderedDef.code;
	// element codes from root to current element
	const elementCodes = ancestorCodes == null ? [elementCode] : [...ancestorCodes, elementCode];

	return <>
		<PlanElementColumnHeader data-plan-element-level={elementLevel}
		                         data-collapsed={orderedDef.def.collapsed ?? false}
		                         data-ancestor-collapsed={ancestorCollapsed ?? false}>
			<PlanElementColumnHeaderTitle>
				{guardElementTitle({def: elementTitle, orderedDef, elementLevel, forceUpdate})
					.map((label, index) => {
						return <LabelLike key={index} label={label} $wrapped={$titleWrapped}/>;
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
				return <PlanElementCell odd={odd} lack={true} ancestorCollapsed={ancestorCollapsed ?? false} key={key}>
					<Icons.Times/>
				</PlanElementCell>;
			} else if (isCategoryPlanElementDef(elementDef)) {
				return <PlanElementCell odd={odd} category={true} ancestorCollapsed={ancestorCollapsed ?? false}
				                        elementDef={elementDef} key={key}>
					<Icons.Check/>
				</PlanElementCell>;
			} else {
				const planData = findSelectedPlan(plansModel, planDef.code);
				return <PlanElementCell odd={odd} ancestorCollapsed={ancestorCollapsed ?? false}
				                        elementDef={elementDef} key={key}>
					<PlanElementValues elementDef={elementDef as PlanMutableElementDef} elementCodes={elementCodes}
					                   planDef={planDef} plan={planData}
					                   plans={plansModel} $root={$root} $p2r={PPUtils.concat($p2r, planCode)}
					                   elementFixedValue={elementFixedValue} elementOptionsValue={elementOptionsValue}
					                   elementNumberValue={elementNumberValue}
					                   elementNumberValueValidator={elementNumberValueValidator}/>
				</PlanElementCell>;
			}
		})}
		{(orderedDef.children ?? []).map(childOrderedDef => {
			return <PlanElement orderedDef={childOrderedDef}
			                    ancestorCollapsed={ancestorCollapsed || orderedDef.def.collapsed}
			                    displayPlanDefs={displayPlanDefs} displayPlanDefCodesMap={displayPlanDefCodesMap}
			                    elementTitle={elementTitle} elementLevel={elementLevel + 1} ancestorCodes={elementCodes}
			                    plansModel={plansModel} $root={$root} $p2r={$p2r}
			                    elementFixedValue={elementFixedValue} elementOptionsValue={elementOptionsValue}
			                    elementNumberValue={elementNumberValue}
			                    elementNumberValueValidator={elementNumberValueValidator}
			                    key={childOrderedDef.code}/>;
		})}
	</>;
};
