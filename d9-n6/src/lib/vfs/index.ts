import {dts as dayjs} from './lib.dayjs.dts';
import {dts as decimaljs} from './lib.decimaljs.dts';
import {dts as fetchEndpointUrl} from './lib.fetch.endpoint.url.dts';
import {dts as fetchErrorHandle} from './lib.fetch.error.handle.dts';
import {dts as fetchResponse} from './lib.fetch.response.dts';
import {dts as httpResponse} from './lib.http.response.dts';
import {dts as mathjs} from './lib.mathjs.dts';
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

export const DTS = {
	/** pipeline interfaces */
	stepInterfaces,
	/** \$factor */
	stepFactor,
	/** \$result */
	stepResult,
	/** \$request, must include [stepInterfaces] as well */
	stepRequest,
	/** \$helpers, \$ */
	stepHelpers: `${dayjs}\n${decimaljs}\n${mathjs}\n${n19n1}\n${stepHelpers}`,
	/** \$options, must include [stepInterfaces] as well */
	stepCatchableErrorHandle: `${stepErrorHandle}\n${stepErrorHandleCatchable}`,
	/** \$options, must include [stepInterfaces] as well */
	stepUncatchableErrorHandle: `${stepErrorHandle}\n${stepErrorHandleUncatchable}`,
	/** \$options, must include [stepInterfaces] as well */
	stepExposedErrorHandle: `${stepErrorHandle}\n${stepErrorHandleExposed}`,
	/** \$options, must include [stepInterfaces] as well */
	stepAnyErrorHandle: `${stepErrorHandle}\n${stepErrorHandleAny}`,
	/** fetch response */
	httpResponse,
	/** $endpointUrl */
	fetchEndpointUrl,
	/** $response, must include [httpResponse] as well */
	fetchResponse,
	/** options, for fetch error handle, must include [stepInterfaces, httpResponse] as well */
	fetchErrorHandle,
	// TODO add dts for typeorm runner
	typeormRunner: ''
};

