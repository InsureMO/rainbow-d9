import React, {Fragment} from 'react';
import {RootEventBus, useRootEventBus} from './events';
import {ExternalDefKeys, ExternalDefs, ExternalDefsHandlerOptions} from './types';
import {MUtils, VUtils} from './utils';

export class ExternalDefIndicator {
	private readonly _keys: ExternalDefKeys;
	constructor(keys: ExternalDefKeys) {
		this._keys = keys;
	}
	get keys(): ExternalDefKeys {
		return this._keys;
	}
}

export class ExternalDefCreator {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly _create: (reb: RootEventBus) => any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(create: (reb: RootEventBus) => any) {
		this._create = create;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get create(): ((reb: RootEventBus) => any) {
		return this._create;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleExternalDefs = (options: any, reb: RootEventBus, externalDefs: ExternalDefs): any => {
	if (options == null || VUtils.isPrimitive(options) || typeof options === 'function') {
		// do nothing
		return options;
	}
	if (options instanceof ExternalDefIndicator) {
		const key = (options.keys || '').trim();
		let func = externalDefs[key];
		if (func == null) {
			func = MUtils.getValue(externalDefs, key);
		}
		if (func == null) {
			return new ExternalDefMismatchIndicator(key);
		}
		if (func instanceof ExternalDefCreator) {
			return func.create(reb);
		} else {
			return func;
		}
	} else if (Array.isArray(options)) {
		// keep original array, handle every element
		options.forEach((element, index) => {
			const handled = handleExternalDefs(element, reb, externalDefs);
			if (handled !== element) {
				// changed, replace original element
				options[index] = handled;
			}
		});
		return options;
	} else {
		Object.keys(options).forEach(key => {
			const value = options[key];
			const handled = handleExternalDefs(value, reb, externalDefs);
			if (handled !== value) {
				// changed, replace original value
				options[key] = handled;
			}
		});
		return options;
	}
};

export class ExternalDefMismatchIndicator {
	private readonly _keys: ExternalDefKeys;
	constructor(keys: ExternalDefKeys) {
		this._keys = keys;
	}
	get keys(): ExternalDefKeys {
		return this._keys;
	}
}

const ExternalDefMismatchIndicators = new Proxy({}, {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(target: any, p: string): any {
		return new ExternalDefMismatchIndicator(p);
	}
});

export const ExternalDefsHandler = (props: {
	options: ExternalDefsHandlerOptions, externalDefs?: ExternalDefs
}) => {
	const {options, externalDefs} = props;

	const reb = useRootEventBus();
	if (externalDefs == null) {
		handleExternalDefs(options, reb, ExternalDefMismatchIndicators);
	} else {
		handleExternalDefs(options, reb, externalDefs);
		externalDefs.onDetermined && externalDefs.onDetermined(options);
	}

	return <Fragment />;
};
