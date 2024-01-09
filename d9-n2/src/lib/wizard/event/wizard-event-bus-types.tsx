export enum WizardEventTypes {
	FIRST_TRY_ACTIVE_STEP = 'first-try-active-step',
	TRY_ACTIVE_STEP = 'try-active-step',
	ACTIVE_STEP = 'active-step',
	REFRESH_STEP_CONTENT = 'refresh-step-content'
}

export interface WizardEventBus {
	fire(type: WizardEventTypes.FIRST_TRY_ACTIVE_STEP, stepIndex: number, marker: string): this;

	on(type: WizardEventTypes.FIRST_TRY_ACTIVE_STEP, listener: (stepIndex: number, marker: string) => void): this;

	off(type: WizardEventTypes.FIRST_TRY_ACTIVE_STEP, listener: (stepIndex: number, marker: string) => void): this;

	fire(type: WizardEventTypes.TRY_ACTIVE_STEP, stepIndex: number, marker: string): this;

	on(type: WizardEventTypes.TRY_ACTIVE_STEP, listener: (stepIndex: number, marker: string) => void): this;

	off(type: WizardEventTypes.TRY_ACTIVE_STEP, listener: (stepIndex: number, marker: string) => void): this;

	fire(type: WizardEventTypes.ACTIVE_STEP, stepIndex: number, marker: string, reachedIndex: number): this;

	on(type: WizardEventTypes.ACTIVE_STEP, listener: (stepIndex: number, marker: string, reachedIndex: number) => void): this;

	off(type: WizardEventTypes.ACTIVE_STEP, listener: (stepIndex: number, marker: string, reachedIndex: number) => void): this;

	fire(type: WizardEventTypes.REFRESH_STEP_CONTENT, stepIndex: number, marker: string): this;

	on(type: WizardEventTypes.REFRESH_STEP_CONTENT, listener: (stepIndex: number, marker: string) => void): this;

	off(type: WizardEventTypes.REFRESH_STEP_CONTENT, listener: (stepIndex: number, marker: string) => void): this;
}