import {GlobalHandlers} from '@rainbow-d9/n2';

class Client {
	constructor(private globalHandlers: GlobalHandlers) {
	}

	public use<R>(ask: () => Promise<R>) {
		return {
			ask: async (defaultReturn?: () => R): Promise<R> => {
				if (defaultReturn == null) {
					return await this.globalHandlers.remoteRequest.request(ask);
				} else {
					const result = await this.globalHandlers.remoteRequest.neverFailRequest(ask);
					if (result.failed) {
						console.error(result.error);
						return defaultReturn();
					} else {
						return result.result!;
					}
				}
			}
		};
	}
}

export class DataClient {
	public static with(globalHandlers: GlobalHandlers) {
		return new Client(globalHandlers);
	}
}

export const DC = DataClient;
