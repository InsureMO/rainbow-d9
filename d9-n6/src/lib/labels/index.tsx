import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ElementBanned, ElementChecked, ElementMissed, Snippet, Steps} from '../icons';

export const Labels = {
	ERROR: <IntlLabel keys={['o23', 'error', 'unknown']} value="Something went wrong."/>,
	NoContent: <IntlLabel keys={['o23', 'error', 'no-content']} value="No content given."/>,
	NoDefParsed: <IntlLabel keys={['o23', 'error', 'no-def']} value="No definition parsed."/>,
	ParseError: <IntlLabel keys={['o23', 'error', 'parse']} value="Parse error occurred."/>,

	EndNodeTitle: <IntlLabel keys={['o23', 'node', 'end']} value="End"/>,
	StepNodeNoname: <IntlLabel keys={['o23', 'node', 'step', 'noname']} value="[Noname]"/>,

	HelpDesk: <IntlLabel keys={['o23', 'dialog', 'docs', 'title']} value="Help Desk"/>,
	Navigator: <IntlLabel keys={['o23', 'dialog', 'navigator', 'title']} value="Configurable Elements"/>,
	Specific: <IntlLabel keys={['o23', 'dialog', 'specific', 'title']} value="Specific Details"/>,
	ConfirmContent: <IntlLabel keys={['o23', 'dialog', 'confirm']} value="Confirm"/>,
	DiscardContent: <IntlLabel keys={['o23', 'dialog', 'discard']} value="Discard"/>,

	PipelineTypeApi: <IntlLabel keys={['o23', 'pipeline', 'api']} value="Pipeline as API"/>,
	PipelineTypePipeline: <IntlLabel keys={['o23', 'pipeline', 'standard']} value="Pipeline"/>,
	PipelineTypeStepSet: <IntlLabel keys={['o23', 'pipeline', 'step-sets']} value="Step Set"/>,
	PipelineTypeStep: <IntlLabel keys={['o23', 'pipeline', 'step']} value="Step"/>,

	// api attribute labels
	ApiRouteLabel: <IntlLabel keys={['o23', 'parameter', 'api-route']} value="Route"/>,
	ApiRequestLabel: <IntlLabel keys={['o23', 'parameter', 'api-request']} value="Request"/>,
	ApiMethodLabel: <IntlLabel keys={['o23', 'parameter', 'api-method']} value="Method"/>,
	ApiHeadersLabel: <IntlLabel keys={['o23', 'parameter', 'api-headers']} value="Headers"/>,
	ApiPathParametersLabel: <IntlLabel keys={['o23', 'parameter', 'api-path-parameters']} value="Path Parameters"/>,
	ApiQueryParametersLabel: <IntlLabel keys={['o23', 'parameter', 'api-query-parameters']} value="Query Parameters"/>,
	ApiBodyLabel: <IntlLabel keys={['o23', 'parameter', 'api-body']} value="Body"/>,
	ApiFilesLabel: <IntlLabel keys={['o23', 'parameter', 'api-files']} value="Files"/>,
	ApiResponseLabel: <IntlLabel keys={['o23', 'parameter', 'api-response']} value="Response"/>,
	ApiExposeHeadersLabel: <IntlLabel keys={['o23', 'parameter', 'api-expose-headers']} value="Expose Headers"/>,
	ApiExposeFileLabel: <IntlLabel keys={['o23', 'parameter', 'api-expose-file']} value="Expose File"/>,
	ExecuteOnInitLabel: <IntlLabel keys={['o23', 'parameter', 'execute-on-init']} value="Execute on Initializing"/>,
	// api attribute configuration labels
	ParameterNames: <IntlLabel keys={['o23', 'parameter', 'names']} value="Names"/>,
	BodyFollowHttpMethod: <IntlLabel keys={['o23', 'pipeline', 'body', 'follow-http-method']}
	                                 value="Follow method default"/>,
	ParseBody: <IntlLabel keys={['o23', 'pipeline', 'body', 'parse']} value="Parse"/>,
	AllFiles: <IntlLabel keys={['o23', 'pipeline', 'files', 'all']} value="Any File"/>,
	NoFile: <IntlLabel keys={['o23', 'pipeline', 'files', 'ignored']} value="No File"/>,
	FileMaxSize: <IntlLabel keys={['o23', 'pipeline', 'files', 'max-size']} value="Max size"/>,
	FileMimeType: <IntlLabel keys={['o23', 'pipeline', 'files', 'mime-type']} value="Mime types"/>,

	// step
	StepFromInput: <IntlLabel keys={['o23', 'step', 'from-input']} value="Pick From Input"/>,
	StepToOutput: <IntlLabel keys={['o23', 'step', 'to-output']} value="Write To Output"/>,
	StepMerge: <IntlLabel keys={['o23', 'step', 'merge']} value="Merge-back strategy"/>,
	StepMergeReplace: <IntlLabel keys={['o23', 'step', 'merge-replace']} value="Replace Merge"/>,
	StepMergeAsProperty: <IntlLabel keys={['o23', 'step', 'merge-as-property']} value="Merge As"/>,
	StepMainContent: <IntlLabel keys={['o23', 'step', 'main-content']} value="Main Task"/>,
	StepSteps: <IntlLabel keys={['o23', 'step', 'sets', 'steps']} value="Sub Steps"/>,
	StepHandleCatchableError: <IntlLabel keys={['o23', 'step', 'error-handles', 'catchable']}
	                                     value="Catchable Errors"/>,
	StepHandleUncatchableError: <IntlLabel keys={['o23', 'step', 'error-handles', 'uncatchable']}
	                                       value="Uncatchable Errors"/>,
	StepHandleExposedError: <IntlLabel keys={['o23', 'step', 'error-handles', 'uncatchable']} value="Exposed Errors"/>,
	StepHandleAnyError: <IntlLabel keys={['o23', 'step', 'error-handles', 'uncatchable']} value="Any Errors"/>,
	StepFirstSubStep: <IntlLabel keys={['o23', 'step', 'first-sub-step']} value="In"/>,
	JoinEndNodeTitle: <IntlLabel keys={['o23', 'node', 'join-end']} value="End of "/>,

	// step use, do not use i18n for use labels
	StepUseSnippet: 'Snippet',
	StepUseGetProperty: 'Get Property',
	StepUseDelProperty: 'Del Property',
	StepUseDelProperties: 'Del Properties (Alias for Del Property)',
	StepUseSnowflake: 'Snowflake',
	StepUseHttpFetch: 'Http Fetch',
	StepUseHttpGet: 'Http Get (Using Get method for HTTP Fetch)',
	StepUseHttpPost: 'Http Post (Using Post method for HTTP Fetch)',
	StepUseSets: 'Sets',
	StepUseAsyncSets: 'Async Sets',
	StepUseEach: 'Each',
	StepUseParallel: 'Parallel',
	// step variables common labels
	StepVariableIgnoreSnippet: <IntlLabel keys={['o23', 'step', 'common-variable', 'ignore-snippet']} value="Ignore"/>,
	StepVariableUseSnippet: <IntlLabel keys={['o23', 'step', 'common-variable', 'use-snippet']} value="Use Snippet"/>,
	// step error handling types
	StepErrorHandleTypeNone: <IntlLabel keys={['o23', 'step', 'error-handle', 'none']} value="Ignored"/>,
	StepErrorHandleTypeSnippet: <IntlLabel keys={['o23', 'step', 'error-handle', 'none']} value="Use Snippet"/>,
	StepErrorHandleTypeSteps: <IntlLabel keys={['o23', 'step', 'error-handle', 'none']} value="Use Sub-steps"/>,
	// step request/response transformers
	StepIOTransformer: <IntlLabel keys={['o23', 'step', 'io-transformer', 'use']} value="Transformer"/>,
	StepIOTransformerAsIs: <IntlLabel keys={['o23', 'step', 'io-transformer', 'as-is']} value="As Is"/>,
	StepIOTransformerSnippet: <IntlLabel keys={['o23', 'step', 'io-transformer', 'snippet']} value="Use Snippet"/>,
	StepIOMergeBackReplace: <IntlLabel keys={['o23', 'step', 'io-merge-back', 'replace']} value="Replace"/>,
	StepIOMergeBackUnbox: <IntlLabel keys={['o23', 'step', 'io-merge-back', 'unbox']} value="Unbox and Merge"/>,
	StepIOMergeBackAsProperty: <IntlLabel keys={['o23', 'step', 'io-merge-back', 'as-property']}
	                                      value="As Specific Property"/>,
	StepIOMergeBackAsPropertyName: <IntlLabel keys={['o23', 'step', 'io-merge-back', 'as-property-name']}
	                                          value="Property Name"/>,
	// step snippet
	StepSnippetSnippet: <IntlLabel keys={['o23', 'step', 'snippet', 'snippet']} value="Snippet"/>,
	// step get-property
	StepGetPropertyProperty: <IntlLabel keys={['o23', 'step', 'get-property', 'property']} value="Property"/>,
	// step del-property, del-properties
	StepDelPropertyProperty: <IntlLabel keys={['o23', 'step', 'del-property', 'property']} value="Property"/>,
	// http fetch/get/post
	StepHttpRemoteApi: <IntlLabel keys={['o23', 'step', 'http', 'system']} value="HTTP API"/>,
	StepHttpRemoteRequest: <IntlLabel keys={['o23', 'step', 'http', 'system']} value="HTTP Request"/>,
	StepHttpRemoteResponse: <IntlLabel keys={['o23', 'step', 'http', 'system']} value="HTTP Response"/>,
	StepHttpSystem: <IntlLabel keys={['o23', 'step', 'http', 'system']} value="System"/>,
	StepHttpEndpoint: <IntlLabel keys={['o23', 'step', 'http', 'endpoint']} value="Endpoint"/>,
	StepHttpDecorateUrl: <IntlLabel keys={['o23', 'step', 'http', 'decorate-url']} value="Decorate URL"/>,
	StepHttpMethod: <IntlLabel keys={['o23', 'step', 'http', 'method']} value="HTTP Method"/>,
	StepHttpTimeout: <IntlLabel keys={['o23', 'step', 'http', 'timeout']} value="Timeout (in Seconds)"/>,
	StepHttpGenerateHeaders: <IntlLabel keys={['o23', 'step', 'http', 'generate-headers']} value="Generate Headers"/>,
	StepHttpBodyUsed: <IntlLabel keys={['o23', 'step', 'http', 'body-used']} value="Use Body"/>,
	StepHttpGenerateBody: <IntlLabel keys={['o23', 'step', 'http', 'generate-body']} value="Generate Body"/>,
	StepHttpReadResponse: <IntlLabel keys={['o23', 'step', 'http', 'read-response']} value="Read Response"/>,
	StepHttpResponseErrorHandles: <IntlLabel keys={['o23', 'step', 'http', 'response-error-handles']}
	                                         value="Response Error Handling"/>,
	// step each
	StepEachOriginalContentName: <IntlLabel keys={['o23', 'step', 'each', 'original-content-name']}
	                                        value="Origin Content Variable"/>,
	StepEachItemName: <IntlLabel keys={['o23', 'step', 'each', 'item-name']} value="Item Variable"/>,
	// step parallel
	StepParallelCloneData: <IntlLabel keys={['o23', 'step', 'parallel', 'clone-data']} value="Clone For Each Step"/>,
	StepParallelRace: <IntlLabel keys={['o23', 'step', 'parallel', 'race']} value="Race"/>,

	// common variables, variable might be used in multiple places,
	// such as attribute label, attribute configuration label, attribute configuration value label, etc.
	Type: <IntlLabel keys={['o23', 'variable', 'type']} value="Type"/>,
	Code: <IntlLabel keys={['o23', 'variable', 'code']} value="Code"/>,
	Name: <IntlLabel keys={['o23', 'variable', 'name']} value="Name"/>,
	Enabled: <IntlLabel keys={['o23', 'variable', 'enabled']} value="Enabled"/>,
	Use: <IntlLabel keys={['o23', 'variable', 'use']} value="Use"/>,
	ErrorHandles: <IntlLabel keys={['o23', 'variable', 'error-handles']} value="Error Handling"/>,
	CatchableErrorHandle: <IntlLabel keys={['o23', 'variable', 'catchable-error-handle']} value="Catchable"/>,
	UncatchableErrorHandle: <IntlLabel keys={['o23', 'variable', 'uncatchable-error-handle']} value="Uncatchable"/>,
	ExposedErrorHandle: <IntlLabel keys={['o23', 'variable', 'exposed-error-handle']} value="Exposed"/>,
	AnyErrorHandle: <IntlLabel keys={['o23', 'variable', 'any-error-handle']} value="Any"/>,

	// badge or labels
	All: <IntlLabel keys={['o23', 'badge', 'all']} value="All"/>,
	Ignored: <IntlLabel keys={['o23', 'badge', 'ignored']} value="Ignored"/>,
	Specified: <IntlLabel keys={['o23', 'badge', 'specified']} value="Specified"/>,
	NotAvailable: <IntlLabel keys={['o23', 'badge', 'not-available']} value="N/A"/>,
	UseDefault: <IntlLabel keys={['o23', 'badge', 'use-default']} value="Default"/>,
	NoDecoration: <IntlLabel keys={['o23', 'badge', 'no-decoration']} value="No Decoration"/>,
	NoTimeout: <IntlLabel keys={['o23', 'badge', 'no-timeout']} value="No Timeout"/>,
	NoCustomHttpHeader: <IntlLabel keys={['o23', 'badge', 'no-http-headers']} value="No Custom Header"/>,
	UseInputAsHttpBody: <IntlLabel keys={['o23', 'badge', 'use-input-as-http-body']} value="Use Input"/>,
	UseJsonFormatForHttpBody: <IntlLabel keys={['o23', 'badge', 'use-json-format-for-http-body']}
	                                     value="Use JSON Parse"/>,
	Yes: <IntlLabel keys={['o23', 'badge', 'yes']} value="Yes"/>,
	YesChar: <IntlLabel keys={['o23', 'badge', 'yes-char']} value="Y"/>,
	No: <IntlLabel keys={['o23', 'badge', 'no']} value="No"/>,
	NoChar: <IntlLabel keys={['o23', 'badge', 'no-char']} value="N"/>,
	Snippet: <IntlLabel keys={['o23', 'badge', 'snippet']} value={<Snippet/>}/>,
	Steps: <IntlLabel keys={['o23', 'badge', 'steps']} value={<Steps/>}/>,
	AsIs: <IntlLabel keys={['o23', 'badge', 'as-is']} value="N/A"/>,
	BadgeChecked: <IntlLabel keys={['o23', 'badge', 'checked']} value={<ElementChecked/>}/>,
	BadgeMissed: <IntlLabel keys={['o23', 'badge', 'missed']} value={<ElementMissed/>}/>,
	BadgeBanned: <IntlLabel keys={['o23', 'badge', 'banned']} value={<ElementBanned/>}/>,
	NoCodeDefinedInFileDef: <IntlLabel keys={['o23', 'pipeline', 'code', 'undefined']} value="No code defined"/>,
	// illegal
	IllegalDropdownOptionSuffix: <IntlLabel keys={['o23', 'illegal', 'dropdown', 'option', 'suffix']}
	                                        value="(Illegal)"/>
};

export const asUseLabelKey = (use: string) => {
	return 'StepUse' + (use ?? '').trim().split('-').reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1), '');
};

export const asBeautifiedUse = (use: string) => {
	return use.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
};
export const askUseLabel = (use: string) => {
	return Labels[asUseLabelKey(use)];
};
