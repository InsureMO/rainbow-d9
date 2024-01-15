import {NodeDef, VUtils} from '@rainbow-d9/n1';
import {CaptionDef, CaptionValueToLabelFormats, LabelDef, Utils} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {PlanCode, PlanSelectionProps, SelectedPlan, SelectedPlans} from './types';

export const computeColumnWidth = (
	columns: PlanSelectionProps['columns'],
	columnWidth?: PlanSelectionProps['columnWidth'],
	lineHeaderWidth?: PlanSelectionProps['lineHeaderWidth']): [PlanSelectionProps['columnWidth'], PlanSelectionProps['lineHeaderWidth']] => {
	if (columnWidth != null && VUtils.isNotBlank(columnWidth)) {
		if (lineHeaderWidth != null && VUtils.isNotBlank(lineHeaderWidth)) {
			return [columnWidth, lineHeaderWidth];
		} else {
			return [columnWidth, `calc(100% - (${Utils.toCssSize(columnWidth)} * ${columns}))`];
		}
	}
	if (lineHeaderWidth != null && VUtils.isNotBlank(lineHeaderWidth)) {
		return [`calc((100% - ${Utils.toCssSize(lineHeaderWidth)}) / ${columns})`, lineHeaderWidth];
	}
	switch (columns) {
		case 2:
			return ['30%', '40%'];
		case 3:
			return ['20%', '40%'];
		case 4:
			return ['15%', '40%'];
		default:
			return ['1fr', '3fr'];
	}
};
export const findSelectedPlan = (code: PlanCode, plansModel: SelectedPlans): [SelectedPlan, number] => {
	const foundIndex = plansModel.findIndex(plan => plan.code === code);
	if (foundIndex === -1) {
		const created: SelectedPlan = {code, selected: false, elements: []};
		plansModel.push(created);
		return [created, plansModel.length - 1];
	} else {
		const found = plansModel[foundIndex];
		found.elements = found.elements ?? [];
		return [found, foundIndex];
	}
};

export const guardPlanTitle = (def?: Array<NodeDef>): Array<NodeDef> => {
	return def ?? [{$wt: 'Label', $pp: 'def.name'} as LabelDef];
};

export const guardPlanSubTitle = (options: {
	def?: Array<NodeDef>; currencySymbol?: string | ReactNode; premiumDescription?: string | ReactNode;
}): Array<NodeDef> => {
	const {def, currencySymbol, premiumDescription} = options;

	return def ?? [
		{
			$wt: 'Label', $pp: 'data.premium.due',
			'data-plan-premium': true,
			valueToLabel: (value, formats: CaptionValueToLabelFormats) => {
				try {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return value == null ? '' : formats.nf0(value);
				} catch (e) {
					console.error(e);
					return value == null ? '' : value;
				}
			},
			leads: [currencySymbol].filter(x => VUtils.isNotBlank(x))
		} as LabelDef,
		{
			$wt: 'Caption', 'data-plan-premium-desc': true, text: premiumDescription
		} as CaptionDef
	];
};