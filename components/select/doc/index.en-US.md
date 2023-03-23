---
category: Components
type: Components
cols: 1
title: Dropdown
order: 5
cover: https://gw.alipayobjects.com/zos/alicdn/_0XzgOis7/Select.svg
---

```ts
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsFormModule } from '@ui-vts/ng-vts/form'; // To use in form
```

## API

### vts-select

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable picker | `boolean` | `false`
| vtsAutoFocus | Set autofocus on mounted | `boolean` | `false`
| vtsMode | Selection mode | One of `default` `multiple` | `default`
| vtsAllowClear | Show clear button when has value | `boolean` | `true`
| vtsShowSearch | Allow to search option | `boolean` | `false`
| vtsPlaceholder | Placeholder of datepicker | `string` | 
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| vtsSuffixIcon | Customize suffix icon | `string`(icon name) or `TemplateRef` | `suffix:vts-picker`
| vtsNoResult | Custom template for empty data search | `Template` or `string` |
| vtsCustomCompareFn | Custom compare function used to determine selected value, useful when ngModel and `vts-option` are `object` | `(object1: any, object2: any) => boolean` | `(object1: any, object2: any) => object1===object2`
| vtsCustomFilterFn | Custom compare function used for searching | `(input?: string, option?: VtsSelectItemInterface) => boolean` |
| vtsDropdownClassName | Classname of dropdown dialog | `string` |
| vtsServerSearch | Implement server searching, must declare `vtsOnSearch` | `bool` | `false`
| [(vtsOpen)] | Bind dialog's open state | `boolean` |
| [(ngModel)] | Angular ngModel | `any`(single-select) or `any[]`(multi-select) |
| vtsOnSearch | Emit on search typing | `EventEmitter<string>` |

### vts-select[vtsMode="multiple"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsMaxTagCount | Maximum of tags to be displayed | `number` |
| vtsMaxMultipleCount | Maximum items can be selected | `number` |
| vtsAutoClearSearchValue | Clear search after an item selected | `boolean` | `true`


### vts-option

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsValue | Value of option | `any` |
| vtsLabel | Label of option | `string` or `number` |