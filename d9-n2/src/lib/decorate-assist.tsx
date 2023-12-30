import {Nullable} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {ICON_PREFIX} from './constants';
import {Registrar} from './icons';
import {IntlLabel} from './intl-label';

export type DecorateElement = string | ReactNode;
export type DecorateWrapperDef = {
	leads?: Array<DecorateElement>;
	tails?: Array<DecorateElement>;
};

export const transformDecorator = (decorator: DecorateElement): ReactNode => {
	if (typeof decorator === 'string') {
		if (decorator.startsWith(ICON_PREFIX)) {
			const Found = Registrar.find(decorator.substring(ICON_PREFIX.length), decorator);
			if (typeof Found === 'function') {
				return <Found/>;
			}
		} else {
			return <IntlLabel keys={decorator.split('.')} value={decorator}/>;
		}
	}
	return decorator;
};

export const transformDecorators = (decorators?: Nullable<Array<DecorateElement>>): Array<ReactNode> => {
	return (decorators ?? []).filter(decorator => decorator != null).map(transformDecorator);
};