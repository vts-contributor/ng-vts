---
category: Components
type: Navigation
title: Dropdown
cover: https://gw.alipayobjects.com/zos/alicdn/eedWN59yJ/Dropdown.svg
---

A dropdown list.

## When To Use

If there are too many operations to display, you can wrap them in a `Dropdown`. By clicking/hovering on the trigger, a dropdown menu should appear, which allows you to choose one option and execute relevant actions.

```ts
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
```

## API

### [vts-dropdown]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsDropdownMenu]` | Dropdown menu | `VtsDropdownMenuComponent` | - |
| `[vtsDisabled]` | whether the dropdown menu is disabled | `boolean` | - |
| `[vtsPlacement]` | placement of pop menu | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| `[vtsTrigger]` | the trigger mode which executes the drop-down action | `'click' \| 'hover'` | `'hover'` |
| `[vtsClickHide]` | whether hide menu when click | `boolean` | `true` |
| `[vtsVisible]` | whether the dropdown menu is visible, double binding | `boolean` | - |
| `[vtsOverlayClassName]` | Class name of the dropdown root element | `string` | - |
| `[vtsOverlayStyle]` | Style of the dropdown root element | `object` | - |
| `(vtsVisibleChange)` | a callback function takes an argument: `vtsVisible`, is executed when the visible state is changed | `EventEmitter<boolean>` | - |

You should use [vts-menu](/components/menu/en) in `vts-dropdown`. The menu items and dividers are also available by using `vts-menu-item` and `vts-menu-divider`.

> vts-menu of vts-dropdown is unselectable by default, you can make it selectable via `<ul vts-menu vtsSelectable>`.

### vts-dropdown-menu

Wrap Dropdown Menu and pass to `[vts-dropdown]` and `VtsContextMenuService`, you can export it via Template Syntax `vtsDropdownMenu`

> Note：Every `[vts-dropdown]` should pass independent `vts-dropdown-menu`.

```html
<a vts-dropdown [vtsDropdownMenu]="menu">Hover me</a>
<vts-dropdown-menu #menu="vtsDropdownMenu">
  <ul vts-menu>
    <li vts-menu-item>1st menu item</li>
    <li vts-menu-item>2nd menu item</li>
    <li vts-menu-item>3rd menu item</li>
  </ul>
</vts-dropdown-menu>
```

### VtsContextMenuService

Create dropdown with contextmenu, the detail can be found in the example above

| Property | Description | Arguments | Return Value |
| --- | --- | --- | --- |
| create | create dropdown | `($event:MouseEvent \| {x:number, y:number}, menu:VtsDropdownMenuComponent)` | - |
| close | close dropdown | - | - |
