import {NodeDef} from '@rainbow-d9/n1';
import {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from 'react';

export type OmitNodeDef<T extends NodeDef> = Omit<T, '$key' | '$wt'>;
export type OmitHTMLProps<T extends HTMLElement> = Omit<DetailedHTMLProps<InputHTMLAttributes<T>, T>, 'ref' | 'key' | 'disabled' | 'children'>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitHTMLProps2<T extends HTMLElement, K extends keyof any> = Pick<OmitHTMLProps<T>, Exclude<keyof OmitHTMLProps<T>, K>>;

export type DecorateElement = string | ReactNode;
export type DecorateWrapperDef = {
	leads?: Array<DecorateElement>;
	tails?: Array<DecorateElement>;
};
