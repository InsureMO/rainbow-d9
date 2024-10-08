import {ConfigurableElement} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {JsEditorExtensionType} from '../../common';
import {createSwitchableSnippetElement} from '../common/elements';
import {HttpStepDefModel} from './types';

export const elementReadResponse: ConfigurableElement = createSwitchableSnippetElement<HttpStepDefModel>({
	code: 'read-response', label: Labels.StepHttpReadResponse, anchor: 'read-response',
	property: 'readResponse', temporaryProperty: 'readResponseAsIs',
	ignoreCandidateLabel: Labels.UseJsonFormatForHttpBody,
	extensionType: JsEditorExtensionType.HTTP_RESPONSE_GENERATE,
	snippetHeight: PlaygroundCssVars.SNIPPET_HTTP_READ_RESPONSE_HEIGHT,
	helpDoc: HelpDocs.stepHttpReadResponse
});
