import {BaseModel, MUtils, PPUtils, PropValue, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {ButtonFill, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {DropdownOptions} from '../dropdown';
import {UnwrappedButton} from '../unwrapped/button';
import {UnwrappedDropdown} from '../unwrapped/dropdown';
import {PaginationData, PaginationProps} from './types';
import {APagination} from './widgets';

export const guardPaginationData = ($model: BaseModel, $pp: string): PaginationData => {
	let data = MUtils.getValue($model, $pp) as unknown as PaginationData;
	if (data == null) {
		data = {pageNumber: 1, pageSize: 20, pageCount: 1, itemCount: 0};
		MUtils.setValue($model, $pp, data as unknown as PropValue);
	}

	const checkPageNumber = VUtils.isPositive(data.pageNumber);
	if (checkPageNumber.test) {
		data.pageNumber = Math.max(1, Math.floor(data.pageNumber));
	} else {
		data.pageNumber = 1;
	}
	const checkPageSize = VUtils.isPositive(data.pageSize);
	if (checkPageSize.test) {
		data.pageSize = Math.max(1, Math.floor(data.pageSize));
	} else {
		data.pageSize = 20;
	}
	const checkPageCount = VUtils.isPositive(data.pageCount);
	if (checkPageCount.test) {
		data.pageCount = Math.max(1, Math.floor(data.pageCount));
	} else {
		data.pageCount = 1;
	}
	const checkItemCount = VUtils.isPositive(data.itemCount);
	if (checkItemCount.test) {
		data.itemCount = Math.floor(data.itemCount);
	} else {
		data.itemCount = 0;
	}

	if (data.pageNumber > data.pageCount) {
		data.pageNumber = data.pageCount;
	}

	return data;
};

const computePageNumbers = (maxButtons: number, data: PaginationData): Array<number> => {
	// the perfect position of given page number, which is
	// if max buttons is odd, put at center; otherwise put at center - 1.
	const offset = Math.floor((maxButtons - 1) / 2);
	const pageNumbers = new Array(maxButtons)
		.fill(data.pageNumber)
		.map((value, index) => {
			return value + index - offset;
		})
		.filter(pageNumber => pageNumber > 0 && pageNumber <= data.pageCount);
	while (pageNumbers.length < maxButtons) {
		if (pageNumbers[pageNumbers.length - 1] < data.pageCount) {
			pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
		} else if (pageNumbers[0] > 1) {
			pageNumbers.unshift(pageNumbers[0] - 1);
		} else {
			break;
		}
	}
	return pageNumbers;

};

export const Pagination = forwardRef((props: PaginationProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp, $wrapped, freeWalk = false, maxButtons = 7, possibleSizes = [],
		...rest
	} = props;
	const {
		$model, $p2r, $onValueChange,
		$avs: {$disabled, $visible}
	} = $wrapped;

	const data = guardPaginationData($model as BaseModel, $pp);

	const onPageClicked = (pageNumber: number) => async () => {
		if (pageNumber !== data.pageNumber) {
			data.pageNumber = pageNumber;
			await $onValueChange(data as unknown as PropValue);
		}
	};
	const buildFreeWalkOptions = (): DropdownOptions => {
		return new Array(data.pageCount)
			.fill(1)
			.map((_, index) => ({value: index + 1, label: `${index + 1}`}));
	};
	const onFreeWalkChanged = async (pageNumber: PropValue) => {
		if (pageNumber !== data.pageNumber) {
			data.pageNumber = pageNumber as number;
			await $onValueChange(data as unknown as PropValue);
		}
	};
	const possibleSizesOptions = ((): DropdownOptions => {
		const options = [...new Set([...possibleSizes, data.pageSize])]
			.sort()
			.map(size => ({value: size, label: `${size}`}));
		if (options.length === 1) {
			return [];
		} else {
			return options;
		}
	})();
	const onPageSizeChanged = async (pageSize: PropValue) => {
		if (pageSize !== data.pageSize) {
			const currentFirstItemIndex = (data.pageNumber - 1) * data.pageSize;
			data.pageSize = pageSize as number;
			data.pageNumber = Math.floor(currentFirstItemIndex / data.pageSize) + 1;
			data.pageCount = Math.ceil(data.itemCount / data.pageSize);
			await $onValueChange(data as unknown as PropValue);
		}
	};

	const pageNumbers = computePageNumbers(maxButtons, data);
	// starts from 1
	const hasPrevious = pageNumbers[0] !== 1;
	const hasNext = pageNumbers[pageNumbers.length - 1] !== data.pageCount;

	return <APagination {...rest} data-disabled={$disabled} data-visible={$visible}
	                    id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                    ref={ref}>
		<div data-page-info={true}>
			<span>{I18NVars.PAGINATION.PAGE}</span>
			{freeWalk
				? <UnwrappedDropdown value={data.pageNumber} options={buildFreeWalkOptions()}
				                     clearable={false} data-free-walk={true}
				                     onValueChange={onFreeWalkChanged}/>
				: <span>{data.pageNumber}</span>}
			<span>{I18NVars.PAGINATION.OF}</span>
			<span>{data.pageCount}</span>
			<span>{I18NVars.PAGINATION.PAGES}</span>
			{possibleSizesOptions.length !== 0
				? <UnwrappedDropdown value={data.pageSize} options={possibleSizesOptions}
				                     clearable={false} data-possible-sizes={true}
				                     onValueChange={onPageSizeChanged}/>
				: <span>{data.pageSize}</span>}
			<span>{I18NVars.PAGINATION.AFTER_SIZE}</span>
			<span>{I18NVars.PAGINATION.TOTAL}</span>
			<span>{data.itemCount}</span>
			<span>{I18NVars.PAGINATION.ITEMS}</span>
		</div>
		<div data-page-buttons={true}>
			{hasPrevious
				? <>
					<UnwrappedButton onClick={onPageClicked(1)} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
					                 leads={['$icons.backward']}/>
					<UnwrappedButton onClick={onPageClicked(Math.max(pageNumbers[0] - 1, 1))}
					                 ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
					                 leads={['$icons.angleLeft']}/>
				</>
				: null}
			{pageNumbers.map(pageNumber => {
				return <UnwrappedButton key={pageNumber} onClick={onPageClicked(pageNumber)}
				                        ink={ButtonInk.PRIMARY}
				                        fill={pageNumber === data.pageNumber ? ButtonFill.FILL : ButtonFill.PLAIN}>
					{pageNumber}
				</UnwrappedButton>;
			})}
			{hasNext
				? <>
					<UnwrappedButton
						onClick={onPageClicked(Math.min(pageNumbers[pageNumbers.length - 1] + 1, data.pageCount))}
						ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
						leads={['$icons.angleRight']}/>
					<UnwrappedButton onClick={onPageClicked(data.pageCount)} ink={ButtonInk.PRIMARY}
					                 fill={ButtonFill.PLAIN}
					                 leads={['$icons.forward']}/>
				</>
				: null}
		</div>
	</APagination>
		;
});

registerWidget({
	key: 'Pagination', JSX: Pagination, container: false, array: false
});

export * from './types';
