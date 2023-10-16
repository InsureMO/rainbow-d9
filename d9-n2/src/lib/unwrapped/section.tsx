import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {Section, SectionProps} from '../section';

/** Section configuration definition */
type UnwrappedSectionProps =
	Omit<SectionProps, 'disabled' | '$wrapped' | '$nodes' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	visible?: boolean;
};

const UnwrappedSection = forwardRef((props: UnwrappedSectionProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		title, children, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Section {...rest} title={title}
	                $nodes={[]}
	                $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                id={rest.id ?? VUtils.generateUniqueId()}
	                ref={ref}>
		{children}
	</Section>;
});

export {UnwrappedSection, UnwrappedSectionProps};
