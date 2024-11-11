import {indentWithTab} from '@codemirror/commands';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {BaseModel} from '@rainbow-d9/n1';
import {ButtonInk, CssVars, DOM_KEY_WIDGET, SDP, toIntlLabel, UnwrappedButton} from '@rainbow-d9/n2';
import {basicSetup} from 'codemirror';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {createTheme, useTheme} from '../hooks/use-theme';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {PlaygroundDecorator} from '../types';
import {PlaygroundCssVars} from '../widgets';

export const MockJsonDialogContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-mock-json-dialog',
		style: {
			opacity: visible ? 1 : (void 0),
			pointerEvents: visible ? 'auto' : (void 0)
		}
	};
})<{ visible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DIALOG_Z_INDEX};
`;
export const MockJsonDialogWrapper = styled.div.attrs<{ visible: boolean }>(
	({visible}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground-mock-json-dialog-wrapper',
			style: {
				transform: visible ? 'none' : (void 0)
			}
		};
	})<{ visible: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${PlaygroundCssVars.TEMPLATE_DIALOG_WIDTH};
    margin-top: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_TOP};
    margin-left: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_LEFT};
    padding: ${PlaygroundCssVars.TEMPLATE_DIALOG_PADDING};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
    transform: scale(0.75);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
export const MockJsonDialogBody = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-mock-json-dialog-body'})`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    height: ${PlaygroundCssVars.TEMPLATE_DIALOG_HEIGHT};
    margin-bottom: ${PlaygroundCssVars.TEMPLATE_DIALOG_BODY_MARGIN_BOTTOM};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
export const MockJsonViewerWrapper = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-mock-json-viewer-wrapper'})`
    display: grid;
    position: relative;
    align-self: stretch;
    flex-grow: 1;
    grid-template-columns: 1fr;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
`;
// noinspection CssUnusedSymbol
export const MockJsonViewer = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-mock-json-viewer'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;
    }
`;
export const MockJsonReason = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-mock-json-dialog-reason'})`
    display: flex;
    position: relative;
    align-items: center;
    font-size: 1.1em;
    font-style: italic;
    color: ${CssVars.DANGER_COLOR};

    &:not(:empty) {
        margin-top: 16px;
    }
`;
export const MockJsonDialogFooter = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-mock-json-dialog-footer'})`
    display: flex;
    justify-content: flex-end;

    > button:not(:last-child) {
        margin-right: 8px;
    }
`;

export interface MockJsonDialogProps {
	mockData: BaseModel;
	decorator?: PlaygroundDecorator;
}

export interface MockJsonDialogState {
	visible: boolean;
	editor?: EditorView;
	themeListener?: Compartment;
	reason?: ReactNode;
	copied: boolean;
}

export const MockJsonDialog = (props: MockJsonDialogProps) => {
	const {mockData, decorator: {theme} = {}} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = usePlaygroundEventBus();
	const [state, setState] = useState<MockJsonDialogState>({visible: false, copied: false});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const {extension: changeableThemeExtension, listener: themeListener} = createTheme(theme);
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					json(),
					lintGutter(),
					linter(jsonParseLinter()),
					...changeableThemeExtension
				]
			}),
			parent: ref.current
		});

		setState(state => ({...state, editor, themeListener}));
		return () => {
			editor.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		const show = () => {
			// noinspection DuplicatedCode
			if (state.visible || state.editor == null) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			const doc = state.editor.state.doc;
			const json = JSON.stringify(mockData, null, '  ');
			state.editor.dispatch({changes: {from: 0, to: doc.length, insert: json}});
			setState(state => ({...state, visible: true, copied: false, reason: (void 0)}));
		};

		on(PlaygroundEventTypes.EDIT_MOCK_JSON, show);
		return () => {
			off(PlaygroundEventTypes.EDIT_MOCK_JSON, show);
		};
	}, [on, off, state.visible, state.editor, mockData]);
	useEffect(() => {
		if (state.copied) {
			setTimeout(() => {
				setState(state => ({...state, copied: false}));
			}, 5000);
		}
	}, [state.copied]);
	useTheme({theme, editor: state.editor, listener: state.themeListener});

	const onCopyToClipboard = async () => {
		const json = state.editor.state.doc.toString();
		await navigator.clipboard.writeText(json);
		setState(state => ({...state, copied: true}));
	};
	const onDownload = () => {
		const json = state.editor.state.doc.toString();
		const blob = new Blob([json], {type: 'application/json'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'mock-data.json';
		a.click();
		URL.revokeObjectURL(url);
	};
	const onConfirm = () => {
		const json = state.editor.state.doc.toString();
		try {
			const parsed = JSON.parse(json);
			Object.keys(mockData).forEach(key => delete mockData[key]);
			Object.keys(parsed).forEach(key => mockData[key] = parsed[key]);
			fire(PlaygroundEventTypes.FORCE_UPDATE_VIEWER);
			onHide();
		} catch {
			setState(state => ({
				...state,
				reason: Labels.InvalidJson
			}));
		}
	};
	const onHide = () => {
		document.body.style.paddingRight = '';
		document.body.style.overflowY = '';
		setState(state => ({...state, visible: false, reason: (void 0)}));
	};

	return <MockJsonDialogContainer visible={state.visible}>
		<MockJsonDialogWrapper visible={state.visible}>
			<MockJsonDialogBody>
				<MockJsonViewerWrapper>
					<MockJsonViewer ref={ref}/>
				</MockJsonViewerWrapper>
				<MockJsonReason>{toIntlLabel(state.reason)}</MockJsonReason>
			</MockJsonDialogBody>
			<MockJsonDialogFooter>
				{state.copied
					? <UnwrappedButton ink={ButtonInk.SUCCESS} onClick={onCopyToClipboard}>
						{Labels.CopiedToClipboard}
					</UnwrappedButton>
					: <UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onCopyToClipboard}>
						{Labels.CopyToClipboard}
					</UnwrappedButton>}
				<UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onDownload}>
					{Labels.Download}
				</UnwrappedButton>
				<UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onConfirm}>
					{Labels.ConfirmAndRefresh}
				</UnwrappedButton>
				<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onHide}>
					{Labels.Cancel}
				</UnwrappedButton>
			</MockJsonDialogFooter>
		</MockJsonDialogWrapper>
	</MockJsonDialogContainer>;
};
