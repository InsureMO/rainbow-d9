import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import {FileType} from '../definition';
import {ElementBanned, ElementChecked, ElementMissed} from '../icons';

export const Labels = {
	ERROR: <IntlLabel keys={['o23', 'error', 'unknown']} value="Something went wrong."/>,
	NoContent: <IntlLabel keys={['o23', 'error', 'no-content']} value="No content given."/>,
	NoDefParsed: <IntlLabel keys={['o23', 'error', 'no-def']} value="No definition parsed."/>,
	ParseError: <IntlLabel keys={['o23', 'error', 'parse']} value="Parse error occurred."/>,

	EndNodeTitle: <IntlLabel keys={['o23', 'node', 'end']} value="End"/>,
	PreviousStepPort: <IntlLabel keys={['o23', 'port', 'previous']} value="In"/>,
	NextStepPort: <IntlLabel keys={['o23', 'port', 'next']} value="Out"/>,

	HelpDesk: <IntlLabel keys={['o23', 'dialog', 'docs', 'title']} value="Help Desk"/>,
	Navigator: <IntlLabel keys={['o23', 'dialog', 'navigator', 'title']} value="Configurable Elements"/>,
	Specific: <IntlLabel keys={['o23', 'dialog', 'specific', 'title']} value="Specific Details"/>,
	BackToCanvas: <IntlLabel keys={['o23', 'dialog', 'close']} value="Back to canvas"/>,

	TypeOfStandardPipeline: <IntlLabel keys={['o23', 'pipeline', 'standard']} value="Pipeline"/>,
	TypeOfStepOrSets: (type: FileType) => {
		return <IntlLabel keys={['o23', 'pipeline', type]} value={(type ?? '').replace('-', ' ')}/>;
	},

	All: <IntlLabel keys={['o23', 'variable', 'all']} value="All"/>,
	Ignored: <IntlLabel keys={['o23', 'variable', 'ignored']} value="Ignored"/>,
	NotAvailable: <IntlLabel keys={['o23', 'variable', 'not-available']} value="N/A"/>,
	YesChar: <IntlLabel keys={['o23', 'variable', 'yes-char']} value="Y"/>,
	NoChar: <IntlLabel keys={['o23', 'variable', 'no-char']} value="N"/>,
	BadgeChecked: <IntlLabel keys={['o23', 'variable', 'checked']} value={<ElementChecked/>}/>,
	BadgeMissed: <IntlLabel keys={['o23', 'variable', 'missed']} value={<ElementMissed/>}/>,
	BadgeBanned: <IntlLabel keys={['o23', 'variable', 'banned']} value={<ElementBanned/>}/>,
	NoCodeDefinedInFileDef: <IntlLabel keys={['o23', 'pipeline', 'code', 'undefined']} value="No code defined"/>
};
