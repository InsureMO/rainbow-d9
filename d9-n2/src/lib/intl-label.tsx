import {MUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {ReactNode, useEffect} from 'react';
import {$d9n2} from './constants';
import {GlobalEventTypes, useGlobalEventBus} from './global';
import {locale} from './utils';

export interface IntlLabelProps {
	keys: Array<string>;
	value?: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	replacements?: Array<any>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toIntlLabel = (text: any, ...replacements: Array<any>) => {
	if (typeof text === 'string') {
		return <IntlLabel keys={[`${text}`]} value={text} replacements={replacements}/>;
	} else {
		return text;
	}
};

export const useLanguage = () => {
	const {on, off} = useGlobalEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onLanguageChanged = () => {
			forceUpdate();
		};
		if (on != null) {
			on(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
		}
		return () => {
			if (off != null) {
				off(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
			}
		};
	}, [on, off, forceUpdate]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replaceTemplate = (template: string, values?: Array<any>): string => {
	values = values ?? [];
	for (let index = 0; index < values.length; index++) {
		// replace with given value by index
		template = template.replace(new RegExp('\\{' + index + '\\}', 'g'), `${values[index] ?? ''}`);
	}
	return template;
};

export const internationalize = (label: string, keys: Array<string>): string => {
	let found = label;
	if (keys != null && keys.length !== 0) {
		const language = locale();
		const key = [...keys].join('.');
		if (VUtils.isBlank(key)) {
			return label;
		} else {
			const possible = $d9n2.intl.labels[language]?.[key];
			if (possible != null && typeof possible == 'string') {
				found = possible;
			} else {
				found = MUtils.getValue($d9n2.intl.labels, `${language}.${key}`) as string;
			}
			if (found == null || VUtils.isBlank(found)) {
				return label;
			} else {
				return found;
			}
		}
	} else {
		return label;
	}
};

export const IntlLabel = (props: IntlLabelProps) => {
	const {keys, value, replacements} = props;

	useLanguage();

	let label: ReactNode = replaceTemplate(internationalize('', keys) ?? '', replacements);
	label = VUtils.isBlank(label) ? value : label;

	return <>{label}</>;
};
