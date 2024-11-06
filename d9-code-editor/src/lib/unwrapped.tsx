import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {JsEditor} from './code-editor';
import {JsEditorProps} from './types';

export type UnwrappedJsEditorProps =
	Omit<JsEditorProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: string) => void;
	value?: string;
	disabled?: boolean;
	visible?: boolean;
};

export const UnwrappedJsEditor = forwardRef((props: UnwrappedJsEditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <JsEditor {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp={$pp}
	                 id={rest.id ?? VUtils.generateUniqueId()}
	                 ref={ref}/>;
});
export const UnwrappedTsEditor = UnwrappedJsEditor;
