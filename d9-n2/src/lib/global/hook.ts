import {BaseModel, PropValue, RootEventBus, useRootEventBus} from '@rainbow-d9/n1';
import {CSSProperties, ReactNode, useState} from 'react';
import {ModelCarrier} from '../types';
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
				// success -> resolve; otherwise -> reject
				if (fire == null) {
					reject('Global event bus not provided.');
				} else {
					fire(GlobalEventTypes.INVOKE_REMOTE_REQUEST, request, resolve, reject, disableAlert);
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
						fire(GlobalEventTypes.SHOW_ALERT, content, resolve);
					}
				});
			},
			hide: () => {
				if (fire != null) {
					fire(GlobalEventTypes.HIDE_ALERT);
				}
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
				if (fire != null) {
					fire(GlobalEventTypes.SHOW_DIALOG, content, wrapperStyle);
				}
			},
			hide: () => {
				if (fire != null) {
					fire(GlobalEventTypes.HIDE_DIALOG);
				}
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
						fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, content, resolve, reject);
					}
				});
			},
			hide: () => {
				if (fire != null) {
					fire(GlobalEventTypes.HIDE_DIALOG);
				}
			}
		};
	});

	return functions;
};

export enum GlobalEventPrefix {
	// action
	/** show alert */
	ALERT = 'alert',
	/** show dialog */
	DIALOG = 'dialog',
	/** active tab */
	TAB = 'tab',
	/** active wizard step */
	WIZARD_STEP = 'wstep',
	/** expand section */
	EXPAND_SECTION = 'expand-section',
	/** collapse section */
	COLLAPSE_SECTION = 'collapse-section',
	/** refresh tree node and its descendants */
	REFRESH_TREE = 'refresh-tree',
	/** refresh tree node only */
	REFRESH_TREE_NODE = 'refresh-tree-node',
	/** refresh child nodes only  */
	REFRESH_TREE_CHILD_NODES = 'refresh-tree-child-nodes',
	/** recalculating child nodes, and refresh */
	RECALC_TREE_CHILD_NODES = 'recalc-tree-child-nodes',
	/** refresh node itself and all child nodes  */
	REFRESH_TREE_NODE_AND_CHILDREN = 'refresh-tree-node-and-children',
	/** recalculating child nodes, and refresh all child nodes and node itself  */
	RECALC_TREE_NODE_AND_CHILDREN = 'recalc-tree-node-and-children',
	/** expand tree node */
	EXPAND_TREE_NODE = 'expand-tree-node',
	/** collapse tree node */
	COLLAPSE_TREE_NODE = 'collapse-tree-node',
	/** expand ribs element */
	EXPAND_RIBS_ELEMENT = 'expand-ribs-element',
	/** collapse ribs element */
	COLLAPSE_RIBS_ELEMENT = 'collapse-ribs-element',
	/** expand table row */
	EXPAND_TABLE_ROW = 'expand-table-row',
	/** collapse table row */
	COLLAPSE_TABLE_ROW = 'collapse-table-row',
	CUSTOM = 'custom',
	// post action, after something happened
	SECTION_EXPANDED = 'section-expanded',
	SECTION_COLLAPSED = 'section-collapsed',
	RIBS_ELEMENT_EXPANDED = 'ribs-element-expanded',
	RIBS_ELEMENT_COLLAPSED = 'ribs-element-collapsed',
	TAB_CHANGED = 'tab-changed',
	WIZARD_STEP_CHANGED = 'wstep-changed',
	TREE_NODE_CLICKED = 'tree-node-clicked',
	TREE_NODE_DOUBLE_CLICKED = 'tree-node-double-clicked',
	TREE_NODE_CONTEXT_MENU = 'tree-node-context-menu'
}

export type CustomGlobalEventHandler = <R extends BaseModel, M extends PropValue>(
	key: string, prefix: string, clipped: string, models?: ModelCarrier<R, M>) => Promise<void>;

export const useCustomGlobalEvent = (): CustomGlobalEventHandler => {
	const {fire} = useGlobalEventBus();
	const [func] = useState(() => {
		return async <R extends BaseModel, M extends PropValue>(
			key: string, prefix: string, clipped?: string, models?: { root: R; model: M; }): Promise<void> => {
			return new Promise<void>(resolve => {
				if (fire != null) {
					fire(GlobalEventTypes.CUSTOM_EVENT, key, prefix, clipped, models);
				}
				resolve();
			});
		};
	});
	return func;
};

export type SimpleCustomGlobalEventHandler = <R extends BaseModel, M extends PropValue>(
	prefix: string, clipped: string, models?: ModelCarrier<R, M>, callback?: () => Promise<void>) => Promise<void>;

export const useSimpleCustomGlobalEvent = (): SimpleCustomGlobalEventHandler => {
	const {fire} = useGlobalEventBus();
	const [func] = useState(() => {
		return async <R extends BaseModel, M extends PropValue>(
			prefix: string, clipped?: string, models?: ModelCarrier<R, M>, callback?: () => Promise<void>): Promise<void> => {
			return new Promise<void>(resolve => {
				if (callback == null) {
					if (fire != null) {
						fire(GlobalEventTypes.CUSTOM_EVENT, `${prefix}:${clipped ?? ''}`, prefix, clipped, models);
					}
					resolve();
				} else {
					if (fire != null) {
						fire(GlobalEventTypes.CUSTOM_EVENT, `${prefix}:${clipped ?? ''}`, prefix, clipped, models,
							async (): Promise<void> => {
								await callback();
								resolve();
							});
					}
				}
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
	sc: SimpleCustomGlobalEventHandler;
	/**
	 * be careful, root event bus could be an empty object if hook is called outside RootEventBusProvider
	 */
	root?: Pick<RootEventBus, 'fire'>;
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
	const scEvent = useSimpleCustomGlobalEvent();
	const {fire} = useRootEventBus() ?? {};
	const [handlers] = useState<GlobalHandlers>({
		alert, dialog, yesNoDialog, remoteRequest,
		custom: customEvent, sc: scEvent,
		root: fire == null ? (void 0) : {fire}
	});
	return handlers;
};
