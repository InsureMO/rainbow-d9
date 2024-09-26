import {getAuthentication} from '../utils';

export interface Authentication {
	username?: string;
	displayName: string;
	token: string;
}

export const isAuthenticated = () => {
	return getAuthentication() != null;
};
