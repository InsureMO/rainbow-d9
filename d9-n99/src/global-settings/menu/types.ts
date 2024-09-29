import {ReactNode} from 'react';
import {AppEventBus} from '../../bootstrap/app-event-bus';

export enum AppMenuType {
	GROUP = 'group', ITEM = 'item'
}

export interface AppMenu {
	code: string;
	type: AppMenuType;
	icon?: ReactNode;
	text: ReactNode;
}

export interface AppMenuGroup extends AppMenu {
	type: AppMenuType.GROUP;
	items: Array<AppMenuGroup | AppMenuItem>;
}

export interface AppMenuItem extends AppMenu {
	type: AppMenuType.ITEM;
	click: (fire: AppEventBus['fire']) => Promise<void>;
}

export enum PrebuiltAppMenuCode {
	PREFERENCES = 'preferences',
	LANGUAGES = 'languages',
	THEMES = 'theme',
	SYSTEM_THEME = 'system-theme'
}
