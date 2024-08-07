import {ConfigurableElement} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createSwitchableSnippetElement} from '../common/elements';
import {HttpStepDefModel} from './types';

export const elementDecorateUrl: ConfigurableElement = createSwitchableSnippetElement<HttpStepDefModel>({
	code: 'decorate-url', label: Labels.StepHttpDecorateUrl, anchor: 'decorate-url',
	property: 'decorateUrl', temporaryProperty: 'decorateUrlAsIs',
	ignoreCandidateLabel: Labels.NoDecoration,
	snippetHeight: PlaygroundCssVars.SNIPPET_HTTP_DECORATE_URL_HEIGHT,
	helpDoc: HelpDocs.stepHttpDecorateUrl
});
