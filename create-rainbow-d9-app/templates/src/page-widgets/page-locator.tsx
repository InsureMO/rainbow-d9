import {VUtils} from '@rainbow-d9/n1';
import {GlobalEventPrefix, GlobalHandlers, internationalize, IntlLabel, UnwrappedBox} from '@rainbow-d9/n2';

const scrollBehavior: ScrollIntoViewOptions = {behavior: 'smooth', block: 'start'};
type PageLocationOption = {
	/** dom id of dom node, dom id format of absolute property path, remove the start / , dot changes to -, [index] changes to _index  */
	domId: string;
	/** a selector to narrow doc query selector, typically some attribute from dom node. follows css selector format */
	selector: string;
	/** order list, or something else */
	prefix: string;
	/** of main label */
	i18nKey: string;
	/** ext info, might be some number or code or name, etc. */
	extLabel?: string;
	/** if dom node is in some section, rib row, set expands to expand them before locate */
	expands: Array<[GlobalEventPrefix.EXPAND_RIBS_ELEMENT | GlobalEventPrefix.EXPAND_SECTION, string]>;
	hasFixedTitle?: boolean;
	globalHandlers: GlobalHandlers;
	onLocated?: () => Promise<void>
}
export const createPageLocationOption = (options: PageLocationOption) => {
	const {
		domId,
		selector,
		prefix,
		i18nKey,
		extLabel,
		expands,
		globalHandlers,
		hasFixedTitle = false,
		onLocated
	} = options;
	return {
		value: `${domId}:${selector}`,
		label: <UnwrappedBox data-dense-labels>
			<span>{prefix}</span>
			<span><IntlLabel keys={[i18nKey]}/></span>
			{VUtils.isNotBlank(extLabel) ? <span>{extLabel}</span> : (void 0)}
		</UnwrappedBox>,
		stringify: () => {
			return `${prefix}. ${internationalize('', [i18nKey])} ${extLabel ?? ''}`;
		},
		locate: async () => {
			await expands.reduce(async (prev, [type, id]) => {
				await prev;
				return globalHandlers.sc(type, id, (void 0), async () => VUtils.noop());
			}, Promise.resolve());
			const node = document.querySelector(`div${selector}#${domId}`) as HTMLElement | null;
			if (node != null) {
				const parts = [];
				const banner = document.querySelector('div[data-w=app-banner]');
				if (banner != null) {
					parts.push('var(--app-banner-height)');
				}
				if (hasFixedTitle) {
					parts.push('var(--app-page-fix-title-box-height)');
				}
				if (parts.length !== 0) {
					node.style.scrollMarginTop = `calc(${parts.join(' + ')})`;
				}
				node.scrollIntoView(scrollBehavior);
				await onLocated?.();
			}
		}
	};
};