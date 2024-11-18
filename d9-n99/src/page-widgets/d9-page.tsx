import {
	BaseModel,
	ExternalDefs,
	NodeDef,
	ObjectPropValue,
	PropValue,
	RootEventTypes,
	StandaloneRoot,
	useCreateEventBus,
	useRootEventBus,
	VUtils
} from '@rainbow-d9/n1';
import {
	AlertLabel,
	GlobalEventPrefix,
	GlobalEventTypes,
	GlobalHandlers,
	GlobalRoot,
	IntlLabel,
	ModelCarrier,
	useGlobalEventBus,
	useGlobalHandlers
} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import {createContext, Fragment, JSX, ReactNode, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {I18NAndD9N2Bridge} from '../bootstrap';
import {D9PageState} from '../global-settings';
import {asT} from '../utils';
import {StandardPageWrapper} from './standard-page-wrapper.tsx';

enum PageToRootEventBusTypes {
	TO_PAGE_ROOT = 'to-page-root',
	TO_DIALOG_ROOT = 'to-dialog-root'
}

interface PageToRootEventBus {
	on(type: PageToRootEventBusTypes.TO_PAGE_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	off(type: PageToRootEventBusTypes.TO_PAGE_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	fire(type: PageToRootEventBusTypes.TO_PAGE_ROOT, rootEventTypes: RootEventTypes, ...args: any[]): this;
	on(type: PageToRootEventBusTypes.TO_DIALOG_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	off(type: PageToRootEventBusTypes.TO_DIALOG_ROOT, listener: (rootEventTypes: RootEventTypes, ...args: any[]) => void): this;
	fire(type: PageToRootEventBusTypes.TO_DIALOG_ROOT, rootEventTypes: RootEventTypes, ...args: any[]): this;
}

const PageToRootContext = createContext<PageToRootEventBus>({} as PageToRootEventBus);
PageToRootContext.displayName = 'PageToRootEventBus';

export const PageToRootEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PageToRootEventBus>('app-page-to-root');

	return <PageToRootContext.Provider value={bus}>
		{children}
	</PageToRootContext.Provider>;
};

export const usePageToRootEventBus = () => useContext(PageToRootContext);

type Models<R extends BaseModel = BaseModel, M extends PropValue = PropValue> = ModelCarrier<R, M>;
type ModelsWithValue<R extends BaseModel = BaseModel, M extends PropValue = PropValue, V extends PropValue = PropValue> =
	Models<R, M>
	& { value: V };

type GlobalCustomEvent<M> = {
	marker?: string;
	models?: M;
	global: GlobalHandlers;
}

export interface GlobalCustomEventListeners {
	onSectionExpanded?: (event: GlobalCustomEvent<Models>) => void;
	onSectionCollapsed?: (event: GlobalCustomEvent<Models>) => void;
	onTabChanged?: (event: GlobalCustomEvent<Models>) => void;
	onWizardStepChanged?: (event: GlobalCustomEvent<Models>) => void;
	onTreeNodeClicked?: (event: GlobalCustomEvent<ModelsWithValue>) => void;
	onTreeNodeDoubleClicked?: (event: GlobalCustomEvent<ModelsWithValue>) => void;
	onTreeNodeContextMenu?: (event: GlobalCustomEvent<ModelsWithValue>) => void;
	onRibsElementExpanded?: (event: GlobalCustomEvent<Models>) => void;
	onRibsElementCollapsed?: (event: GlobalCustomEvent<Models>) => void;
}

export const PageGlobalCustomEventBridge = (props: GlobalCustomEventListeners) => {
	const {on, off} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();

	useEffect(() => {
		const onCustomEvent = (_key: string, prefix: string, clipped: string, models?: Models) => {
			switch (prefix) {
				case GlobalEventPrefix.SECTION_EXPANDED:
					props.onSectionExpanded?.({marker: clipped, models, global: globalHandlers});
					break;
				case GlobalEventPrefix.SECTION_COLLAPSED:
					props.onSectionCollapsed?.({marker: clipped, models, global: globalHandlers});
					break;
				case GlobalEventPrefix.TAB_CHANGED:
					props.onTabChanged?.({marker: clipped, models, global: globalHandlers});
					break;
				case GlobalEventPrefix.WIZARD_STEP_CHANGED:
					props.onWizardStepChanged?.({marker: clipped, models, global: globalHandlers});
					break;
				case GlobalEventPrefix.TREE_NODE_CLICKED:
					props.onTreeNodeClicked?.({marker: clipped, models: asT(models), global: globalHandlers});
					break;
				case GlobalEventPrefix.TREE_NODE_DOUBLE_CLICKED:
					props.onTreeNodeDoubleClicked?.({marker: clipped, models: asT(models), global: globalHandlers});
					break;
				case GlobalEventPrefix.TREE_NODE_CONTEXT_MENU:
					props.onTreeNodeContextMenu?.({marker: clipped, models: asT(models), global: globalHandlers});
					break;
				case GlobalEventPrefix.RIBS_ELEMENT_EXPANDED:
					props.onRibsElementExpanded?.({marker: clipped, models, global: globalHandlers});
					break;
				case GlobalEventPrefix.RIBS_ELEMENT_COLLAPSED:
					props.onRibsElementCollapsed?.({marker: clipped, models, global: globalHandlers});
					break;
			}
		};
		on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, props.onSectionExpanded]);
	return <Fragment/>;
};

export interface D9PageExternalDefsCreatorOptionsNavigator {
	to: (to: string) => void;
	replace: (to: string) => void;
}

export type EnhancedD9GlobalHandlers = GlobalHandlers['root'] & {
	/** to all dialogs when key is not provided */
	toDialog: (dialogKey?: string) => ({ fire: (type: RootEventTypes, ...args: any[]) => void });
	toPage: () => ({ fire: (type: RootEventTypes, ...args: any[]) => void });
}

export interface D9PageExternalDefsCreatorOptions extends GlobalHandlers {
	root: EnhancedD9GlobalHandlers;
	navigate: D9PageExternalDefsCreatorOptionsNavigator;
}

export type D9PageParsedUIManufacture = (parsed: NodeDef) => NodeDef;

export interface ExternalDefsWithGlobalCustomEventListeners extends ExternalDefs {
	$GlobalCustomEventListeners?: GlobalCustomEventListeners;
}

export type D9PageExternalDefsCreator = (global: D9PageExternalDefsCreatorOptions) => Promise<ExternalDefsWithGlobalCustomEventListeners>;

/**
 * when the global widget is replaced by given, make sure the given widget handles the corresponding global events.
 */
export interface D9PageProps {
	/** d9 ui configuration markdown */
	ui: string;
	/** last chance to manufacture parsed ui */
	manufactureParsedUI?: D9PageParsedUIManufacture;
	/** init root model */
	initRootModel?: ObjectPropValue;
	/** deep clone root model when false. default false */
	initRootModelAsIs?: boolean;
	/** external defs for d9 ui */
	externalDefs?: D9PageExternalDefsCreator;
	/** default global widgets replacement */
	/** refer to n2 Alert */
	alert?: () => JSX.Element;
	/** refer to n2 Dialog */
	dialog?: () => JSX.Element;
	/** refer to n2 YesNoDialog */
	yesNoDialog?: () => JSX.Element;
	/** refer to n2 Tip */
	tip?: () => JSX.Element;
	/** refer to n2 RemoteRequest */
	remoteRequest?: () => JSX.Element;
}

interface D9ExternalDefsInitializerState {
	initialized: boolean;
	defs?: ExternalDefsWithGlobalCustomEventListeners;
}

const useD9ExternalDefsInitializer = (
	toRootType: PageToRootEventBusTypes.TO_PAGE_ROOT | PageToRootEventBusTypes.TO_DIALOG_ROOT,
	create?: D9PageExternalDefsCreator,
	areaKey?: string) => {
	// this hook is outside of root event bus, which means the property root undefined
	// now have to build a bridge to pass root event bus to the external defs creator
	const globalHandlers = useGlobalHandlers();
	const navigate = useNavigate();
	const {fire} = usePageToRootEventBus();
	const [state, setState] = useState<D9ExternalDefsInitializerState>({initialized: false});

	useEffect(() => {
		if (create != null) {
			(async () => {
				const defs = await create({
					...globalHandlers,
					root: {
						// delegate to root event bus, no return value here
						// @ts-ignore
						fire: (type: RootEventTypes, ...args: any[]) => {
							// no matter what the target is, both page and dialog should receive the event
							fire(PageToRootEventBusTypes.TO_DIALOG_ROOT, type, ...args);
							fire(PageToRootEventBusTypes.TO_PAGE_ROOT, type, ...args);
						},
						toPage: () => {
							return {
								fire: (type: RootEventTypes, ...args: any[]) => {
									fire(PageToRootEventBusTypes.TO_PAGE_ROOT, type, ...args);
								}
							};
						},
						toDialog: (dialogKey?: string) => {
							if (VUtils.isNotBlank(dialogKey) && VUtils.isNotBlank(areaKey) && dialogKey !== areaKey) {
								// both dialog and area key are provided, but not matched
								return {fire: VUtils.noop};
							}
							return {
								fire: (type: RootEventTypes, ...args: any[]) => {
									fire(PageToRootEventBusTypes.TO_DIALOG_ROOT, type, ...args, dialogKey);
								}
							};
						}
					},
					// attach navigate functions
					navigate: {
						to: (to: string) => navigate(to, {replace: false}),
						replace: (to: string) => navigate(to, {replace: true})
					}
				});
				try {
					setState({initialized: true, defs});
				} catch (e) {
					console.error(e);
					await globalHandlers.alert.show(<AlertLabel>
						<IntlLabel keys={[]} value="Failed to load external defs for d9 page."/>
					</AlertLabel>);
				}
			})();
		} else {
			setState({initialized: true});
		}
	}, [create, toRootType, areaKey]);

	return state;
};

interface D9PageContentProps {
	pageDefs: NodeDef;
	rootModel: ObjectPropValue;
	externalDefs?: D9PageExternalDefsCreator;
	toRootType: PageToRootEventBusTypes.TO_PAGE_ROOT | PageToRootEventBusTypes.TO_DIALOG_ROOT;
	areaKey?: string;
}

/** bridge from page to root */
const PageToRootEventBridge = (props: {
	handle: PageToRootEventBusTypes.TO_PAGE_ROOT | PageToRootEventBusTypes.TO_DIALOG_ROOT;
}) => {
	const {on, off} = usePageToRootEventBus();
	const {fire} = useRootEventBus();
	const [handleType] = useState(props.handle);
	useEffect(() => {
		// delegate to root event bus
		const onToRoot = (type: RootEventTypes, ...args: any[]) => {
			// @ts-ignore
			fire(type, ...args);
		};
		// @ts-ignore
		on(handleType, onToRoot);
		return () => {
			// @ts-ignore
			off(handleType, onToRoot);
		};
	}, [on, off, fire, handleType]);

	return <Fragment/>;
};

const D9PageContent = (props: D9PageContentProps) => {
	const {pageDefs, rootModel, externalDefs: externalDefsCreate, toRootType, areaKey} = props;

	const externalDefs = useD9ExternalDefsInitializer(toRootType, externalDefsCreate, areaKey);
	if (!externalDefs.initialized) {
		return null;
	}

	return <StandardPageWrapper>
		<StandaloneRoot {...pageDefs} $root={rootModel} externalDefs={externalDefs.defs}>
			<PageGlobalCustomEventBridge {...(externalDefs.defs?.$GlobalCustomEventListeners ?? {})}/>
			<PageToRootEventBridge handle={toRootType}/>
		</StandaloneRoot>
	</StandardPageWrapper>;
};

const useStatePrepare = (props: Pick<D9PageProps, 'ui' | 'manufactureParsedUI' | 'initRootModel' | 'initRootModelAsIs'>): D9PageState => {
	const {ui, manufactureParsedUI, initRootModel = {}, initRootModelAsIs = false} = props;
	const [state] = useState<D9PageState>(() => {
		// console.time('parseDoc');
		let {node, success, error} = parseDoc(ui);
		// console.timeEnd('parseDoc');
		if (success && manufactureParsedUI != null) {
			node = manufactureParsedUI(node);
		}
		return {
			$config: {success, error, node},
			// deep clone it
			$root: initRootModelAsIs ? initRootModel : JSON.parse(JSON.stringify(initRootModel))
		};
	});
	return state;
};

export const D9Page = (props: D9PageProps) => {
	const {
		externalDefs,
		alert: Alert, dialog: Dialog, yesNoDialog: YesNoDialog, tip: Tip, remoteRequest: RemoteRequest
	} = props;

	const state = useStatePrepare(props);
	const {success, error} = state.$config;

	if (!success) {
		if (error instanceof Error) {
			return <div>{error.message}</div>;
		} else {
			return <div>{error}</div>;
		}
	}

	return <PageToRootEventBusProvider>
		<GlobalRoot avoidDefaultAlert={(Alert != null) || (void 0)}
		            avoidDefaultDialog={(Dialog != null) || (void 0)}
		            avoidDefaultYesNoDialog={(YesNoDialog != null) || (void 0)}
		            avoidDefaultTips={(Tip != null) || (void 0)}
		            avoidDefaultRemoteRequest={(RemoteRequest != null) || (void 0)}>
			{Alert && <Alert/>}
			{Dialog && <Dialog/>}
			{YesNoDialog && <YesNoDialog/>}
			{Tip && <Tip/>}
			{RemoteRequest && <RemoteRequest/>}
			<I18NAndD9N2Bridge/>
			<D9PageContent pageDefs={state.$config.node} rootModel={state.$root} externalDefs={externalDefs}
			               toRootType={PageToRootEventBusTypes.TO_PAGE_ROOT}/>
		</GlobalRoot>
	</PageToRootEventBusProvider>;
};

type D9DialogProps =
	Pick<D9PageProps, 'ui' | 'manufactureParsedUI' | 'initRootModel' | 'initRootModelAsIs' | 'externalDefs'>
	& { dialogKey?: string };

/**
 * The Dialog and Page share the PageToRootEventBusProvider, and since both Dialog and Page have their own RootEventBusProvider,
 * when a RootEvent is triggered by GlobalHandlers, both Page and Dialog will receive the event.
 * In certain scenarios, this is not the desired behavior.
 * For example, during validation, it is usually only expected that a specific area receives the event.
 * Particularly when validating a designated Dialog area, it is not anticipated that the Page will receive this event.
 */
export const D9Dialog = (props: D9DialogProps) => {
	const {externalDefs, dialogKey} = props;

	const state = useStatePrepare(props);
	const {success, error} = state.$config;

	if (!success) {
		if (error instanceof Error) {
			return <div>{error.message}</div>;
		} else {
			return <div>{error}</div>;
		}
	}

	return <D9PageContent pageDefs={state.$config.node} rootModel={state.$root} externalDefs={externalDefs}
	                      toRootType={PageToRootEventBusTypes.TO_DIALOG_ROOT}
	                      areaKey={dialogKey}/>;
};
