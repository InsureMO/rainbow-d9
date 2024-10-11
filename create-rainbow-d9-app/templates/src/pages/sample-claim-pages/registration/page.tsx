import {VUtils} from '@rainbow-d9/n1';
import {D9Page, D9PageExternalDefsCreatorGlobalEventBus} from '../../standard-widgets';
import {onEnterPressed} from '../../utils';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

export default () => {
	const externalDefs = async (_global: D9PageExternalDefsCreatorGlobalEventBus) => {
		return {
			keywords: {
				keyup: onEnterPressed(async (value?: string) => {
					if (VUtils.isBlank(value)) {
						return;
					}
					// invoke the event bus
				})
			}
		};
	};

	return <D9Page ui={markdown}
	               initRootModel={InitRootModel} initRootModelAsIs={false}
	               externalDefs={externalDefs}/>;
};
