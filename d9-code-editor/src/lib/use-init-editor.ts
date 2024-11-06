import {indentWithTab} from '@codemirror/commands';
import {indentUnit} from '@codemirror/language';
import {lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap} from '@codemirror/view';
import {VUtils} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {CodeEditorExtensionsCreate, CodeEditorState, CodeEditorThemeCreate} from './types';
import {createTheme, useTheme} from './use-theme';

export interface UseInitEditorOptions<S extends CodeEditorState> {
	state: S;
	setState: Dispatch<SetStateAction<S>>;
	createExtensions: CodeEditorExtensionsCreate;
	createThemeExtension?: CodeEditorThemeCreate;
}

export const useInitEditor = <S extends CodeEditorState>(options: UseInitEditorOptions<S>) => {
	const {state, setState, createExtensions, createThemeExtension} = options;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const changeListener = new Compartment();
		const {extension: changeableThemeExtension, listener: themeListener} = createTheme(createThemeExtension);
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					indentUnit.of('  '),
					keymap.of([indentWithTab]),
					lintGutter(),
					createExtensions(),
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
	}, [setState, createExtensions]);
	useTheme({createThemeExtension, editor: state.editor, listener: state.themeListener});

	return {ref};
};
