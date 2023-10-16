import {createLogger} from '@rainbow-d9/n1';

export const toCssSize = (size?: number | string): string => typeof size === 'number' ? `${size}px` : `${size ?? ''}`;

export const N2Logger = createLogger();
