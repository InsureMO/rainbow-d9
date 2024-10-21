import {AppThemeStyle} from './types';
import {createCss} from './utils';

export const createAppThemeStyles = (): AppThemeStyle => {
	const AppCssConstants = {
		bannerBackground: 'rgb(255, 255, 255)',
		bannerBottomBorderColor: 'rgb(231, 232, 233)',
		bannerBreadcrumbTitleColor: 'rgba(4,41,85,0.8)',
		bannerBreadcrumbLocationColor: 'rgba(4,41,85,0.4)',
		bannerButtonHoverColor: 'var(--d9-primary-color)',
		bannerButtonHoverBackground: 'var(--d9-hover-color)',
		bannerButtonMenuBackground: 'rgb(255, 255, 255)',
		bannerButtonMenuShadow: '0px 10px 30px 5px rgba(82, 63, 105, 0.2)',
		buttonMenuItemActiveColor: 'var(--d9-primary-color)',
		buttonMenuItemActiveBackground: 'var(--d9-active-color)',
		buttonMenuItemHoverColor: 'var(--d9-primary-color)',
		buttonMenuItemHoverBackground: 'var(--d9-hover-color)',
		sideMenuShadow: '0px 0px 35px 0px rgba(154, 161, 171, 0.15)',
		sideMenuBackground: 'rgb(31,33,38)',
		sideMenuUnauthenticatedBackground: 'rgb(255, 255, 255)',
		sideMenuHeaderLogoBackground: 'rgb(255,255,255)',
		sideMenuHeaderLogoUnauthenticatedBackground: 'rgb(21, 23, 28)',
		sideMenuHeaderTextColor: 'rgb(255, 255, 255)',
		sideMenuHeaderTextUnauthenticatedColor: 'rgb(21, 23, 28)',
		sideMenuHeaderBottomBorderColor: 'rgb(51, 68, 108)',
		sideMenuHeaderFoldButtonBackground: 'rgb(50, 60, 85)',
		sideMenuHeaderFoldButtonColor: 'rgb(255, 255, 255)',
		sideMenuHeaderFoldButtonHoverColor: 'var(--d9-primary-color)',
		sideMenuGroupLabelColor: 'rgb(141,152,175)',
		sideMenuGroupLabelHoverColor: 'rgb(255,255,255)',
		sideMenuGroupLabelHoverBackground: 'var(--d9-primary-color)',
		sideMenuItemLabelColor: 'rgb(141,152,175)',
		sideMenuItemLabelHoverColor: 'rgb(255,255,255)',
		sideMenuItemLabelHoverBackground: 'var(--d9-primary-color)',
		logoColor: 'rgb(0, 0, 0)',
		logoColor2: 'rgb(62, 151, 255)',
		logoColor3: 'rgb(222, 30, 14)',

		workAreaBackground: 'var(--d9-background-color)',
		pageBottomBarBackground: 'rgb(241,239,239)',
		fcCaptionColor: 'rgb(36,36,36)'
	};
	const createAppCssVars = (variables: typeof AppCssConstants) => {
		return {
			// side menu
			'side-menu-width': `var(--app-side-menu-width, 320px)`,
			'side-menu-fold-width': `var(--app-side-menu-fold-width, 72px)`,
			'side-menu-shadow': `var(--app-side-menu-shadow, ${variables.sideMenuShadow})`,
			'side-menu-background': `var(--app-side-menu-background, ${variables.sideMenuBackground})`,
			'side-menu-unauthenticated-background': `var(--app-side-menu-unauthenticated-background, ${variables.sideMenuUnauthenticatedBackground})`,
			'side-menu-z-index': `var(--app-side-menu-z-index, 10)`,
			'side-menu-header-height': `var(--app-side-menu-header-height, 72px)`,
			'side-menu-header-logo-background': `var(--app-side-menu-header-logo-background, ${variables.sideMenuHeaderLogoBackground})`,
			'side-menu-header-logo-unauthenticated-background': `var(--app-side-menu-header-logo-unauthenticated-background, ${variables.sideMenuHeaderLogoUnauthenticatedBackground})`,
			'side-menu-header-text-color': `var(--app-side-menu-header-text-color, ${variables.sideMenuHeaderTextColor})`,
			'side-menu-header-text-unauthenticated-color': `var(--app-side-menu-header-text-unauthenticated-color, ${variables.sideMenuHeaderTextUnauthenticatedColor})`,
			'side-menu-header-font-family': `var(--app-side-menu-header-font-family, "Oswald")`,
			'side-menu-header-font-size': `var(--app-side-menu-header-font-size, 1.6em)`,
			'side-menu-header-font-weight': `var(--app-side-menu-header-font-weight, bold)`,
			'side-menu-header-bottom-border': `var(--app-side-menu-header-bottom-border, 1px solid ${variables.sideMenuHeaderBottomBorderColor})`,
			'side-menu-padding': `var(--app-side-menu-padding, 16px)`,
			'side-menu-header-fold-button-size': `var(--app-side-menu-header-fold-button-size, 32px)`,
			'side-menu-header-fold-button-background': `var(--app-side-menu-header-fold-button-background, ${variables.sideMenuHeaderFoldButtonBackground})`,
			'side-menu-header-fold-button-color': `var(--app-side-menu-header-fold-button-color, ${variables.sideMenuHeaderFoldButtonColor})`,
			'side-menu-header-fold-button-hover-color': `var(--app-side-menu-header-fold-button-hover-color, ${variables.sideMenuHeaderFoldButtonHoverColor})`,
			'side-menu-body-padding': 'var(--app-side-menu-body-padding, 4px 12px)',
			'side-menu-fold-body-padding': 'var(--app-side-menu-fold-body-padding, 4px 12px 4px 18px)',
			'side-menu-icon-size': 'var(--app-side-menu-icon-size, 20px)',
			'side-menu-text-indent': 'var(--app-side-menu-text-indent, 6px)',
			'side-menu-level-indent': 'var(--app-side-menu-level-indent, 8px)',
			'side-menu-group-border-radius': 'var(--app-side-menu-group-border-radius, 8px)',
			'side-menu-group-label-height': 'var(--app-side-menu-group-label-height, 40px)',
			'side-menu-group-label-color': `var(--app-side-menu-group-label-color, ${variables.sideMenuGroupLabelColor})`,
			'side-menu-group-label-font-size': `var(--app-side-menu-group-label-font-size, 1em)`,
			'side-menu-group-label-font-weight': `var(--app-side-menu-group-label-font-weight, 500)`,
			'side-menu-group-label-hover-color': `var(--app-side-menu-group-label-hover-color, ${variables.sideMenuGroupLabelHoverColor})`,
			'side-menu-group-label-hover-background': `var(--app-side-menu-group-label-hover-background, ${variables.sideMenuGroupLabelHoverBackground})`,
			'side-menu-item-border-radius': 'var(--app-side-menu-item-border-radius, 8px)',
			'side-menu-item-label-height': 'var(--app-side-menu-item-label-height, 36px)',
			'side-menu-item-label-color': `var(--app-side-menu-item-label-color, ${variables.sideMenuItemLabelColor})`,
			'side-menu-item-label-font-size': `var(--app-side-menu-item-label-font-size, 1em)`,
			'side-menu-item-label-font-weight': `var(--app-side-menu-item-label-font-weight, 400)`,
			'side-menu-item-label-hover-color': `var(--app-side-menu-item-label-hover-color, ${variables.sideMenuItemLabelHoverColor})`,
			'side-menu-item-label-hover-background': `var(--app-side-menu-item-label-hover-background, ${variables.sideMenuItemLabelHoverBackground})`,
			'side-menu-footer-padding': 'var(--app-side-menu-footer-padding, 8px 12px 12px)',
			// logo
			'logo-color': `var(--app-logo-color, ${variables.logoColor})`,
			'logo-color-2': `var(--app-logo-color-2, ${variables.logoColor2})`,
			'logo-color-3': `var(--app-logo-color-3, ${variables.logoColor3})`,
			// banner
			'banner-height': `var(--app-banner-height, 72px)`,
			'banner-padding': `var(--app-banner-padding, 0 32px)`,
			'banner-background': `var(--app-banner-background, ${variables.bannerBackground})`,
			'banner-bottom-border': `var(--app-banner-bottom-border, 1px solid ${variables.bannerBottomBorderColor})`,
			'banner-z-index': `var(--app-banner-z-index, 10)`,
			'banner-breadcrumb-padding': 'var(--app-banner-breadcrumb-padding, 0 32px 0 0)',
			'banner-breadcrumb-title-font-family': 'var(--app-banner-breadcrumb-title-font-family, "Oswald")',
			'banner-breadcrumb-title-font-size': 'var(--app-banner-breadcrumb-title-font-size, 22px)',
			'banner-breadcrumb-title-font-weight': 'var(--app-banner-breadcrumb-title-font-weight, 400)',
			'banner-breadcrumb-title-color': `var(--app-banner-breadcrumb-title-color, ${variables.bannerBreadcrumbTitleColor})`,
			'banner-breadcrumb-location-font-family': 'var(--app-banner-breadcrumb-location-font-family, "Roboto")',
			'banner-breadcrumb-location-font-size': 'var(--app-banner-breadcrumb-location-font-size, 12px)',
			'banner-breadcrumb-location-font-weight': 'var(--app-banner-breadcrumb-location-font-weight, 400)',
			'banner-breadcrumb-location-color': `var(--app-banner-breadcrumb-location-color, ${variables.bannerBreadcrumbLocationColor})`,
			'banner-button-size': `var(--app-banner-button-size, 40px)`,
			'banner-button-gap': 'var(--app-banner-button-gap, 4px)',
			'banner-button-border-radius': `var(--app-banner-button-border-radius, 12px)`,
			'banner-button-hover-color': `var(--app-banner-button-hover-color, ${variables.bannerButtonHoverColor})`,
			'banner-button-hover-background': `var(--app-banner-button-hover-background, ${variables.bannerButtonHoverBackground})`,
			'banner-button-lang-emoji-size': 'var(--app-banner-button-lang-emoji-size, 22px)',
			'banner-button-lang-emoji-margin': 'var(--app-banner-button-lang-emoji-margin, 4px 0 0)',
			'banner-menu-min-width': `var(--app-banner-menu-min-width, 150px)`,
			'banner-button-menu-padding': `var(--app-banner-button-menu-padding, 12px 16px)`,
			'banner-button-menu-border-radius': `var(--app-banner-button-menu-border-radius, 8px)`,
			'banner-button-menu-background': `var(--app-banner-button-menu-background, ${variables.bannerButtonMenuBackground})`,
			'banner-button-menu-shadow': `var(--app-banner-button-menu-shadow, ${variables.bannerButtonMenuShadow})`,
			'banner-button-menu-item-height': `var(--app-banner-button-menu-item-height, 32px)`,
			'banner-button-menu-item-padding': `var(--app-banner-button-menu-item-padding, 0 12px)`,
			'banner-button-menu-item-icon-size': `var(--app-banner-button-menu-item-icon-size, 32px)`,
			'banner-button-menu-item-border-radius': `var(--app-banner-button-menu-item-border-radius, 8px)`,
			'banner-button-menu-item-active-color': `var(--app-banner-button-menu-item-active-color, ${variables.buttonMenuItemActiveColor})`,
			'banner-button-menu-item-active-background': `var(--app-banner-button-menu-item-active-background, ${variables.buttonMenuItemActiveBackground})`,
			'banner-button-menu-item-hover-color': `var(--app-banner-button-menu-item-hover-color, ${variables.buttonMenuItemHoverColor})`,
			'banner-button-menu-item-hover-background': `var(--app-banner-button-menu-item-hover-background, ${variables.buttonMenuItemHoverBackground})`,
			'banner-button-menu-item-lang-emoji-size': 'var(--app-banner-button-menu-item-lang-emoji-size, 20px)',
			'banner-button-menu-item-lang-emoji-margin': 'var(--app-banner-button-menu-item-lang-emoji-margin, 0)',
			// work area
			'work-area-background': `var(--app-work-area-background, ${variables.workAreaBackground})`,
			// page, standard
			'page-padding-top': 'var(--app-page-padding-top, 8px)',
			'page-padding-lr': 'var(--app-page-padding-lr, 32px)',
			'page-padding-bottom': 'var(--app-page-padding-bottom, 32px)',
			'page-padding': 'var(--app-page-padding, var(--app-page-padding-top) var(--app-page-padding-lr) var(--app-page-padding-bottom))',
			'page-next-to-banner-margin': 'var(--app-page-next-to-banner-margin, 16px)',
			'page-narrow-up-in-search-margin': 'var(--app-page-narrow-up-in-search-margin, -16px)',
			'page-next-to-search-margin': 'var(--app-page-next-to-search-margin, 8px)',
			'page-fix-title-box-margin': 'var(--app-page-fix-title-box-margin, -8px 0 0 calc(-1 * var(--app-page-padding-lr)))',
			'page-fix-title-box-padding': 'var(--app-page-fix-title-box-padding, 8px 0 0 var(--app-page-padding-lr))',
			'page-fix-title-box-height': 'var(--app-page-fix-title-box-height, 56px)',
			'page-fix-title-box-z-index': 'var(--app-page-fix-title-box-z-index, 9)',
			'page-fix-title-box-font-family': 'var(--app-page-fix-title-box-font-family, "Oswald")',
			'page-fix-title-box-font-size': 'var(--app-page-fix-title-box-font-size, 24px)',
			'page-fix-title-box-font-weight': 'var(--app-page-fix-title-box-font-weight, 400)',
			'page-fix-title-box-color': 'var(--app-page-fix-title-box-color, var(--d9-font-color))',
			'page-fix-title-box-spacing': 'var(--app-page-fix-title-box-spacing, 8px)',
			'page-button-bar-spacing': 'var(--app-page-button-bar-spacing, 8px)',
			'page-bottom-bar-background-color': `var(--app-page-bottom-bar-background-color, ${variables.pageBottomBarBackground})`,
			'page-bottom-bar-padding': 'var(--app-page-bottom-bar-padding, 8px 32px)',
			'page-bottom-bar-height': 'var(--app-page-bottom-bar-height, 48px)',
			'page-bottom-bar-z-index': 'var(--app-page-bottom-bar-z-index, 9)',
			// timeline row
			'timeline-icon-size': 'var(--app-timeline-icon-size, 32px)',
			'timeline-icon-border': 'var(--app-timeline-icon-border, 1px dashed var(--d9-border-color))',
			'timeline-icon-color': 'var(--app-timeline-icon-color, var(--d9-primary-color))',
			// dialog
			'dialog-largest-height': 'var(--app-dialog-largest-height, 80vh)',
			'dialog-largest-width': 'var(--app-dialog-largest-width, 80vw)',
			// section
			'section-header-title-font-family': 'var(--app-section-header-title-font-family, "Oswald")',
			'2nd-section-header-title-font-size': 'var(--app-2nd-section-header-title-font-size, 16px)',
			// tabs
			'tab-title-font-family': 'var(--app-tab-title-font-family, "Oswald")',
			// caption
			'fc-caption-color': `var(--app-fc-caption-color, ${variables.fcCaptionColor})`,
			'fc-caption-font-weight': 'var(--app-fc-caption-font-weight, 300)',
			'caption-not-available-font-family': 'var(--app-caption-not-available-font-family, "Oswald")',
			'caption-not-available-font-size': 'var(--app-caption-not-available-font-size, 12px)',
			// page, authentication
			'authentication-min-width': 'var(--page-authentication-min-width, min(60vw, 600px))',
			'authentication-border': 'var(--page-authentication-border, var(--d9-border))',
			'authentication-border-radius': 'var(--page-authentication-border-radius, 12px)',
			'authentication-padding': 'var(--page-authentication-padding, 16px 32px)',
			'authentication-title-font-family': 'var(--page-authentication-title-font-family, "Oswald")',
			'authentication-title-font-size': 'var(--page-authentication-title-font-size, 20px)',
			'authentication-title-font-weight': 'var(--page-authentication-title-font-weight, 400)',
			'no-authentication-font-size': 'var(--page-no-authentication-font-size, 24px)',
			// page, home
			'home-font-size': 'var(--page-home-font-size, 24px)'
		};
	};
	const AppDarkCssConstants = {
		...AppCssConstants,
		bannerBackground: 'rgb(31,33,38)',
		bannerBreadcrumbTitleColor: 'rgba(255,255,255,0.8)',
		bannerBreadcrumbLocationColor: 'rgba(255,255,255,0.4)',
		bannerBottomBorderColor: 'rgb(38, 39, 47)',
		bannerButtonMenuBackground: 'rgb(21, 23, 28)',
		bannerButtonMenuShadow: '0px 10px 30px 5px rgba(173, 192, 150, 0.2)',
		sideMenuUnauthenticatedBackground: 'rgb(31,33,38)',
		sideMenuHeaderLogoUnauthenticatedBackground: 'rgb(255, 255, 255)',
		sideMenuHeaderTextUnauthenticatedColor: 'rgb(255, 255, 255)',
		sideMenuHeaderBottomBorderColor: 'rgb(38, 39, 47)',
		workAreaBackground: 'rgb(15, 16, 20)',
		pageBottomBarBackground: 'rgb(31,33,38)',
		fcCaptionColor: 'rgb(219,219,219)'
	};
	return {
		light: createCss(createAppCssVars(AppCssConstants)),
		dark: createCss(createAppCssVars(AppDarkCssConstants))
	};
};
