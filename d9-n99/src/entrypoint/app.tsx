/**
 * make sure it is first one to be imported, which do initializing things
 */
import './envs';
import {AppEventBusProvider} from './app-event-bus';
import {GlobalStyles} from './global-styles';
import {ThemeHandler} from './theme-handler';

export const App = () => {
	return <AppEventBusProvider>
		<GlobalStyles/>
		<ThemeHandler/>
	</AppEventBusProvider>;
};
