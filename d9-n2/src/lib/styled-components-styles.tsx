import React, {useState} from 'react';
import {IStyleSheetManager, StyleSheetManager as SSM} from 'styled-components';
import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';

export type DataW = { [DOM_KEY_WIDGET]?: string };
export type DataID = { [DOM_ID_WIDGET]?: string };
export type DataScroll = { 'data-h-scroll'?: string, 'data-v-scroll'?: string };
export type DataPrefix = DataW & DataID & DataScroll;
export type SDP = DataPrefix;

export type WithDataW<T> = T & DataW;
export type WithDataID<T> = T & DataID;
export type WithDataWID<T> = T & DataW & DataID;
export type WithDataPrefix<T> = T & DataPrefix;
export type WSDP<T> = WithDataPrefix<T>

export type StyleSheetManagerProps = Omit<IStyleSheetManager, 'shouldForwardProp'> & {
	ignoreRegexps?: Array<RegExp>;
};
export const StyleSheetManager = (props: StyleSheetManagerProps) => {
	const [shouldForwardProp] = useState(() => {
		const ignoredRegexps = props.ignoreRegexps ?? [
			/^Warning: React does not recognize the `[^`]+` prop on a DOM element\./,
			/^Warning: Received `%s` for a non-boolean attribute `%s`./
		];
		const error = console.error;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		console.error = function (...data: any[]) {
			if (data != null && data[0] != null && typeof data[0] === 'string' && ignoredRegexps.some(ignore => ignore.test(data[0]))) {
				return console.debug(...data);
			} else {
				return error(...data);
			}
		};
		return () => true;
	});
	return <SSM {...props} shouldForwardProp={shouldForwardProp}/>;
};