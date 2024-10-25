import {VUtils} from '@rainbow-d9/n1';
import {
	getAuthentication,
	getServiceUrlContext,
	getServiceUrlPrefix,
	isForceServiceUrlPrefix,
	setAuthenticationToken
} from '../utils';
import {guardPagRequest} from './utils';

export enum ResponseReturnCode {
	SUCCESS = '00000',
}

export interface PlainResponse<B> {
	body: B;
	returnCode: ResponseReturnCode;
	error?: string;
}

export interface PageRequest {
	pageSize?: number;
	pageNumber?: number;
}

export interface Page<I> {
	data: Array<I>;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	itemCount: number;
}

export interface PageResponse<I> extends PlainResponse<Page<I>> {
}

const getServiceHost = (): string => {
	if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
		return getServiceUrlPrefix();
	} else if (isForceServiceUrlPrefix()) {
		return getServiceUrlPrefix();
	} else {
		return window.location.protocol + '//' + window.location.host + getServiceUrlContext();
	}
};

const buildApi = (api: string, args?: Record<string, string | number | boolean>): string => {
	if (!args) {
		return api;
	}

	return Object.keys(args).reduce((api: string, key: string) => {
		const value = args[key] ?? '';
		return api.replace(`:${key}`, encodeURIComponent(value));
	}, api);
};

const request = async <B>(options: {
	api: string;
	method: 'POST' | 'GET';
	headers?: Record<string, string>;
	search?: Record<string, any>;
	auth?: boolean;
	pageable?: PageRequest;
	data?: any;
}): Promise<PlainResponse<B>> => {
	const {
		api, method = 'GET',
		headers: givenHeaders, search,
		auth = true, pageable, data
	} = options;

	const url = `${getServiceHost()}${buildApi(api, search)}`;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(givenHeaders ?? {})
	};
	if (auth) {
		headers.Authorization = `${getAuthentication()?.token}`;
	}

	let body;
	if (pageable) {
		body = JSON.stringify(pageable);
	} else if (data) {
		body = JSON.stringify(data);
	}

	let response;
	try {
		response = await fetch(url, {method, headers, body});
	} catch {
		response = {status: 0, json: () => Promise.resolve(void 0), headers: new Map()};
	}
	// try to get authorization token from response
	try {
		const token = response.headers.get('Authorization');
		if (VUtils.isNotBlank(token)) {
			setAuthenticationToken(token!);
		}
	} catch {
		// ignore the exception anyway
	}
	switch (response.status) {
		case 200: {
			let data;
			try {
				data = await response.json();
			} catch (e) {
				console.groupCollapsed(`Failed to get json from response of [${url}].`);
				console.error(e);
				console.groupEnd();
				// client side error, should alert current user
				// eslint-disable-next-line
				throw {status: 0, message: 'Client error.'};
			}
			if (VUtils.isNotBlank(data.returnCode) && data.returnCode !== ResponseReturnCode.SUCCESS) {
				// eslint-disable-next-line
				throw {status: 500, message: 'Internal server error.'};
			} else {
				return data;
			}
		}
		case 400: {
			// client side error, should alert current user
			let data;
			try {
				data = await response.json();
			} catch (e) {
				// ignore it
				console.groupCollapsed(`Failed to get json from response of [${url}].`);
				console.error(e);
				console.groupEnd();
				// eslint-disable-next-line
				throw {status: 400, message: 'Client error.'};
			}
			// eslint-disable-next-line
			throw {status: 400, message: 'Client error.', stack: data.errors};
		}
		case 401:
			// unauthorized, jump to collaborus sso page
			// eslint-disable-next-line
			throw {status: 401, message: 'Unauthorized.'};
		case 403:
			// forbidden since no access granted, should alert current user
			// eslint-disable-next-line
			throw {status: 403, message: 'Forbidden.'};
		case 500: {
			// server side error, should alert current user
			let data;
			try {
				data = await response.json();
			} catch (e) {
				// ignore it
				console.groupCollapsed(`Failed to get json from response of [${url}].`);
				console.error(e);
				console.groupEnd();
				// eslint-disable-next-line
				throw {status: 500, message: 'Internal server error.'};
			}
			// eslint-disable-next-line
			throw {status: 500, message: 'Internal server error.', stack: data.errors};
		}
		default:
			// unpredicted error, should alert current user
			// eslint-disable-next-line
			throw {status: 0, message: 'Unpredicted error.'};
	}
};

const get = async <B>(options: { api: string; search?: Record<string, any>; auth?: boolean }): Promise<B> => {
	const {api, search, auth} = options;
	return (await request({api, method: 'GET', search, auth})).body as B;
};

const post = async <B>(options: {
	api: string;
	headers?: Record<string, string>;
	search?: Record<string, any>;
	auth?: boolean;
	data?: any
}): Promise<B> => {
	const {api, headers, search, auth, data} = options;
	return (await request({api, method: 'POST', headers, search, auth, data})).body as B;
};

const postRaw = async <R>(options: {
	api: string;
	headers?: Record<string, string>;
	search?: Record<string, any>;
	auth?: boolean;
	data?: any
}): Promise<R> => {
	const {api, headers, search, auth, data} = options;
	return (await request({api, method: 'POST', headers, search, auth, data})) as R;
};

const page = async <I>(options: {
	api: string;
	search?: Record<string, any>;
	auth?: boolean;
	data?: any;
	pageable?: PageRequest;
}): Promise<Page<I>> => {
	const {api, search, auth, data, pageable} = options;
	return (await request({
		api, method: 'POST', search, auth,
		pageable: data == null ? guardPagRequest(pageable) : {...data, ...guardPagRequest(pageable)}
	})).body as Page<I>;
};

const APIS = {
	// auth services
	AUTH_BY_PWD: 'auth/by-pwd',
	AUTH_BY_2FA: 'auth/by-2fa',
	// fundamental services
	ASK_CODE_TABLE: 'ask/code-table/:code'
};

export class RestClient {
	private constructor() {
	}

	static buildApi = buildApi;
	static get = get;
	static post = post;
	static postRaw = postRaw;
	static page = page;
	static APIS: Readonly<typeof APIS> = APIS;
}

export const RC = RestClient;
