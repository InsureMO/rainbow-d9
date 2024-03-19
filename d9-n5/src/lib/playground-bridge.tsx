import React, {Fragment, useEffect} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';
import {OnContentChanged} from './types';

export interface PlaygroundBridgeProps {
	content?: string;
	onContentChanged: OnContentChanged;
}

export const PlaygroundBridge = (props: PlaygroundBridgeProps) => {
	const {content, onContentChanged} = props;

	const {on, off} = usePlaygroundEventBus();
	useEffect(() => {
		const onChanged = (changed?: string) => {
			if ((content ?? '') === (changed ?? '')) {
				return;
			}
			console.log('changed');
			(async () => await onContentChanged(changed))();
		};
		on(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
		return () => {
			off(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
		};
	}, [on, off, content, onContentChanged]);

	return <Fragment/>;
};
