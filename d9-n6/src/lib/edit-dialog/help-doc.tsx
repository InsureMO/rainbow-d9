import React, {ReactNode} from 'react';
import Markdown from 'react-markdown';
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
export const CodeRenderer = (props: { children?: ReactNode }) => {
	const {children} = props;

	if (children === '@rainbow-o23') {
		return <code><a href="https://github.com/InsureMO/rainbow-o23" target="_blank" rel="noreferrer">
			{props.children}
		</a></code>;
	} else {
		return <code>{children}</code>;
	}
};

const components = {a: LinkRenderer, code: CodeRenderer};

export const HelpDoc = (props: HelpDocProps) => {
	const {content} = props;

	return <Markdown className="markdown-body" components={components} remarkPlugins={[remarkGfm]}>
		{content}
	</Markdown>;
};