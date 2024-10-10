import {VUtils} from '@rainbow-d9/n1';
import {AppPage} from './types';

class Registrar {
	private readonly pagesByCode: Record<string, AppPage> = {};
	private readonly pagesByMenuItemCode: Record<string, AppPage> = {};
	private readonly pagesByRoute: Record<string, AppPage> = {};

	private filterNullPage(page?: AppPage | null): boolean {
		if (page == null) {
			console.error('Page is required.', page);
			return false;
		}
		return true;
	}

	private filterNoCodePage(page: AppPage): boolean {
		if (VUtils.isBlank(page.code)) {
			console.error('Page code is required.', page);
			return false;
		}
		return true;
	}

	private filterNoRoutePage(page: AppPage): boolean {
		if (VUtils.isBlank(page.route)) {
			console.error('Page route is required.', page);
			return false;
		}
		return true;
	}

	private registerByCode(page: AppPage): AppPage {
		const exists = this.pagesByCode[page.code];
		if (exists != null) {
			console.warn(`Page code[${page.code}] is duplicated, and exists is replaced by given.`, {
				exists: exists, given: page
			});
		}
		this.pagesByCode[page.code] = page;
		return page;
	}

	private registerByRoute(page: AppPage): AppPage {
		const exists = this.pagesByRoute[page.route];
		if (exists != null) {
			console.warn(`Page route[${page.route}] is duplicated, and exists is replaced by given.`, {
				exists: exists, given: page
			});
		}
		this.pagesByRoute[page.route] = page;
		return page;
	}

	private registerByMenuItemCode(page: AppPage): AppPage {
		if (VUtils.isBlank(page.menuItemCode)) {
			return page;
		}
		const exists = this.pagesByMenuItemCode[page.menuItemCode!];
		if (exists != null) {
			console.warn(`Page menu item code[${page.menuItemCode}] is duplicated, and exists is replaced by given.`, {
				exists: exists, given: page
			});
		}
		this.pagesByMenuItemCode[page.menuItemCode!] = page;
		return page;
	}

	public register(...pages: Array<AppPage>) {
		(pages ?? [])
			.filter(page => this.filterNullPage(page))
			.filter(page => this.filterNoCodePage(page))
			.filter(page => this.filterNoRoutePage(page))
			.map(page => this.registerByCode(page))
			.map(page => this.registerByRoute(page))
			.map(page => this.registerByMenuItemCode(page));
	}

	public findPageByMenuCode(menuItemCode: string): AppPage | undefined {
		return this.pagesByMenuItemCode[menuItemCode];
	}

	public all(): Array<AppPage> {
		return Object.values(this.pagesByCode);
	}
}

export const PageRegistrar = new Registrar();
