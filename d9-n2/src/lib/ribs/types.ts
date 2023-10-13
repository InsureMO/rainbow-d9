import {ArrayContainerDef, ArrayContainerWidgetProps, ArrayUsedDef, EnhancedPropsForArrayElement} from '@d9/n1';
import {CaptionDef} from '../caption';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export type RibsArrayDef = ArrayUsedDef;
/** Ribs configuration definition */
export type RibsDef =
	Omit<ArrayContainerDef, '$array'>
	& { $array?: RibsArrayDef; caption?: CaptionDef }
	& OmitHTMLProps<HTMLDivElement>
/** Ribs widget definition, with html attributes */
export type RibsProps = OmitNodeDef<RibsDef> & ArrayContainerWidgetProps;

export type ImmutableRibsArrayDef = Pick<RibsArrayDef, 'noElementReminder' | 'getElementKey'>;

export type ImmutableRibsProps =
	Omit<RibsProps, '$array'>
	& { $array?: ImmutableRibsArrayDef };

export type ImmutableRibRowProps =
	Omit<RibsProps, '$array'>
	& { $array?: Omit<EnhancedPropsForArrayElement, keyof RibsArrayDef> & ImmutableRibsArrayDef };
