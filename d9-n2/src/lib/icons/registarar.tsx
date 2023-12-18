import React from 'react';
import {ArrowDown} from './arrow-down';
import {Back} from './back';
import {CaretDown} from './caret-down';
import {CaretLeft} from './caret-left';
import {CaretRight} from './caret-right';
import {Check} from './check';
import {Collapse} from './collapse';
import {Date} from './date';
import {Expand} from './expand';
import {Remove} from './remove';
import {Spinner} from './spinner';
import {Time} from './time';
import {Times} from './times';

class IconsRegistrar {
	private static readonly _icons: Record<string, () => JSX.Element> = {};

	public constructor() {
		// avoid extend
	}

	public static register(icons: Record<string, () => JSX.Element>) {
		Object.keys(icons).forEach(key => {
			IconsRegistrar._icons[key] = icons[key];
		});
	}

	public static find<R>(key: string, defaultIcon?: R): (() => JSX.Element) | R {
		const icon = IconsRegistrar._icons[key];
		return icon ?? defaultIcon;
	}
}

IconsRegistrar.register({
	back: () => <Back/>,
	date: () => <Date/>,
	time: () => <Time/>,
	check: () => <Check/>,
	times: () => <Times/>,
	remove: () => <Remove/>,
	expand: () => <Expand/>,
	collapse: () => <Collapse/>,
	caretLeft: () => <CaretLeft/>,
	caretRight: () => <CaretRight/>,
	caretDown: () => <CaretDown/>,
	arrowDown: () => <ArrowDown/>,
	spinner: () => <Spinner/>
});

export {IconsRegistrar};