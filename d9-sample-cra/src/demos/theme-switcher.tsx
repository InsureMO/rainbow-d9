import {BridgeToRootEventTypes, useBridgeEventBus} from '@rainbow-d9/n1';
import {ButtonBarAlignment, UnwrappedButton, UnwrappedButtonBar} from '@rainbow-d9/n2';

export const ThemeSwitcher = () => {
	const {fire} = useBridgeEventBus();
	const onLightClicked = () => fire(BridgeToRootEventTypes.THEME_CHANGED, 'light');
	const onDarkClicked = () => fire(BridgeToRootEventTypes.THEME_CHANGED, 'dark');

	// @ts-ignore
	return <UnwrappedButtonBar alignment={ButtonBarAlignment.CENTER}>
		{/** @ts-ignore */}
		<UnwrappedButton onClick={onLightClicked}>Light</UnwrappedButton>
		{/** @ts-ignore */}
		<UnwrappedButton onClick={onDarkClicked}>Dark</UnwrappedButton>
	</UnwrappedButtonBar>;
};
