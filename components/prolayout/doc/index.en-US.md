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
| `[menuHeader]` | array of MenuItemProLayout displayed on the header | MenuItemProLayout[] | [] |
| `[menuSider]` | array of MenuItemProLayout displayed on the sider | MenuItemProLayout[] | [] |
| `[isFixedHeader]` | whether header is fixed | `boolean` | `false` |
| `[isFixedSider]` | whether sider is fixed | `boolean` | `false` |
| `[isShowHeader]` | whether header is shown | `boolean` | `true` |
| `[isShowSider]` | whether sider is fixed | `boolean` | `true` |
| `[isShowFooter]` | whether footer is fixed | `boolean` | `true` |
| `[isMenuSplitted]` | menu items on header merged with menu items on sider, display on sider, remove all on header | `boolean` | `false` |
