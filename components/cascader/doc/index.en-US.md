---
category: Components
type: Data Entry
title: Cascader
cover: https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg
---

Cascade selection box.

## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

```ts
import { VtsCascaderModule } from '@ui-vts/ng-vts/cascader';
```

## API

```html
<vts-cascader [vtsOptions]="options" [(ngModel)]="values"></vts-cascader>
```

### vts-cascader

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | --------------------- |
| `[ngModel]` | selected value | `any[]` | - |
| `[vtsAllowClear]` | whether allow clear | `boolean` | `true` |
| `[vtsAutoFocus]` | whether auto focus the input box | `boolean` | `false` |
| `[vtsBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |
| `[vtsChangeOn]` | change value on each selection if this function return `true` | `(option: any, index: number) => boolean` | - |
| `[vtsChangeOnSelect]` | change value on each selection if set to true, see above demo for details | `boolean` | `false` |
| `[vtsColumnClassName]` | additional className of column in the popup overlay | `string` | - |
| `[vtsDisabled]` | whether disabled select | `boolean` | `false` |
| `[vtsExpandIcon]` | Customize the current item expand icon | `string\|TemplateRef<void>` | - |
| `[vtsExpandTrigger]` | expand current item when click or hover, one of 'click' 'hover' | `'click'\|'hover'` | `'click'` |
| `[vtsLabelProperty]` | the label property name of options | `string` | `'label'` |
| `[vtsLabelRender]` | render template of displaying selected options | `TemplateRef<any>` | - |
| `[vtsLoadData]` | To load option lazily. If setting `ngModel` with an array value and `vtsOptions` is not setting, lazy load will be call immediately | `(option: any, index?: index) => PromiseLike<any>` | - |
| `[vtsMenuClassName]` | additional className of popup overlay | `string` | - |
| `[vtsMenuStyle]` | additional css style of popup overlay | `object` | - |
| `[vtsNoResult]` | Specify content to show when no result matches. | `string\|TemplateRef<void>` | - |
| `[vtsOptionRender]` | render template of cascader options | `TemplateRef<{ $implicit: VtsCascaderOption, index: number }>` | |
| `[vtsOptions]` | data options of cascade | `object[]` | - |
| `[vtsPlaceHolder]` | input placeholder | `string` | `'Please select'` |
| `[vtsShowArrow]` | Whether show arrow | `boolean` | `true` |
| `[vtsShowInput]` | Whether show input | `boolean` | `true` |
| `[vtsShowSearch]` | Whether support search. Cannot be used with `[vtsLoadData]` at the same time | `boolean\|VtsShowSearchOptions` | `false` |
| `[vtsSize]` | input size, one of `large` `default` `small` | `'large'\|'small'\|'default'` | `'default'` | ✅ |
| `[vtsSuffixIcon]` | 	The custom suffix icon | `string\|TemplateRef<void>` | - |
| `[vtsValueProperty]` | the value property name of options | `string` | `'value'` |
| `(ngModelChange)` | Emit on values change | `EventEmitter<any[]>` | - |
| `(vtsClear)` | Emit on clear values | `EventEmitter<void>` | - |
| `(vtsVisibleChange)` | Emit on popup menu visible or hide | `EventEmitter<boolean>` | - |
| `(vtsSelectionChange)` | Emit on values change | `EventEmitter<VtsCascaderOption[]>` | - |

When `vtsShowSearch` is an object it should implements `VtsShowSearchOptions`：

| Params | Explanation | Type | Default |
| --- | --- | --- | --- |
| `filter` | Optional. Be aware that all non-leaf CascaderOptions would be filtered | `(inputValue: string, path: VtsCascaderOption[]): boolean` | - |
| `sorter` | Optional | `(a: VtsCascaderOption[], b: VtsCascaderOption[], inputValue: string): number` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
| closeMenu() | hide the menu |
