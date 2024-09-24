import {useEffect, useState} from 'react';
import {AppEventTypes, useAppEventBus} from '../bootstrap';
import {askAvailableLanguages, LangCode} from '../global-settings';
import {BannerButton, BannerButtonBase, BannerButtonMenu, BannerButtonMenuItem} from './banner-button-base';

interface I18NSwitcherState {
	initialized: boolean;
	code?: LangCode;
}

export const I18NSwitcherContainer = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<I18NSwitcherState>({initialized: false});
	useEffect(() => {
		const onLangChanged = (code: LangCode) => {
			setState(state => ({...state, code}));
		};
		on(AppEventTypes.LANG_CHANGED, onLangChanged);
		return () => {
			off(AppEventTypes.LANG_CHANGED, onLangChanged);
		};
	}, [on, off]);
	useEffect(() => {
		if (!state.initialized) {
			fire(AppEventTypes.ASK_LANG, (code: LangCode) => {
				setState({initialized: true, code});
			});
		}
	}, [fire, state.initialized]);

	if (!state.initialized) {
		return null;
	}

	const switchLangTo = (code: LangCode) => () => {
		fire(AppEventTypes.CHANGE_LANG, code);
	};
	const availableLanguages = askAvailableLanguages();
	const activeLang = availableLanguages.find(lang => lang.active(state.code!));

	return <BannerButtonBase widget="app-banner-i18n-switcher">
		<BannerButton>
			{activeLang?.icon}
		</BannerButton>
		<BannerButtonMenu>
			{availableLanguages.map(lang => {
				return <BannerButtonMenuItem icon={lang.icon} text={lang.text}
				                             active={lang.active(state.code!)}
				                             click={switchLangTo(lang.code)}
				                             key={lang.code}/>;
			})}
		</BannerButtonMenu>
	</BannerButtonBase>;
};

export const I18NSwitcher = () => {
	const {on, off, fire} = useAppEventBus();
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const onSwitchI18NEnabled = (enabled: boolean) => setEnabled(enabled);
		on(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NEnabled);
		return () => {
			off(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NEnabled);
		};
	}, [on, off]);
	useEffect(() => {
		fire(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, (enabled: boolean) => {
			setEnabled(enabled);
		});
	}, []);

	if (!enabled) {
		return null;
	}

	return <I18NSwitcherContainer/>;
};
