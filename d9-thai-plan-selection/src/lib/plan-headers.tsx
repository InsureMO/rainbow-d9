import {BaseModel, PropertyPath} from '@rainbow-d9/n1';
import {$d9n2, ButtonFill, ButtonInk, IntlLabel, UnwrappedButton} from '@rainbow-d9/n2';
import React from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanHeader} from './plan-header';
import {PlanDefs, PlanSelectionProps, SelectedPlans} from './types';
import {PlanSelectionPagination, PlanSelectionTopLeftCorner} from './widgets';

export interface PlanHeadersProps {
	$root: BaseModel;
	/** $root + $p2r => plans */
	$p2r: PropertyPath;
	displayPlanDefs: PlanDefs;
	plans: SelectedPlans;
	planTitle?: PlanSelectionProps['planTitle'];
	planSubTitle?: PlanSelectionProps['planSubTitle'];
	currencySymbol?: PlanSelectionProps['currencySymbol'];
	premiumDescription?: PlanSelectionProps['premiumDescription'];
	pageCount?: number;
	pageNumber?: number;
}

$d9n2.intl.labels['en-US'].planSelection = {
	pagination: {page: 'Page', of: 'of', pages: 'pages'}
};

export const PlanHeaders = (props: PlanHeadersProps) => {
	const {
		$root, $p2r, displayPlanDefs, plans,
		planTitle, planSubTitle, currencySymbol, premiumDescription,
		pageCount, pageNumber
	} = props;

	const {fire} = usePlanSelectionEventBus();

	const onSwitchPageClicked = (pageNumber: number) => () => {
		fire(PlanSelectionEventTypes.SWITCH_PAGE, pageNumber);
	};

	return <>
		<PlanSelectionTopLeftCorner>
			{pageNumber != null
				? <PlanSelectionPagination>
					{pageNumber != 1
						? <UnwrappedButton ink={ButtonInk.WARN} fill={ButtonFill.LINK} leads={['$icons.angleLeft']}
						                   onClick={onSwitchPageClicked(pageNumber - 1)}/>
						: null}
					<span>
						<span><IntlLabel keys={['planSelection', 'pagination', 'page']} value="Page"/></span>
						<span>{pageNumber}</span>
						<span><IntlLabel keys={['planSelection', 'pagination', 'of']} value="of"/></span>
						<span>{pageCount}</span>
						<span><IntlLabel keys={['planSelection', 'pagination', 'pages']} value="pages"/></span>
					</span>
					{pageNumber !== pageCount
						? <UnwrappedButton ink={ButtonInk.WARN} fill={ButtonFill.LINK} leads={['$icons.angleRight']}
						                   onClick={onSwitchPageClicked(pageNumber + 1)}/>
						: null}
				</PlanSelectionPagination>
				: null}
		</PlanSelectionTopLeftCorner>
		{displayPlanDefs.map((planDef, displayIndex) => {
			return <PlanHeader $root={$root} $p2r={$p2r} plans={plans}
			                   displayIndex={displayIndex} planDef={planDef}
			                   planTitle={planTitle} planSubTitle={planSubTitle}
			                   currencySymbol={currencySymbol} premiumDescription={premiumDescription}
			                   key={planDef.code}/>;
		})}
	</>;
};