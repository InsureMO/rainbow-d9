import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {DropdownDef, DropdownOptions, GlobalEventHandlers, GlobalEventTypes, ModelCarrier} from '@rainbow-d9/n2';
import {askCodeTableByCode} from '../../services';
import {D9PageExternalDefsCreatorGlobalEventBus} from './d9-page';

export type StaticDropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: DropdownDef['options'];
};
export type DropdownOptionsProvider<Keys extends string = string> = {
	[key in Keys]: () => <R extends BaseModel, M extends PropValue>(options: ModelCarrier<R, M> & GlobalEventHandlers) => Promise<DropdownOptions>;
};

export const createDropdownOptionsProvider =
	<Keys extends string = string>(
		global: D9PageExternalDefsCreatorGlobalEventBus,
		staticProvider?: StaticDropdownOptionsProvider<Keys>) => {

		return new Proxy<DropdownOptionsProvider<Keys>>({} as any, {
			get(_target: DropdownOptionsProvider<Keys>, prop: Keys): any {
				if (staticProvider?.[prop] != null) {
					return staticProvider[prop];
				}
				return async () => {
					return new Promise<DropdownOptions>(resolve => {
						global.fire(GlobalEventTypes.INVOKE_REMOTE_REQUEST,
							async () => await askCodeTableByCode(prop),
							(options) => resolve(options),
							// TODO use empty array instead, but how to present the error?
							() => resolve([]));
					});
				};
			}
		});
	};
