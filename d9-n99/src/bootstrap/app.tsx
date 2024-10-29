// make sure it is first one to be imported, which do initializing things
import './envs';
import {useEffect} from 'react';
import {isDev} from '../utils';
import {AppEventBusProvider} from './app-event-bus';
import {AppFrame} from './frame';
import {AppGlobalStyles} from './global-styles';
import {I18NHandler} from './i18n-handler';
import {ThemeHandler} from './theme-handler';

export const App = () => {
	useEffect(() => {
		if (!isDev()) {
			return;
		}
		const colors = [
			'color:rgb(14,14,14)', 'color:rgb(31,75,137)', 'color:rgb(190,168,76)', 'color:rgb(139,59,157)', 'color:rgb(14,14,14)',
			'color:rgb(55,122,41)', 'color:rgb(14,14,14)', 'color:rgb(139,59,157)', 'color:rgb(14,14,14)', 'color:rgb(53,89,186)',
			'color:rgb(190,168,76)', 'color:rgb(14,14,14)'
		];
		console.groupCollapsed('%cLayout control commands by d9 app', 'font-size:1.2em;font-weight:bold;color:rgb(139,59,157)');
		console.log('%c// switch side menu, could be true/false', 'color:gray');
		console.log('%cpostMessage%c(%c{%ctype%c: %c\'switch-side-menu\'%c, %cenabled%c: %cfalse%c}%c);', ...colors);
		console.log('%c// switch banner, could be true/false', 'color:gray');
		console.log('%cpostMessage%c(%c{%ctype%c: %c\'switch-banner\'%c, %cenabled%c: %cfalse%c}%c);', ...colors);
		console.log('%c// switch theme switcher, could be true/false', 'color:gray');
		console.log('%cpostMessage%c(%c{%ctype%c: %c\'switch-theme-switcher\'%c, %cenabled%c: %cfalse%c}%c);', ...colors);
		console.log('%c// switch i18n switcher, could be true/false', 'color:gray');
		console.log('%cpostMessage%c(%c{%ctype%c: %c\'switch-i18n-switcher\'%c, %cenabled%c: %cfalse%c}%c);', ...colors);
		console.groupEnd();
	}, []);
	return <AppEventBusProvider>
		<AppGlobalStyles/>
		<ThemeHandler/>
		<I18NHandler/>
		<AppFrame/>
	</AppEventBusProvider>;
};
