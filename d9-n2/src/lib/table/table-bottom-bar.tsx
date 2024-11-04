import {EnhancedPropsForArray, Nullable, useForceUpdate, Wrapper} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {useArrayCouldAddElement} from '../array-container-assist';
import {Button, ButtonInk} from '../button';
import {useGlobalHandlers} from '../global';
import {IntlLabel} from '../intl-label';
import {PaginationData} from '../pagination';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {ATableBottomBar, ATableBottomBarSeparator} from './widgets';

export const TableBottomBarButton = (props: Omit<TableProps, 'children'> & { $array: EnhancedPropsForArray }) => {
	const {
		$wrapped,
		$array: {addLabel = <IntlLabel keys={['table', 'createItem']} value="Create New Element"/>, addElement}
	} = props;

	const globalHandlers = useGlobalHandlers();
	const [disabled] = useArrayCouldAddElement(props);
	const onAddClicked = async () => await addElement({global: globalHandlers});

	const button$wrapped = {
		...$wrapped,
		$avs: {...$wrapped.$avs ?? {}, $disabled: disabled === true ? disabled : $wrapped.$avs?.$disabled}
	};

	return <Button $wrapped={button$wrapped} ink={ButtonInk.PRIMARY}
	               text={addLabel}
	               click={onAddClicked}/>;
};

export const TableBottomBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$wrapped, pageable, $array: {addable = false}} = props;

	const {on, off, fire} = useTableEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (pageable == null) {
			return;
		}
		const onPageChanged = () => {
			forceUpdate();
		};
		on(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
		return () => {
			off(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
		};
	}, [on, off, pageable, forceUpdate]);

	if (addable === false && pageable == null) {
		return null;
	} else {
		// it will refresh the pagination first, model updated
		const onPaginationChanged = async (options: {
			oldValue?: Nullable<PaginationData>; newValue: PaginationData;
		}) => {
			fire(TableEventTypes.REMOVE_ALL_EXPANDING_BEFORE_PAGE_CHANGE);
			fire(TableEventTypes.PAGE_CHANGED, options.oldValue, options.newValue);
		};

		// valueChanged is used in table content, as external function call
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {valueChanged, ...pageableDef} = pageable ?? {};

		return <ATableBottomBar>
			{pageable != null
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				? <Wrapper {...pageableDef} valueChanged={onPaginationChanged}
				           $root={$wrapped.$root} $model={$wrapped.$model} $p2r={$wrapped.$p2r}/>
				: null}
			{(pageable != null && addable !== false) ? <ATableBottomBarSeparator/> : null}
			{addable !== false ? <TableBottomBarButton {...props}/> : null}
		</ATableBottomBar>;
	}
};
