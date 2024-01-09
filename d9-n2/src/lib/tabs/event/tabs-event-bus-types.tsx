export enum TabsEventTypes {
	TRY_ACTIVE_FIRST_TAB = 'try-active-first',
	TRY_ACTIVE_TAB = 'try-active',
	ACTIVE_TAB = 'active',
}

export interface TabsEventBus {
	fire(type: TabsEventTypes.TRY_ACTIVE_FIRST_TAB, tabIndex: number, marker: string): this;

	on(type: TabsEventTypes.TRY_ACTIVE_FIRST_TAB, listener: (tabIndex: number, marker: string) => void): this;

	off(type: TabsEventTypes.TRY_ACTIVE_FIRST_TAB, listener: (tabIndex: number, marker: string) => void): this;

	fire(type: TabsEventTypes.TRY_ACTIVE_TAB, tabIndex: number, marker: string): this;

	on(type: TabsEventTypes.TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;

	off(type: TabsEventTypes.TRY_ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;

	fire(type: TabsEventTypes.ACTIVE_TAB, tabIndex: number, marker: string): this;

	on(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;

	off(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;
}