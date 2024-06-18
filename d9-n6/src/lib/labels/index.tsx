import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {ElementBanned, ElementChecked, ElementMissed} from '../icons';

export const Labels = {
	ERROR: <IntlLabel keys={['o23', 'error', 'unknown']} value="Something went wrong."/>,
	NoContent: <IntlLabel keys={['o23', 'error', 'no-content']} value="No content given."/>,
	NoDefParsed: <IntlLabel keys={['o23', 'error', 'no-def']} value="No definition parsed."/>,
	ParseError: <IntlLabel keys={['o23', 'error', 'parse']} value="Parse error occurred."/>,

	EndNodeTitle: <IntlLabel keys={['o23', 'node', 'end']} value="End"/>,
	PreviousStepPort: <IntlLabel keys={['o23', 'port', 'previous']} value="In"/>,
	NextStepPort: <IntlLabel keys={['o23', 'port', 'next']} value="Out"/>,
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
	ParameterNames: <IntlLabel keys={['o23', 'parameter', 'names']} value="Names"/>,
	BodyFollowHttpMethod: <IntlLabel keys={['o23', 'pipeline', 'body', 'follow-http-method']}
	                                 value="Follow method default"/>,
	ParseBody: <IntlLabel keys={['o23', 'pipeline', 'body', 'parse']} value="Parse"/>,
	AllFiles: <IntlLabel keys={['o23', 'pipeline', 'files', 'all']} value="Any File"/>,
	NoFile: <IntlLabel keys={['o23', 'pipeline', 'files', 'ignored']} value="No File"/>,
	FileMaxSize: <IntlLabel keys={['o23', 'pipeline', 'files', 'max-size']} value="Max size"/>,
	FileMimeType: <IntlLabel keys={['o23', 'pipeline', 'files', 'mime-type']} value="Mime types"/>,

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
