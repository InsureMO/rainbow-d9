import {IntlLabel} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import DarkIcon from '../assets/dark-theme.svg?react';
import LightIcon from '../assets/light-theme.svg?react';
import SystemThemeIcon from '../assets/system-theme.svg?react';
import {AppEventTypes, ThemeCode, ThemeKind, ThemeState, useAppEventBus} from '../global';
import {isThemeFollowSystemEnabled, setThemeFollowSystem} from '../utils';
import {BannerButton, BannerButtonBase, BannerButtonMenu, BannerButtonMenuItem} from './banner-button-base';

interface ThemeSwitcherState extends Partial<ThemeState> {
	initialized: boolean;
}

export const ThemeSwitcher = () => {
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

	return <BannerButtonBase widget="app-banner-theme-switcher">
		<BannerButton>
			{state.kind === ThemeKind.DARK ? <DarkIcon/> : <LightIcon/>}
		</BannerButton>
		<BannerButtonMenu>
			<BannerButtonMenuItem icon={<LightIcon/>} text={<IntlLabel keys={['theme.light']} value="Light"/>}
			                      active={state.kind !== ThemeKind.DARK} click={switchThemeTo('light')}/>
			<BannerButtonMenuItem icon={<DarkIcon/>} text={<IntlLabel keys={['theme.dark']} value="Dark"/>}
			                      active={state.kind === ThemeKind.DARK} click={switchThemeTo('dark')}/>
			{couldThemeFollowSystem
				? <BannerButtonMenuItem icon={<SystemThemeIcon/>}
				                        text={<IntlLabel keys={['theme.system']} value="System"/>}
				                        active={false} click={switchToSystem}/>
				: null}
		</BannerButtonMenu>
	</BannerButtonBase>;
};