/**
 * make sure it is first one to be imported, which do initializing things
 */
import './envs';
import {GlobalStyles} from './global-styles';

export const App = () => {
	return <>
		<GlobalStyles/>
	</>;
};
