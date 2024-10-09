import {IntlLabel} from '@rainbow-d9/n2';
import LanguageIcon from '../../assets/language.svg?react';
import SettingsIcon from '../../assets/settings.svg?react';
import SystemThemeIcon from '../../assets/system-theme.svg?react';
import ThemeIcon from '../../assets/theme.svg?react';
import {AppEventTypes} from '../../bootstrap';
import {isThemeFollowSystemEnabled} from '../../utils';
import {askAvailableLanguages} from '../i18n';
import {LanguageLabel, ThemeLabel} from '../menu-widgets';
import {askAvailableThemes} from '../theme';
import {buildMenus, buildPreferencesMenuGroup} from './custom-settings';
import {AppMenuGroup, AppMenuItem, AppMenuType, PrebuiltAppMenuCode} from './types';

/**
 * available menus, using in side menu.
 * do not change the codes of the items, the language and theme switcher will use them
 */
export const askMenus = (): Array<AppMenuGroup | AppMenuItem> => {
	return buildMenus({
		preferences: buildPreferencesMenuGroup({
				code: PrebuiltAppMenuCode.PREFERENCES, type: AppMenuType.GROUP,
				icon: <SettingsIcon/>, text: <IntlLabel keys={['menus.preferences']} value="Preferences"/>,
				items: []
			}, {
				code: PrebuiltAppMenuCode.LANGUAGES, type: AppMenuType.GROUP,
				icon: <LanguageIcon/>, text: <IntlLabel keys={['menus.language']} value="Language"/>,
				items: askAvailableLanguages().map(lang => {
					return {
						code: lang.code, type: AppMenuType.ITEM,
						icon: lang.icon, text: <LanguageLabel {...lang}/>,
						click: async (fire) => {
							fire(AppEventTypes.CHANGE_LANG, lang.code);
						}
					};
				})
			}, {
				code: PrebuiltAppMenuCode.THEMES, type: AppMenuType.GROUP,
				icon: <ThemeIcon/>, text: <IntlLabel keys={['menus.theme']} value="Color Theme"/>,
				items: [
					...askAvailableThemes().map<AppMenuItem>(theme => {
						return {
							code: theme.code, type: AppMenuType.ITEM,
							icon: theme.icon, text: <ThemeLabel {...theme}/>,
							click: async (fire) => {
								fire(AppEventTypes.CHANGE_THEME, theme.code);
							}
						};
					}),
					...(isThemeFollowSystemEnabled() ? [{
						code: PrebuiltAppMenuCode.SYSTEM_THEME, type: AppMenuType.ITEM,
						icon: <SystemThemeIcon/>,
						text: <ThemeLabel code={PrebuiltAppMenuCode.SYSTEM_THEME}
						                  text={<IntlLabel keys={['theme.system']} value="System"/>}/>,
						click: async (fire) => {
							fire(AppEventTypes.CHANGE_THEME_BY_SYSTEM);
						}
					} as AppMenuItem] : [] as Array<AppMenuItem>)
				]
			}
		)
	});
};
