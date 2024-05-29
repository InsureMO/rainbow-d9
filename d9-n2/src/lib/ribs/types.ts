import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	ArrayUsedDef,
	BaseModel,
	EnhancedPropsForArrayElement
} from '@rainbow-d9/n1';
import {CaptionDef} from '../caption';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export type RibsArrayDef = ArrayUsedDef;
/** Ribs configuration definition */
export type RibsDef =
	Omit<ArrayContainerDef, '$array'>
	& {
	$array?: RibsArrayDef;
	marker?: string;
	caption?: CaptionDef;
	useSectionStyleIcons?: boolean;
	showRowIndex?: boolean;
	initExpanded?: <R extends BaseModel>(row: R, index: number) => boolean
} & OmitHTMLProps<HTMLDivElement>
/** Ribs widget definition, with html attributes */
export type RibsProps = OmitNodeDef<RibsDef> & Omit<ArrayContainerWidgetProps, '$array'>;

export type ImmutableRibsArrayDef = Pick<RibsArrayDef, 'noElementReminder' | 'getElementKey'>;

export type ImmutableRibsProps =
	Omit<RibsProps, '$array'>
	& { $array?: ImmutableRibsArrayDef };

export type ImmutableRibRowProps =
	Omit<RibsProps, '$array'>
	& { $array?: Omit<EnhancedPropsForArrayElement, keyof RibsArrayDef> & ImmutableRibsArrayDef };
