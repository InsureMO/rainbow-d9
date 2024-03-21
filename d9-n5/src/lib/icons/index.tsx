import {Icons} from '@rainbow-d9/n2';
import React from 'react';
import {BoxIcon} from './box';
import {ButtonIcon} from './button';
import {ButtonBarIcon} from './button-bar';
import {CaptionIcon} from './caption';
import {ChartAutonomousIcon} from './chart-autonomous';
import {ChartBarIcon} from './chart-bar';
import {ChartLineIcon} from './chart-line';
import {ChartPieIcon} from './chart-pie';
import {ChartReliantIcon} from './chart-reliant';
import {CheckboxIcon} from './checkbox';
import {ChecksIcon} from './checks';
import {ContainerGroupIcon} from './container-group';
import {DateIcon} from './date';
import {DateTimeIcon} from './datetime';
import {DecoInputIcon} from './deco-input';
import {DecoNumberIcon} from './deco-number';
import {DecoPasswordIcon} from './deco-password';
import {DisplayGroupIcon} from './display-group';
import {DropdownIcon} from './dropdown';
import {HideEditorBadgeIcon} from './hide-editor-badge';
import {InputIcon} from './input';
import {InputGroupIcon} from './input-group';
import {LabelIcon} from './label';
import {LinkIcon} from './link';
import {MaxIcon} from './max';
import {MinIcon} from './min';
import {MultiDropdownIcon} from './multi-dropdown';
import {NumberInputIcon} from './number-input';
import {OptionsGroupIcon} from './options-group';
import {PasswordIcon} from './password';
import {RadioIcon} from './radio';
import {RadiosIcon} from './radios';
import {RibsIcon} from './ribs';
import {SectionIcon} from './section';
import {ShowEditorBadgeIcon} from './show-editor-badge';
import {TableIcon} from './table';
import {TabsIcon} from './tabs';
import {TextAreaIcon} from './textarea';
import {TreeIcon} from './tree';
import {UploadIcon} from './upload';
import {WindowIcon} from './window';
import {WizardIcon} from './wizard';
import {ZenIcon} from './zen';

export enum PlaygroundIcons {
	CONTAINER_GROUP = 'playground.container-group',
	INPUT_GROUP = 'playground.input-group',
	OPTIONS_GROUP = 'playground.options-group',
	DISPLAY_GROUP = 'playground.display-group',
	SHOW_EDITOR_BADGE = 'playground.show-editor-badge',
	HIDE_EDITOR_BADGE = 'playground.hide-editor-badge',
	MAXIMIZE = 'playground.max',
	MINIMIZE = 'playground.min',
	ZEN = 'playground.zen',
	WINDOW = 'playground.window',

	SECTION = 'playground.section',
	BOX = 'playground.box',
	RIBS = 'playground.ribs',
	TABLE = 'playground.table',
	TREE = 'playground.tree',
	TABS = 'playground.tabs',
	WIZARD = 'playground.wizard',
	BUTTON_BAR = 'playground.button-bar',

	CAPTION = 'playground.caption',
	LABEL = 'playground.label',
	BUTTON = 'playground.button',
	LINK = 'playground.link',
	CHART_PIE = 'playground.chart-pie',
	CHART_BAR = 'playground.chart-bar',
	CHART_LINE = 'playground.chart-line',
	CHART_RELIANT = 'playground.chart-reliant',
	CHART_AUTONOMOUS = 'playground.chart-autonomous',

	INPUT = 'playground.input',
	NUMBER_INPUT = 'playground.number-input',
	PASSWORD = 'playground.password',
	DECO_INPUT = 'playground.deco-input',
	DECO_NUMBER = 'playground.deco-number',
	DECO_PASSWORD = 'playground.deco-pwd',
	TEXTAREA = 'playground.textarea',
	DROPDOWN = 'playground.dropdown',
	MULTI_DROPDOWN = 'playground.multi-dropdown',
	DATE = 'playground.date',
	DATETIME = 'playground.datetime',
	CHECKBOX = 'playground.checkbox',
	CHECKS = 'playground.checks',
	RADIO = 'playground.radio',
	RADIOS = 'playground.radios',
	UPLOAD = 'playground.upload'
}

