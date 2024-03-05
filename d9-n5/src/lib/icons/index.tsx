import {Icons} from '@rainbow-d9/n2';
import React from 'react';
import {ContainerGroupIcon} from './container-group';
import {InputGroupIcon} from './input-group';
import {MaxIcon} from './max';
import {MinIcon} from './min';
import {WindowIcon} from './window';
import {ZenIcon} from './zen';

export enum PlaygroundIcons {
	CONTAINER_GROUP = 'playground.container-group',
	INPUT_GROUP = 'playground.input-group',
	MAXIMIZE = 'playground.max',
	MINIMIZE = 'playground.min',
	ZEN = 'playground.zen',
	WINDOW = 'playground.window'
}

Icons.Registrar.register({
	[PlaygroundIcons.CONTAINER_GROUP]: () => <ContainerGroupIcon/>,
	[PlaygroundIcons.INPUT_GROUP]: () => <InputGroupIcon/>,
	[PlaygroundIcons.MAXIMIZE]: () => <MaxIcon/>,
	[PlaygroundIcons.MINIMIZE]: () => <MinIcon/>,
	[PlaygroundIcons.ZEN]: () => <ZenIcon/>,
	[PlaygroundIcons.WINDOW]: () => <WindowIcon/>
});

export {
	ContainerGroupIcon, InputGroupIcon,

	MaxIcon, MinIcon, ZenIcon, WindowIcon
};