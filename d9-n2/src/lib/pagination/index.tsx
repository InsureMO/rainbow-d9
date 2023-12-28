import {MUtils, PPUtils, PropValue, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {PaginationData, PaginationProps} from './types';
import {APagination} from './widgets';

export const Pagination = forwardRef((props: PaginationProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp, $wrapped, freeWalk, maxButtons, possibleSizes,
		...rest
	} = props;
	const {$model, $p2r, $avs: {$disabled, $visible}} = $wrapped;

	let data = MUtils.getValue($model, $pp) as unknown as PaginationData;
	if (data == null) {
		data = {pageNumber: 1, pageSize: 20, pageCount: 1, itemCount: 0};
		MUtils.setValue($model, $pp, data as unknown as PropValue);
	}
	data.pageNumber = data.pageNumber ?? 1;
	data.pageCount = data.pageCount ?? 1;
	data.pageSize = data.pageSize ?? 20;
	data.itemCount = data.itemCount ?? 0;

	// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <APagination {...rest} data-disabled={$disabled} data-visible={$visible}
	                    id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                    ref={ref}>
		{null}
	</APagination>;
});

registerWidget({key: 'Pagination', JSX: Pagination, container: false, array: false});

export * from './types';
