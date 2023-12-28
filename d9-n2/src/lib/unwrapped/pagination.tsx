import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {Pagination} from '../pagination';
import {PaginationProps} from '../pagination/types';

/** Pagination configuration definition */
type UnwrappedPaginationProps =
	Omit<PaginationProps, 'disabled' | '$wrapped' | '$nodes' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	visible?: boolean;
};

const UnwrappedPagination = forwardRef((props: UnwrappedPaginationProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		title, children, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Pagination {...rest} title={title}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   id={rest.id ?? VUtils.generateUniqueId()}
	                   ref={ref}>
		{children}
	</Pagination>;
});

export {UnwrappedPagination, UnwrappedPaginationProps};
