import {CSSProperties} from 'react';

export const LargestDialogStyles: CSSProperties = {
	marginTop: 'calc((100vh - var(--app-dialog-largest-height)) / 2 - 2vh)',
	marginLeft: 'calc((100vw - var(--app-dialog-largest-width)) / 2)',
	height: 'var(--app-dialog-largest-height)',
	width: 'var(--app-dialog-largest-width)',
	overflow: 'hidden'
};
