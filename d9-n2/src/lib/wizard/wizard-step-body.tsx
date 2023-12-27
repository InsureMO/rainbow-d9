import {ModelHolder, NodeDef, PropertyPath, VUtils, WrapperDelegate} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {ButtonFill, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {Button, ButtonBar} from '../unwrapped';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardStepDef} from './types';
import {AWizardStepBody} from './widgets';

export interface WizardStepBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	def: WizardStepDef['body'];
	active?: boolean;
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

interface WizardStepBodyDefState {
	initialized: boolean;
	def?: NodeDef;
}

export const WizardStepBody = (props: WizardStepBodyProps) => {
	const {
		$pp, def,
		$root, $model, $p2r,
		active = false, omitWalker = false, shared, sharedAtLead,
		firstStep, lastStep, previousMarker, nextMarker, stepIndex
	} = props;

	const {fire} = useWizardEventBus();
	const [defState, setDefState] = useState<WizardStepBodyDefState>({initialized: false});
	useEffect(() => {
		if (defState.initialized) {
			return;
		}
		(async () => {
			let foundDef: NodeDef | undefined;
			if (typeof def === 'function') {
				foundDef = await def();
			} else {
				foundDef = def;
			}
			if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
				foundDef.$pp = $pp;
			}
			setDefState({initialized: true, def: foundDef});
		})();
	}, [defState.initialized, def, $pp]);

	if (!defState.initialized) {
		return null;
	}

	const onToPreviousClicked = async () => {
		fire(WizardEventTypes.ACTIVE_STEP, stepIndex - 1, previousMarker);
	};
	const onToNextClicked = async () => {
		fire(WizardEventTypes.ACTIVE_STEP, stepIndex + 1, nextMarker);
	};

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const defs = defState.def!;
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
			defs.$pos.$col = 4;
		} else {
			shared.$pos.$col = 10;
			defs.$pos.$col = 1;
		}
	}

	return <AWizardStepBody data-visible={active}>
		{shared != null && active
			? <WrapperDelegate {...shared} $root={$root} $model={$model} $p2r={$p2r}/>
			: null}
		<WrapperDelegate {...defs} $root={$root} $model={$model} $p2r={$p2r}/>
		{omitWalker
			? null
			: <ButtonBar data-w="d9-wizard-walker" data-grab-all={shared == null}
			             data-shared-at-lead={sharedAtLead === true}>
				{firstStep
					? <span/>
					: <Button onClick={onToPreviousClicked}
					          leads={['$icons.angleLeft']}
					          ink={ButtonInk.WAIVE} fill={ButtonFill.FILL}>
						{I18NVars.WIZARD.PREVIOUS}
					</Button>}
				{lastStep
					? <span/>
					: <Button onClick={onToNextClicked}
					          tails={['$icons.angleRight']}
					          ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}>
						{I18NVars.WIZARD.NEXT}
					</Button>}
			</ButtonBar>}
	</AWizardStepBody>;
};
