import {useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';
import {ViewerKernel} from './kernel';
import {MockJsonDialog} from './mock-json-dialog';
import {ParseError, ViewerWrapper} from './widgets';

export const Viewer = (props: ViewerProps) => {
	const {minViewerWidth, mockData} = props;

	const {on, off} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const [content, setContent] = useState('');
	useEffect(() => {
		const onContentChanged = (content?: string) => {
			replace(() => setContent(content ?? ''), 500);
		};
		on(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
		return () => {
			off(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
		};
	}, [on, off, replace]);

	if (VUtils.isBlank(content)) {
		return <ViewerWrapper minViewerWidth={minViewerWidth}>
			<MockJsonDialog mockData={mockData}/>
			<ParseError>No configuration.</ParseError>
		</ViewerWrapper>;
	}

	return <>
		<MockJsonDialog mockData={mockData}/>
		<ViewerKernel {...props} content={content}/>
	</>;
};
