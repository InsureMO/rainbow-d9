import {ReactNode} from 'react';

export type ThemeCode = string;

export enum ThemeKind {
	LIGHT = 'light',
	DARK = 'dark',
}

export interface AppThemeStyle {
	light: string;
	dark: string;
}

export interface AppTheme {
	code: ThemeCode;
	kind: ThemeKind;
	icon: ReactNode;
	text: ReactNode;
	active: (code: ThemeCode, kind: ThemeKind) => boolean;
}
