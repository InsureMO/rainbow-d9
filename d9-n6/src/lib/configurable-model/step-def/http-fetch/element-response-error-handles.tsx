import {ConfigurableElement} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {JsEditorExtensionType} from '../../common';
import {createSwitchableSnippetElement} from '../common/elements';
import {HttpStepDefModel} from './types';

export const elementResponseErrorHandles: ConfigurableElement = createSwitchableSnippetElement<HttpStepDefModel>({
	code: 'response-error-handles', label: Labels.StepHttpResponseErrorHandles, anchor: 'response-error-handles',
	property: 'responseErrorHandles', temporaryProperty: 'responseErrorHandlesAsIs',
	ignoreCandidateLabel: Labels.Ignored,
	extensionType: JsEditorExtensionType.HTTP_ERROR_HANDLE,
	snippetHeight: PlaygroundCssVars.SNIPPET_HTTP_RESPONSE_ERROR_HANDLES_HEIGHT,
	helpDoc: HelpDocs.stepHttpResponseErrorHandles
});
