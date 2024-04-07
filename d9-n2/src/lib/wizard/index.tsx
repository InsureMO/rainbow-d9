import {MUtils, PPUtils, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {WizardEventBusProvider} from './event/wizard-event-bus';
import {WizardProps} from './types';
import {useWizardSharedInit} from './use-wizard-shared-init';
import {redressStepMarker} from './utils';
import {AWizard, WizardBody, WizardHeader} from './widgets';
import {WizardController} from './wizard-controller';
import {WizardStepBody} from './wizard-step-body';
import {WizardStepTitle} from './wizard-step-title';

const InternalWizard = forwardRef((props: WizardProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp, $wrapped,
		reached = 0, freeWalk = false, omitWalker = false,
		balloon = true, emphasisActive = true, contents,
		...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const sharedState = useWizardSharedInit(props);
	(contents ?? []).forEach(content => redressStepMarker(content));

	if (!sharedState.initialized) {
		return null;
	}

	return <AWizard {...rest} data-disabled={$disabled} data-visible={$visible}
	                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	                ref={ref}>
		<WizardHeader data-balloon={balloon}>
			{(contents ?? []).map((content, index) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				return <WizardStepTitle key={content.marker}
				                        $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                        balloon={balloon} emphasisActive={emphasisActive}
				                        {...content}
				                        freeWalk={freeWalk} stepIndex={index}
				                        marker={content.marker}/>;
			})}
		</WizardHeader>
		<WizardBody>
			{(contents ?? []).map((content, index, all) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// marker already redressed in headers rendering
				return <WizardStepBody key={content.marker} def={content.body} $pp={content.$pp}
				                       $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                       omitWalker={omitWalker}
				                       shared={sharedState.sharedDef} sharedAtLead={sharedState.sharedAtLead}
				                       firstStep={index === 0} lastStep={index === all.length - 1}
				                       previousMarker={index !== 0 ? all[index - 1].marker : (void 0)}
				                       nextMarker={index !== all.length - 1 ? all[index + 1].marker : (void 0)}
				                       stepIndex={index} marker={content.marker}/>;
			})}
		</WizardBody>
		<WizardController $pp={$pp} $wrapped={$wrapped} contents={contents} reached={reached}/>
	</AWizard>;
});

export const Wizard = forwardRef((props: WizardProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <WizardEventBusProvider>
		<InternalWizard {...props} ref={ref}/>
	</WizardEventBusProvider>;
});

registerWidget({key: 'Wizard', JSX: Wizard, container: false, array: false});

export * from './types';
