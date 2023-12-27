import {BaseModel, PropValue, VUtils} from '@rainbow-d9/n1';
import {GlobalEventHandlers, GlobalEventPrefix, ModelCarriedHandler} from '@rainbow-d9/n2';

interface DecoratorPrefixCheck {
	test: boolean;
	origin: string;
	clipped?: string;
}

const decoratedByPrefix = (declaration: string, prefix: GlobalEventPrefix | string): DecoratorPrefixCheck => {
	if (VUtils.isBlank(declaration)) {
		return {test: false, origin: declaration};
	}
	const lowerCaseDeclaration = declaration.trim().toLowerCase();
	if (lowerCaseDeclaration.startsWith(`${prefix}:`) || lowerCaseDeclaration.startsWith(`${prefix} `)) {
		return {test: true, origin: declaration, clipped: declaration.substring(prefix.length + 1).trim()};
	} else {
		return {test: false, origin: declaration};
	}
};

const buildShowAlert = (declaration: string) => {
	const {test, clipped} = decoratedByPrefix(declaration, GlobalEventPrefix.ALERT);
	if (test) {
		return async (options: ModelCarriedHandler<BaseModel, PropValue> & GlobalEventHandlers): Promise<void> => {
			const {global: {alert: {show}}} = options;
			return await show((clipped ?? '').trim());
		};
	} else {
		return (void 0);
	}
};

const buildShowDialog = (declaration: string) => {
	const {test, origin, clipped} = decoratedByPrefix(declaration, GlobalEventPrefix.DIALOG);
	if (test) {
		return async (options: ModelCarriedHandler<BaseModel, PropValue> & GlobalEventHandlers): Promise<void> => {
			const {global: {custom}, root, model} = options;
			return await custom(origin, GlobalEventPrefix.DIALOG, clipped, {root, model});
		};
	} else {
		return (void 0);
	}
};

const buildSwitchWizardStep = (declaration: string) => {
	const {test, origin, clipped} = decoratedByPrefix(declaration, GlobalEventPrefix.WIZARD_STEP);
	if (test) {
		return async (options: ModelCarriedHandler<BaseModel, PropValue> & GlobalEventHandlers): Promise<void> => {
			const {global: {custom}, root, model} = options;
			return await custom(origin, GlobalEventPrefix.WIZARD_STEP, clipped, {root, model});
		};
	} else {
		return (void 0);
	}
};

const buildCustomEvent = (declaration: string) => {
	const {test, origin, clipped} = decoratedByPrefix(declaration, GlobalEventPrefix.CUSTOM);
	if (test) {
		return async (options: ModelCarriedHandler<BaseModel, PropValue> & GlobalEventHandlers): Promise<void> => {
			const {global: {custom}, root, model} = options;
			return await custom(origin, GlobalEventPrefix.CUSTOM, clipped, {root, model});
		};
	} else {
		return (void 0);
	}
};

export const buildClickHandler = (declaration: string) => {
	const builds = [
		buildShowAlert, buildShowDialog, buildSwitchWizardStep, buildCustomEvent
	];
	for (const build of builds) {
		const handler = build(declaration);
		if (handler != null) {
			return handler;
		}
	}
	return (void 0);
};
