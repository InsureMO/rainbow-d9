import {KeyboardEvent} from 'react';

export const onEnterPressed = (handle: (value?: string) => Promise<void>) => {
	return async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			await handle(event.currentTarget.value || (void 0));
		}
	};
};
