---
category: Components
type: Components
cols: 19
title: Prolayout
cover: https://gw.alipayobjects.com/zos/alicdn/hzEndUVEx/Layout.svg
---

Handling the overall layout of a page.

```ts
import { VtsProLayoutModule } from '@ui-vts/ng-vts/prolayout';
```

## Specification

### Size

The first level navigation is inclined left near a logo, and the secondary menu is inclined right.

- Top Navigation (almost systems): the height of the first level navigation `64px`, the second level navigation `48px`.
- Top Navigation(contents page): the height of the first level navigation `80px`, the second level navigation `56px`.
- Calculation formula of a top navigation: `48+8n`.
- Calculation formula of an aside navigation: `200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distincted by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the stlye of the current navigation item will be applied to its parent level;
- The left side navigation bar has support for both the accordion and expanding styles, you can choose the one that fits your case best.

## Visualization rules

 Style of a navigation should conform to the its level.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item, we recommed using it for the last item of the navigation path.

- **Hightlighted font**

  From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`、`14px` is a standard font size of navigations，`14px` is used for the first and the second level of the navigation. You can choose a approprigate font size in terms of the level of your navigation.

## Component Overview

- `vts-pro-layout-container`: The layout wrapper

## API

### vts-prolayout-container

The pro-layout.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsMenuHeader | array of `VtsMenuItemProLayout` displayed on the header | `VtsMenuItemProLayout`[] | `[]` |
| vtsMenuSider | array of `VtsMenuItemProLayout` displayed on the sider | `VtsMenuItemProLayout`[] | `[]` |
| vtsHeaderTitle | title appears in the header | `string` | GOVERNMENT SOLUTION CENTER PLATFORM |
| vtsAvatar | config for top right avatar area | `VtsAvatarUser` | `{ size: 'md', name: 'Shiba inu', subname: 'Viettel Solution' }` |
| vtsAvatarMenu | config dropdown menu for avatar area | `VtsAvatarMenu`[] | `[]` |
| vtsLogoUrl | logo link, or base64 string | `string` |  |
| vtsBreadcrumbArray | array of breadcrumb items | `VtsBreadcrumbItem`[] | `[]` |
| vtsSeparator | separator between breadcrumb items | `string \| TemplateRef<void> \| null` | `>` |
| vtsFooterTemplate | footer template | `TemplateRef<void> \| null` | Copyright by Viettel Solution - Government Solution Center Platform |
| vtsVisibleNotifyPane | use to show (hide) a drawer notification pane, required when `vtsNotificationConfig.type` is `drawer` | `boolean` | `false` |
| vtsNotificationConfig | config for notification pane | `VtsNotificationConfig` | `{ type: 'menuContext', overflowCount: 99 }` |
| vtsMenuTemplate | notification pane content, requried when `vtsNotificationConfig.type` is `menuContext` | `TemplateRef` | `null` |
| VtsBlockUIConfig | config for UI block feature | `VtsBlockUIConfig` | `{ isEnabled: true, modalLockTitle: "Khóa màn hình", modalUnlockTitle: "Mở khóa màn hình", cancelText: "Hủy", locktext: "Khóa", unlockText: "Mở khóa" }` |