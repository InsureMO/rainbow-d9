import {D9Playground} from '@rainbow-d9/n5';

export const N2Playground = () => {
	// const model: any = {};
	let markdown: string | undefined = '# Page::Test Page\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';

	const onMarkdownChanged = async (md?: string) => {
		markdown = md;
	};

	return <D9Playground content={markdown} onContentChanged={onMarkdownChanged}/>;
};
