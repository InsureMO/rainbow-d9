import {VUtils} from '@rainbow-d9/n1';
import {UnwrappedSection} from '@rainbow-d9/n2';
import Markdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import {MarkdownTitle} from './index';

export const MarkdownContainer = (props: {
	contents: string | object | Array<{ title: string, content: string | object }>
}) => {
	const {contents} = props;

	let markdowns = [{title: '', markdown: ''}];
	if (typeof contents === 'string') {
		markdowns = [{title: '', markdown: contents}];
	} else if (Array.isArray(contents)) {
		markdowns = contents.map(({title, content}) => {
			return {
				title,
				markdown: typeof content === 'string' ? content : '```json\n' + JSON.stringify(content, null, 4) + '\n```'
			};
		});
	} else {
		markdowns = [{title: '', markdown: '```json\n' + JSON.stringify(contents, null, 4) + '\n```'}];
	}

	return <>
		{markdowns.map(({title, markdown}) => {
			// @ts-ignore
			return <UnwrappedSection title={VUtils.isNotBlank(title) ? <MarkdownTitle>{title}</MarkdownTitle> : null}
			                         collapsible={true}
			                         key={VUtils.generateUniqueId()}>
				<Markdown className="markdown-body" remarkPlugins={[remarkGfm]} components={{
					code(props) {
						const {children, className, node, ...rest} = props;
						const match = /language-(\w+)/.exec(className || '');
						return match
							// @ts-ignore
							? <SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, '')}
								language={match[1]}
								style={materialDark}
							/>
							: <code {...rest} className={className}>
								{children}
							</code>;
					}
				}}>
					{markdown}
				</Markdown>
			</UnwrappedSection>;
		})}
	</>;
};