import {PropValue, useThrottler, VUtils} from '@rainbow-d9/n1';
import {CssVars, UnwrappedDecorateInput, UnwrappedDropdown, UnwrappedTextarea} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {ApiNamedFile} from '../../definition';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementEditorProps
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {VerticalLinesEditor} from '../vertical-lines-editor';
import {PipelineFileDefModel} from './types';

export const FilesOptions = [
	{value: 'all', label: Labels.AllFiles},
	{value: 'ignored', label: Labels.NoFile},
	{value: 'specified', label: Labels.Specified}
];

export const FilesEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLTextAreaElement>(null);
	const {replace} = useThrottler();

	const writeToModel = () => {
		replace(() => {
			if (model.temporary?.files?.parse !== true) {
				// no file
				delete model.files;
				return;
			}
			if (model.temporary?.files?.list === false) {
				// any file
				model.files = true;
				return;
			}
			const specified = model.temporary?.files?.files ?? '';
			let files: Array<[string] | [string, number]> = specified.split('\n')
				.map(line => line.trim())
				.filter(line => VUtils.isNotBlank(line))
				.map(line => {
					const index = line.lastIndexOf(':');
					if (index === -1) {
						return [line.trim()];
					}
					const [name, count] = [line.substring(0, index).trim(), line.substring(index + 1).trim()];
					const tested = VUtils.isNumber(count);
					if (tested.test) {
						return [name, Math.trunc(tested.value)];
					} else {
						return [name];
					}
				});
			if (files.length === 0) {
				// no file specified, treated as any file
				model.files = true;
				return;
			} else if (files.length !== 1) {
				// multiple names, each file name must be specified
				files = files.filter(([name]) => VUtils.isNotBlank(name));
			}

			let size: string | number = VUtils.isNotBlank(model.temporary?.files?.maxSize) ? model.temporary.files.maxSize.trim() : (void 0);
			if (size != null && !VUtils.isNumber(size).test) {
				let unit = '';
				if (['k', 'K', 'm', 'M'].includes(size[size.length - 1])) {
					size = size.substring(0, size.length - 1);
					unit = size[size.length - 1];
				}
				const tested = VUtils.isNumber(size);
				if (!tested.test || tested.value <= 0) {
					size = (void 0);
				} else if (unit !== '') {
					size = `${size}${unit}`;
				} else {
					size = tested.value < 1 ? (void 0) : Math.trunc(tested.value);
				}
			}
			const mimeType = VUtils.isNotBlank(model.temporary?.files?.mimeType) ? model.temporary.files.maxSize.trim() : (void 0);
			if (size != null || mimeType != null) {
				// with max size or mime type restrictions
				if (files.length === 1) {
					// single name or no name
					if (VUtils.isBlank(files[0][0])) {
						// no name specified
						model.files = {maxSize: size, mimeType};
					} else if (files[0][1] <= 0 || files[0][1] == null) {
						// files with single name, and no max count limit
						model.files = {maxSize: size, mimeType, name: files[0][0], multiple: true};
					} else if (files[0][1] === 1) {
						// single named file
						model.files = {maxSize: size, mimeType, name: files[0][0], multiple: false};
					} else {
						// files with single name, and max count limit
						model.files = {
							maxSize: size,
							mimeType,
							names: [{name: files[0][0], maxCount: files[0][1]}]
						};
					}
				} else {
					// no restrictions, multiple names
					// each name must be specified
					model.files = {
						maxSize: size, mimeType, names: files.map<ApiNamedFile>(([name, count]) => {
							return count == null || count <= 0 ? name : {name, maxCount: count};
						})
					};
				}
			} else if (files.length === 1) {
				// no restrictions, single name or no name
				if (VUtils.isBlank(files[0][0])) {
					// no name specified, no matter what the max count specified, treated as any file
					model.files = true;
				} else if (files[0][1] <= 0 || files[0][1] == null) {
					// files with single name, and no max count limit
					model.files = {name: files[0][0], multiple: true};
				} else if (files[0][1] === 1) {
					// single named file
					model.files = files[0][0];
				} else {
					// files with single name, and max count limit
					model.files = [{name: files[0][0], maxCount: files[0][1]}];
				}
			} else {
				// no restrictions, multiple names
				// each name must be specified
				model.files = files.map<ApiNamedFile>(([name, count]) => {
					return count == null || count <= 0 ? name : {name, maxCount: count};
				});
			}
		}, 100);
	};
	const onTypeChanged = (value: PropValue) => {
		switch (value) {
			case 'all':
				model.temporary = {
					...(model.temporary ?? {}),
					files: {...(model.temporary?.files ?? {}), parse: true, list: false}
				};
				break;
			case 'specified':
				model.temporary = {
					...(model.temporary ?? {}),
					files: {...(model.temporary?.files ?? {}), parse: true, list: true}
				};
				break;
			case 'ignored':
			default:
				model.temporary = {
					...(model.temporary ?? {}),
					files: {...(model.temporary?.files ?? {}), parse: false, list: false}
				};
				break;
		}
		writeToModel();
		if (value === 'specified') {
			setTimeout(() => inputRef.current?.focus(), 50);
		}
		onValueChanged();
	};
	const onFilesChanged = (value: PropValue) => {
		model.temporary = {
			...(model.temporary ?? {}),
			files: {...(model.temporary?.files ?? {}), files: value as string}
		};
		writeToModel();
		onValueChanged();
	};
	const onMaxSizeChanged = (value: PropValue) => {
		model.temporary = {
			...(model.temporary ?? {}),
			files: {...(model.temporary?.files ?? {}), maxSize: value as string}
		};
		writeToModel();
		onValueChanged();
	};
	const onMimeTypeChanged = (value: PropValue) => {
		model.temporary = {
			...(model.temporary ?? {}),
			files: {...(model.temporary?.files ?? {}), mimeType: value as string}
		};
		writeToModel();
		onValueChanged();
	};
	const type = model.temporary?.files?.parse !== true
		? 'ignored'
		: model.temporary?.files?.list !== true ? 'all' : 'specified';
	const rows = Math.max((model.temporary?.files?.files ?? '').split('\n').length, 3);

	return <VerticalLinesEditor>
		<UnwrappedDropdown value={type} onValueChange={onTypeChanged} options={FilesOptions}
		                   clearable={false}
		                   style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>
		<UnwrappedTextarea value={model.temporary?.files?.files ?? ''} onValueChange={onFilesChanged}
		                   disabled={type !== 'specified'} ref={inputRef}
		                   style={{
			                   minHeight: CssVars.INPUT_HEIGHT,
			                   height: `calc(${rows} * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`,
			                   maxHeight: `calc(10 * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`
		                   }}/>
		<UnwrappedDecorateInput leads={[Labels.FileMaxSize]} value={model.temporary?.files.maxSize ?? ''}
		                        onValueChange={onMaxSizeChanged}
		                        disabled={type !== 'specified'} data-di-prefix-text={true}/>
		<UnwrappedDecorateInput leads={[Labels.FileMimeType]} value={model.temporary?.files.mimeType ?? ''}
		                        onValueChange={onMimeTypeChanged}
		                        disabled={type !== 'specified'} data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};

export const elementFiles: ConfigurableElement = {
	code: 'files', label: 'Files', anchor: 'files',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.files != null && model.files !== false) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	},
	editor: FilesEditor,
	helpDoc: HelpDocs.pipelineFiles
};
