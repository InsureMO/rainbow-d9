export enum TabsEventTypes {
	ACTIVE_TAB = 'active',
}

export interface TabsEventBus {
	fire(type: TabsEventTypes.ACTIVE_TAB, tabIndex: number, marker: string): this;

	on(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;

	off(type: TabsEventTypes.ACTIVE_TAB, listener: (tabIndex: number, marker: string) => void): this;
}