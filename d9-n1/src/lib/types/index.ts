import {ReactNode} from 'react';
import {NodeDef} from './def-props-types';
import {ModelHolder} from './model-types';

export * from './widget-props-types';
export * from './model-types';
export * from './def-props-types';
export * from './device-type';

/** string has no dot */
export type ExternalDefKey = string;
/** string might have dot */
export type ExternalDefKeys = string | ExternalDefKey;

export interface ExternalDefs {
	onDetermined?: (options: ExternalDefsHandlerOptions) => void;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: ExternalDefKeys]: ExternalDefs | any;
}

export type StandaloneRootProps =
	NodeDef
	& Omit<ModelHolder, '$p2r' | '$model'>
	& { externalDefs?: ExternalDefs }
	& { leading?: ReactNode; children?: ReactNode; tailing?: ReactNode; };

export type ExternalDefsHandlerOptions =
	Omit<StandaloneRootProps, '$key' | '$root' | '$pp' | '$validationScopes' | 'externalFunctions' | 'leading' | 'children' | 'tailing'>;
