import {ConfigurableElement} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {JsEditorExtensionType} from '../../common';
import {createSwitchableSnippetElement} from '../common/elements';
import {HttpStepDefModel} from './types';

export const elementGenerateHeaders: ConfigurableElement = createSwitchableSnippetElement<HttpStepDefModel>({
	code: 'generate-headers', label: Labels.StepHttpGenerateHeaders, anchor: 'generate-headers',
	property: 'generateHeaders', temporaryProperty: 'generateHeadersAsIs',
	ignoreCandidateLabel: Labels.NoCustomHttpHeader,
	extensionType: JsEditorExtensionType.HTTP_REQUEST_HEADERS_GENERATE,
	snippetHeight: PlaygroundCssVars.SNIPPET_HTTP_GENERATE_HEADERS_HEIGHT,
	helpDoc: HelpDocs.stepHttpGenerateHeaders
});
