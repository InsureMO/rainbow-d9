import React from 'react';
import {AngleLeft} from './angle-left';
import {AngleRight} from './angle-right';
import {ArrowDown} from './arrow-down';
import {Back} from './back';
import {Backward} from './backward';
import {CaretDown} from './caret-down';
import {CaretLeft} from './caret-left';
import {CaretRight} from './caret-right';
import {Check} from './check';
import {Collapse} from './collapse';
import {Date} from './date';
import {Edit} from './edit';
import {Expand} from './expand';
import {Forward} from './forward';
import {Remove} from './remove';
import {Spinner} from './spinner';
import {Time} from './time';
import {Times} from './times';
import {View} from './view';

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
	edit: () => <Edit/>,
	view: () => <View/>,
	forward: () => <Forward/>,
	backward: () => <Backward/>,
	caretLeft: () => <CaretLeft/>,
	caretRight: () => <CaretRight/>,
	caretDown: () => <CaretDown/>,
	arrowDown: () => <ArrowDown/>,
	angleLeft: () => <AngleLeft/>,
	angleRight: () => <AngleRight/>,
	spinner: () => <Spinner/>
});

export {IconsRegistrar};