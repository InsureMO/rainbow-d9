import {ModelHolder, PropertyPath, Wrapper} from '@rainbow-d9/n1';
import React from 'react';
import {TabDef} from './types';
import {useTabActive} from './use-tab-active';
import {useTabBodyInit} from './use-tab-body-init';
import {useTabContentRefresh} from './use-tab-content-refresh';
import {ATabBody, ATabBodyVisibility} from './widgets';

export interface TabBodyProps extends ModelHolder {
	$pp?: PropertyPath;
	marker: string;
	def: TabDef['body'];
	tabIndex: number;
}

export type TabBodyVisibilityControllerProps = Pick<TabBodyProps, 'tabIndex' | 'marker'>;

export const TabBodyVisibilityController = (props: TabBodyVisibilityControllerProps) => {
	const {tabIndex, marker} = props;
	const active = useTabActive(tabIndex, marker, 'body');

	return <ATabBodyVisibility data-visible={active}/>;
};

export const TabBodyContent = (props: TabBodyProps) => {
	const {
		$pp, marker, def, tabIndex,
		$root, $model, $p2r
	} = props;

	useTabContentRefresh(tabIndex, marker, 'body');
	const {initialized, def: bodyDef} = useTabBodyInit({$pp, marker, def});

	if (!initialized) {
		return <ATabBody/>;
	}
	return <ATabBody>
		<Wrapper {...bodyDef} $root={$root} $model={$model} $p2r={$p2r}/>
	</ATabBody>;
};

export const TabBody = (props: TabBodyProps) => {
	return <>
		<TabBodyVisibilityController tabIndex={props.tabIndex} marker={props.marker}/>
		<TabBodyContent {...props}/>
	</>;
};
