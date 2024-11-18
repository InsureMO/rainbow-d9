/**
 * make sure it is first one to be imported, which do initializing things
 */
import './envs';
import {StyleSheetManager} from '@rainbow-d9/n2';
import {DemoIndex} from './demos';
import {GlobalStyles} from './global-styles';

export const App = () => {
	return <StyleSheetManager>
		<GlobalStyles/>
		<DemoIndex/>
	</StyleSheetManager>;
};
