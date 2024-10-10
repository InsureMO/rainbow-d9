import {DropdownDef, DropdownOptions} from '@rainbow-d9/n2';
import {D9PageExternalDefsCreatorGlobalEventBus} from './d9-page';

export type StaticDropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: DropdownDef['options'];
};
export type DropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: () => Promise<DropdownOptions>;
};

export const createDropdownOptionsProvider =
	<Keys extends string = string>(
		global: D9PageExternalDefsCreatorGlobalEventBus,
		staticProvider?: StaticDropdownOptionsProvider<Keys>) => {
		console.log(global);

		return new Proxy<DropdownOptionsProvider<Keys>>({} as any, {
			get(_target: DropdownOptionsProvider<Keys>, prop: Keys): any {
				if (staticProvider?.[prop] != null) {
					return staticProvider[prop];
				}
				return async () => {

				};
			}
		});
	};
