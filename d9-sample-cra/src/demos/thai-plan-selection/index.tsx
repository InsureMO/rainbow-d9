import {BaseModel, MUtils, PropValue, StandaloneRoot} from '@rainbow-d9/n1';
import {$d9n2, ButtonClickOptions, GlobalRoot} from '@rainbow-d9/n2';
import {
	CalculationEvent,
	PlanCategoryDef,
	PlanCoverageDef,
	PlanDef,
	PlanDefs,
	PlanElementFixedValueDef,
	PlanElementNumberValueDef,
	PlanElementOptionsValueDef,
	PlanElementType,
	PlanElementValueEditType
} from '@rainbow-d9/thai-plan-selection';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

$d9n2.intl.labels['en-US'] = {
	'Standard Plan #1': '标准保障计划 #1',
	'After Tax': '税后',
	'Fire & Theft': '火灾和盗抢',
	'Personal Accident - Death & Disability for Driver': '个人意外 - 驾驶员身故和残疾',
	'Sum Insured': '保额',
	'Limit': '限额',
	'Per Accident': '每次事故',
	'฿': '泰铢',
	'Buy': '购买'
};

export const ThaiPlanSelection = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {
		defs: async (): Promise<PlanDefs> => {
			return [
				{
					code: 'plan1', name: 'Standard Plan #1', elements: [
						{
							code: 'V', name: 'Voluntary', type: PlanElementType.CATEGORY, children: [
								{
									code: 'ODFTD', name: 'Own Damage & Fire & Theft Deductible',
									type: PlanElementType.COVERAGE,
									values: [
										{
											code: 'si', label: 'Sum Insured', defaultValue: 950_000,
											options: [{value: 900_000}, {value: 950_000}, {value: 1_000_000}],
											editType: PlanElementValueEditType.OPTIONS
										} as PlanElementOptionsValueDef,
										{
											code: 'limit', label: 'Limit',
											options: [{value: 200_000}, {value: 300_000}, {value: 500_000}],
											editType: PlanElementValueEditType.OPTIONS,
											unit: 'Per Accident'
										} as PlanElementOptionsValueDef
									]
								} as PlanCoverageDef,
								{
									code: 'FT', name: 'Fire & Theft', type: PlanElementType.COVERAGE,
									values: [
										{
											code: 'si', label: 'Sum Insured',
											editType: PlanElementValueEditType.NUMBER,
											min: 1000, max: 5000, step: 1000
										} as PlanElementNumberValueDef
									]
								} as PlanCoverageDef,
								{
									code: 'TPLBI', name: 'Third Party Liability - Bodily Injury',
									type: PlanElementType.COVERAGE,
									values: [
										{
											code: 'si', label: 'Sum Insured', defaultValue: 50000,
											editType: PlanElementValueEditType.NUMBER
										} as PlanElementNumberValueDef,
										{
											code: 'limit1', label: 'Limit', defaultValue: 1000,
											editType: PlanElementValueEditType.NUMBER,
											max: 5000, unit: 'Per Accident'
										} as PlanElementNumberValueDef,
										{
											code: 'limit2', label: 'Limit', defaultValue: 5000,
											editType: PlanElementValueEditType.NUMBER,
											min: 5000, step: 1000, unit: 'Per Person'
										} as PlanElementNumberValueDef
									]
								} as PlanCoverageDef,
								{
									code: 'TPLPDD', name: 'Third Party Liability - Property Damage Deductible',
									type: PlanElementType.COVERAGE
								} as PlanCoverageDef
							]
						} as PlanCategoryDef,
						{
							code: 'PADDD', name: 'Personal Accident - Death & Disability for Driver',
							type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'PADDP',
							name: 'Personal Accident - Death & Disability for Passenger',
							type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'PATDD', name: 'Personal Accident - Temporary Disability for Driver',
							type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'PATDP', name: 'Personal Accident - Temporary Disability for Passenger',
							type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'ME', name: 'Medical Expense', type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'BBCC', name: 'Bail Bond in Criminal Cases', type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'VC', name: 'Vehicle Collision', type: PlanElementType.COVERAGE
						} as PlanCoverageDef,
						{
							code: 'SC', name: 'Special Cews', type: PlanElementType.CATEGORY,
							children: [
								{
									code: 'ND', name: 'Natural Disaster', type: PlanElementType.COVERAGE,
									values: [
										{
											code: 'si', label: 'Sum Insured', defaultValue: 5_000_000,
											editType: PlanElementValueEditType.FIXED
										} as PlanElementFixedValueDef,
										{
											code: 'limit', label: 'Limit', defaultValue: 1_000_000,
											editType: PlanElementValueEditType.FIXED, unit: 'Per Accident'
										} as PlanElementFixedValueDef
									],
									displayOrder: 200
								} as PlanCoverageDef
							]
						} as PlanCategoryDef
					]
				} as PlanDef,
				{
					code: 'plan2', name: 'Standard Plan #2', elements: [
						{
							code: 'V', name: 'Voluntary', type: PlanElementType.CATEGORY, children: [
								{
									code: 'ODFTD', name: 'Own Damage & Fire & Theft Deductible',
									type: PlanElementType.COVERAGE,
									values: [
										{
											code: 'si', label: 'Sum Insured', defaultValue: 850_000,
											options: [{value: 800_000}, {value: 850_000}, {value: 900_000}],
											editType: PlanElementValueEditType.OPTIONS
										} as PlanElementOptionsValueDef,
										{
											code: 'limit', label: 'Limit',
											options: [{value: 200_000}, {value: 300_000}, {value: 500_000}],
											editType: PlanElementValueEditType.OPTIONS,
											unit: 'Per Accident'
										} as PlanElementOptionsValueDef
									]
								} as PlanCoverageDef
							]
						} as PlanCategoryDef,
						{
							code: 'SC',
							name: 'Special Cews',
							type: PlanElementType.CATEGORY,
							children: [
								{
									code: 'F', name: 'Flood', type: PlanElementType.COVERAGE,
									pinned: false, displayOrder: 100
								} as PlanCoverageDef
							]
						} as PlanCategoryDef
					]
				} as PlanDef,
				{
					code: 'plan3', name: 'Standard Plan #3', elements: []
				} as PlanDef,
				{
					code: 'plan4', name: 'Standard Plan #4', elements: []
				} as PlanDef,
				{
					code: 'plan5', name: 'Standard Plan #5', elements: []
				} as PlanDef,
				{
					code: 'plan6', name: 'Standard Plan #6', elements: []
				} as PlanDef,
				{
					code: 'plan7', name: 'Standard Plan #7', elements: []
				} as PlanDef
			];
		},
		buy: (options: ButtonClickOptions<BaseModel, PropValue>) => {
			console.log(options);
			// @ts-ignore
			console.log(options.model.$revoke());
		},
		calculate: async (event: CalculationEvent) => {
			const {changes} = event;
			[...new Set(changes.map(change => change.planDef.code))].map(code => {
				return {code, premium: Math.ceil(50000 + Math.random() * 10000)};
			}).forEach(({code, premium}) => {
				MUtils.setValue(DemoData.plans, `${code}.premium.due`, premium);
			});
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		{/** @ts-ignore */}
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const ThaiPlanSelectionData = DemoData;
export const ThaiPlanSelectionMarkdown = DemoContent;
