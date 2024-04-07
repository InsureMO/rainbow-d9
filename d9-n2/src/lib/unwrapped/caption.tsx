import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {Badge, BadgeProps, Caption, CaptionProps, Label, LabelProps} from '../caption';

/** Caption configuration definition */
type UnwrappedCaptionProps =
	Omit<CaptionProps, 'labelOnValue' | 'valueToLabel' | '$wrapped' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedCaption = forwardRef((props: UnwrappedCaptionProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {
		children, disabled, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Caption {...rest}
	                $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                label={children}
	                id={rest.id ?? VUtils.generateUniqueId()}
	                ref={ref}/>;
});

type UnwrappedLabelProps =
	Omit<LabelProps, 'labelOnValue' | 'valueToLabel' | '$wrapped' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedLabel = forwardRef((props: UnwrappedLabelProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {
		children, disabled, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Label {...rest}
	              $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	              label={children}
	              id={rest.id ?? VUtils.generateUniqueId()}
	              ref={ref}/>;
});

type UnwrappedBadgeProps =
	Omit<BadgeProps, 'labelOnValue' | 'valueToLabel' | '$wrapped' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedBadge = forwardRef((props: UnwrappedBadgeProps, ref: ForwardedRef<HTMLSpanElement>) => {
	const {
		children, disabled, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Badge {...rest}
	              $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	              label={children}
	              id={rest.id ?? VUtils.generateUniqueId()}
	              ref={ref}/>;
});

export {
	UnwrappedCaption, UnwrappedCaptionProps,
	UnwrappedLabel, UnwrappedLabelProps,
	UnwrappedBadge, UnwrappedBadgeProps
};
