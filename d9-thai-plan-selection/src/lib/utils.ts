import {NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {CaptionDef, CaptionValueToLabelFormats, LabelDef, Utils} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {
	PlanCategoryDef,
	PlanCode,
	PlanDef,
	PlanElementCode,
	PlanElementDef,
	PlanElementType,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlans
} from './types';
import {PlanElementDefOrdered} from './use-defs';

export const isCategoryPlanElementDef = (def: PlanElementDef): def is PlanCategoryDef => {
	return def.type === PlanElementType.CATEGORY;
};

export const computeColumnWidth = (
	columns: PlanSelectionDef['columns'],
	columnWidth?: PlanSelectionDef['columnWidth'],
	lineHeaderWidth?: PlanSelectionDef['lineHeaderWidth']): [PlanSelectionDef['columnWidth'], PlanSelectionDef['lineHeaderWidth']] => {
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

export const findSelectedPlan = (plans: SelectedPlans, code: PlanCode): SelectedPlan => {
	let found = plans[code];
	if (found == null) {
		found = {code, selected: false, elements: {}};
		plans[code] = found;
	}
	return found;
};

export const guardPlanTitle = (options: {
	def?: PlanSelectionDef['planTitle']; planDef: PlanDef;
}): Array<NodeDef> => {
	const {def, planDef} = options;
	return def != null
		? def(planDef)
		: [{$wt: 'Caption', text: planDef.name} as LabelDef];
};

export const guardPlanSubTitle = (options: {
	def?: PlanSelectionDef['planSubTitle'];
	currencySymbol?: string | ReactNode; premiumDescription?: string | ReactNode;
	planDef: PlanDef;
}): Array<NodeDef> => {
	const {def, currencySymbol, premiumDescription, planDef} = options;

	return def != null
		? def(planDef, currencySymbol, premiumDescription)
		: [
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

export const guardElementTitle = (options: {
	def?: PlanSelectionDef['elementTitle']; orderedDef: PlanElementDefOrdered; elementLevel: number;
}): Array<NodeDef> => {
	const {def, orderedDef, elementLevel} = options;
	const {def: elementDef} = orderedDef;
	const domElementAttr = {};
	switch (elementDef.type) {
		case PlanElementType.CATEGORY:
			domElementAttr['data-plan-element-category'] = true;
			break;
		case PlanElementType.COVERAGE:
			domElementAttr['data-plan-element-coverage'] = true;
			break;
		case PlanElementType.BENEFIT:
			domElementAttr['data-plan-element-benefit'] = true;
			break;
		case PlanElementType.LIMIT_DEDUCTIBLE:
			domElementAttr['data-plan-element-limit-deductible'] = true;
			break;
		default:
			domElementAttr['data-plan-element-unknown'] = true;
			break;
	}
	return def != null
		? def(elementDef, elementLevel)
		: [{
			$wt: 'Caption', text: elementDef.name,
			'data-plan-element-level': elementLevel, ...domElementAttr
		} as LabelDef];
};

export type PlanElementDefCodesMap = {
	def: PlanElementDef;
	children?: Record<PlanElementCode, PlanElementDefCodesMap>
};

export type PlanDefCodesMap = Record<PlanElementCode, PlanElementDefCodesMap>;

export const buildPlanOrElementDefCodesMap = (elements: () => Array<PlanElementDef>): PlanDefCodesMap => {
	return elements().reduce((map, element) => {
		map[element.code] = {
			def: element,
			children: (element.children == null || element.children.length === 0)
				? (void 0)
				: buildPlanOrElementDefCodesMap(() => element.children ?? [])
		} as PlanElementDefCodesMap;
		return map;
	}, {} as Record<PlanElementCode, PlanElementDefCodesMap>);
};

export const findPlanElementDef = (map: PlanDefCodesMap, codes: Array<PlanElementCode>): Undefinable<PlanElementDef> => {
	return codes.reduce((map, code, index) => {
		if (index === 0) {
			return map?.[code];
		} else {
			return map?.children?.[code];
		}
	}, map)?.def;
};