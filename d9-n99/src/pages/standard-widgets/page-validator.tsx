import {RootEventTypes, ValidatedSet} from '@rainbow-d9/n1';
import {AlertLabel, GlobalHandlers, IntlLabel} from '@rainbow-d9/n2';
import {EnhancedD9GlobalHandlers} from './d9-page';

interface ValidateOptions {
	globalHandlers: GlobalHandlers;
	scopes?: Array<string>;
	passed: () => Promise<void>;
	failed?: () => Promise<void>;
}

const createValidateHandler = (options: Omit<ValidateOptions, 'scopes'> & { resolve: () => void }) => {
	const {globalHandlers, passed, failed, resolve} = options;

	return async (validated: ValidatedSet) => {
		if (validated.failed != null && validated.failed.length !== 0) {
			await globalHandlers.alert.show(<AlertLabel>
				<IntlLabel keys={['validation.input.failed']}
				           value="The input information is incorrect, please check and try again."/>
			</AlertLabel>);
			const sorted = validated.failed
				.map(fail => fail.path.replace(/\./g, '-'))
				.map(path => path.startsWith('/') ? path.substring(1) : path)
				// .map(id => {
				// 	console.log(id);
				// 	return id;
				// })
				.map(id => document.getElementById(id))
				.filter(element => element != null)
				.map(element => {
					return [element, element!.getBoundingClientRect()] as [HTMLElement, DOMRect];
				})
				.sort(([, {top: top1, left: left1}], [, {top: top2, left: left2}]) => {
					if (top1 - top2 < 0) {
						return -1;
					} else if (top1 - top2 > 0) {
						return 1;
					} else {
						return left1 - left2;
					}
				});
			if (sorted.length > 0) {
				sorted[0][0].focus();
			}
			if (failed != null) {
				await failed();
			}
		} else {
			await passed();
		}
		// resolve this promise anyway
		resolve();
	};
};

interface DialogValidateOptions extends ValidateOptions {
	key?: string;
}

/**
 * callback, never reject
 */
export const validateDialogWithCallback = async (options: DialogValidateOptions) => {
	const {globalHandlers, scopes = [], passed, failed, key} = options;

	return new Promise<void>(resolve => {
		// add target
		// @ts-ignore
		(globalHandlers.root as EnhancedD9GlobalHandlers)
			.toDialog(key)
			.fire(RootEventTypes.VALIDATE, scopes, createValidateHandler({globalHandlers, passed, failed, resolve}));
	});
};

/**
 * try catch
 */
export const validateDialog = async (options: Omit<DialogValidateOptions, 'passed' | 'failed'>): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		await validateDialogWithCallback({
			...options,
			passed: async () => resolve(),
			failed: async () => reject()
		});
	});
};

/**
 * callback, never reject
 */
export const validatePageWithCallback = async (options: ValidateOptions) => {
	const {globalHandlers, scopes = [], passed, failed} = options;

	return new Promise<void>(resolve => {
		globalHandlers.root!.fire(RootEventTypes.VALIDATE, scopes,
			createValidateHandler({globalHandlers, passed, failed, resolve}));
	});
};

/**
 * try catch
 */
export const validatePage = async (options: Omit<ValidateOptions, 'passed' | 'failed'>): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		await validatePageWithCallback({
			...options,
			passed: async () => resolve(),
			failed: async () => reject()
		});
	});
};
