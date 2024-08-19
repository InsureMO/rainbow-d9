import dom2image from 'dom-to-image';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {DEFAULTS} from '../constants';
import {FileDefSerializer} from '../definition';
import {
	DownloadFile,
	DownloadImage,
	FitCanvas,
	Max,
	Min,
	OriginSize,
	UploadFile,
	Window,
	Zen,
	ZoomIn,
	ZoomOut
} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {cloneDiagramNodes} from './diagram-utils';
import {EditorKernelRefState} from './painter';
import {EditorToolbar, EditorToolbarButton} from './widgets';

export interface ToolbarProps {
	stateRef: MutableRefObject<EditorKernelRefState>;
	serializer: FileDefSerializer;
	allowUploadFile: boolean;
	allowDownloadFile: boolean;
	allowDownloadImage: boolean;
}

export interface ToolbarState {
	max: boolean;
	zen: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
	const {
		stateRef, serializer,
		allowUploadFile, allowDownloadFile, allowDownloadImage
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<ToolbarState>({max: false, zen: false});
	useEffect(() => {
		const onFullScreenChanged = () => {
			if (document.fullscreenElement == null) {
				setState({zen: false, max: false});
			}
		};
		window.addEventListener('fullscreenchange', onFullScreenChanged);
		return () => {
			window.removeEventListener('fullscreenchange', onFullScreenChanged);
		};
	}, []);
	useEffect(() => {
		const wrapper = ref.current.parentElement.parentElement as HTMLDivElement;
		switch (true) {
			case state.zen:
				wrapper.setAttribute('data-diagram-work-mode', 'zen');
				document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({navigationUI: 'hide'});
				break;
			case state.max:
				wrapper.setAttribute('data-diagram-work-mode', 'max');
				break;
			case !state.max:
				wrapper.removeAttribute('data-diagram-work-mode');
				if (document.fullscreenElement != null) {
					document.exitFullscreen && document.exitFullscreen();
				}
				break;
		}
	}, [state.max, state.zen]);
	const onZoomInClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, (stateRef.current.canvasZoom ?? 1) + 0.05);
	};
	const onZoomOutClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, Math.max(stateRef.current.canvasZoom ?? 1, 0.1) - 0.05);
	};
	const onOriginSizeClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, 1);
	};
	const onFitCanvasClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO_FIT);
	};
	const onDownloadImageClicked = async () => {
		const backendModel = stateRef.current.engineBackend.getModel();
		stateRef.current.engineBackend.setModel(cloneDiagramNodes(stateRef.current.engine!.getModel()));
		await stateRef.current.engineBackend.repaintCanvas(true);
		const node = ref.current.parentElement.querySelector('div.o23-playground-editor-content-backend') as HTMLDivElement;
		const {width, height} = Array.from(node.lastElementChild.children).reduce(({width, height}, child) => {
			const {width: childWidth, height: childHeight} = child.getBoundingClientRect();
			return {
				width: Math.max(width, childWidth + parseInt((child as HTMLDivElement).style.left)),
				height: Math.max(height, childHeight + parseInt((child as HTMLDivElement).style.top))
			};
		}, {width: 0, height: 0});
		node.style.width = `${width + DEFAULTS.diagram.startLeft}px`;
		node.style.height = `${height + DEFAULTS.diagram.startTop}px`;
		// node.style.overflow = 'visible';
		// const svgNode = node.querySelector('svg');
		// const transform = svgNode.style.transform;
		// const divNode = node.querySelector('div');
		// svgNode.style.transform = '';
		// divNode.style.transform = '';
		// noinspection SpellCheckingInspection
		const dataUrl = await dom2image.toPng(node, {quality: 1, bgcolor: 'white'});
		// svgNode.style.transform = transform;
		// divNode.style.transform = transform;
		// node.style.overflow = '';
		const link = document.createElement('a');
		link.download = `${stateRef.current.def?.code || 'no-code'}-diagram.png`;
		link.href = dataUrl;
		link.click();
		node.style.width = '';
		node.style.height = '';
		stateRef.current.engineBackend.setModel(backendModel);
	};
	const onDownloadFileClicked = async () => {
		const link = document.createElement('a');
		link.download = `${stateRef.current.def?.code || 'no-code'}-config.${serializer.extname()}`;
		link.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(serializer.stringify(stateRef.current.def));
		link.click();
	};
	const onUploadFileClicked = async () => {
		const file = document.createElement('input');
		file.setAttribute('type', 'file');
		file.setAttribute('accept', '.yml,.yaml');
		file.setAttribute('multiple', 'false');
		file.addEventListener('change', () => {
			if (file.files.length == 1) {
				const reader = new FileReader();
				reader.onload = () => {
					const content = reader.result as string;
					fire(PlaygroundEventTypes.RESET_CONTENT, content);
				};
				reader.readAsText(file.files[0]);
			}
		});
		file.click();
	};
	const onMaxClicked = () => setState(state => ({...state, max: true}));
	const onMinClicked = () => setState(state => ({...state, max: false}));
	const onZenClicked = () => setState({zen: true, max: true});
	const onWindowClicked = () => {
		document.exitFullscreen && document.exitFullscreen();
		setState({zen: false, max: false});
	};

	return <EditorToolbar ref={ref}>
		<EditorToolbarButton onClick={onZoomInClicked}><ZoomIn/></EditorToolbarButton>
		<EditorToolbarButton onClick={onZoomOutClicked}><ZoomOut/></EditorToolbarButton>
		<EditorToolbarButton onClick={onOriginSizeClicked}><OriginSize/></EditorToolbarButton>
		<EditorToolbarButton onClick={onFitCanvasClicked}><FitCanvas/></EditorToolbarButton>
		{allowDownloadImage
			? <EditorToolbarButton onClick={onDownloadImageClicked}><DownloadImage/></EditorToolbarButton> : null}
		{allowDownloadFile
			? <EditorToolbarButton onClick={onDownloadFileClicked}><DownloadFile/></EditorToolbarButton> : null}
		{allowUploadFile
			? <EditorToolbarButton onClick={onUploadFileClicked}><UploadFile/></EditorToolbarButton> : null}
		{state.max ? null : <EditorToolbarButton onClick={onMaxClicked}><Max/></EditorToolbarButton>}
		{(state.max && !state.zen) ? <EditorToolbarButton onClick={onMinClicked}><Min/></EditorToolbarButton> : null}
		{state.zen ? null : <EditorToolbarButton onClick={onZenClicked}><Zen/></EditorToolbarButton>}
		{state.zen ? <EditorToolbarButton onClick={onWindowClicked}><Window/></EditorToolbarButton> : null}
	</EditorToolbar>;
};
