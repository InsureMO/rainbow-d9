import {BaseModel, PropValue, useWrapperEventBus, VUtils, WidgetProps, WrapperEventTypes} from '@rainbow-d9/n1';
import {ReactNode, useEffect, useState} from 'react';
import {useGlobalHandlers} from './global';
import {GlobalEventHandlers, ModelCarrier} from './types';

/**
 * property "key" is optional, it is required when "value" is object or something else which cannot use as identity.
 */
export interface OptionItem<V> {
	value: V;
	label: ReactNode;
	stringify?: (option: OptionItem<V>) => string;
}

export type OptionItems<V> = Array<OptionItem<V>>;

export enum OptionItemSort {
	ASC, DESC
}

export interface OptionItemsDef<V> {
	/**
	 * Function will be invoked when it is changed, be careful!
	 * Might lead endless rendering loop.
	 */
	options: OptionItems<V>
		| (<R extends BaseModel, M extends PropValue>(options: ModelCarrier<R, M> & GlobalEventHandlers) => Promise<OptionItems<V>>);
	optionSort?: OptionItemSort;
	noAvailable?: ReactNode;
	noMatched?: ReactNode;
}

export interface OptionItemsProps<V> extends OptionItemsDef<V> {
	$wrapped: Omit<WidgetProps['$wrapped'], '$onValueChange'>;
	/** max item width */
	maxWidth?: number;
}

export const NO_OPTION_ITEM = [];
export const NO_MATCHED_OPTION_ITEM = '__no_matched__';
export const NO_AVAILABLE_OPTION_ITEM = '__no_available__';

/**
 * return this to refresh dropdown options, only works on options is a promise function.
 */
export const REACTION_REFRESH_OPTIONS = 'reaction-refresh-options';

export interface OptionItemCandidates<V> {
	initialized: boolean;
	options: OptionItems<V>;
}

export const useOptionItems = <V>(props: OptionItemsProps<V>) => {
	const {
		options = NO_OPTION_ITEM, noAvailable,
		$wrapped: {$root, $model}
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {on, off} = useWrapperEventBus();
	const [candidates, setCandidates] = useState<OptionItemCandidates<V>>((): OptionItemCandidates<V> => {
		return {initialized: false, options: NO_OPTION_ITEM};
	});
	useEffect(() => {
		if (!candidates.initialized) {
			if (VUtils.isFunction(options)) {
				(async () => {
					setCandidates({
						initialized: true,
						options: await options({root: $root, model: $model, global: globalHandlers})
					});
				})();
			} else {
				setCandidates({initialized: true, options: options ?? NO_OPTION_ITEM});
			}
		} else if (!VUtils.isFunction(options) && options !== candidates.options) {
			setCandidates({initialized: true, options});
		}
	}, [globalHandlers, candidates.initialized, candidates.options, options, $root, $model]);
	useEffect(() => {
		if (on != null && off != null) {
			// only works when it is wrapped by n1
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
			const onUnhandledReactionOccurred = (command: any) => {
				if (command !== REACTION_REFRESH_OPTIONS) {
					return;
				}
				setCandidates(candidates => ({initialized: false, options: candidates.options}));
			};
			on(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			return () => {
				off(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
			};
		}
	}, [on, off]);

	const askOptions = (): OptionItems<V> => {
		return candidates.initialized ? candidates.options : (VUtils.isFunction(options) ? NO_OPTION_ITEM : (options ?? NO_OPTION_ITEM));
	};
	const createAskDisplayOptions = (shouldTakeOver?: () => boolean, takeOver?: (options: OptionItems<V>) => OptionItems<V>): (() => OptionItems<V>) => {
		return () => {
			const options = askOptions();
			if (options.length === 0) {
				return [{value: NO_AVAILABLE_OPTION_ITEM, label: noAvailable}] as OptionItems<V>;
			}
			if (shouldTakeOver != null && shouldTakeOver()) {
				return takeOver != null ? takeOver(options) : options;
			} else {
				return options;
			}
		};
	};

	return {askOptions, createAskDisplayOptions};
};
