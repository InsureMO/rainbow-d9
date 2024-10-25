import {VUtils} from '@rainbow-d9/n1';
import {GlobalEventPrefix, GlobalHandlers, internationalize, IntlLabel, UnwrappedBox} from '@rainbow-d9/n2';

const scrollBehavior: ScrollIntoViewOptions = {behavior: 'smooth', block: 'start'};
type PageLocationOption = {
	domId: string; selector: string;
	prefix: string; i18nKey: string; extLabel?: string;
	expands: Array<[GlobalEventPrefix.EXPAND_RIBS_ELEMENT | GlobalEventPrefix.EXPAND_SECTION, string]>;
	globalHandlers: GlobalHandlers; hasFixedTitle?: boolean;
}
export const createPageLocationOption = (options: PageLocationOption) => {
	const {domId, selector, prefix, i18nKey, extLabel, expands, globalHandlers, hasFixedTitle = false} = options;
	return {
		value: `${domId}:${selector}`,
		label: <UnwrappedBox data-dense-labels>
			<span>{prefix}.</span>
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
			}
		}
	};
};