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
| vtsShowPagination | Show table pagination at bottom | `boolean` | `false`
| vtsShowTotal | Display total number and range, next to Pagination, given context of total row and range of current start-end row | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` |
| vtsTitle | Append custom title above and stick to table | string | TemplateRef | 
| vtsFooter | Append custom footer below and stick to table | string | TemplateRef | 
| [(vtsPageIndex)] | Bind current page index | `number` | 1
| [(vtsPageSize)] | Bind current pageSize | `number` | `10`
| vtsPageSizeOptions | Provide data for `vtsShowSizeChanger` | `number[]` | `[10, 20, 30, 40, 50]`
| vtsShowSizeChanger | Render pageSize dropdown select | `boolean` | false
| vtsClientPagination | Use client pagination<br>Total row is equal to `vtsData` length<br>In case of using server pagination, disable `vtsClientPagination` and provide `vtsTotal` | `boolean` | `true`
| vtsTotal | Specify total row of data, use along with `vtsClientPagination` | `number` |
| vtsHidePaginationOnSinglePage | Whether to hide pagination when there's only 1 page | `boolean` | true
| vtsLoading | Render loading template, use for server pagination | `boolean` | `false`
| vtsLoadingIndicator | Provide loading template | `Template` |
| vtsNoResult | Custom template for empty data view | `Template` or `string` |

### th
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsShowCheckbox | Create a checkbox in header | `boolean` |
| vtsDisabled | Disable checkbox | `boolean` | false
| vtsIndeterminate | Checkbox's indeterminate status | `boolean` | false
| [(vtsChecked)] | Bind checkbox's checked state | `boolean` |
| vtsSortDirections | List of allowed sort order | Array of `ascend` `descend` `null` | `['ascend', 'descend', null]`
| vtsSortFn | Client sort function, return `positive` `0` `negative` corresponding greater, equal, lower <br>In case of using server pagination, set to `true` | `(item1, item2) => number` |
| vtsSortOrder | Set current sort order | One of `ascend` `descend` `null` |
| vtsSortOrderChange | Emit on sort order changed | `EventEmitter<'ascend' \| 'descend' \| null>` |
| vtsWidth | Set width of header cell | `string` |
| vtsAlign | Align header content | One of `left` `center` `right` |
| vtsBreakWord | Enable word break | `boolean` | `false`


### td
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsShowCheckbox | Create a checkbox in cell | `boolean` |
| vtsDisabled | Disable checkbox | `boolean` | false
| vtsIndeterminate | Checkbox's indeterminate status | `boolean` | false
| [(vtsChecked)] | Bind checkbox's checked state | `boolean` |
| colSpan | Span column | `number` |
| rowSpan | Span row | `number` |
| vtsShowExpand | Show expand icon | `boolean` |
| [(vtsExpand)] | Bind expand state | `boolean` |
| vtsExpandTemplate | Custom expand icon template, given context of expand state | `TemplateRef<bool>` |
| indentSize | Append indent gap to the left | `number` |
| vtsAlign | Align header content | One of `left` `center` `right` |
| vtsBreakWord | Enable word break | `boolean` | `false`