import {javascript} from '@codemirror/lang-javascript';
import {Extension} from '@codemirror/state';
import {MUtils} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import {
	createCodeMirrorTs562Es2022Extensions,
	DiagnosticCodes,
	TargetedCodeMirrorJavascriptExtensionsOptions
} from '@rainbow-d9/ts-vfs';
import React, {ForwardedRef, forwardRef, JSX, useState} from 'react';
import styled from 'styled-components';
import {CodeEditorExtensionsCreate, CodeEditorProps, CodeEditorState, JsEditorProps} from './types';
import {useDefaultExtensionsCreate} from './use-default-extensions-create';
import {useHandleCodeChange} from './use-handle-code-change';
import {useInitCodeContent} from './use-init-code';
import {useInitEditor} from './use-init-editor';
import {EditorContainer} from './widgets';

const useDualRefs = Utils.useDualRefs;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedCodeEditorProps = CodeEditorProps & { C: (props: any) => JSX.Element };
export const CodeEditor = forwardRef((props: WrappedCodeEditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		height, valueSyncDelay,
		createExtensions, createThemeExtension,
		C,
		$pp, $wrapped: {$onValueChange, $model, $avs: {$disabled, $visible}}
	} = props;

	const [state, setState] = useState<CodeEditorState>({});
	const {ref: divRef} = useInitEditor({state, setState, createExtensions, createThemeExtension});
	useDualRefs(divRef, ref);
	useInitCodeContent({editor: state.editor, content: (MUtils.getValue($model, $pp) ?? '') as string});
	useHandleCodeChange({...state, onChange: $onValueChange, delay: valueSyncDelay});

	return <C data-height={height} data-disabled={$disabled} data-visible={$visible} ref={divRef}/>;
});

const JsEditorContainer = styled(EditorContainer).attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({'data-height': height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-js-editor',
			style: {
				'--height': Utils.toCssSize(height ?? 300)
			}
		};
	})``;
export const JsEditor = forwardRef((props: JsEditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const createExtensions = useDefaultExtensionsCreate(createJsExtensions, props.createExtensions);
	return <CodeEditor {...props} createExtensions={createExtensions} C={JsEditorContainer}
	                   ref={ref}/>;
});
const TsEditorContainer = styled(EditorContainer).attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({'data-height': height}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-ts-editor',
			style: {
				'--height': Utils.toCssSize(height ?? 300)
			}
		};
	})``;
export const TsEditor = forwardRef((props: JsEditorProps, ref: ForwardedRef<HTMLDivElement>) => {
	const createExtensions = useDefaultExtensionsCreate(createTsExtensions, props.createExtensions);
	return <CodeEditor {...props} createExtensions={createExtensions} C={TsEditorContainer}
	                   ref={ref}/>;
});

export interface JavascriptOptions extends TargetedCodeMirrorJavascriptExtensionsOptions {
	jsx?: boolean;
	typescript?: boolean;
	createExtensions?: (options?: TargetedCodeMirrorJavascriptExtensionsOptions) => Array<Extension>;
}

export const createJsExtensions = (options?: JavascriptOptions): CodeEditorExtensionsCreate => {
	const {jsx = false, typescript = false, createExtensions: givenCreateExtensions, ...rest} = options ?? {};
	const createExtensions = givenCreateExtensions ?? createCodeMirrorTs562Es2022Extensions;
	return (): Extension => {
		return [
			javascript({jsx, typescript}),
			...createExtensions(rest)
		];
	};
};
export const createJsFuncBodyExtensions = (options?: JavascriptOptions): CodeEditorExtensionsCreate => {
	return createJsExtensions({
		...(options ?? {}),
		diagnosticCodesToIgnore: [...new Set([...(options?.diagnosticCodesToIgnore ?? []), DiagnosticCodes.C1118, DiagnosticCodes.C1375])]
	});
};
export const createTsExtensions = (options?: Omit<JavascriptOptions, 'typescript'>): CodeEditorExtensionsCreate => {
	return createJsExtensions({...options, typescript: true});
};
export const createTsFuncBodyExtensions = (options?: JavascriptOptions): CodeEditorExtensionsCreate => {
	return createJsFuncBodyExtensions({...options, typescript: true});
};
