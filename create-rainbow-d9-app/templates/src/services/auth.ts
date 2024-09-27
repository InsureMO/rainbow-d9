import {ReactNode} from 'react';
import {mock, mockAuthenticate, mockAuthenticate2FA} from '../mock-services';
import {getAuthentication} from '../utils';

export interface Authentication {
	username?: string;
	displayName: string;
	token: string;
}

export const isAuthenticated = () => {
	return getAuthentication() != null;
};

export interface AuthenticateResult {
	success: boolean;
	message?: ReactNode;
}

export interface AuthenticateByPwd {
	username: string;
	password: string;
}

export const authenticate = mock(async (_auth: AuthenticateByPwd): Promise<AuthenticateResult> => {
	// TODO authenticate
	return {success: false};
}).by(mockAuthenticate);

export interface AuthenticateBy2FA {
	username: string;
	code2fa: string;
}

export const authenticate2FA = mock(async (_auth: AuthenticateBy2FA): Promise<AuthenticateResult> => {
	// TODO authenticate 2fa
	return {success: false};
}).by(mockAuthenticate2FA);
