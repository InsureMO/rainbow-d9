import {ReactNode} from 'react';
import {mock, mockAuthenticate, mockAuthenticate2FA} from '../mock-services';
import {getAuthentication} from '../utils';
import {RC} from './rest-client';

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

export const authenticate = mock(async (auth: AuthenticateByPwd): Promise<AuthenticateResult> => {
	return await RC.post({api: RC.APIS.AUTH_BY_PWD, auth: false, data: auth});
}).by(mockAuthenticate);

export interface AuthenticateBy2FA {
	username: string;
	code2fa: string;
}

export const authenticate2FA = mock(async (auth: AuthenticateBy2FA): Promise<AuthenticateResult> => {
	return await RC.post({api: RC.APIS.AUTH_BY_2FA, auth: false, data: auth});
}).by(mockAuthenticate2FA);
