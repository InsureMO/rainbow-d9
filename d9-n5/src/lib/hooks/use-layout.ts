import {MutableRefObject, useEffect, useState} from 'react';

export interface Layout {
	editorSize?: number;
}

export const useLayout = (initialized: boolean, ref: MutableRefObject<HTMLDivElement>) => {
	const [layout, setLayout] = useState<Layout>({});
	useEffect(() => {
		if (!initialized || ref.current == null) {
			return;
		}
		const editor = ref.current!.querySelector('div[data-w=d9-playground-editor]');
		const {width} = editor!.getBoundingClientRect();
		setLayout({editorSize: width});
	}, [initialized, ref]);

	return {...layout, resizeTo: (width: number) => setLayout({editorSize: width})};
};