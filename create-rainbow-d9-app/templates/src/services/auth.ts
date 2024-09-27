import {ReactNode} from 'react';
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

export const authenticate = async (auth: { username: string; password: string }): Promise<AuthenticateResult> => {
	return {success: true};
};

export const authenticate2FA = async (auth: { username: string; code2fa: string }): Promise<AuthenticateResult> => {
	return {success: true};
};
