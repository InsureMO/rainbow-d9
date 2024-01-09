import {ModelHolder, NodeDef, PropertyPath, Wrapper} from '@rainbow-d9/n1';
import React from 'react';
import {ButtonFill, ButtonInk} from '../button';
import {IntlLabel} from '../intl-label';
import {useTabBodyInit} from '../tabs/use-tab-body-init';
import {UnwrappedButton as Button} from '../unwrapped/button';
import {UnwrappedButtonBar as ButtonBar} from '../unwrapped/button-bar';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardStepDef} from './types';
import {useWizardStepActive} from './use-wizard-step-active';
import {useWizardStepContentRefresh} from './use-wizard-step-content-refresh';
import {AWizardStepBody, AWizardStepBodyVisibility} from './widgets';

export interface WizardStepBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	def: WizardStepDef['body'];
	omitWalker?: boolean;
	shared?: NodeDef;
	sharedAtLead?: boolean;
	firstStep: boolean;
	lastStep: boolean;
	previousMarker?: string;
	nextMarker?: string;
	stepIndex: number;
	marker: string;
}

export type WizardStepBodyVisibilityControllerProps = Pick<WizardStepBodyProps, 'stepIndex' | 'marker'>;

export const WizardStepBodyVisibilityController = (props: WizardStepBodyVisibilityControllerProps) => {
	const {stepIndex, marker} = props;
	const {active} = useWizardStepActive(stepIndex, marker);

	return <AWizardStepBodyVisibility data-visible={active}/>;
};

export type WizardStepSharedPartProps = Pick<WizardStepBodyProps, 'stepIndex' | 'marker' | 'shared' | '$root' | '$model' | '$p2r'>;

export const WizardStepSharedPart = (props: WizardStepSharedPartProps) => {
	const {
		stepIndex, marker, shared,
		$root, $model, $p2r
	} = props;
	const {active} = useWizardStepActive(stepIndex, marker);

	if (shared == null || !active) {
		return null;
	}

	return <Wrapper {...shared} $root={$root} $model={$model} $p2r={$p2r}/>;
};

const computeSharedPosition = (options: {
	shared?: NodeDef; omitWalker?: boolean; sharedAtLead?: boolean;
	defs?: NodeDef;
}) => {
	const {
		shared, omitWalker, sharedAtLead,
		defs = {$pos: {$col: 1, $cols: 1}}
	} = options;

	if (shared != null) {
		shared.$pos = shared.$pos ?? {};
		shared.$pos.$row = 1;
		shared.$pos.$cols = shared.$pos.$cols ?? 3;
		const $cols = shared.$pos.$cols;
		if (!omitWalker) {
			shared.$pos.$rows = 2;
		}
		defs.$pos = defs.$pos ?? {};
		defs.$pos.$cols = 12 - $cols;
		if (sharedAtLead === true) {
			shared.$pos.$col = 1;
			defs.$pos.$col = shared.$pos.$cols + 1;
		} else {
			shared.$pos.$col = defs.$pos.$cols + 1;
			defs.$pos.$col = 1;
		}
	}
};

export const WizardStepBodyContent = (props: WizardStepBodyProps) => {
	const {
		$pp, marker, def,
		$root, $model, $p2r,
		omitWalker = false, shared, sharedAtLead,
		firstStep, lastStep, previousMarker, nextMarker, stepIndex
	} = props;

	const {fire} = useWizardEventBus();
	useWizardStepContentRefresh(stepIndex, marker);
	const {initialized, def: bodyDef} = useTabBodyInit({$pp, marker, def});
	if (!initialized) {
		computeSharedPosition({shared, omitWalker, sharedAtLead});
		return <AWizardStepBody>
			<WizardStepSharedPart stepIndex={stepIndex} marker={marker} shared={shared}
			                      $root={$root} $model={$model} $p2r={$p2r}/>
		</AWizardStepBody>;
	}

	const onToPreviousClicked = async () => {
		fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex - 1, previousMarker);
	};
	const onToNextClicked = async () => {
		fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex + 1, nextMarker);
	};

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const defs = bodyDef!;
	computeSharedPosition({shared, omitWalker, sharedAtLead, defs});

	return <AWizardStepBody>
		<WizardStepSharedPart stepIndex={stepIndex} marker={marker} shared={shared}
		                      $root={$root} $model={$model} $p2r={$p2r}/>
		<Wrapper {...defs} $root={$root} $model={$model} $p2r={$p2r}/>
		{omitWalker
			? null
			: <ButtonBar data-w="d9-wizard-walker" data-grab-all={shared == null}
			             data-shared-at-lead={sharedAtLead === true}>
				{firstStep
					? <span/>
					: <Button onClick={onToPreviousClicked}
					          leads={['$icons.angleLeft']}
					          ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}>
						<IntlLabel keys={['wizard', 'previous']} value="Previous"/>
					</Button>}
				{lastStep
					? <span/>
					: <Button onClick={onToNextClicked}
					          tails={['$icons.angleRight']}
					          ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
						<IntlLabel keys={['wizard', 'next']} value="Next"/>
					</Button>}
			</ButtonBar>}
	</AWizardStepBody>;
};

export const WizardStepBody = (props: WizardStepBodyProps) => {
	return <>
		<WizardStepBodyVisibilityController stepIndex={props.stepIndex} marker={props.marker}/>
		<WizardStepBodyContent {...props}/>
	</>;
};
