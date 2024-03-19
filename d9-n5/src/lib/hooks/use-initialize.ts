import {BaseModel, ExternalDefs} from '@rainbow-d9/n1';
import {useEffect, useRef, useState} from 'react';
import {ExternalDefsTypes, PlaygroundDef} from '../types';

export interface InitializeState {
	initialized: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ask = <T = any>(given: T | (() => Promise<T>), defaultValue?: T) => async (): Promise<T | undefined> => {
	let ret: T;
	if (typeof given === 'function') {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		ret = await given();
	} else {
		ret = given;
	}
	return ret ?? defaultValue;
};

export const useInitialize = (options: Pick<PlaygroundDef, 'mockData' | 'externalDefs' | 'externalDefsTypes'>) => {
	const {
		mockData,
		externalDefs, externalDefsTypes
	} = options;

	const mockDataRef = useRef<BaseModel>({});
	const externalDefRef = useRef<ExternalDefs>(null);
	const externalDefsTypesRef = useRef<ExternalDefsTypes>(null);
	const [state, setState] = useState<InitializeState>({
		initialized: false
	});
	useEffect(() => {
		(async () => {
			const [mock, defs, types] = await Promise.all([
				ask(mockData, {})(), ask(externalDefs)(), ask(externalDefsTypes)()
			]);
			mockDataRef.current = mock;
			externalDefRef.current = defs;
			externalDefsTypesRef.current = types;
			setState(state => ({...state, initialized: true}));
		})();
	}, [mockData, externalDefs, externalDefsTypes]);

	return {
		initialized: state.initialized,
		mockData: mockDataRef.current,
		externalDefs: externalDefRef.current,
		externalDefsTypes: externalDefsTypesRef.current
	};
};
