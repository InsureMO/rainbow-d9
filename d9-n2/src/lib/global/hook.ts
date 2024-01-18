import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {CSSProperties, ReactNode, useState} from 'react';
import {GlobalEventTypes, useGlobalEventBus} from './global-event-bus';

export interface RemoteRequestNeverFailResponse {
	failed: boolean;
}

export interface RemoteRequestNeverFailResponseSuccess<R> extends RemoteRequestNeverFailResponse {
	failed: false;
	result?: R;
}

export interface RemoteRequestNeverFailResponseFail extends RemoteRequestNeverFailResponse {
	failed: true;
	error?: Error;
}

export interface RemoteRequestHandlers {
	readonly request: <R>(request: () => Promise<R>, disableAlert?: boolean) => Promise<R>;
	readonly neverFailRequest: <R>(request: () => Promise<R>, disableAlert?: boolean) => Promise<RemoteRequestNeverFailResponseSuccess<R> | RemoteRequestNeverFailResponseFail>;
}

export const useRemoteRequest = (): RemoteRequestHandlers => {
	const {fire} = useGlobalEventBus();
	const [functions] = useState(() => {
		const doRemoteRequest = async <R>(request: () => Promise<R>, disableAlert?: boolean): Promise<R> => {
			return new Promise<R>((resolve, reject) => {
				if (fire == null) {
					reject();
				} else {
					// success -> resolve; otherwise -> reject
					fire && fire(GlobalEventTypes.INVOKE_REMOTE_REQUEST, request, resolve, reject, disableAlert);
				}
			});
		};

		return {
			request: doRemoteRequest,
			neverFailRequest: async <R>(request: () => Promise<R>, disableAlert?: boolean): Promise<RemoteRequestNeverFailResponseSuccess<R> | RemoteRequestNeverFailResponseFail> => {
				try {
					const result: R = await doRemoteRequest(request, disableAlert);
					return {failed: false, result};
				} catch (error) {
					return {failed: true, error};
				}
			}
		};
	});

	return functions;
};

export interface AlertHandlers {
	readonly show: (content: ReactNode) => Promise<void>;
	readonly hide: () => void;
}

export const useAlert = (): AlertHandlers => {
	const {fire} = useGlobalEventBus();
	const [functions] = useState(() => {
		return {
			show: async (content: ReactNode): Promise<void> => {
				return new Promise<void>(resolve => {
					if (fire == null) {
						resolve();
					} else {
						fire && fire(GlobalEventTypes.SHOW_ALERT, content, resolve);
					}
				});
			},
			hide: () => {
				fire && fire(GlobalEventTypes.HIDE_ALERT);
			}
		};
	});

	return functions;
};

export interface DialogHandlers {
	readonly show: (content: ReactNode, wrapperStyle?: CSSProperties) => void;
	readonly hide: () => void;
}

export const useDialog = (): DialogHandlers => {
	const {fire} = useGlobalEventBus();
	const [functions] = useState(() => {
		return {
			show: (content: ReactNode, wrapperStyle?: CSSProperties) => {
				fire && fire(GlobalEventTypes.SHOW_DIALOG, content, wrapperStyle);
			},
			hide: () => {
				fire && fire(GlobalEventTypes.HIDE_DIALOG);
			}
		};
	});

	return functions;
};

export interface YesNoDialogHandlers {
	readonly show: (content: ReactNode) => Promise<void>;
	readonly hide: () => void;
}

export const useYesNoDialog = (): YesNoDialogHandlers => {
	const {fire} = useGlobalEventBus();

	const [functions] = useState(() => {
		return {
			show: async (content: ReactNode): Promise<void> => {
				// yes -> resolve, no -> reject
				return new Promise<void>((resolve, reject) => {
					if (fire == null) {
						reject();
					} else {
						fire && fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, content, resolve, reject);
					}
				});
			},
			hide: () => {
				fire && fire(GlobalEventTypes.HIDE_DIALOG);
			}
		};
	});

	return functions;
};

export enum GlobalEventPrefix {
	// action
	ALERT = 'alert', DIALOG = 'dialog',
	TAB = 'tab', WIZARD_STEP = 'wstep',
	EXPAND_SECTION = 'expand-section', COLLAPSE_SECTION = 'collapse-section',
	CUSTOM = 'custom',
	// post action, after something happened
	SECTION_EXPANDED = 'section-expanded',
	SECTION_COLLAPSED = 'section-collapsed',
	TAB_CHANGED = 'tab-changed',
	WIZARD_STEP_CHANGED = 'wstep-changed',
	TREE_NODE_CLICKED = 'tree-node-clicked',
}

export type CustomGlobalEventHandler = <R extends BaseModel, M extends PropValue>(
	key: string, prefix: string, clipped: string, models?: { root: R; model: M; }) => Promise<void>;

export const useCustomGlobalEvent = (): CustomGlobalEventHandler => {
	const {fire} = useGlobalEventBus();
	const [func] = useState(() => {
		return async <R extends BaseModel, M extends PropValue>(
			key: string, prefix: string, clipped: string, models?: { root: R; model: M; }): Promise<void> => {
			return new Promise<void>(resolve => {
				fire && fire(GlobalEventTypes.CUSTOM_EVENT, key, prefix, clipped, models);
				resolve();
			});
		};
	});
	return func;
};

export interface GlobalHandlers {
	alert: AlertHandlers;
	dialog: DialogHandlers;
	yesNoDialog: YesNoDialogHandlers;
	remoteRequest: RemoteRequestHandlers;
	custom: CustomGlobalEventHandler;
}

/**
 * make sure GlobalEventBusProvider is aligned outside
 */
export const useGlobalHandlers = (): GlobalHandlers => {
	const alert = useAlert();
	const dialog = useDialog();
	const yesNoDialog = useYesNoDialog();
	const remoteRequest = useRemoteRequest();
	const customEvent = useCustomGlobalEvent();
	const [handlers] = useState<GlobalHandlers>({
		alert, dialog, yesNoDialog, remoteRequest, custom: customEvent
	});
	return handlers;
};
