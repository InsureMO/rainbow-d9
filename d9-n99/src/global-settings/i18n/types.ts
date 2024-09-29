import {ReactNode} from 'react';

/** lang code must follow javascript standard */
export type LangCode = string;

export interface AppLanguage {
	code: LangCode;
	icon: ReactNode;
	text: ReactNode;
	active: (code: LangCode) => boolean;
}
