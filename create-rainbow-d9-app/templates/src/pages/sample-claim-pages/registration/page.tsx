import {BaseModel, PropValue, RootEventTypes, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions} from '@rainbow-d9/n2/src';
import {createDropdownOptionsProvider, D9Page, D9PageExternalDefsCreatorGlobalEventBus} from '../../standard-widgets';
import {onEnterPressed} from '../../utils';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

interface RootModel {
	control: {
		advancedSearchEnabled: boolean
	};
	criteria: {
		keywords?: string;
		policyNo?: string;
		insuredName?: string;
		idType?: string;
		idNo?: string;
		gender?: string;
	};
}

export default () => {
	const externalDefs = async (global: D9PageExternalDefsCreatorGlobalEventBus) => {
		return {
			codes: createDropdownOptionsProvider(global),
			keywords: {
				keyup: onEnterPressed(async (value?: string) => {
					if (VUtils.isBlank(value)) {
						return;
					}
					// do search
				})
			},
			advancedSearch: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const root = options.root as unknown as RootModel;
					const enabled = root.control.advancedSearchEnabled;
					root.control.advancedSearchEnabled = !enabled;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/control.advancedSearchEnabled', enabled, !enabled);
				}
			},
			search: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do search
				}
			},
			reset: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const model = options.model as unknown as RootModel['criteria'];
					const old = {...model};
					delete model.policyNo;
					delete model.insuredName;
					delete model.idType;
					delete model.idNo;
					delete model.gender;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/criteria', old, model);
				}
			}
		};
	};

	return <D9Page ui={markdown}
	               initRootModel={InitRootModel} initRootModelAsIs={false}
	               externalDefs={externalDefs}/>;
};
