import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Wizard, WizardProps} from '../wizard';

/** Wizard configuration definition */
type UnwrappedWizardProps =
	Omit<WizardProps, 'disabled' | '$wrapped' | keyof MonitorNodeDef>
	& { visible?: boolean };

const UnwrappedWizard = (props: UnwrappedWizardProps) => {
	const {
		$pp = 'value', value,
		title, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value as PropValue};

	return <Wizard {...rest} title={title}
	               $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	               $pp={$pp}
	               id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedWizard, UnwrappedWizardProps};
