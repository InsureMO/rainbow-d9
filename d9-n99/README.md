# Development

Assume the following envs are ready, otherwise contact the tech guy.

- Node 18
- Npm 10
- Yarn 1.22

## Environment variables

| Name                                     | Default               | Optional | Description                                                                                                                                                                                                                                                                                                   |
|------------------------------------------|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| VITE_APP_TITLE                           | `Frontend`            | Y        | The title of the app.                                                                                                                                                                                                                                                                                         |
| VITE_DEFEND_CSP_NO_UNSAFE                | `false`               | Y        | Defend `CSP` without `unsafe-eval` for scripts, and without `unsafe-inline` for styles. If `CSP` is turned on and `unsafe-eval`/`unsafe-inline` is not allowed, set this to `true`.                                                                                                                           |
| VITE_THEME_ENABLED                       | `false`               | Y        | Enable themes. Any theme-related feature must have the theme enabled first. If the theme is not enabled, it means the application uses a single theme and does not provide any switching feature.                                                                                                             |
| VITE_THEME_DEFAULT_CODE                  | `light`               | Y        | Default theme code.                                                                                                                                                                                                                                                                                           |
| VITE_THEME_FOLLOW_SYSTEM                 | `true`                | Y        | Could follow system theme. Only effective within the browser, not across browsers.                                                                                                                                                                                                                            |
| VITE_THEME_DEFAULT_LIGHT                 | `light`               | Y        | When the default theme code is not set, the application will configure itself based on the system preferences. If the browser preference is set to `light`, it will use the theme code specified by this parameter. Additionally, if system preference-based settings are enabled, the same rules will apply. |
| VITE_THEME_DEFAULT_DARK                  | `dark`                | Y        | The same as `VITE_THEME_DEFAULT_LIGHT`, responding to the `dark` preference.                                                                                                                                                                                                                                  |
| VITE_I18N_ENABLED                        | `false`               | Y        | Enabled i18n.                                                                                                                                                                                                                                                                                                 |
| VITE_I18N_DEFAULT_CODE                   | `en-US`               | Y        | Default i18n code. If not set, the application will first automatically detect `navigator.language`; if there is no value, it will use the default value.                                                                                                                                                     |
| VITE_DISABLE_SIDE_MENU                   | `false`               | Y        | Disable the side menu. Any side-menu-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                     |
| VITE_DISABLE_BANNER                      | `false`               | Y        | Disable the banner. Any banner-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                           |
| VITE_DISABLE_BREADCRUMB                  | `false`               | Y        | Disable the breadcrumb in the banner.                                                                                                                                                                                                                                                                         |
| VITE_DISABLE_THEME_SWITCHER              | `false`               | Y        | Disable the theme switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                    |
| VITE_DISABLE_I18N_SWITCHER               | `false`               | Y        | Disable the i18n switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                     |
| VITE_DISABLE_USER_PROFILE                | `false`               | Y        | Disable the user profile, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                      |
| VITE_SIDE_MENU_BODY_ENABLED_ON_AUTH_ONLY | `true`                | Y        | Side menu body only be displayed after authentication or not.                                                                                                                                                                                                                                                 |
| VITE_USE_BANNER_SPACE_GRABBER            | `true`                | Y        | Use banner space grabber when authenticated, which means that the central part of the banner has no other uses.                                                                                                                                                                                               |
| VITE_HOME_PAGE                           | `/home`               | Y        | Home page url.                                                                                                                                                                                                                                                                                                |
| VITE_UNAUTHENTICATED_PAGE                | `/unauthenticated`    | Y        | Unauthenticated page url, typically it is a login page.                                                                                                                                                                                                                                                       |
| VITE_AUTHENTICATION_ENABLED              | `true`                | Y        | Enable the authentication. Disable authentication means do authentication by external, and using message to notify this application.                                                                                                                                                                          |
| VITE_AUTHENTICATION_2FA_ENABLED          | `false`               | Y        | Enable the 2FA authentication.                                                                                                                                                                                                                                                                                |
| VITE_STORE_DATE_TIME_FORMAT              | `DD/MM/YYYY HH:mm:ss` | Y        | Datetime format in data model.                                                                                                                                                                                                                                                                                |
| VITE_DATE_FORMAT                         | `DD/MM/YYYY`          | Y        | Date format for rendering.                                                                                                                                                                                                                                                                                    |
| VITE_TIME_FORMAT                         | `HH:mm:ss`            | Y        | Time format for rendering.                                                                                                                                                                                                                                                                                    |
| VITE_FORCE_SERVICE_URL_PREFIX            | `false`               | Y        | Force use service url prefix.                                                                                                                                                                                                                                                                                 |
| VITE_SERVICE_URL_PREFIX                  | `/`                   | Y        | Service url prefix. It is used when force use service url prefix is `true` or hostname is `localhost` or `127.0.0.1`                                                                                                                                                                                          |
| VITE_SERVICE_CONTEXT                     | `/`                   | Y        | Service context. It is used when force use service url prefix is `false`.                                                                                                                                                                                                                                     |
| VITE_DEFAULT_PAGE_SIZE                   | `20`                  | Y        | Default page size.                                                                                                                                                                                                                                                                                            |
| VITE_MOCK_ENABLED                        | `false`               | Y        | Enable mock remote api.                                                                                                                                                                                                                                                                                       |

