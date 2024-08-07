import React from 'react';
import {ConfigurableElement} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createSwitchableSnippetElement} from '../common/elements';
import {HttpStepDefModel} from './types';

export const elementGenerateBody: ConfigurableElement = createSwitchableSnippetElement<HttpStepDefModel>({
	code: 'generate-body', label: Labels.StepHttpGenerateBody, anchor: 'generate-body',
	property: 'generateBody', temporaryProperty: 'generateBodyAsIs',
	notAvailableBadge: <NavigatorElementBadgeWrapper data-role="use-default">
		{Labels.UseInputAsHttpBody}
	</NavigatorElementBadgeWrapper>,
	ignoreCandidateLabel: Labels.UseInputAsHttpBody,
	snippetHeight: PlaygroundCssVars.SNIPPET_HTTP_GENERATE_BODY_HEIGHT,
	helpDoc: HelpDocs.stepHttpGenerateBody
});
