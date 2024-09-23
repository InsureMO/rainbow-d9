/**
 * make sure it is first one to be imported, which do initializing things
 */
import './envs';
import {AppEventBusProvider} from './app-event-bus';
import {AppFrame} from './frame';
import {AppGlobalStyles} from './global-styles';
import {I18NHandler} from './i18n-handler';
import {ThemeHandler} from './theme-handler';

export const App = () => {
	return <AppEventBusProvider>
		<AppGlobalStyles/>
		<ThemeHandler/>
		<I18NHandler/>
		<AppFrame/>
	</AppEventBusProvider>;
};
