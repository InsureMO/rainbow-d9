export enum TabsEventTypes {
	FIRST_TRY_ACTIVE_TAB = 'first-try-active-tab',
	TRY_ACTIVE_TAB = 'try-active-tab',
	ACTIVE_TAB = 'active-tab',
	REFRESH_TAB_CONTENT = 'refresh-tab-content'
}

export interface TabsEventBus {
	fire(type: TabsEventTypes.FIRST_TRY_ACTIVE_TAB, tabIndex: number, marker: string): this;
	on(type: TabsEventTypes.FIRST_TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;
	off(type: TabsEventTypes.FIRST_TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;
	fire(type: TabsEventTypes.TRY_ACTIVE_TAB, tabIndex: number, marker: string, onActivated?: () => Promise<void>): this;
	on(type: TabsEventTypes.TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string, onActivated?: () => Promise<void>) => void): this;
	off(type: TabsEventTypes.TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string, onActivated?: () => Promise<void>) => void): this;
	fire(type: TabsEventTypes.ACTIVE_TAB, tabIndex: number, marker: string, onActivated?: (where: 'title' | 'body') => Promise<void>): this;
	on(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string, onActivated?: (where: 'title' | 'body') => Promise<void>) => void): this;
	off(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string, onActivated?: (where: 'title' | 'body') => Promise<void>) => void): this;
	fire(type: TabsEventTypes.REFRESH_TAB_CONTENT, tabIndex: number, marker: string, onRefreshed?: (where: 'title' | 'body') => Promise<void>): this;
	on(type: TabsEventTypes.REFRESH_TAB_CONTENT, listener: (tabIndex: number, marker: string, onRefreshed?: (where: 'title' | 'body') => Promise<void>) => void): this;
	off(type: TabsEventTypes.REFRESH_TAB_CONTENT, listener: (tabIndex: number, marker: string, onRefreshed?: (where: 'title' | 'body') => Promise<void>) => void): this;
}