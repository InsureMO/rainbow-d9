import {
	ArrayContainerDef,
	ArrayPropValue,
	MUtils,
	PPUtils,
	PropertyPath,
	RootEventTypes,
	useRootEventBus,
	WidgetProps
} from '@rainbow-d9/n1';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useGlobalHandlers} from './global';

export const useArrayCouldAddElement = (props: Omit<ArrayContainerDef, '$wt' | '$nodes'> & WidgetProps): [boolean, Dispatch<SetStateAction<boolean>>] => {
	const {$pp, $wrapped, $array: {couldAddElement, disableOnCannotAdd = true}} = props;

	const {on, off} = useRootEventBus();
	const globalHandlers = useGlobalHandlers();
	const [disabled, setDisabled] = useState(false);
	useEffect(() => {
		if (disableOnCannotAdd === false || couldAddElement == null) {
			return;
		}

		const {$array, absolutePathOfArray} = PPUtils.isLevelStayed($pp)
			? {$array: $wrapped.$model, absolutePathOfArray: $wrapped.$p2r}
			: {
				$array: MUtils.getValue($wrapped.$model, $pp),
				absolutePathOfArray: PPUtils.absolute($wrapped.$p2r, $pp)
			};
		const computeEnablement = async () => {
			const could = await couldAddElement({
				root: $wrapped.$root, model: $array as ArrayPropValue
			}, {global: globalHandlers});
			setDisabled(!could);
		};
		// noinspection JSIgnoredPromiseFromCall
		computeEnablement();

		// monitor value change
		const onValueChanged = async (absolutePath: PropertyPath) => {
			if (!PPUtils.matches(absolutePathOfArray, absolutePath)) {
				return;
			}
			await computeEnablement();
		};

		on && on(RootEventTypes.VALUE_CHANGED, onValueChanged);
		return () => {
			off && off(RootEventTypes.VALUE_CHANGED, onValueChanged);
		};
	}, [
		globalHandlers, on, off,
		couldAddElement, disableOnCannotAdd,
		$pp, $wrapped.$p2r, $wrapped.$root, $wrapped.$model
	]);

	return [disabled, setDisabled];
};