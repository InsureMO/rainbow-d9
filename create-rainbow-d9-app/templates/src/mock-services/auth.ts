import {AuthenticateBy2FA, AuthenticateByPwd, AuthenticateResult} from '../services';
import {setAuthentication} from '../utils';

export const mockAuthenticate = async (auth: AuthenticateByPwd): Promise<AuthenticateResult> => {
	const {username} = auth;
	setAuthentication({username, displayName: 'Mock User', token: 'mock-token'});
	return {success: true};
};

export const mockAuthenticate2FA = async (auth: AuthenticateBy2FA): Promise<AuthenticateResult> => {
	const {username} = auth;
	setAuthentication({username, displayName: 'Mock User', token: 'mock-token'});
	return {success: true};
};
