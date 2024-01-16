import {MUtils, PropertyPath, VUtils} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {SelectedPlanElement} from './types';

export const useElementDefaultValue = (options: {
	model: SelectedPlanElement['values']; $pp: PropertyPath;
	defaultValues: Array<string | number> | (() => Array<string | number>);
}) => {
	const {model, $pp, defaultValues} = options;

	useEffect(() => {
		const existsValue = MUtils.getValue(model, $pp);
		if (VUtils.isNotBlank(existsValue)) {
			return;
		}
		const values = typeof defaultValues === 'function' ? defaultValues() : defaultValues;
		for (let index = 0; index < values.length; index++) {
			const defaultValue = values[index];
			if (VUtils.isNotBlank(defaultValue)) {
				MUtils.setValue(model, $pp, defaultValue);
				break;
			}
		}
		// run only once
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
