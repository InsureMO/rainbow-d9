import {ModelHolder, PropertyPath, WrapperDelegate} from '@rainbow-d9/n1';
import React from 'react';
import {TabDef} from './types';
import {useTabActive} from './use-tab-active';
import {useTabBodyInit} from './use-tab-body-init';
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
	const active = useTabActive(tabIndex, marker);

	return <ATabBodyVisibility data-visible={active}/>;
};

export const TabBody = (props: TabBodyProps) => {
	const {
		$pp, marker, def, tabIndex,
		$root, $model, $p2r
	} = props;

	const {initialized, def: bodyDef} = useTabBodyInit({$pp, marker, def});

	if (!initialized) {
		return <>
			<TabBodyVisibilityController tabIndex={tabIndex} marker={marker}/>
			<ATabBody/>
		</>;
	}

	return <>
		<TabBodyVisibilityController tabIndex={tabIndex} marker={marker}/>
		<ATabBody>
			<WrapperDelegate {...bodyDef} $root={$root} $model={$model} $p2r={$p2r}/>
		</ATabBody>
	</>;
};
