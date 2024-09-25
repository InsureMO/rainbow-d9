import {useEffect, useState} from 'react';
import CheckIcon from '../../assets/check.svg?react';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {isThemeFollowSystem, isThemeFollowSystemEnabled} from '../../utils';
import {PrebuiltAppMenuCode} from '../menu';
import {AppTheme, ThemeCode} from '../theme';
import {CheckLabel} from './check-label';

export const ThemeLabel = (props: Pick<AppTheme, 'code' | 'text'>) => {
	const {code, text} = props;

	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<{ initialized: boolean; code?: ThemeCode }>({initialized: false});
	useEffect(() => {
		const onThemeChanged = (code: ThemeCode) => {
			setState({initialized: true, code});
		};
		on(AppEventTypes.THEME_CHANGED, onThemeChanged);
		return () => {
			off(AppEventTypes.THEME_CHANGED, onThemeChanged);
		};
	}, [on, off]);
	useEffect(() => {
		if (!state.initialized) {
			fire(AppEventTypes.ASK_THEME, (code: ThemeCode) => {
				setState({initialized: true, code});
			});
		}
	}, [fire, state.initialized]);

	const couldThemeFollowSystem = isThemeFollowSystemEnabled();
	const themeFollowSystem = couldThemeFollowSystem && isThemeFollowSystem();
	let active;
	if (code === PrebuiltAppMenuCode.SYSTEM_THEME) {
		active = themeFollowSystem;
	} else {
		active = !themeFollowSystem && code === state.code;
	}

	return <CheckLabel>
		<span data-type="text">{text}</span>
		{active ? <span data-type="icon"><CheckIcon/></span> : null}
	</CheckLabel>;
};
