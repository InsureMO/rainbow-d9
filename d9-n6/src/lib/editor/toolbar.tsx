import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import dom2image from 'dom-to-image';
import React, {useEffect, useRef, useState} from 'react';
import {FileDef, FileDefSerializer} from '../definition';
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
import {EditorToolbar, EditorToolbarButton} from './widgets';

export interface ToolbarProps {
	engine: DiagramEngine;
	def?: FileDef;
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
		engine, def, serializer,
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
	const zoomTo = (factor: number) => {
		engine.getModel().setZoomLevel(factor);
		engine.repaintCanvas();
	};
	const onZoomInClicked = () => {
		zoomTo(engine.getModel().getZoomLevel() + 5);
	};
	const onZoomOutClicked = () => {
		zoomTo(engine.getModel().getZoomLevel() - 5);
	};
	const onOriginSizeClicked = () => {
		zoomTo(100);
	};
	const onFitCanvasClicked = () => {
		engine.zoomToFit();
	};
	const onDownloadImageClicked = async () => {
		const node = ref.current.parentElement.querySelector('div.o23-playground-editor-content') as HTMLDivElement;
		node.style.overflow = 'visible';
		const svgNode = node.querySelector('svg');
		const transform = svgNode.style.transform;
		const divNode = node.querySelector('div');
		svgNode.style.transform = '';
		divNode.style.transform = '';
		// noinspection SpellCheckingInspection
		const dataUrl = await dom2image.toPng(node, {quality: 1, bgcolor: 'white'});
		svgNode.style.transform = transform;
		divNode.style.transform = transform;
		node.style.overflow = '';
		const link = document.createElement('a');
		link.download = `${def?.code || 'no-code'}-diagram.png`;
		link.href = dataUrl;
		link.click();
	};
	const onDownloadFileClicked = async () => {
		const link = document.createElement('a');
		link.download = `${def?.code || 'no-code'}-config.${serializer.extname()}`;
		link.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(serializer.stringify(def));
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