> Please ensure that all set theme codes and language codes are supported by the application, as the application will not perform any
> validation or error handling at runtime. Modify the `/src/utils/env-utils.ts` file to add your own validation.

# Runtime

## Local storage

The content stored in local storage is valid only for the current browser and is independent of the user.

`d9-n99-` could be modified to any prefix you like, at `/src/utils/storage-utils.ts`.

| Name                    | Values                 | Description                                                     |
|-------------------------|------------------------|-----------------------------------------------------------------|
| `d9-n99-side-menu-fold` | `true/false`           | The fold status of the side menu.                               |
| `d9-n99-theme`          | `system` or theme code | Theme code or whether the theme follows the system preferences. |
| `d9-n99-language`       | Language code          | Language code.                                                  |

> Please ensure that all theme codes and language codes in storage are supported by the application, as the application will not perform any
> validation or error handling at runtime. Modify the `/src/utils/storage-utils.ts` file to add your own validation.

## Session storage

The content stored in local storage is valid only for the current browser and current user.

`d9-n99-` could be modified to any prefix you like, at `/src/utils/storage-utils.ts`.

| Name          | Values | Description                                        |
|---------------|--------|----------------------------------------------------|
| `d9-n99-auth` |        | Authentication details, json format and by `btoa`. |

## Messages

The system uses `messages` to respond to external notifications.

```ts
// switch side menu, could be true/false
postMessage({type: 'switch-side-menu', enabled: false});
// switch banner, could be true/false
postMessage({type: 'switch-banner', enabled: false});
// switch theme switcher, could be true/false
postMessage({type: 'switch-theme-switcher', enabled: false});
// switch i18n switcher, could be true/false
postMessage({type: 'switch-i18n-switcher', enabled: false});
```

# Build your own

## Themes

All the content can be found at [src/global-settings/theme](src/global-settings/theme).

- `@rainbow-d9/n2` theme override: `src/global-settings/theme/n2-theme.ts`,
- Application theme: `src/global-settings/theme/app-theme.ts`.

The application already provides two styles, light and dark, which match the system. Normally, it is sufficient to modify the styles of
these two themes. On the other hand, to provide more styles or modify existing styles, please follow the steps below:

- Modify the two theme definitions (as above) to ensure they support the changes made,
- Modify the [custom settings](src/global-settings/theme/custom-settings.tsx),
	- Ensure your theme is categorized as light or dark,
	- Construct available theme list, which will be used for page menu and banner display.
- Modify environment variables: default theme code, default light code and default dark code.

## Languages

All the content can be found at [src/global-settings/i18n](src/global-settings/i18n).

- `en-US` language override: `src/global-settings/i18n/en-US.ts`,
- `zh-CN`: `src/global-settings/i18n/zh-CN.ts`.

If additional internationalization content is needed, please modify the above file content. Or to add or modify internationalization
support, please follow the steps below:

- In addition to `en-US`, which is the default language for `rainbow-d9`, all others are custom languages. Please add a language file based
  on the content of `zh-CN`.
- Modify the [custom settings](src/global-settings/i18n/custom-settings.tsx),
	- Construct available language list, which will be used for page menu and banner display.

## Side menu

All the content can be found at [src/global-settings/menu](src/global-settings/menu).

Modify the [custom settings](src/global-settings/i18n/custom-settings.tsx) to build menus.

## Default pages

- [Authentication page](src/work-area/unauthenticated/authentication.tsx)
- [No authentication page](src/work-area/unauthenticated/no-authentication.tsx)
- [Home page](src/pages/home/page.tsx)

## Sample pages

