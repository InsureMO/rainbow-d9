import {NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ButtonClick, ButtonDef, CaptionDef, CaptionValueToLabelFormats, LabelDef, Utils} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {
	PlanBenefitDef,
	PlanCategoryDef,
	PlanCode,
	PlanCoverageDef,
	PlanDef,
	PlanElementCode,
	PlanElementDef,
	PlanElementFixedValueDef,
	PlanElementNumberValueDef,
	PlanElementOptionsValueDef,
	PlanElementType,
	PlanElementValueDef,
	PlanElementValueEditType,
	PlanLimitDeductibleDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlans
} from './types';
import {PlanElementDefOrdered} from './use-defs';

export const redressPlanMarker = (content: Pick<PlanSelectionDef, 'marker'>) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	return VUtils.generateUniqueId();
};

export const isCategoryPlanElementDef = (def: PlanElementDef): def is PlanCategoryDef => {
	return def.type === PlanElementType.CATEGORY;
};
// noinspection JSUnusedGlobalSymbols
export const isCoveragePlanElementDef = (def: PlanElementDef): def is PlanCoverageDef => {
	return def.type === PlanElementType.COVERAGE;
};
// noinspection JSUnusedGlobalSymbols
export const isBenefitPlanElementDef = (def: PlanElementDef): def is PlanBenefitDef => {
	return def.type === PlanElementType.BENEFIT;
};
// noinspection JSUnusedGlobalSymbols
export const isLimitDeductiblePlanElementDef = (def: PlanElementDef): def is PlanLimitDeductibleDef => {
	return def.type === PlanElementType.LIMIT_DEDUCTIBLE;
};

export const isElementOptionsValueDef = (def: PlanElementValueDef): def is PlanElementOptionsValueDef => {
	return def.editType == PlanElementValueEditType.OPTIONS;
};
export const isElementNumberValueDef = (def: PlanElementValueDef): def is PlanElementNumberValueDef => {
	return def.editType == PlanElementValueEditType.NUMBER;
};
// noinspection JSUnusedGlobalSymbols
export const isElementFixedValueDef = (def: PlanElementValueDef): def is PlanElementFixedValueDef => {
	return def.editType == PlanElementValueEditType.FIXED;
};

export const computeColumnWidth = (
	columns: PlanSelectionDef['columns'],
	columnWidth?: PlanSelectionDef['columnWidth'],
	lineHeaderWidth?: PlanSelectionDef['lineHeaderWidth']
): [PlanSelectionDef['columnWidth'], PlanSelectionDef['lineHeaderWidth']] => {
	if (VUtils.isNotBlank(columnWidth)) {
		if (VUtils.isNotBlank(lineHeaderWidth)) {
			return [columnWidth, lineHeaderWidth];
		} else {
			return [columnWidth, `calc(100% - (${Utils.toCssSize(columnWidth)} * ${columns}))`];
		}
	} else if (VUtils.isNotBlank(lineHeaderWidth)) {
		return [`calc((100% - ${Utils.toCssSize(lineHeaderWidth)}) / ${columns})`, lineHeaderWidth];
	} else if (columns <= 0) {
		// horizontal scrolling
		return ['minmax(20%, 1fr)', 'minmax(40%, 1.5fr)'];
	} else {
		switch (columns) {
			case 1:
				return ['40%', '60%'];
			case 2:
				return ['30%', '40%'];
			case 3:
				return ['20%', '40%'];
			case 4:
				return ['15%', '40%'];
			default:
				return ['1fr', '3fr'];
		}
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

export type ModelProxy<T extends object, D> = T & { $def: D };
/**
 * attach plan definition into selected plan model, by proxy
 */
export const createPlanModelProxy = <T extends object, D>(plan: T, def: D): ModelProxy<T, D> => {
	return new Proxy(plan, {
		get: (target, prop) => {
			if (prop === '$def') {
				return def;
			} else if (prop === '$revoke') {
				return () => plan;
			}
			return target[prop];
		}
	}) as ModelProxy<T, D>;
};

export const guardPlanTitle = (options: {
	def?: PlanSelectionDef['planTitle']; planDef: PlanDef; elementValueChanged: boolean;
}): Array<NodeDef | ReactNode> => {
	const {def, planDef, elementValueChanged} = options;
	return def != null
		? def(planDef, elementValueChanged)
		: [{$wt: 'Caption', text: planDef.name} as LabelDef];
};

export const guardPlanSubTitle = (options: {
	def?: PlanSelectionDef['planSubTitle'];
	currencySymbol?: string | ReactNode; premiumDescription?: string | ReactNode;
	planDef: PlanDef; elementValueChanged: boolean;
}): Array<NodeDef | ReactNode> => {
	const {def, currencySymbol, premiumDescription, planDef, elementValueChanged} = options;

	return def != null
		? def(planDef, elementValueChanged, currencySymbol, premiumDescription)
		: [
			elementValueChanged
				? {
					$wt: 'Caption', 'data-plan-premium': true, text: '???',
					leads: [currencySymbol].filter(x => VUtils.isNotBlank(x))
				} as CaptionDef
				: {
					$wt: 'Label', $pp: 'premium.due',
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
	forceUpdate: () => void;
}): Array<NodeDef | ReactNode> => {
	const {def, orderedDef, elementLevel, forceUpdate} = options;
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
		? def(elementDef, elementLevel, forceUpdate)
		: [{
			$wt: 'Caption', text: elementDef.name,
			'data-plan-element-level': elementLevel, ...domElementAttr,
			leads: elementDef.collapsed == null ? (void 0) : ['$icons.angleRight'],
			click: elementDef.collapsed == null
				? (void 0)
				: () => {
					elementDef.collapsed = !elementDef.collapsed;
					forceUpdate();
				}
		} as LabelDef];
};

export const guardPlanOperators = (options: {
	def?: PlanSelectionDef['planOperators']; planDef: PlanDef; planModel: SelectedPlan;
	text?: string | ReactNode; click: ButtonClick;
}) => {
	const {def, planDef, planModel, text, click} = options;
	return def != null
		? def(planDef, planModel)
		: [{
			$wt: 'Button', text: VUtils.isBlank(text) ? 'Buy' : text,
			leads: ['$icons.cart'], 'data-plan-buy': true, click
		} as ButtonDef];
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