import {dts as dayjs} from './dayjs/index.d.ts?dts';
import {dts as dayjsLocale} from './dayjs/locale/index.d.ts?dts';
import {dts as dayjsLocaleTypes} from './dayjs/locale/types.d.ts?dts';
import {dts as decimaljs} from './decimal.js/decimal.d.ts?dts';
import {dts as fetchEndpointUrl} from './lib.fetch.endpoint.url.dts';
import {dts as fetchErrorHandle} from './lib.fetch.error.handle.dts';
import {dts as fetchResponse} from './lib.fetch.response.dts';
import {dts as httpResponse} from './lib.http.response.dts';
import {dts as n19n1} from './lib.n19.n1.dts';
import {dts as stepErrorHandleAny} from './lib.step.error.handle.any.dts';
import {dts as stepErrorHandleCatchable} from './lib.step.error.handle.catchable.dts';
import {dts as stepErrorHandle} from './lib.step.error.handle.dts';
import {dts as stepErrorHandleExposed} from './lib.step.error.handle.exposed.dts';
import {dts as stepErrorHandleUncatchable} from './lib.step.error.handle.uncatchable.dts';
import {dts as stepFactor} from './lib.step.factor.dts';
import {dts as stepHelpers} from './lib.step.helpers.dts';
import {dts as stepInterfaces} from './lib.step.interfaces.dts';
import {dts as stepRequest} from './lib.step.request.dts';
import {dts as stepResult} from './lib.step.result.dts';
import {dts as mathjs} from './mathjs/types/index.d.ts?dts';

export const DTS = {
	/** pipeline interfaces */
	stepInterfaces: {'step.interfaces': stepInterfaces},
	/** \$factor */
	stepFactor: {'step.factor': stepFactor},
	/** \$result */
	stepResult: {'step.result': stepResult},
	/** \$request, must include [stepInterfaces] as well */
	stepRequest: {'step.interfaces': stepInterfaces, 'step.request': stepRequest},
	/** \$helpers, \$ */
	stepHelpers: {
		dayjs, 'dayjs.locale': dayjsLocale, 'dayjs.locale.types': dayjsLocaleTypes,
		'decimal.js': decimaljs, mathjs,
		n19n1,
		'step.helpers': stepHelpers
	},
	/** \$options, must include [stepInterfaces] as well */
	stepCatchableErrorHandle: {
		'step.interfaces': stepInterfaces,
		'step.error.handle': stepErrorHandle, 'step.error.handle.catchable': stepErrorHandleCatchable
	},
	/** \$options, must include [stepInterfaces] as well */
	stepUncatchableErrorHandle: {
		'step.interfaces': stepInterfaces,
		'step.error.handle': stepErrorHandle, 'step.error.handle.uncatchable': stepErrorHandleUncatchable
	},
	/** \$options, must include [stepInterfaces] as well */
	stepExposedErrorHandle: {
		'step.interfaces': stepInterfaces,
		'step.error.handle': stepErrorHandle, 'step.error.handle.exposed': stepErrorHandleExposed
	},
	/** \$options, must include [stepInterfaces] as well */
	stepAnyErrorHandle: {
		'step.interfaces': stepInterfaces,
		'step.error.handle': stepErrorHandle, 'step.error.handle.any': stepErrorHandleAny
	},
	/** fetch response */
	httpResponse: {'http.response': httpResponse},
	/** $endpointUrl */
	fetchEndpointUrl: {'fetch.endpoint.url': fetchEndpointUrl},
	/** $response, must include [httpResponse] as well */
	fetchResponse: {'http.response': httpResponse, 'fetch.response': fetchResponse},
	/** options, for fetch error handle, must include [stepInterfaces, httpResponse] as well */
	fetchErrorHandle: {
		'step.interfaces': stepInterfaces, 'http.response': httpResponse, 'fetch.error.handle': fetchErrorHandle
	},
	// TODO add dts for typeorm runner
	typeormRunner: {}
};

