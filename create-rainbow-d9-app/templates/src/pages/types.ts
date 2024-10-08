import {ObjectPropValue} from '@rainbow-d9/n1';
import {ParsedNodeDef} from '@rainbow-d9/n3';
import {FC} from 'react';

export interface AppPage {
	/** code of the page, unique */
	code: string;
	/** route to the page */
	route: string;
	/**
	 * code of menu item, which leads the page.
	 * 1. menu item must be pre-built in global settings.
	 * 2. if not set, means the page cannot be opened by menu.
	 * 3. one menu item can be linked to one page only.
	 */
	menuItemCode?: string;
	renderer: FC;
}

export type D9PageUIConfig = Omit<ParsedNodeDef, 'exportKey'>;

export interface D9PageState {
	$config: D9PageUIConfig;
	$root: ObjectPropValue;
}