import {IntlLabel} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import DarkIcon from '../assets/dark-theme.svg?react';
import LightIcon from '../assets/light-theme.svg?react';
import SystemThemeIcon from '../assets/system-theme.svg?react';
import {AppEventTypes, ThemeState, useAppEventBus} from '../bootstrap';
import {askAvailableThemes, ThemeCode, ThemeKind} from '../global-settings';
import {isThemeFollowSystem, isThemeFollowSystemEnabled, setThemeFollowSystem} from '../utils';
import {BannerButton, BannerButtonBase, BannerButtonMenu, BannerButtonMenuItem} from './banner-button-base';

interface ThemeSwitcherState extends Partial<ThemeState> {
	initialized: boolean;
}

const ThemeSwitcherContainer = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<ThemeSwitcherState>({initialized: false});
	useEffect(() => {
		const onThemeChanged = (code: ThemeCode, kind: ThemeKind) => {
			setState(state => ({...state, code, kind}));
		};
		on(AppEventTypes.THEME_CHANGED, onThemeChanged);
		return () => {
			off(AppEventTypes.THEME_CHANGED, onThemeChanged);
		};
	}, [on, off]);
	useEffect(() => {
		if (!state.initialized) {
			fire(AppEventTypes.ASK_THEME, (code: ThemeCode, kind: ThemeKind) => {
				setState({initialized: true, code, kind});
			});
		}
	}, [fire, state.initialized]);

	if (!state.initialized) {
		return null;
	}

	const switchThemeTo = (code: ThemeCode) => () => {
		setThemeFollowSystem(false);
		fire(AppEventTypes.CHANGE_THEME, code);
	};
	const switchToSystem = () => {
		setThemeFollowSystem(true);
		fire(AppEventTypes.CHANGE_THEME_BY_SYSTEM);
	};
	const couldThemeFollowSystem = isThemeFollowSystemEnabled();
	const themeFollowSystem = couldThemeFollowSystem && isThemeFollowSystem();
	const availableThemes = askAvailableThemes();

	return <BannerButtonBase widget="app-banner-theme-switcher">
		<BannerButton>
			{state.kind === ThemeKind.DARK ? <DarkIcon/> : <LightIcon/>}
		</BannerButton>
		<BannerButtonMenu>
			{availableThemes.map(theme => {
				return <BannerButtonMenuItem icon={theme.icon} text={theme.text}
				                             active={!themeFollowSystem && theme.active(state.code!, state.kind!)}
				                             click={switchThemeTo(theme.code)}
				                             key={theme.code}/>;
			})}
			{couldThemeFollowSystem
				? <BannerButtonMenuItem icon={<SystemThemeIcon/>}
				                        text={<IntlLabel keys={['theme.system']} value="System"/>}
				                        active={themeFollowSystem} click={switchToSystem}/>
				: null}
		</BannerButtonMenu>
	</BannerButtonBase>;
};

export const ThemeSwitcher = () => {
	const {on, off, fire} = useAppEventBus();
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const onSwitchBannerEnabled = (enabled: boolean) => setEnabled(enabled);
		on(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchBannerEnabled);
		return () => {
			off(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchBannerEnabled);
		};
	}, [on, off]);
	useEffect(() => {
		fire(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, (enabled: boolean) => {
			setEnabled(enabled);
		});
	}, []);

	if (!enabled) {
		return null;
	}

	return <ThemeSwitcherContainer/>;
};
