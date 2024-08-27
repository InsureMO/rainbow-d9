import {indentWithTab} from '@codemirror/commands';
import {indentUnit} from '@codemirror/language';
import {lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState, EditorStateConfig} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {VUtils} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {CodeEditorState} from './types';

export interface UseInitCodeEditorOptions<S extends CodeEditorState> {
	setState: Dispatch<SetStateAction<S>>;
	createCodeMirrorExtensions: () => EditorStateConfig['extensions'];
}

export const useInitCodeEditor = <S extends CodeEditorState>(options: UseInitCodeEditorOptions<S>) => {
	const {setState, createCodeMirrorExtensions} = options;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const changeListener = new Compartment();
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					indentUnit.of('  '),
					keymap.of([indentWithTab]),
					lintGutter(),
					createCodeMirrorExtensions(),
					changeListener.of(EditorView.updateListener.of(VUtils.noop))
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor, changeListener}));
		return () => {
			editor.destroy();
		};
	}, [setState, createCodeMirrorExtensions]);

	return {ref};
};
