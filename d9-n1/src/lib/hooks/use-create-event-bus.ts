import EventEmitter from 'events';
import {useState} from 'react';
import {N1Logger} from '../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventParam = any;

export const useCreateEventBus = <T>(name: string) => {
	const [bus] = useState<T>(() => {
		const emitter = new EventEmitter().setMaxListeners(999999);
		return {
			fire: (type: string, ...data: Array<EventParam>) => {
				N1Logger.debug(`Event[${type}] fired on bus[${name}].`, ...data, 'CreateEventBusHook');
				emitter.emit(type, ...data);
			},
			once: (type: string, listener: (...data: Array<EventParam>) => void) => emitter.once(type, listener),
			on: (type: string, listener: (...data: Array<EventParam>) => void) => {
				if (emitter.rawListeners(type).includes(listener)) {
					N1Logger.error(`Listener on [${type}] was added into ${name} bus, check it.`, 'CreateEventBusHook');
				}
				emitter.on(type, listener);
			},
			off: (type: string, listener: (...data: Array<EventParam>) => void) => emitter.off(type, listener)
		} as T;
	});

	return bus;
};
