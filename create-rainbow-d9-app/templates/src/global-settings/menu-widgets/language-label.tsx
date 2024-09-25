import {useEffect, useState} from 'react';
import CheckIcon from '../../assets/check.svg?react';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {AppLanguage, LangCode} from '../i18n';
import {CheckLabel} from './check-label';

export const LanguageLabel = (props: Pick<AppLanguage, 'code' | 'text'>) => {
	const {code, text} = props;

	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<{ initialized: boolean; code?: LangCode }>({initialized: false});
	useEffect(() => {
		const onLangChanged = (code: LangCode) => {
			setState({initialized: true, code});
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

	return <CheckLabel>
		<span data-type="text">{text}</span>
		{code === state.code ? <span data-type="icon"><CheckIcon/></span> : null}
	</CheckLabel>;
};
