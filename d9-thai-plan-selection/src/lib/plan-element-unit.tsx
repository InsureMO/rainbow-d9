import {BaseModel, PropertyPath, VUtils} from '@rainbow-d9/n1';
import {LabelLike} from '@rainbow-d9/n2';
import React from 'react';
import {PlanElementValueDef, SelectedPlanElement} from './types';
import {PlanElementUnitLabel} from './widgets';

export interface PlanElementUnitProps {
	valueDef: PlanElementValueDef;
	$p2r: PropertyPath;
	$root: BaseModel;
	values: SelectedPlanElement['values'];
}

export const PlanElementUnit = (props: PlanElementUnitProps) => {
	const {valueDef, $root, $p2r, values: valuesModel} = props;

	const {unit} = valueDef;

	const unit$wrapped = {
		$root, $model: valuesModel, $p2r, $onValueChange: VUtils.noop, $avs: {}
	};
	return <PlanElementUnitLabel>
		<LabelLike label={unit} $wrapped={unit$wrapped}/>
	</PlanElementUnitLabel>;
};