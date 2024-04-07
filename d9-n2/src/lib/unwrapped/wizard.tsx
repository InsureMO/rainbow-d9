import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Wizard, WizardProps} from '../wizard';

/** Wizard configuration definition */
type UnwrappedWizardProps =
	Omit<WizardProps, 'disabled' | 'value' | '$wrapped' | keyof MonitorNodeDef>
	& { value?: PropValue; visible?: boolean };

const UnwrappedWizard = forwardRef((props: UnwrappedWizardProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp = 'value', value,
		title, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <Wizard {...rest} title={title}
	               $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	               $pp={$pp}
	               id={rest.id ?? VUtils.generateUniqueId()}
	               ref={ref}/>;
});

export {UnwrappedWizard, UnwrappedWizardProps};
