import {Element} from 'hast';
import React, {ReactNode} from 'react';
import Markdown, {Components} from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import {MarkdownContent} from '../types';

export interface HelpDocProps {
	content: MarkdownContent;
}

export const LinkRenderer = (props: { href: string; children?: ReactNode }) => {
	return <a href={props.href} target="_blank" rel="noreferrer">
		{props.children}
	</a>;
};
export const CodeRenderer = (props: { children?: ReactNode, className?: string, node: Element }) => {
	const {children} = props;

	if (children === '@rainbow-o23') {
		return <code><a href="https://github.com/InsureMO/rainbow-o23" target="_blank" rel="noreferrer">
			{props.children}
		</a></code>;
	}
	const {
		className,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		node,
		...rest
	} = props;
	const match = /language-(\w+)/.exec(className || '');
	if (match) {
		return <SyntaxHighlighter
			{...rest}
			PreTag="div"
			children={String(children).replace(/\n$/, '')}
			language={match[1]}
			style={prism}/>;
	} else {
		return <code {...rest} className={className}>
			{children}
		</code>;
	}
};

const components: Partial<Components> = {h1: 'h2', a: LinkRenderer, code: CodeRenderer};

export const HelpDoc = (props: HelpDocProps) => {
	const {content} = props;

	return <Markdown className="markdown-body" components={components} remarkPlugins={[remarkGfm]}>
		{content}
	</Markdown>;
};