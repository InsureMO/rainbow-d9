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

	// step use
	StepUseSnippet: <IntlLabel keys={['o23', 'step', 'use', 'snippet']} value="Snippet"/>,
	StepUseGetProperty: <IntlLabel keys={['o23', 'step', 'use', 'get-property']} value="Get Property"/>,
	StepUseDelProperty: <IntlLabel keys={['o23', 'step', 'use', 'del-property']} value="Del Property"/>,
	StepUseDelProperties: <IntlLabel keys={['o23', 'step', 'use', 'del-properties']} value="Del Properties"/>,
	StepUseSnowflake: <IntlLabel keys={['o23', 'step', 'use', 'snowflake']} value="Snowflake"/>,
	StepUseSets: <IntlLabel keys={['o23', 'step', 'use', 'sets']} value="Sets"/>,
	StepUseAsyncSets: <IntlLabel keys={['o23', 'step', 'use', 'async-sets']} value="Async Sets"/>,
	StepUseEach: <IntlLabel keys={['o23', 'step', 'use', 'each']} value="Each"/>,
	StepUseParallel: <IntlLabel keys={['o23', 'step', 'use', 'parallel']} value="Parallel"/>,
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
	YesChar: <IntlLabel keys={['o23', 'badge', 'yes-char']} value="Y"/>,
	NoChar: <IntlLabel keys={['o23', 'badge', 'no-char']} value="N"/>,
	Snippet: <IntlLabel keys={['o23', 'badge', 'snippet']} value={<Snippet/>}/>,
	Steps: <IntlLabel keys={['o23', 'badge', 'steps']} value={<Steps/>}/>,
	AsIs: <IntlLabel keys={['o23', 'badge', 'as-is']} value="N/A"/>,
	BadgeChecked: <IntlLabel keys={['o23', 'badge', 'checked']} value={<ElementChecked/>}/>,
	BadgeMissed: <IntlLabel keys={['o23', 'badge', 'missed']} value={<ElementMissed/>}/>,
	BadgeBanned: <IntlLabel keys={['o23', 'badge', 'banned']} value={<ElementBanned/>}/>,
	NoCodeDefinedInFileDef: <IntlLabel keys={['o23', 'pipeline', 'code', 'undefined']} value="No code defined"/>
};

export const asUseLabelKey = (use: string) => {
	return 'StepUse' + (use ?? '').trim().split('-').reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1), '');
};

export const askUseLabel = (use: string) => {
	return Labels[asUseLabelKey(use)];
};

export const askUseStringifyText = (use: string) => {
	return Labels[`${asUseLabelKey(use)}StringifyText`] ?? use;
};