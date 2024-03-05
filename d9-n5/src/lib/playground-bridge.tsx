import React, {Fragment, useEffect} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {OnContentChanged} from './types';

export interface PlaygroundBridgeProps {
	onContentChanged: OnContentChanged;
}

export const PlaygroundBridge = (props: PlaygroundBridgeProps) => {
	const {onContentChanged} = props;

	const {on, off} = usePlaygroundEventBus();
	useEffect(() => {
		const onChanged = (content?: string) => {
			(async () => await onContentChanged(content))();
		};
		on(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
		return () => {
			off(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
		};
	}, [on, off, onContentChanged]);

	return <Fragment/>;
};
