import {useEffect, useState} from 'react';
import {CodeEditorExtensionsCreate} from './types';

export const useDefaultExtensionsCreate = (
	defaultCreate: () => CodeEditorExtensionsCreate,
	given?: CodeEditorExtensionsCreate): CodeEditorExtensionsCreate => {
	const [create, setCreate] = useState<CodeEditorExtensionsCreate>(() => (given ?? defaultCreate()));
	useEffect(() => {
		if (given != null) {
			setCreate(given);
		}
	}, [given]);
	return create;
};
