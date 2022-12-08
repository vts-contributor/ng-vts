---
category: Components
type: Data Display
title: Tabs
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg
---

Tabs make it easy to switch between different views.

## When To Use

NG VTS has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [RadioButton](/components/radio/en/#components-radio-demo-radiobutton): for secondary tabs.

```ts
import { VtsTabsModule } from '@ui-vts/ng-vts/tabs';
```

## API

### vts-tabset

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsSelectedIndex]` | Current tab's index | `number` | - |
| `[vtsAnimated]` | Whether to change tabs with animation. Only works while `vtsTabPosition="top" \| "bottom"` | `boolean \| {inkBar:boolean, tabPane:boolean}` | `true`, `false` when `type="card"` | ✅ |
| `[vtsSize]` | preset tab bar size | `'large' \| 'small' \| 'default'` | `'default'` | ✅ |
| `[vtsTabBarExtraContent]` | Extra content in tab bar | `TemplateRef<void>` | - |
| `[vtsTabBarStyle]` | Tab bar style object | `object` | - |
| `[vtsTabPosition]` | Position of tabs | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | |
| `[vtsType]` | Basic style of tabs | `'line' \| 'card' \| 'editable-card'` | `'line'` | ✅ |
| `[vtsTabBarGutter]` | The gap between tabs | `number` | - | ✅ |
| `[vtsHideAll]` | Whether hide all tabs | `boolean` | `false` |
| `[vtsLinkRouter]` | Link with Angular router. It supports child mode and query param mode | `boolean` | `false` ||
| `[vtsLinkExact]` | Use exact routing matching | `boolean` | `true` |
| `[vtsCanDeactivate]` | Determine if a tab can be deactivated | `VtsTabsCanDeactivateFn` | - |
| `[vtsCentered]` | Centers tabs | `boolean` | `false` |
| `(vtsSelectedIndexChange)` | Current tab's index change callback | `EventEmitter<number>` | - |
| `(vtsSelectChange)` | Current tab's change callback | `EventEmitter<{index: number,tab: VtsTabComponent}>` | - |

### vts-tabset[vtsType="editable-card"]

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[vtsHideAdd]` | Hide plus icon or not | `boolean` | `false` |
| `[vtsAddIcon]` | Add icon | `string \| TemplateRef<void>` | - |
| `(vtsAdd)` | When add button clicked emit | `EventEmitter<>` | - |
| `(vtsClose)` | When close button clicked emit | `EventEmitter<{ index: number }>` | - |

### vts-tab

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsTitle]` | Show text in tab's head | `string \| TemplateRef<void>` | - |
| `[vtsForceRender]` | Forced render of content in tabs, not lazy render after clicking on tabs | `boolean` | `false` |
| `[vtsDisabled]` | tab disable | `boolean` | - |
| `(vtsClick)` | title click callback | `EventEmitter<void>` | - |
| `(vtsContextmenu)` | title contextmenu callback | `EventEmitter<MouseEvent>` | - |
| `(vtsSelect)` | title select callback | `EventEmitter<void>` | - |
| `(vtsDeselect)` | title deselect callback | `EventEmitter<void>` | - |

### vts-tabset[vtsType="editable-card"] > vts-tab
| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[vtsClosable]` | Show close icon or not | `boolean` | `false` |
| `[vtsCloseIcon]` | Close icon | `string \| TemplateRef<void>` | - |


#### Template variable references of `vts-tab[vtsTitle]`

| Property | Description | Type |
| --- | --- | --- |
| `visible` | Is the title in the visible area, will be rendered to the dropdown menu if `false`. | `boolean`|

Use in `vts-tab[vtsTitle]`

```html
<vts-tab [vtsTitle]="titleTemplate">
  ...
  <ng-template #titleTemplate let-visible="visible">...</ng-template>
</vts-tab>
```

Use in `*vtsTabLink`

```html
<vts-tab>
  <a *vtsTabLink="let visible = visible" vts-tab-link [routerLink]="['.']">...</a>
</vts-tab>
```


### [vts-tab]

Tab contents can be lazy loaded by declaring the body in a `ng-template` with the `[vts-tab]` attribute.

### ng-template[vtsTabLink] > a[vts-tab-link]

Show a link in tab's head. Used in router link mode.

```html
<vts-tabset vtsLinkRouter>
  <vts-tab>
    <a *vtsTabLink vts-tab-link [routerLink]="['.']">Link</a>
    Default.
  </vts-tab>
</vts-tabset>
```
