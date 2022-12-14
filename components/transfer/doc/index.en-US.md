---
category: Components
type: Data Entry
cols: 1
title: Transfer
cover: https://gw.alipayobjects.com/zos/alicdn/QAXskNI4G/Transfer.svg
---

Double column transfer choice box.

## When To Use

Transfer the elements between two columns in an intuitive and efficient way.

One or more elements can be selected from either column, one click on the proper 'direction' button, and the transfer is done. The left column is considered the 'source' and the right column is considered the 'target'. As you can see in the API description, these names are reflected in.

```ts
import { VtsTransferModule } from '@ui-vts/ng-vts/transfer';
```

## API

### vts-transfer

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsDataSource]` | Used for setting the source data. Except the elements whose keys are `direction: 'right'` prop , or using `vtsTargetKeys` prop. | `TransferItem[]` | `[]` |
| `[vtsDisabled]` | Whether disabled transfer | `boolean` | `false` |
| `[vtsTitles]` | A set of titles that are sorted from left to right. | `string[]` | `['', '']` |
| `[vtsOperations]` | A set of operations that are sorted from bottom to top. | `string[]` | `['', '']` |
| `[vtsListStyle]` | A custom CSS style used for rendering the transfer columns. equal `ngStyle` | `object` | - |
| `[vtsItemUnit]` | single unit | `string` | `'item'` |
| `[vtsItemsUnit]` | multiple unit | `string` | `'items'` |
| `[vtsRenderList]` | Customize render list, please refer to the case. | `Array<TemplateRef<void> \| null>` | `[null, null]` |
| `[vtsRender]` | The function to generate the item shown on a column. please refer to the case. | `TemplateRef<void>` | - |
| `[vtsFooter]` | A function used for rendering the footer. please refer to the case. | `TemplateRef<void>` | - |
| `[vtsShowSearch]` | If included, a search box is shown on each column. | `boolean` | `false` |
| `[vtsCustomFilterFn]` | A function to determine whether an item should show in search result list | `(inputValue: string, item: TransferItem) => boolean` | - |
| `[vtsSearchPlaceholder]` | The hint text of the search box. | `string` | `'Search here'` |
| `[vtsNoResult]` | Text to display when a column is empty. | `string` | `'The list is empty'` |
| `[vtsCanMove]` | Two verification when transfer choice box. please refer to the case. | `(arg: TransferCanMove) => Observable<TransferItem[]>` | - |
| `[vtsSelectedKeys]` | A set of keys of selected items. | `string[]` | - |
| `[vtsTargetKeys]` | A set of keys of elements that are listed on the right column. | `string[]` | - |
| `(vtsChange)` | A callback function that is executed when the transfer between columns is complete. | `EventEmitter<TransferChange>` | - |
| `(vtsSearchChange)` | A callback function which is executed when search field are changed | `EventEmitter<TransferSearchChange>` | - |
| `(vtsSelectChange)` | A callback function which is executed when selected items are changed. | `EventEmitter<TransferSearchChange>` | - |

#### TransferItem

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| title | Used to display and search keyword | `string` | - |
| direction | Used for setting the source data. Except the elements whose keys are `direction: 'right'` prop. | `'left' \| 'right'` | - |
| disabled | specifies whether the checkbox is disabled | `boolean` | `false` |
| checked | specifies whether the checkbox is selected | `boolean` | `false` |

#### TransferCanMove

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| direction | data direction | `'left' \| 'right'` | - |
| list | Used for setting the source data. | `TransferItem[]` | `[]` |

#### TransferChange

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| from | data direction | `'left' \| 'right'` | - |
| to | data direction | `'left' \| 'right'` | - |
| list | Used for setting the source data. | `TransferItem[]` | `[]` |

#### TransferSearchChange

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| direction | data direction | `'left' \| 'right'` | - |
| value | Search keyword | `string` | - |

#### vtsRenderList

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `direction`       | List render direction   | `'left' \| 'right'` | - |
| `disabled`        | Disable list or not     | `boolean` | - |
| `items`   | Filtered items          | `TransferItem[]`  | - |
| `onItemSelect`    | Select item             | `(item: TransferItem) => void` | - |
| `onItemSelectAll` | Select a group of items | `(selected: boolean) => void` | - |
