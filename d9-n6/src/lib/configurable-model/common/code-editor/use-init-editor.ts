import {indentWithTab} from '@codemirror/commands';
import {indentUnit} from '@codemirror/language';
import {lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState, EditorStateConfig} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {VUtils} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {PlaygroundDecorator} from '../../../types';
import {CodeEditorState} from './types';
import {createTheme, useTheme} from './use-theme';

export interface UseInitCodeEditorOptions<S extends CodeEditorState> {
	state: S;
	setState: Dispatch<SetStateAction<S>>;
	createCodeMirrorExtensions: () => EditorStateConfig['extensions'];
	decorator?: PlaygroundDecorator;
}

export const useInitCodeEditor = <S extends CodeEditorState>(options: UseInitCodeEditorOptions<S>) => {
	const {state, setState, createCodeMirrorExtensions, decorator: {theme} = {}} = options;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const changeListener = new Compartment();
		const {extension: changeableThemeExtension, listener: themeListener} = createTheme(theme);
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					indentUnit.of('  '),
					keymap.of([indentWithTab]),
					lintGutter(),
					createCodeMirrorExtensions(),
					changeListener.of(EditorView.updateListener.of(VUtils.noop)),
					...changeableThemeExtension
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor, changeListener, themeListener}));
		return () => {
			editor.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setState, createCodeMirrorExtensions]);
	useTheme({theme, editor: state.editor, listener: state.themeListener});

	return {ref};
};
