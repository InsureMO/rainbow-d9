import {AppMenu, AppMenuGroup, AppMenuItem, AppMenuType} from './types';

export const isMenuGroup = (menu: AppMenu): menu is AppMenuGroup => menu.type === AppMenuType.GROUP;
export const isMenuItem = (menu: AppMenu): menu is AppMenuItem => menu.type === AppMenuType.ITEM;
