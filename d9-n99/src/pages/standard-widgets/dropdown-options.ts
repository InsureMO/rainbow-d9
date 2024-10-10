import {DropdownDef, DropdownOptions} from '@rainbow-d9/n2';

export type StaticDropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: DropdownDef['options'];
};
export type DropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: () => Promise<DropdownOptions>;
};

export const createDropdownOptionsProvider = <Keys extends string = string>(staticProvider?: StaticDropdownOptionsProvider) => {
	return new Proxy<DropdownOptionsProvider<Keys>>({} as any, {
		get(_target: DropdownOptionsProvider<Keys>, prop: string): any {
			if (staticProvider?.[prop] != null) {
				return staticProvider[prop];
			}
			return async () => {

			};
		}
	});
};
