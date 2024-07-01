import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ElementBanned, ElementChecked, ElementMissed} from '../icons';

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
	StepFromRequest: <IntlLabel keys={['o23', 'step', 'from-request']} value="From Input"/>,
	StepToResponse: <IntlLabel keys={['o23', 'step', 'to-response']} value="To Output"/>,
	StepMergeRequest: <IntlLabel keys={['o23', 'step', 'merge-request']} value="Merge"/>,
	SnippetStepSnippet: <IntlLabel keys={['o23', 'step', 'snippet', 'snippet']} value="Snippet"/>,
	StepSteps: <IntlLabel keys={['o23', 'step', 'sets', 'steps']} value="Sub Steps"/>,
	StepCatchable: <IntlLabel keys={['o23', 'step', 'catchable']} value="Catchable Errors"/>,
	StepFirstSubStep: <IntlLabel keys={['o23', 'step', 'first-sub-step']} value="In"/>,
	JoinEndNodeTitle: <IntlLabel keys={['o23', 'node', 'join-end']} value="End of "/>,

	// step use
	StepUseSnippet: <IntlLabel keys={['o23', 'step', 'use', 'snippet']} value="Snippet"/>,
	StepUseSets: <IntlLabel keys={['o23', 'step', 'use', 'sets']} value="Sets"/>,

	// common variables, variable might be used in multiple places,
	// such as attribute label, attribute configuration label, attribute configuration value label, etc.
	Type: <IntlLabel keys={['o23', 'variable', 'type']} value="Type"/>,
	Code: <IntlLabel keys={['o23', 'variable', 'code']} value="Code"/>,
	Name: <IntlLabel keys={['o23', 'variable', 'name']} value="Name"/>,
	Enabled: <IntlLabel keys={['o23', 'variable', 'enabled']} value="Enabled"/>,
	All: <IntlLabel keys={['o23', 'variable', 'all']} value="All"/>,
	Ignored: <IntlLabel keys={['o23', 'variable', 'ignored']} value="Ignored"/>,
	Specified: <IntlLabel keys={['o23', 'variable', 'specified']} value="Specified"/>,
	NotAvailable: <IntlLabel keys={['o23', 'variable', 'not-available']} value="N/A"/>,
	YesChar: <IntlLabel keys={['o23', 'variable', 'yes-char']} value="Y"/>,
	NoChar: <IntlLabel keys={['o23', 'variable', 'no-char']} value="N"/>,
	BadgeChecked: <IntlLabel keys={['o23', 'variable', 'checked']} value={<ElementChecked/>}/>,
	BadgeMissed: <IntlLabel keys={['o23', 'variable', 'missed']} value={<ElementMissed/>}/>,
	BadgeBanned: <IntlLabel keys={['o23', 'variable', 'banned']} value={<ElementBanned/>}/>,
	NoCodeDefinedInFileDef: <IntlLabel keys={['o23', 'pipeline', 'code', 'undefined']} value="No code defined"/>
};
