import {StandaloneRoot, VUtils} from '@rainbow-d9/n1';
import {$d9n2, Alert, Dialog, GlobalEventBusProvider, RemoteRequest, YesNoDialog} from '@rainbow-d9/n2';
import {
	PlanCategoryDef,
	PlanCoverageDef,
	PlanDef,
	PlanDefs,
	PlanElementFixedValueDef,
	PlanElementType,
	PlanElementValueEditType
} from '@rainbow-d9/thai-plan-selection';
import React from 'react';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
// @ts-ignore
import DemoContent from './demo.md';

$d9n2.intl.labels['en-US'] = {
	'After Tax': '税后'
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
									type: PlanElementType.COVERAGE
								} as PlanCoverageDef,
								{
									code: 'FT', name: 'Fire & Theft', type: PlanElementType.COVERAGE
								} as PlanCoverageDef,
								{
									code: 'TPLBI', name: 'Third Party Liability - Bodily Injury',
									type: PlanElementType.COVERAGE
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
				} as PlanDef
			];
		}
	};

	return <GlobalEventBusProvider>
		<Alert/>
		<Dialog/>
		<YesNoDialog/>
		<RemoteRequest clearAccount={VUtils.noop} on401={VUtils.noop} on403={VUtils.noop}/>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		{/** @ts-ignore */}
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalEventBusProvider>;
};

export const ThaiPlanSelectionData = DemoData;
export const ThaiPlanSelectionMarkdown = DemoContent;
