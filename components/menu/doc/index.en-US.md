---
category: Components
cols: 1
type: Components
title: Menu
cover: ''
---

```ts
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
```

## API

Structure

```html
<ul vts-menu>
  <li vts-menu-item>
    <i vts-icon vtsType="Time"></i>
    Item 1
  </li>
  <li vts-menu-item>
    <i vts-icon vtsType="Time"></i>
    Item 2
  </li>
  <ul vts-submenu vtsTitle="Submenu Title">
    <li vts-menu-item>SubMenu Item 1</li>
    <li vts-menu-item>SubMenu Item 2</li>
  </ul>
  <ul vts-menu-group vtsTitle="Group Title">
    <li vts-menu-item>
      <i vts-icon vtsType="Time"></i>
      Item 1
    </li>
    <ul vts-submenu vtsTitle="Submenu Title">
      <li vts-menu-item>SubMenu Item 1</li>
      <li vts-menu-item>SubMenu Item 2</li>
      <ul vts-submenu vtsTitle="Submenu Title">
        <li vts-menu-item>SubMenu Item 1</li>
        <li vts-menu-item>SubMenu Item 2</li>
      </ul>
    </ul>
  </ul>
</ul>
```

### [vts-menu]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| vtsInlineCollapsed | The collapsed status when menu is inline mode | `boolean` | `false` |
| vtsMode | Type of the menu | One of `vertical` `horizontal` `inline` | `vertical` |
| (vtsClick) | Emit on `vts-menu-item` selected | `EventEmitter<VtsMenuItemDirective>` | |

### [vts-menu-item]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| vtsDisabled | Disabled state of menu item | `boolean` | `false` |
| vtsSelected | Selected state of menu item | `boolean` | `false` |
| vtsMatchRouter | Whether to auto set `vtsSelected` according to [routerLink] | `boolean` | `false` |
| vtsMatchRouterExact | Same as `vtsMatchRouter` but only match when the url matches the link exactly | `boolean` | `false` |

### [vts-submenu]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| [(vtsOpen)] | Binding open state of sub menu | `boolean` | `false` |
| vtsDisabled | Disabled state of sub menu | `boolean` | `false` |
| vtsTitle | Submenu title | `string \| TemplateRef<void>` | |
| vtsIcon | Submenu icon | `string` | |
| vtsMenuClassName | Submenu container's class name | `string` | |

### [vts-menu-group]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| vtsTitle | Menu group title | `string \| TemplateRef<void>` | |
