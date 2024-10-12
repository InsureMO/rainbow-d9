import {RootEventTypes, ValidatedSet, VUtils} from '@rainbow-d9/n1';
import {AlertLabel, GlobalHandlers, IntlLabel} from '@rainbow-d9/n2';

/**
 * callback, never reject
 */
export const validatePage = async (globalHandlers: GlobalHandlers, passed: () => Promise<void>, failed?: () => Promise<void>) => {
	return new Promise<void>(resolve => {
		globalHandlers.root!.fire(RootEventTypes.VALIDATE, [], async (validated: ValidatedSet) => {
			if (validated.failed != null && validated.failed.length !== 0) {
				await globalHandlers.alert.show(<AlertLabel>
					<IntlLabel keys={['validation.input.failed']}
					           value="The input information is incorrect, please check and try again."/>
				</AlertLabel>);
				const sorted = validated.failed
					.map(fail => fail.path.replace(/\./g, '-'))
					.map(path => path.startsWith('/') ? path.substring(1) : path)
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
			resolve();
		});
	});
};

/**
 * try catch
 */
export const doValidatePage = async (globalHandlers: GlobalHandlers): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		let judged = VUtils.noop;
		await validatePage(globalHandlers, async () => {
			judged = resolve;
		}, async () => {
			judged = reject;
		});
		judged();
	});
};