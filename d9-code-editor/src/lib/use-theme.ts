import {Compartment} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import {RootEventTypes, useRootEventBus} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {CodeEditorThemeCreate} from './types';

export const createTheme = (theme?: CodeEditorThemeCreate) => {
	const themeListener = new Compartment();
	const themeExtension = theme?.();
	const changeableThemeExtension = themeExtension == null ? [] : [themeListener.of(themeExtension)];
	return {extension: changeableThemeExtension, listener: themeListener};
};

export interface UseThemeOptions {
	createThemeExtension?: CodeEditorThemeCreate;
	editor?: EditorView;
	listener?: Compartment;
}

export const useTheme = (options: UseThemeOptions) => {
	const {createThemeExtension, editor, listener} = options;

	const rootEventBus = useRootEventBus();
	useEffect(() => {
		if (editor == null || listener == null || createThemeExtension == null) {
			return;
		}
		const onThemeChanged = (newTheme: string) => {
			editor.dispatch({effects: listener.reconfigure(createThemeExtension(newTheme))});
		};

		rootEventBus?.on?.(RootEventTypes.THEME_CHANGED, onThemeChanged);
		return () => {
			rootEventBus?.off?.(RootEventTypes.THEME_CHANGED, onThemeChanged);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rootEventBus?.on, rootEventBus?.off, createThemeExtension, editor, listener]);
};