# Development

Assume the following envs are ready, otherwise contact the tech guy.

- Node 18
- Npm 10
- Yarn 1.22

## Environment variables

| Name                                     | Default            | Optional | Description                                                                                                                                                                                                                                                                                                   |
|------------------------------------------|--------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| VITE_APP_TITLE                           | `Frontend`         | Y        | The title of the app.                                                                                                                                                                                                                                                                                         |
| VITE_THEME_ENABLED                       | `false`            | Y        | Enable themes. Any theme-related feature must have the theme enabled first. If the theme is not enabled, it means the application uses a single theme and does not provide any switching feature.                                                                                                             |
| VITE_THEME_DEFAULT_CODE                  | `light`            | Y        | Default theme code.                                                                                                                                                                                                                                                                                           |
| VITE_THEME_FOLLOW_SYSTEM                 | `true`             | Y        | Could follow system theme. Only effective within the browser, not across browsers.                                                                                                                                                                                                                            |
| VITE_THEME_DEFAULT_LIGHT                 | `light`            | Y        | When the default theme code is not set, the application will configure itself based on the system preferences. If the browser preference is set to `light`, it will use the theme code specified by this parameter. Additionally, if system preference-based settings are enabled, the same rules will apply. |
| VITE_THEME_DEFAULT_DARK                  | `dark`             | Y        | The same as `VITE_THEME_DEFAULT_LIGHT`, responding to the `dark` preference.                                                                                                                                                                                                                                  |
| VITE_I18N_ENABLED                        | `false`            | Y        | Enabled i18n.                                                                                                                                                                                                                                                                                                 |
| VITE_I18N_DEFAULT_CODE                   | `en-US`            | Y        | Default i18n code. If not set, the application will first automatically detect `navigator.language`; if there is no value, it will use the default value.                                                                                                                                                     |
| VITE_DISABLE_SIDE_MENU                   | `false`            | Y        | Disable the side menu. Any side-menu-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                     |
| VITE_DISABLE_BANNER                      | `false`            | Y        | Disable the banner. Any banner-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                           |
| VITE_DISABLE_THEME_SWITCHER              | `false`            | Y        | Disable the theme switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                    |
| VITE_DISABLE_I18N_SWITCHER               | `false`            | Y        | Disable the i18n switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                     |
| VITE_DISABLE_USER_PROFILE                | `false`            | Y        | Disable the user profile, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                      |
| VITE_SIDE_MENU_BODY_ENABLED_ON_AUTH_ONLY | `true`             | Y        | Side menu body only be displayed after authentication or not.                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                              
| VITE_HOME_PAGE                           | `/home`            | Y        | Home page url.                                                                                                                                                                                                                                                                                                |
| VITE_UNAUTHENTICATED_PAGE                | `/unauthenticated` | Y        | Unauthenticated page url, typically it is a login page.                                                                                                                                                                                                                                                       |
| VITE_AUTHENTICATION_ENABLED              | `true`             | Y        | Enable the authentication. Disable authentication means do authentication by external, and using message to notify this application.                                                                                                                                                                          |
| VITE_AUTHENTICATION_2FA_ENABLED          | `false`            | Y        | Enable the 2FA authentication.                                                                                                                                                                                                                                                                                |

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