Icons.Registrar.register({
	[PlaygroundIcons.CONTAINER_GROUP]: () => <ContainerGroupIcon/>,
	[PlaygroundIcons.INPUT_GROUP]: () => <InputGroupIcon/>,
	[PlaygroundIcons.OPTIONS_GROUP]: () => <OptionsGroupIcon/>,
	[PlaygroundIcons.DISPLAY_GROUP]: () => <DisplayGroupIcon/>,

	[PlaygroundIcons.SHOW_EDITOR_BADGE]: () => <ShowEditorBadgeIcon/>,
	[PlaygroundIcons.HIDE_EDITOR_BADGE]: () => <HideEditorBadgeIcon/>,
	[PlaygroundIcons.MAXIMIZE]: () => <MaxIcon/>,
	[PlaygroundIcons.MINIMIZE]: () => <MinIcon/>,
	[PlaygroundIcons.ZEN]: () => <ZenIcon/>,
	[PlaygroundIcons.WINDOW]: () => <WindowIcon/>,

	[PlaygroundIcons.SECTION]: () => <SectionIcon/>,
	[PlaygroundIcons.BOX]: () => <BoxIcon/>,
	[PlaygroundIcons.RIBS]: () => <RibsIcon/>,
	[PlaygroundIcons.TABLE]: () => <TableIcon/>,
	[PlaygroundIcons.TREE]: () => <TreeIcon/>,
	[PlaygroundIcons.TABS]: () => <TabsIcon/>,
	[PlaygroundIcons.WIZARD]: () => <WizardIcon/>,
	[PlaygroundIcons.BUTTON_BAR]: () => <ButtonBarIcon/>,

	[PlaygroundIcons.CAPTION]: () => <CaptionIcon/>,
	[PlaygroundIcons.LABEL]: () => <LabelIcon/>,
	[PlaygroundIcons.BUTTON]: () => <ButtonIcon/>,
	[PlaygroundIcons.LINK]: () => <LinkIcon/>,
	[PlaygroundIcons.CHART_PIE]: () => <ChartPieIcon/>,
	[PlaygroundIcons.CHART_BAR]: () => <ChartBarIcon/>,
	[PlaygroundIcons.CHART_LINE]: () => <ChartLineIcon/>,
	[PlaygroundIcons.CHART_RELIANT]: () => <ChartReliantIcon/>,
	[PlaygroundIcons.CHART_AUTONOMOUS]: () => <ChartAutonomousIcon/>,

	[PlaygroundIcons.INPUT]: () => <InputIcon/>,
	[PlaygroundIcons.NUMBER_INPUT]: () => <NumberInputIcon/>,
	[PlaygroundIcons.PASSWORD]: () => <PasswordIcon/>,
	[PlaygroundIcons.DECO_INPUT]: () => <DecoInputIcon/>,
	[PlaygroundIcons.DECO_NUMBER]: () => <DecoNumberIcon/>,
	[PlaygroundIcons.DECO_PASSWORD]: () => <DecoPasswordIcon/>,
	[PlaygroundIcons.TEXTAREA]: () => <TextAreaIcon/>,
	[PlaygroundIcons.DATE]: () => <DateIcon/>,
	[PlaygroundIcons.DATETIME]: () => <DateTimeIcon/>,
	[PlaygroundIcons.UPLOAD]: () => <UploadIcon/>,

	[PlaygroundIcons.DROPDOWN]: () => <DropdownIcon/>,
	[PlaygroundIcons.MULTI_DROPDOWN]: () => <MultiDropdownIcon/>,
	[PlaygroundIcons.CHECKBOX]: () => <CheckboxIcon/>,
	[PlaygroundIcons.CHECKS]: () => <ChecksIcon/>,
	[PlaygroundIcons.RADIO]: () => <RadioIcon/>,
	[PlaygroundIcons.RADIOS]: () => <RadiosIcon/>
});

export {
	ContainerGroupIcon, InputGroupIcon,

	ShowEditorBadgeIcon, HideEditorBadgeIcon,
	MaxIcon, MinIcon, ZenIcon, WindowIcon,

	SectionIcon, BoxIcon, RibsIcon, TabsIcon, TableIcon, TreeIcon, WizardIcon,

	InputIcon, NumberInputIcon, PasswordIcon, TextAreaIcon,
	DecoInputIcon, DecoNumberIcon, DecoPasswordIcon,
	DropdownIcon, MultiDropdownIcon, DateIcon, DateTimeIcon,
	CheckboxIcon, ChecksIcon, RadioIcon, RadiosIcon,

	ChartPieIcon, ChartBarIcon, ChartLineIcon, ChartReliantIcon, ChartAutonomousIcon
};