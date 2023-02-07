---
category: Components
cols: 1
type: Components
title: Menu
cover: https://gw.alipayobjects.com/zos/alicdn/3XZcjGpvK/Menu.svg
---

```ts
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
```

## API

```html
<ul vts-menu>
  <li vts-menu-item>Menu 1</li>
  <li vts-menu-item>Menu 2</li>
  <li vts-submenu vtsTitle="SubMenu Title">
    <ul>
      <li vts-menu-item>SubMenu Item 1</li>
      <li vts-menu-item>SubMenu Item 2</li>
      <li vts-menu-item>SubMenu Item 3</li>
    </ul>
  </li>
</ul>
```

### [vts-menu]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsInlineCollapsed]` | specifies the collapsed status when menu is inline mode | `boolean` | - |
| `[vtsInlineIndent]` | indent px of inline menu item on each level | `number` | `24` |
| `[vtsMode]` | type of the menu; `vertical`, `horizontal`, and `inline` modes are supported | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| `[vtsSelectable]` | allow selecting menu items | `boolean` | `true` |
| `[vtsTheme]` | color theme of the menu | `'light' \| 'dark'` | `'light'` |
| `(vtsClick)` | the Output when click vts-menu-item inside vts-menu | `EventEmitter<VtsMenuItemDirective>` | |

### [vts-menu-item]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsDisabled]` | whether menu item is disabled or not | `boolean` | `false` |
| `[vtsSelected]` | whether menu item is selected or not | `boolean` | `false` |
| `[vtsMatchRouter]` | whether auto set `vtsSelected` according to [routerLink](https://www.angular.cn/api/router/RouterLink) | `boolean` | `false` |
| `[vtsMatchRouterExact]` | only match when the url matches the link exactly, same as [routerLinkActiveOptions](https://angular.io/api/router/RouterLinkActive#routerLinkActiveOptions) | `boolean` | `false` |
| `[vtsDanger]` | display the danger style | `boolean` | `false` |

### [vts-submenu]

You can set the title of `[vts-submenu]` in the following ways.

```html
<li vts-submenu vtsTitle="SubTitle" vtsIcon="appstore"></li>

<li vts-submenu><span title><i vts-icon vtsType="ViewModule"></i><span>SubTitle</span></span></li>

<li vts-submenu [vtsTitle]="titleTpl"></li>
<ng-template #titleTpl><i vts-icon vtsType="ViewModule"></i><span>SubTitle</span></ng-template>
```

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsOpen]` | whether sub menu is open or not, double binding | `boolean` | `false` |
| `[vtsDisabled]` | whether sub menu is disabled or not | `boolean` | `false` |
| `[vtsTitle]` | set submenu title | `string \| TemplateRef<void>` | - |
| `[vtsIcon]` | icon type in title | `string` | - |
| `[vtsMenuClassName]` | Custom the submenu container's class name | `string` | - |
| `(vtsOpenChange)` | vtsOpen callback | `EventEmitter<boolean>` | - |

### [vts-menu-group]

You can set the title of `[vts-menu-group]` in the following ways.

```html
<li vts-menu-group vtsTitle="SubTitle" vtsIcon="appstore"></li>

<li vts-menu-group><span title><i vts-icon vtsType="ViewModule"></i><span>SubTitle</span></span></li>

<li vts-menu-group [vtsTitle]="titleTpl"></li>
<ng-template #titleTpl><i vts-icon vtsType="ViewModule"></i><span>SubTitle</span></ng-template>
```

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsTitle]` | set menu group title | `string \| TemplateRef<void>` | - |


### [vts-menu-divider]

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
