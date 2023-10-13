import {ModelHolder, OnValueChange, OnValueChanged, PropValue, ValueChangeableNodeDef} from '../types';
import {MUtils, N1Logger, PPUtils} from '../utils';
import {useForceUpdate} from './use-force-update';
import {useValueChanged} from './use-value-changed';

export const useSetValue = (
	props: Pick<ValueChangeableNodeDef, '$pp' | 'valueChanged'> & Pick<ModelHolder, '$model' | '$p2r'>
): { onValueChange: OnValueChange, onValueChanged: OnValueChanged } => {
	const onValueChanged = useValueChanged();
	const forceUpdate = useForceUpdate();

	return {
		// eslint-disable-next-line @typescript-eslint/no-inferrable-types
		onValueChange: async (newValue: PropValue, doForceUpdate: boolean = true) => {
			const {$p2r, $model, $pp, valueChanged} = props;
			const oldValue = MUtils.setValue($model, $pp, newValue);
			if (doForceUpdate) {
				forceUpdate();
			}
			const absolutePath = PPUtils.absolute($p2r, $pp);
			if (valueChanged != null) {
				await valueChanged({absolutePath, oldValue, newValue});
			}
			onValueChanged({absolutePath, oldValue, newValue});
			N1Logger.debug(`Value set[old=${oldValue}, new=${newValue}, path=${$pp}, absolutePath=${absolutePath}].`, $model, 'SetValueHook');
		},
		onValueChanged
	};
};