import {useEffect, useState} from 'react';

interface Queue {
	timeoutHandle?: number;
	execute?: (time: ExecuteTiming) => void;
}

export enum ExecuteTiming {
	TIMEOUT = 'timeout',
	UNMOUNT = 'unmount',
	FORCE = 'force'
}

export interface ThrottlerFunctions {
	/** replace existing function in queue */
	replace: (execute: (time: ExecuteTiming) => void, timeout: number) => void;
	/** clear queue, execute it when given parameter is true and queued function existed */
	clear: (execute: boolean) => void;
}

/**
 * never changed once constructed.
 */
export const useThrottler = () => {
	// queue will never be changed
	const [queue] = useState<Queue>({});
	const [functions] = useState<ThrottlerFunctions>(() => {
		return {
			replace: (execute: (time: ExecuteTiming) => void, timeout: number) => {
				if (queue.timeoutHandle) {
					window.clearTimeout(queue.timeoutHandle);
				}
				queue.execute = execute;
				queue.timeoutHandle = window.setTimeout(() => {
					delete queue.timeoutHandle;
					delete queue.execute;
					execute(ExecuteTiming.TIMEOUT);
				}, timeout);
			},
			clear: (execute: boolean) => {
				if (queue.timeoutHandle) {
					window.clearTimeout(queue.timeoutHandle);
				}
				const clearedExecute = queue.execute;
				delete queue.timeoutHandle;
				delete queue.execute;
				if (execute && clearedExecute) {
					clearedExecute(ExecuteTiming.FORCE);
				}
			}
		};
	});
	useEffect(() => {
		return () => {
			if (queue.timeoutHandle) {
				window.clearTimeout(queue.timeoutHandle);
			}
			if (queue.execute) {
				queue.execute(ExecuteTiming.UNMOUNT);
			}
		};
		// execute only once on unmount since queue is fixed in whole lifecycle
	}, [queue]);

	return functions;
};