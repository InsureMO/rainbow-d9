import {MUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {$d9n2} from './constants';
import {GlobalEventTypes, useGlobalEventBus} from './global';

export interface IntlLabelProps {
	keys: Array<string>;
	value?: string;
}

export const IntlLabel = (props: IntlLabelProps) => {
	const {keys, value} = props;

	const {on, off} = useGlobalEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onLanguageChanged = () => {
			forceUpdate();
		};
		on(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
		return () => {
			off(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
		};
	}, [on, off, forceUpdate]);

	const language = $d9n2.intl.language;
	let label = value;
	if (keys != null && keys.length !== 0) {
		label = MUtils.getValue($d9n2.intl.labels, [language, ...keys].join('.')) as string;
		if (label == null || VUtils.isBlank(label)) {
			label = value;
		}
	}

	return <>{label}</>;
};
