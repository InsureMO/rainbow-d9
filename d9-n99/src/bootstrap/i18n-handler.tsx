import {$d9n2, GlobalEventTypes, useGlobalEventBus} from '@rainbow-d9/n2';
import {Fragment, useEffect, useState} from 'react';
import {getAppName, getDefaultLangCode, isI18NEnabled} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';
import {LangCode} from './types';

// default use en-US, language code must follow javascript standard
// add your own language labels here
$d9n2.intl.labels = {
	...$d9n2.intl.labels,
	'en-US': {
		app: {name: getAppName()}
	}
};

interface I18NState {
	code: LangCode;
}

export const I18NHandler = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<I18NState>(() => {
		return {code: getDefaultLangCode()};
	});
	useEffect(() => {
		if (isI18NEnabled()) {
			const onChangeLang = (code: LangCode) => {
				if (state.code != code) {
					setState({code: code});
					document.documentElement.lang = code;
					fire(AppEventTypes.LANG_CHANGED, code);
				}
			};
			on(AppEventTypes.CHANGE_LANG, onChangeLang);
			return () => {
				off(AppEventTypes.CHANGE_LANG, onChangeLang);
			};
		}
	}, [on, off, fire, state.code]);

	return <Fragment/>;
};

export const I18NAndD9N2Bridge = () => {
	const {fire} = useGlobalEventBus();
	const {on, off} = useAppEventBus();
	useEffect(() => {
		const onLangChanged = (code: LangCode) => {
			fire(GlobalEventTypes.LANGUAGE_CHANGED, code);
		};
		on(AppEventTypes.LANG_CHANGED, onLangChanged);
		return () => {
			off(AppEventTypes.LANG_CHANGED, onLangChanged);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};