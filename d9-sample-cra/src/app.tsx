/**
 * make sure it is first one to be imported, which do initializing things
 */
import './envs';
import isPropValid from '@emotion/is-prop-valid';
import {StyleSheetManager} from 'styled-components';

import {DemoIndex} from './demos';
import {GlobalStyles} from './global-styles';

export const App = () => {
	return <StyleSheetManager shouldForwardProp={isPropValid}>
		<GlobalStyles/>
		<DemoIndex/>
	</StyleSheetManager>;
};
