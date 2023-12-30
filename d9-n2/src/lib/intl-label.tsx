import {MUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {$d9n2} from './constants';
import {GlobalEventTypes, useGlobalEventBus} from './global';

export interface IntlLabelProps {
	keys: Array<string>;
	value?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toIntlLabel = (text: any) => {
	if (typeof text === 'string') {
		return <IntlLabel keys={[`${text}`]} value={text}/>;
	} else {
		return text;
	}
};

export const IntlLabel = (props: IntlLabelProps) => {
	const {keys, value} = props;

	const {on, off} = useGlobalEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onLanguageChanged = () => {
			forceUpdate();
		};
		on && on(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
		return () => {
			off && off(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
		};
	}, [on, off, forceUpdate]);

	const language = $d9n2.intl.language;
	let label = value;
	if (keys != null && keys.length !== 0) {
		const key = [...keys].join('.');
		if (VUtils.isBlank(key)) {
			label = value;
		} else {
			const possible = $d9n2.intl.labels[language]?.[key];
			if (possible != null && typeof possible == 'string') {
				label = possible;
			} else {
				label = MUtils.getValue($d9n2.intl.labels, `${language}.${key}`) as string;
			}
			if (label == null || VUtils.isBlank(label)) {
				label = value;
			}
		}
	}

	return <>{label}</>;
};
