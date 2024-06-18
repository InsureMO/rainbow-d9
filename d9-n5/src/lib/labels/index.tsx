import {IntlLabel} from '@rainbow-d9/n2';
import React from 'react';

export const Labels = {
	ERROR: <IntlLabel keys={['playground', 'error', 'unknown']} value="Something went wrong."/>,
	NoContentGiven: <IntlLabel keys={['playground', 'error', 'no-content']} value="No content given."/>,
	ParseError: <IntlLabel keys={['playground', 'error', 'parse']} value="Parse error occurred."/>,

	InvalidJson: <IntlLabel keys={['playground', 'mock', 'json', 'invalid']}
	                        value="The JSON format is incorrect. Please check and modify before confirming."/>,
	CopiedToClipboard: <IntlLabel keys={['playground', 'message', 'copied-to-clipboard']} value="Copied!"/>,
	CopyToClipboard: <IntlLabel keys={['playground', 'action', 'copy-to-clipboard']} value="Copy to Clipboard"/>,
	Download: <IntlLabel keys={['playground', 'action', 'download']} value="Download as File"/>,
	ConfirmAndRefresh: <IntlLabel keys={['playground', 'action', 'confirm-and-refresh']} value="Confirm and Refresh"/>,
	Close: <IntlLabel keys={['playground', 'action', 'close']} value="Close"/>,
	Cancel: <IntlLabel keys={['playground', 'action', 'cancel']} value="Cancel"/>
};
