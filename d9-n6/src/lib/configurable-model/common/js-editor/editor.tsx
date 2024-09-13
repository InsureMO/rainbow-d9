import {javascript} from '@codemirror/lang-javascript';
import {Extension} from '@codemirror/state';
import {
	createCodeMirrorTs562Es2022Extensions,
	DiagnosticCodes,
	TargetedCodeMirrorJavascriptExtensionsOptions
} from '@rainbow-d9/ts-vfs';
import React, {useState} from 'react';
import {PlaygroundDecorator} from '../../../types';
import {DTS} from '../../../vfs';
import {CodeEditorState, useHandleCodeChange, useInitCodeContent, useInitCodeEditor} from '../code-editor';
import {JsEditorContainer} from './widgets';

export enum JsEditorExtensionType {
	NONE = 'none',
	/** async, \$endpointUrl, \$factor, \$request, \$helpers, \$ */
	HTTP_URL_GENERATE = 'http-url-generate',
	/** async, \$factor, \$request, \$helpers, \$ */
	HTTP_REQUEST_HEADERS_GENERATE = 'http-request-headers-generate',
	/** async, \$factor, \$request, \$helpers, \$ */
	HTTP_REQUEST_BODY_GENERATE = 'http-request-body-generate',
	/** async, \$response, \$factor, \$request, \$helpers, \$ */
	HTTP_RESPONSE_GENERATE = 'http-response-generate',
	/** async, options, \$helpers, \$ */
	HTTP_ERROR_HANDLE = 'http-error-handle',
	/** async, \$factor, \$request, \$helpers, \$ */
	SNIPPET = 'snippet',
	/** async, \$factor, \$request, \$helpers, \$ */
	PARALLEL_CLONE_DATA = 'parallel-clone-data',
	/** async, \$runner, \$factor, \$request, \$helpers, \$ */
	TYPEORM_SNIPPET = 'typeorm-snippet',
	/** async, \$factor, \$request, \$helpers, \$ */
	ROUTE_CHECK = 'route-check'
}

export interface JsEditorProps {
	visible?: boolean;
	height?: number | string;
	snippet?: string;
	onChange: (snippet: string) => Promise<void>;
	placeholder?: string;
	decorator?: PlaygroundDecorator;
	extensionType?: JsEditorExtensionType;
}

const createCodeMirrorExtensions = (options?: TargetedCodeMirrorJavascriptExtensionsOptions): (() => Array<Extension>) => {
	return (): Array<Extension> => {
		return [
			javascript({jsx: false, typescript: false}),
			...createCodeMirrorTs562Es2022Extensions(options)
		];
	};
};
const JsExtensionCreators: Partial<Record<JsEditorExtensionType, () => Array<Extension>>> = {};

const createExtensionByType = (extensionType: JsEditorExtensionType = JsEditorExtensionType.NONE): (() => Array<Extension>) => {
	let creator = JsExtensionCreators[extensionType];
	if (creator != null) {
		return creator;
	}

	creator = (() => {
		switch (extensionType) {
			case JsEditorExtensionType.SNIPPET:
			case JsEditorExtensionType.PARALLEL_CLONE_DATA:
			case JsEditorExtensionType.ROUTE_CHECK:
			case JsEditorExtensionType.HTTP_REQUEST_HEADERS_GENERATE:
			case JsEditorExtensionType.HTTP_REQUEST_BODY_GENERATE:
				return createCodeMirrorExtensions({
					extend: () => [DTS.stepInterfaces, DTS.stepFactor, DTS.stepRequest, DTS.stepHelpers].join('\n'),
					diagnosticCodesToIgnore: [DiagnosticCodes.C1118, DiagnosticCodes.C1375]
				});
			case JsEditorExtensionType.TYPEORM_SNIPPET:
				return createCodeMirrorExtensions({
					extend: () => [DTS.typeormRunner, DTS.stepInterfaces, DTS.stepFactor, DTS.stepRequest, DTS.stepHelpers].join('\n'),
					diagnosticCodesToIgnore: [DiagnosticCodes.C1118, DiagnosticCodes.C1375]
				});
			case JsEditorExtensionType.HTTP_URL_GENERATE:
				return createCodeMirrorExtensions({
					extend: () => [DTS.fetchEndpointUrl, DTS.stepInterfaces, DTS.stepFactor, DTS.stepRequest, DTS.stepHelpers].join('\n'),
					diagnosticCodesToIgnore: [DiagnosticCodes.C1118]
				});
			case JsEditorExtensionType.HTTP_RESPONSE_GENERATE:
				return createCodeMirrorExtensions({
					extend: () => [DTS.httpResponse, DTS.fetchResponse, DTS.stepInterfaces, DTS.stepFactor, DTS.stepRequest, DTS.stepHelpers].join('\n'),
					diagnosticCodesToIgnore: [DiagnosticCodes.C1118, DiagnosticCodes.C1375]
				});
			case JsEditorExtensionType.HTTP_ERROR_HANDLE:
				return createCodeMirrorExtensions({
					extend: () => [DTS.httpResponse, DTS.stepInterfaces, DTS.fetchErrorHandle, DTS.stepHelpers].join('\n'),
					diagnosticCodesToIgnore: [DiagnosticCodes.C1118, DiagnosticCodes.C1375]
				});
			case JsEditorExtensionType.NONE:
			default:
				return createCodeMirrorExtensions();
		}
	})();
	JsExtensionCreators[extensionType] = creator;
	return creator;

};

export const JsEditor = (props: JsEditorProps) => {
	const {visible = true, height, snippet, onChange, decorator, extensionType} = props;

	const [state, setState] = useState<CodeEditorState>({});
	const {ref} = useInitCodeEditor({
		state, setState,
		createCodeMirrorExtensions: createExtensionByType(extensionType),
		decorator
	});
	useInitCodeContent({editor: state.editor, code: snippet});
	useHandleCodeChange({...state, onChange});

	return <JsEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};