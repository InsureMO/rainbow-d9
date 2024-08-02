import {ModelHolder, OnValueChange, OnValueChanged, PropValue, ValueChangeableNodeDef} from '../types';
import {MUtils, N1Logger, PPUtils} from '../utils';
import {useForceUpdate} from './use-force-update';
import {useValueChanged} from './use-value-changed';

export const useSetValue = (
	props: Pick<ValueChangeableNodeDef, '$pp' | 'valueChanged'> & ModelHolder
): { onValueChange: OnValueChange, onValueChanged: OnValueChanged } => {
	const onValueChanged = useValueChanged();
	const forceUpdate = useForceUpdate();

	return {
		// eslint-disable-next-line @typescript-eslint/no-inferrable-types, @typescript-eslint/no-explicit-any
		onValueChange: async (newValue: PropValue, doForceUpdate: boolean = true, ...args: Array<any>) => {
			const {$root, $p2r, $model, $pp, valueChanged} = props;
			// set to model immediately
			const oldValue = MUtils.setValue($model, $pp, newValue);
			if (doForceUpdate) {
				forceUpdate();
			}
			const absolutePath = PPUtils.absolute($p2r, $pp);
			if (valueChanged != null) {
				// try to invoke external function
				await valueChanged({root: $root, model: $model, absolutePath, oldValue, newValue}, ...args);
			}
			// invoke internal functions and events
			onValueChanged({absolutePath, oldValue, newValue}, ...args);
			N1Logger.debug(`Value set[old=${oldValue}, new=${newValue}, path=${$pp}, absolutePath=${absolutePath}].`, $model, 'SetValueHook');
		},
		onValueChanged
	};
};