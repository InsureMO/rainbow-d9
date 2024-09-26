import {isAuthenticated} from '../../services';
import {isAuthenticationEnabled} from '../../utils';
import {Authentication} from './authentication';
import {NoAuthentication} from './no-authentication';

export const Unauthenticated = () => {
	if (isAuthenticated()) {
		return null;
	}

	if (isAuthenticationEnabled()) {
		return <Authentication/>;
	} else {
		return <NoAuthentication/>;
	}
};
