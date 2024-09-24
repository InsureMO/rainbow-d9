# Development

Assume the following envs are ready, otherwise contact the tech guy.

- Node 18
- Npm 10
- Yarn 1.22

## Environment variables

| Name                        | Default    | Optional | Description                                                                                                                                                                                                                                                                                                   |
|-----------------------------|------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| VITE_APP_TITLE              | `Frontend` | Y        | The title of the app.                                                                                                                                                                                                                                                                                         |
| VITE_THEME_ENABLED          | `false`    | Y        | Enable themes. Any theme-related feature must have the theme enabled first. If the theme is not enabled, it means the application uses a single theme and does not provide any switching feature.                                                                                                             |
| VITE_THEME_DEFAULT_CODE     | `light`    | Y        | Default theme code.                                                                                                                                                                                                                                                                                           |
| VITE_THEME_FOLLOW_SYSTEM    | `true`     | Y        | Could follow system theme. Only effective within the browser, not across browsers.                                                                                                                                                                                                                            |
| VITE_THEME_DEFAULT_LIGHT    | `light`    | Y        | When the default theme code is not set, the application will configure itself based on the system preferences. If the browser preference is set to `light`, it will use the theme code specified by this parameter. Additionally, if system preference-based settings are enabled, the same rules will apply. |
| VITE_THEME_DEFAULT_DARK     | `dark`     | Y        | The same as `VITE_THEME_DEFAULT_LIGHT`, responding to the `dark` preference.                                                                                                                                                                                                                                  |
| VITE_I18N_ENABLED           | `false`    | Y        | Enabled i18n.                                                                                                                                                                                                                                                                                                 |
| VITE_I18N_DEFAULT_CODE      | `en-US`    | Y        | Default i18n code. If not set, the application will first automatically detect `navigator.language`; if there is no value, it will use the default value.                                                                                                                                                     |
| VITE_DISABLE_SIDE_MENU      | `false`    | Y        | Disable the side menu. Any side-menu-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                     |
| VITE_DISABLE_BANNER         | `false`    | Y        | Disable the banner. Any banner-related feature must be the banner enabled first. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                           |
| VITE_DISABLE_THEME_SWITCHER | `false`    | Y        | Disable the theme switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                    |
| VITE_DISABLE_I18N_SWITCHER  | `false`    | Y        | Disable the i18n switcher, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                     |
| VITE_DISABLE_USER_PROFILE   | `false`    | Y        | Disable the user profile, it is side-menu-related and banner-related. Even if set to `true`, the menu can still be enabled by `message`.                                                                                                                                                                      |

## Build your own themes

Modify the `src/global-settings/theme.tsx` file according to the comments.

# Runtime

## Local storage

`d9-n99-` could be modified to any prefix you like, at `/src/utils/storage-utils.ts`.

| Name                    | Values                 | Description                                                     |
|-------------------------|------------------------|-----------------------------------------------------------------|
| `d9-n99-side-menu-fold` | `true/false`           | The fold status of the side menu.                               |
| `d9-n99-theme`          | `system` or theme code | Theme code or whether the theme follows the system preferences. |

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
