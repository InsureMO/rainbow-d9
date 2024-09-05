import {useForceUpdate, useThrottler} from '@rainbow-d9/n1';
import {MutableRefObject, useEffect} from 'react';
import {FileDefDeserializer, FileDefSerializer} from '../../definition';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../../playground-event-bus';
import {PlaygroundDecorator, PlaygroundModuleAssistant} from '../../types';
import {EditorKernelRefState, paint} from '../painter';

export interface UseForceRepaintOptions {
	content?: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
	stateRef: MutableRefObject<EditorKernelRefState>;
	assistant?: PlaygroundModuleAssistant;
	decorator?: PlaygroundDecorator;
}

export const useForceRepaint = (options: UseForceRepaintOptions) => {
	const {content, serializer, deserializer, stateRef, assistant, decorator} = options;

	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// in case of serializer/deserializer/content changed from outside
		if (serializer === stateRef.current.serializer
			&& deserializer === stateRef.current.deserializer
			&& content === stateRef.current.content) {
			return;
		}
		paint({
			serializer: () => serializer, deserializer: () => deserializer,
			assistant: () => assistant, decorator: () => decorator,
			content: () => content,
			stateRef, replace,
			onStateContentChanged: async () => {
				fire(PlaygroundEventTypes.REPAINT);
			},
			onContentChanged: (content?: string) => {
				fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
			}
		});
		forceUpdate();
	}, [fire, replace, forceUpdate, content, serializer, deserializer, stateRef, assistant, decorator]);
};