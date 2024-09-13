import {dts as dayjs} from './lib.dayjs.dts';
import {dts as decimaljs} from './lib.decimaljs.dts';
import {dts as fetchEndpointUrl} from './lib.fetch.endpoint.url.dts';
import {dts as fetchErrorHandle} from './lib.fetch.error.handle.dts';
import {dts as fetchResponse} from './lib.fetch.response.dts';
import {dts as httpResponse} from './lib.http.response.dts';
import {dts as mathjs} from './lib.mathjs.dts';
import {dts as stepFactor} from './lib.step.factor.dts';
import {dts as stepHelpers} from './lib.step.helpers.dts';
import {dts as stepInterfaces} from './lib.step.interfaces.dts';
import {dts as stepRequest} from './lib.step.request.dts';

export const DTS = {
	/** pipeline interfaces */
	stepInterfaces,
	/** \$factor */
	stepFactor,
	/** \$request, must include [stepInterfaces] as well */
	stepRequest,
	/** \$helpers, \$ */
	stepHelpers: `${dayjs}\n${decimaljs}\n${mathjs}\n${stepHelpers}`,
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

