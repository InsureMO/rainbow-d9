import {useEffect, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';

export interface ViewMode {
	zen: boolean;
	maximized: boolean;
}

export const useViewMode = () => {
	const {on, off} = usePlaygroundEventBus();
	const [state, setState] = useState<ViewMode>({zen: false, maximized: false});

	useEffect(() => {
		const onMaximize = () => setState(state => ({...state, maximized: true}));
		const onQuitMaximize = () => setState(state => ({...state, maximized: false}));
		const onZen = () => {
			document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({navigationUI: 'hide'});
			setState({zen: true, maximized: true});
		};
		const onQuitZen = () => {
			document.exitFullscreen && document.exitFullscreen();
			setState({zen: false, maximized: false});
		};
		const onFullScreenChanged = () => {
			if (document.fullscreenElement == null) {
				setState({zen: false, maximized: false});
			}
		};
		window.addEventListener('fullscreenchange', onFullScreenChanged);
		on(PlaygroundEventTypes.MAXIMIZE, onMaximize);
		on(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
		on(PlaygroundEventTypes.ZEN, onZen);
		on(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
		return () => {
			window.removeEventListener('fullscreenchange', onFullScreenChanged);
			off(PlaygroundEventTypes.MAXIMIZE, onMaximize);
			off(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
			off(PlaygroundEventTypes.ZEN, onZen);
			off(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
		};
	}, [on, off]);

	return state;
};