- Tasks pages:
	- [Tasks #1](src/pages/sample-tasks-pages/tasks-1): The parameterless constructor page, typically suitable for scenarios where the page
	  can be loaded without backend data.
	- [Tasks #2](src/pages/sample-tasks-pages/tasks-2): Parameterized constructor page, typically suitable for scenarios where the page can
	  only be loaded with backend data intervention.
- Claim pages:
	- [Registration](src/pages/sample-claim-pages/registration): A scenario for report a claim.
	- [Acceptance](src/pages/sample-claim-pages/acceptance): A scenario for preprocessing a claim registration.

## Page structure

Typically, to reduce the load pressure on the homepage, each page is defined as lazy loading. There are two approaches:

- `LazyPageWrapper`: for parameterless scenarios,
- `PreloadedLazyPageWrapper`: for parameterized scenarios.

### Parameters on lazy loading

The second parameter of `PreloadedLazyPageWrapper` is how to load the page parameters, with two methods:

- Using a Function to load all parameters, the function needs to conform to the following definition:
  ```ts
  type PagePropsWholePreloader<AssistantData = any> = () => Promise<PreloadedPageProps<AssistantData>>;
  ```
- Load all parameters using a set of definitions, which need to conform to the following definition:
  ```ts
  interface PagePropsApartPreloaderFuncs<AssistantData = any> {
    /** get ui configuration markdown, d9 format */
    ui?: PreloaderFunc<string>;
    /** get initial root model */
    initRootModel?: PreloaderFunc<ObjectPropValue>;
    /** get assistant data for ui usage, could be anything */
    assistantData?: PreloaderFunc<PreloadedPageProps<AssistantData>['assistantData']>;
  }

  interface PagePropsApartPreloader<AssistantData = any> extends PagePropsApartPreloaderFuncs<AssistantData> {
    /** default false */
    useLocation?: boolean;
    /** default false */
    usePathParams?: boolean;
    /** default false */
    useSearchParams?: boolean;
    /**
     * order of preloading, default is undefined, means run all pre-loaders parallel.
     * if defined, it should be an array of arrays, each array contains keys of PagePropsApartPreloaderFuncs,
     * the order of arrays is the order of preloading,
     * and previous loaded data will be passed to next step, by key of previous step.
     * for example:
     * [['initRootModel'], ['ui', 'assistantData']]
     * means run initRootModel first, then run ui and assistantData parallel.
     * return data of initRootModel would be passed to ui and assistantData.
     */
    orderBy?: Array<Array<keyof PagePropsApartPreloaderFuncs>>;
  }
  ```
  All preloaded parameters are optional and can be selected as needed. Parameters other than route parameters can be freely defined in order
  to handle dependency sequences.

### Typical page files structure

- `init-root.json`: Basic root model data definition. Note that this model needs to be cloned to avoid memory data confusion.
- `ui-config.d9`: [rainbow-d9](https://github.com/InsureMO/rainbow-d9) page definition.
- `types.ts`: Data model definition used in the page.
- `services.ts`: Definition of data interaction functions used in the page, including remote interactions, Storage interactions, etc.
- `external-defs.tsx`: Various programmatic definitions used in the page definition. Typically, these include code tables, user interaction
  response functions, etc.
- `page.tsx`: Page entrypoint, which accepts preloaded parameters (if any) and passes them to the D9 standard page component.
- `index.tsx`: Page lifecycle entrypoint, defining preload logic, as well as menus, breadcrumb navigation, routing, etc.

# Pre-built Features

## `data-*` attributes

| Attribute name                  | Available Widgets               | Description                                                                                                                                                                 |
|---------------------------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-fix-bottom-button-bar`    | `Page`                          | Has a button bar which fixed at viewport bottom. Needs to be used together with `data-fix-bottom`.                                                                          |
| `data-space-grabber`	           | `Box`                           | Grab all space, `flex-grow: 1`.                                                                                                                                             |
| `data-as-table-cell`            | `Box`                           | Render as table cell, `width: 100%`.                                                                                                                                        |
| `data-labels`                   | `Box`                           | Render by labels, `8px` gap for labels.                                                                                                                                     |
| `data-dense-labels`             | `Box`                           | Render by labels, `4px` gap for labels.                                                                                                                                     |
| `data-fix-title`	               | `Box`                           | Fixed at top as a title.                                                                                                                                                    |
| `data-type-input-box`           | `Box`                           | Render by a type (typically a dropdown) and input.                                                                                                                          |
| `data-as-button-bar`	           | `Box`                           | Render as a button bar.                                                                                                                                                     |
| `data-sparse`                   | `Box`                           | Render as a button bar, double the gap. Only takes effect when `data-as-button-bar` is defined simultaneously.                                                              |
| `data-done-at`                  | `Box`                           | Render as a done by sb. (a dropdown) at sometime. A comma will automatically be added between sb. and sometime.                                                             |
| `data-sb-from-dept`             | `Box`                           | Render as sb. (a dropdown) from department (a dropdown). A comma will automatically be added between sb. and dept.                                                          |
| `data-slash-joined`             | `Box`                           | Render as slash joined, a 4px gap on both sides of each slash.                                                                                                              |
| `data-as-section-title` 	       | `Box`                           | Render as a section title, typically multiple fields in section title.                                                                                                      |
| `data-2nd`                      | `Box`                           | Render as a 2nd level section. Only takes effect when `data-as-section-title` is defined simultaneously.                                                                    |
| `data-one-at-a-time`            | `Box`                           | Fix the width of inside widgets, makes them grab all spaces horizontally. Typically there is only one inside widget is visible at a time.                                   |
| `data-next-to-banner`           | `Section`                       | Fix the margin top from banner when section is the first element in the page.                                                                                               |
| `data-2nd`                      | `Section`                       | Render as a 2nd level section.                                                                                                                                              |
| `data-narrow-up-in-search`      | `Button Bar`                    | Fix the margin top from search criteria area.                                                                                                                               |
| `data-fix-bottom`               | `Button Bar`                    | Fixed at viewport bottom. Needs to be used together with `data-fix-bottom-button-bar`.                                                                                      |
| `data-hide-caption`             | `Form cell`                     | Force hide caption.                                                                                                                                                         |
| `data-hide-asterisk`            | `Form cell`                     | Force hide asterisk even `required` declared.                                                                                                                               |
| `data-as-link`                  | `Caption`, `Label`              | Render as a link.                                                                                                                                                           |
| `data-use-font-color`           | `Caption`, `Label`              | Use font color instead of caption default color.                                                                                                                            |
| `data-bold`                     | `Caption`, `Label`              | Use bold font (weight 600).                                                                                                                                                 |
| `data-not-available`            | `Caption`, `Label`              | Render by not available font and size.                                                                                                                                      |
| `data-as-section-title`         | `Caption`, `Label`              | Render as a section title.                                                                                                                                                  |
| `data-2nd`                      | `Caption`, `Label`              | Render as a 2nd level section. Only takes effect when `data-as-section-title` is defined simultaneously.                                                                    |
| `data-vertical-list`	           | `Caption`, `Label`              | Render as a vertical list, each item of this list must be a `Caption` or `Label`.                                                                                           |
| `data-move-left-a-dense`        | `Caption`, `Label`              | Move left a dense (`4px`).                                                                                                                                                  |
| `data-omit-padding`             | `Dropdown`                      | Omit padding.                                                                                                                                                               |
| `data-normal-placeholder`       | `Dropdown`                      | Use font color instead of placeholder default color.                                                                                                                        |
| `data-fit`                      | `Button`                        | Justify self to start.                                                                                                                                                      |
| `data-fit-link`                 | `Button`                        | Omit padding, justify self to start.                                                                                                                                        |
| `data-di-eat-leads`             | `Deco Input`                    | Make border includes leading parts.                                                                                                                                         |
| `data-di-eat-tails`             | `Deco Input`                    | Make border includes tailing parts.                                                                                                                                         |
| `data-di-eat-both`              | `Deco Input`                    | Make border includes both leading and tailing parts.                                                                                                                        |
| `data-next-to-search`           | `Table`                         | Fix the margin top from search criteria area.                                                                                                                               |
| `data-fat-row`                  | `Table`                         | If there is only one element inside the table cell, the element will be aligned to the top.                                                                                 |
| `data-omit-expand-area-padding` | `Table`                         | Omit padding of table row expand area.                                                                                                                                      |
| `data-in-table-cell-and-box`    | `Input`, `Dropdown`, `Calendar` | Fix styles when they are in table cell and a `Box`.                                                                                                                         |
| `data-hide-header`              | `Ribs`                          | Hide row header.                                                                                                                                                            |
| `data-as-section`               | `Ribs`                          | Fix styles when global set `Ribs` row header rendering as section header.                                                                                                   |
| `data-as-timeline`              | `Ribs`                          | Render as a timeline, row header is omitted.<br>1. A `Caption` with `data-as-timeline-icon`,<br> 2. A `Box`, typically renders sb. at sometime.<br>3. A `Caption`, message. |
| `data-as-timeline-icon`         | `Caption`                       | Render as a timeline icon. Only takes effect as first element of `Ribs` with `data-as-timeline`.                                                                            |
