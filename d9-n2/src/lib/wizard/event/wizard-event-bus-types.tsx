export enum WizardEventTypes {
	ACTIVE_STEP = 'active',
}

export interface WizardEventBus {
	fire(type: WizardEventTypes.ACTIVE_STEP, tabIndex: number, marker: string): this;

	on(type: WizardEventTypes.ACTIVE_STEP, listener: (tabIndex: number, marker: string) => void): this;

	off(type: WizardEventTypes.ACTIVE_STEP, listener: (tabIndex: number, marker: string) => void): this;
}