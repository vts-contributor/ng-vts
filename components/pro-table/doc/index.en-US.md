---
category: Components
type: Components
title: ProTable
order: 22
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg
---

```ts
import { VtsProTableModule } from '@ui-vts/ng-vts/pro-table';
```

## API

### requestData
`vtsRequestData` is the most important API of ProTable, `vtsRequestData` takes an array data. Each element of array must have defined properties following with `vtsProperties`. `vtsRequestData` takes over the `vtsLoading` settings and re-executes them when query form is queried.

### VtsRequest
`VtsRequest` is a format for request defination for getting data or modifying data.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[url]` | The URL for querying data | `string` |
| `[type]` | Type of request, HTTP methods | `string` |
| `[params]` | Request params | `{[key: string]: VtsSafeAny}` |
| `[body]` | Request body | `{[key: string]: VtsSafeAny}` |
| `[onSuccess]` | Triggered when the request is successed | `(data: {[key: string]: VtsSafeAny}) => void` |
| `[onError]` | Triggered when the request is error | `(data: {[key: string]: VtsSafeAny}) => void` |

### VtsPropertyType
`VtsPropertyType` is a format for table column defination.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[headerTitle]` | Column name for rendering, if `headerTitle` is `null` or not existed, the property is understood hidden field and not rendered | `string` |
| `[propertyName]` | Column key, use for query data | `string` |
| `[required]` | Mark field is required | `boolean` |
| `[datatype]` | Type of column data | `string, number, datetime, status` |
| `[checked]` | Mark field is checked for rendering | `boolean` |
| `[align]` | Align data in table | `left, center, right` |

### Drawer Configuration
`VtsDrawerConfig` is a format for table drawer defination.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[openWith]` | Render mode | `'drawer' , 'popup'` |
| `[entityName]` | Name  | `string` |
| `[showTitleBasedOnProp]` | Title based on property | `string` |
| `[onOpen]` | Triggered when open drawer | `() => void` |
| `[onClose]` | Triggered when close drawer| `() => void` |
| `[onSave]` | Triggered when submit drawer   | `(data: {[key: string]: any}) => void` |

### TabGroup Configuration
`VtsTabGroup` is a format for table's tabs defination.
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[tabProperty]` | Property key for tabs filtering | `string` |
| `[tabValueConfig]` | Tab configuration | `VtsTabConfig[]` |

### TabConfig Configuration
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[tabTitle]` | Tab title for rendering | `string` |
| `[tabValue]` | Tab value for configuration | `string` |
| `[tabCondition]` | Condition for filtering | `VtsTabCondition` |
| `[total]` | Total data items with filter | `() => void` |

### ButtonConfig Configuration
`VtsButtonConfig` is a format for more actions rendering.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[buttonText]` | Button title for rendering | `string` |
| `[buttonAPI]` | Request is assigned for button | `VtsRequest` |
| `[style]` | Assign CSS properties for button  | `{[key: string]: string}` |
| `[classNames]` | Assign HTML class for button | `string` |
| `[onClick]` | Triggered when click button | `() => void` |
 
### vts-protable

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsTableTitle]` | The title of table | `string` | `undefined` |
| `[vtsMoreActionConfig]` | The configuration object for more actions rendering | `VtsButtonConfig[]` |
| `[vtsTabGroupConfig]` | The configuration object for categorys filtering | `VtsTabGroupConfig` |
| `[vtsFilterGroupConfig]` | The configuration object for data filtering  | `{ [key: string]: any }[]` |
| `[vtsDrawerConfig]` | The configuration object for data filtering  | `VtsDrawerConfig` |
| `[vtsModalDeleteConfig]` | The configuration object for deletion modal  | `VtsModalDeleteConfig` |
| `[vtsModalUploadConfig]` | The configuration object for uploading modal  | `VtsModalUploadConfig` |
| `[vtsLoading]` | Render loading template, use for server pagination | `boolean` | `false` |
| `[vtsProperties]` | Property array to be render headers | `VtsPropertyType[]` |
| `[vtsListData]` | Data array to be rendered | `{ [key: string]: VtsSafeAny }[]` |
| `[vtsListStatus]` | The status array of data item | `VtsStatusConfig[]` |
| `[vtsPageSize]` | Bind current pageSize | `number` | `10` |
| `[vtsOnPageSizeChanger]` | Triggered when the page size is changed | `EventEmitter<number>()` |
| `[vtsOnPageIndexChanger]` | Triggered when the page index is changed | `EventEmitter<number>()` |
| `[vtsOnSuccessEvent]`| Triggered when the request is successed | `EventEmitter<VtsSafeAny>()` |
| `[vtsOnErrorEvent]`| Triggered when the request is failed | `EventEmitter<VtsSafeAny>()` |
| `[vtsOnActionChanger]`| Triggered when the action is submitted | `EventEmitter<VtsActionType>()` |
| `[vtsOnTabFilterChanger]`| Triggered when the tab index is changed | `EventEmitter<number>()` |
| `[vtsOnSearchingByKey]`| Triggered when the search key is submitted | `EventEmitter<string>()` |
| `[vtsOnDeleteData]`| Triggered when the deleting action is submitted | `EventEmitter<Set<string | number>>()` |
| `[vtsOnSaveData]`| Triggered when the saving action is submitted | `EventEmitter<VtsSafeAny>()` |