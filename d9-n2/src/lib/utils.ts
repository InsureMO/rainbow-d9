import {createLogger} from '@rainbow-d9/n1';
import {$D9Window} from './types';

const $d9: $D9Window = window as unknown as $D9Window;
$d9.i18n = {language: navigator.language || 'en-US'};
export {$d9};

export const toCssSize = (size?: number | string): string => typeof size === 'number' ? `${size}px` : `${size ?? ''}`;

export const N2Logger = createLogger();
