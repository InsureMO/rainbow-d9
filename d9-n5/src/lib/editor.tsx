import {markdown} from '@codemirror/lang-markdown';
import {defaultHighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, lineNumbers, ViewUpdate} from '@codemirror/view';
import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {EditorProps} from './types';

export interface EditorState {
	editor?: EditorView;
}

// noinspection CssUnresolvedCustomProperty
export const EditorWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-editor',
		style: {}
	};
})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-column: 2;
    grid-template-columns: 1fr;
    overflow: hidden;
`;

export const EditorPanel = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-editor-panel'})`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;

        &.cm-focused {
            outline: none;
        }

        > div.cm-scroller {
            overflow-x: auto;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                background-color: transparent;
                height: ${CssVars.SCROLL_HEIGHT};
                width: ${CssVars.SCROLL_WEIGHT};
            }

            &::-webkit-scrollbar-track {
                background-color: ${CssVars.SCROLL_TRACK_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${CssVars.SCROLL_THUMB_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }
        }
    }
`;

export const Editor = (props: EditorProps) => {
	const {
		content,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		externalDefsTypes,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const contentRef = useRef<string>(content ?? '');
	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<EditorState>({});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					lineNumbers({}),
					EditorView.lineWrapping,
					syntaxHighlighting(defaultHighlightStyle, {
						fallback: true
					}),
					markdown({addKeymap: false}), // 支持markdown
					// oneDark,
					EditorView.updateListener.of((view: ViewUpdate) => {
						if (view.docChanged) {
							const doc = view.state.doc;
							const value = doc.toString();
							contentRef.current = value;
							fire(PlaygroundEventTypes.CONTENT_CHANGED, value);
						}
					})
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor}));
		return () => {
			editor.destroy();
		};
	}, [fire]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		state.editor.dispatch({changes: {from: 0, insert: contentRef.current}});
		fire(PlaygroundEventTypes.CONTENT_INITIALIZED, contentRef.current);
	}, [fire, state.editor]);

	return <EditorWrapper {...rest}>
		<EditorPanel ref={ref}/>
	</EditorWrapper>;
};
