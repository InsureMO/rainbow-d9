import {BaseModel, NodeDef, PropValue, ValidationFunctions} from '@rainbow-d9/n1';
import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {GlobalHandlers} from './global';

export type OmitNodeDef<T extends NodeDef> = Omit<T, '$key' | '$wt'>;
export type OmitHTMLProps<T extends HTMLElement> = Omit<DetailedHTMLProps<InputHTMLAttributes<T>, T>, 'ref' | 'key' | 'disabled' | 'children'>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitHTMLProps2<T extends HTMLElement, K extends keyof any> = Pick<OmitHTMLProps<T>, Exclude<keyof OmitHTMLProps<T>, K>>;

export interface ModelCarriedHandler<R extends BaseModel, M extends PropValue> {
	root: R;
	model: M;
}

export interface ValidationHandlers {
	validators: ValidationFunctions;
}

export interface GlobalEventHandlers {
	global: GlobalHandlers;
}

export interface $D9Window extends Window {
	i18n: {
		language: string;
	};
}
