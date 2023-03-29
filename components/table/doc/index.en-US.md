---
category: Components
cols: 1
type: Components
title: Table
order: 13
cover: https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg
---

```ts
import { VtsTableModule } from '@ui-vts/ng-vts/table';
```

## API

### vts-table

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsData | Data array to be rendered | `T[]` |
| vtsSize | Size of table | One of `sm` `md` `lg` | `sm`
| vtsTableLayout | Table layout css property | One of `auto` `fixed` | `auto`
| vtsClientPagination | Whether to calculate pagination on client side | `boolean` | `true`
| vtsShowPagination | Show table pagination at bottom | `boolean` | `false`
| vtsTitle | Append custom title above and stick to table | `TemplateRef` or `string` | 
| vtsFooter | Append custom footer below and stick to table | `TemplateRef` or `string` | 
| vtsLoading | Render loading template, use for server pagination | `boolean` | `false`
| vtsLoadingIndicator | Custom loading template | `TemplateRef` |
| vtsNoResult | Custom template for empty data view | `TemplateRef` or `string` |
| vtsOuterBordered | Whether to show table outer border | `boolean` | `false`
| vtsWidthConfig | Set col width can not used with [vtsWidth] of th | `string[]` |
| vtsScroll | Set table scroll height/width | `{x: string \| null, y: string \| null}` |
| vtsVirtualItemSize | CDK Property of virtual scrolling | `number` | `0`
| vtsVirtualMaxBufferPx | CDK Property of virtual scrolling | `number` | `200`
| vtsVirtualMinBufferPx | CDK Property of virtual scrolling | `number` | `100`
| vtsVirtualForTrackBy | CDK Property of virtual scrolling | `TrackByFunction<T>` |
| (vtsCurrentPageDataChange) | Emit on page data change | `EventEmitter<T[]>` |
| (vtsQueryParams) | Emit on query params change, use with server side | `EventEmitter<VtsTableQueryParams>`: `EventEmitter<{pageIndex, pageSize, filter, sort}>` |

All property of [vts-pagination](./components/pagination/en)

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsTotal | Total number of data items | `number` | `0` |
| [(vtsPageIndex)] | Current page number | `number` | `1` |
| [(vtsPageSize)] | Number of data items per page, double binding | `number` | `10` |
| vtsShowQuickJumper | Whether to show input for directly navigation | `boolean` | `false` |
| vtsShowSizeChanger | Whether to show select for `vtsPageSize` | `boolean` | `false` |
| vtsPageSizeOptions | Specify the `vtsPageSize` options | `number[]` | `[10, 20, 30, 40]` |
| vtsMini | Whether to use mini mode | `boolean` | `false` |
| vtsSimple | Whether to use simple mode | `boolean` | `false` |
| vtsResponsive | Whether to toggle `vtsMini` on screen size below `sm` | `boolean` | `false` |
| vtsItemRender | Custom template for item rendering | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next'\| 'begin'\| 'last'\| 'prev_5'\| 'next_5', page: number }>` | |
| vtsShowTotal | Custom template for total number and range | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | |
| vtsHidePaginationOnSinglePage | Whether to hide pagination on single page | `boolean` | `false` |

### [th]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsShowCheckbox | Create a checkbox in header | `boolean` |
| vtsDisabled | Disable checkbox | `boolean` | `false`
| vtsIndeterminate | Checkbox's indeterminate status | `boolean` | `false`
| [(vtsChecked)] | Bind checkbox's checked state | `boolean` |
| vtsWidth | Set width of header cell | `string` |
| vtsAlign | Align header content | One of `left` `center` `right` |
| vtsBreakWord | Enable word break | `boolean` | `false`
| vtsNoWrap | Enable no wrapping text | `boolean` | `false`
| vtsEllipsis | Ellipsis cell content, not working with sorter and filters for now. Only work when `vtsTableLayout` is `fixed` | `boolean` | `false` |
| vtsLeft | Left pixels, used to fixed column to left | `string \| boolean` |
| vtsRight | Right pixels, used to fixed column to left | `string \| boolean` |
| vtsShowSort | Whether to display sort button | `boolean` | `false` |
| vtsSortDirections | List of allowed sort order | Array of `'ascend'` `'descend'` `null` | `['ascend', 'descend', null]` |
| vtsSortFn | Client sort function, return `positive` `0` `negative` corresponding greater, equal, lower <br>In case of using server pagination, set to `true` | `(item1, item2) => number` or `boolean` |
| vtsColumnKey | Using for server side query, column key to be setted inside `vtsQueryParams` | `string` | |
| [(vtsSortOrder)] | Set current sort order | One of `'ascend'` `'descend'` `null` | |


### [td]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsShowCheckbox | Create a checkbox in cell | `boolean` |
| vtsDisabled | Disable checkbox | `boolean` | `false`
| vtsIndeterminate | Checkbox's indeterminate status | `boolean` | `false`
| [(vtsChecked)] | Bind checkbox's checked state | `boolean` |
| colSpan | Table attribute for span column | `number` |
| rowSpan | Table attribute for span row | `number` |
| vtsShowExpand | Show expand icon | `boolean` |
| [(vtsExpand)] | Bind expand state | `boolean` |
| vtsExpandTemplate | Custom expand icon template, given context of expand state | `TemplateRef<bool>` |
| vtsIndentSize | Append indent gap to the left, to be used with expandable table | `number` |
| vtsAlign | Align header content | One of `left` `center` `right` |
| vtsBreakWord | Enable word break | `boolean` | `false`
| vtsNoWrap | Enable no wrapping text | `boolean` | `false`
| vtsEllipsis | Ellipsis cell content, not working with sorter and filters for now. Only work when `vtsTableLayout` is `fixed` | `boolean` | `false`
| vtsLeft | Left pixels, used to fixed column to left | `string \| boolean` |  |
| vtsRight | Right pixels, used to fixed column to left | `string \| boolean` |   |

### [vts-virtual-scroll]

Allow to setting virtual scroll for table body