import {DropdownDef, DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {askCodeTableByCode} from '../services';

export type StaticDropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: DropdownDef['options'];
};
export type DropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: () => Promise<DropdownOptions>;
};

export const createDropdownOptionsProvider =
	<Keys extends string = string>(
		globalHandlers: GlobalHandlers,
		staticProvider?: StaticDropdownOptionsProvider<Keys>) => {

		return new Proxy<DropdownOptionsProvider<Keys>>({} as any, {
			get(_target: DropdownOptionsProvider<Keys>, prop: Keys): any {
				if (staticProvider?.[prop] != null) {
					return staticProvider[prop];
				}
				return async () => {
					const result = await globalHandlers.remoteRequest.neverFailRequest(async () => await askCodeTableByCode(prop));
					if (result.failed) {
						// TODO use empty array when failed to get dropdown options
						return [];
					} else {
						return result.result;
					}
				};
			}
		});
	};
