import {useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {ViewerProps} from '../types';
import {ViewerKernel} from './kernel';
import {MockJsonDialog} from './mock-json-dialog';
import {ParseError, ViewerWrapper} from './widgets';

export * from './widgets';
export * from './kernel';

export const Viewer = (props: ViewerProps) => {
	const {minViewerWidth, mockData, decorator} = props;

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
			<MockJsonDialog mockData={mockData} decorator={decorator}/>
			<ParseError>{Labels.NoContentGiven}</ParseError>
		</ViewerWrapper>;
	}

	return <>
		<MockJsonDialog mockData={mockData} decorator={decorator}/>
		<ViewerKernel {...props} content={content}/>
	</>;
};
