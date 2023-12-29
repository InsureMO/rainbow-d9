import {BaseModel, MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Pagination, PaginationData, PaginationProps} from '../pagination';

/** Pagination configuration definition */
type UnwrappedPaginationProps =
	Omit<PaginationProps, 'disabled' | 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PaginationData) => void;
	value?: PaginationData;
	visible?: boolean
};

const UnwrappedPagination = forwardRef((props: UnwrappedPaginationProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp = 'value', value, onValueChange,
		visible, ...rest
	} = props;

	const $onValueChange = (value: PropValue) => {
		onValueChange(value as unknown as PaginationData);
	};
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root: BaseModel = {[$pp]: value} as unknown as BaseModel;

	return <Pagination {...rest}
	                   $pp={$pp}
	                   $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   id={rest.id ?? VUtils.generateUniqueId()}
	                   ref={ref}/>;
});

export {UnwrappedPagination, UnwrappedPaginationProps};
