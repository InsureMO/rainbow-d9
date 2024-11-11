import {VUtils} from '@rainbow-d9/n1';
import {IntlLabel} from '@rainbow-d9/n2';
import DarkIcon from '../../assets/dark-theme.svg?react';
import LightIcon from '../../assets/light-theme.svg?react';
import {buildAvailableThemes, customToKind} from './custom-settings';
import {AppTheme, ThemeCode, ThemeKind} from './types';

/**
 * available themes, using in theme switcher
 */
export const askAvailableThemes = (): Array<AppTheme> => {
	return buildAvailableThemes(
		{
			code: 'light', kind: ThemeKind.LIGHT,
			icon: <LightIcon/>, text: <IntlLabel keys={['theme.light']} value="Light"/>,
			active: (_code: ThemeCode, kind: ThemeKind) => kind !== ThemeKind.DARK
		},
		{
			code: 'dark', kind: ThemeKind.DARK,
			icon: <DarkIcon/>, text: <IntlLabel keys={['theme.dark']} value="Dark"/>,
			active: (_code: ThemeCode, kind: ThemeKind) => kind === ThemeKind.DARK
		}
	);
};

/**
 * get theme kind from theme code
 */
export const toKind = (code: ThemeCode) => {
	const theme = askAvailableThemes().find(theme => theme.code === code);
	if (theme != null) {
		return theme.kind;
	}
	const kind = customToKind(code);
	if (VUtils.isNotBlank(kind)) {
		return kind as ThemeKind;
	}
	switch (true) {
		case code.toLowerCase().includes('dark'):
			return ThemeKind.DARK;
		case code.toLowerCase().includes('light'):
		default:
			return ThemeKind.LIGHT;
	}
};
