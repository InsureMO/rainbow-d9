import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface HttpStepDefModel extends CommonStepDefModel {
	system?: string;
	endpoint?: string;
	decorateUrl?: string;
	method?: string;
	timeout?: number;
	transparentHeaderNames?: string | Array<string>;
	omittedTransparentHeaderNames?: string | Array<string>;
	generateHeaders?: string;
	bodyUsed?: boolean;
	generateBody?: string;
	readResponse?: string;
	responseErrorHandles?: string;
	temporary?: CommonStepDefModel['temporary'] & {
		decorateUrlAsIs?: boolean;
		generateHeadersAsIs?: boolean;
		generateBodyAsIs?: boolean;
		readResponseAsIs?: boolean;
		responseErrorHandlesAsIs?: boolean;
	};
}

export interface HttpFetchStepDefModel extends HttpStepDefModel {
	use: StandardPipelineStepRegisterKey.HTTP_FETCH;
}

export interface HttpGetStepDefModel extends HttpStepDefModel {
	use: StandardPipelineStepRegisterKey.HTTP_GET;
	method: 'get';
}

export interface HttpPostStepDefModel extends HttpStepDefModel {
	use: StandardPipelineStepRegisterKey.HTTP_POST;
	method: 'post';
}
