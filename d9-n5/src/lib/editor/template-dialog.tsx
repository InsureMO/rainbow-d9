import {indentWithTab} from '@codemirror/commands';
import {javascript} from '@codemirror/lang-javascript';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {WidgetType} from '@rainbow-d9/n1';
import {ButtonInk, CssVars, DOM_KEY_WIDGET, IntlLabel, toIntlLabel, UnwrappedButton} from '@rainbow-d9/n2';
import {basicSetup} from 'codemirror';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {PlaygroundWidgets} from '../types';
import {PlaygroundCssVars} from '../widgets';
import {createEditorStyles} from './code-mirror-styles';
import {d9mlExtensions, d9mlHighlightStyle, WidgetDeclarationIconPlugin} from './enhance';
import {beautifyTemplate} from './utils';

export const WidgetTemplateDialogContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-widget-template-dialog',
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
export const WidgetTemplateDialogWrapper = styled.div.attrs<{ visible: boolean }>(
	({visible}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground-widget-template-dialog-wrapper',
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
export const WidgetTemplateDialogBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-template-dialog-body'})`
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
export const WidgetTemplateViewerWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-template-viewer-wrapper'})`
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
export const WidgetTemplateViewer = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-template-viewer'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    ${createEditorStyles({badge: false})}
`;
export const WidgetTemplateReason = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-template-dialog-reason'})`
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
export const WidgetTemplateDialogFooter = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-template-dialog-footer'})`
    display: flex;
    justify-content: flex-end;

    > button:not(:last-child) {
        margin-right: 8px;
    }
`;

export interface WidgetTemplateDialogProps {
	widgets: Required<PlaygroundWidgets>;
}

export interface WidgetTemplateDialogState {
	visible: boolean;
	editor?: EditorView;
	reason?: ReactNode;
	widgetType?: WidgetType;
	copied: boolean;
}

export const WidgetTemplateDialog = (props: WidgetTemplateDialogProps) => {
	const {widgets} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = usePlaygroundEventBus();
	const [state, setState] = useState<WidgetTemplateDialogState>({visible: false, copied: false});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					d9mlHighlightStyle,
					markdown({
						defaultCodeLanguage: javascript({jsx: false, typescript: false}),
						base: markdownLanguage, extensions: d9mlExtensions
					}),
					WidgetDeclarationIconPlugin
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor}));
		return () => {
			editor.destroy();
		};
	}, []);
	useEffect(() => {
		const show = (widgetType: WidgetType, prefix: string, reason: ReactNode) => {
			if (state.visible || state.editor == null) {
				return;
			}
			const padding = window.innerWidth - document.body.clientWidth;
			if (padding > 0) {
				document.body.style.paddingRight = `${padding}px`;
			}
			document.body.style.overflowY = 'hidden';
			const doc = state.editor.state.doc;
			let template = widgets.widgets.find(widget => widget.$wt === widgetType)?.template ?? '';
			template = beautifyTemplate(template, prefix, '');
			state.editor.dispatch({changes: {from: 0, to: doc.length, insert: template}});
			setState(state => ({...state, visible: true, copied: false, widgetType, reason}));
		};

		on(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, show);
		return () => {
			off(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, show);
		};
	}, [on, off, state.visible, state.editor, widgets.widgets]);
	useEffect(() => {
		if (state.copied) {
			setTimeout(() => {
				setState(state => ({...state, copied: false}));
			}, 5000);
		}
	}, [state.copied]);

	const onCopyToClipboard = async () => {
		const {widgetType} = state;
		if (!widgetType) {
			return;
		}
		const template = state.editor.state.doc.toString();
		await navigator.clipboard.writeText(template);
		setState(state => ({...state, copied: true}));
	};
	const onHide = () => {
		document.body.style.paddingRight = '';
		document.body.style.overflowY = '';
		setState(state => ({...state, visible: false}));
	};

	return <WidgetTemplateDialogContainer visible={state.visible}>
		<WidgetTemplateDialogWrapper visible={state.visible}>
			<WidgetTemplateDialogBody>
				<WidgetTemplateViewerWrapper>
					<WidgetTemplateViewer ref={ref}/>
				</WidgetTemplateViewerWrapper>
				<WidgetTemplateReason>{toIntlLabel(state.reason)}</WidgetTemplateReason>
			</WidgetTemplateDialogBody>
			<WidgetTemplateDialogFooter>
				{state.copied
					? <UnwrappedButton ink={ButtonInk.SUCCESS} onClick={onCopyToClipboard}>
						<IntlLabel keys={['playground', 'template', 'clipboard', 'copied']} value="Copied!"/>
					</UnwrappedButton>
					: <UnwrappedButton ink={ButtonInk.PRIMARY} onClick={onCopyToClipboard}>
						<IntlLabel keys={['playground', 'template', 'clipboard']} value="Copy to Clipboard"/>
					</UnwrappedButton>}
				<UnwrappedButton ink={ButtonInk.WAIVE} onClick={onHide}>
					<IntlLabel keys={['playground', 'template', 'close']} value="Close"/>
				</UnwrappedButton>
			</WidgetTemplateDialogFooter>
		</WidgetTemplateDialogWrapper>
	</WidgetTemplateDialogContainer>;
};
