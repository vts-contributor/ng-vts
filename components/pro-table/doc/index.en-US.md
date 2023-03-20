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
`requestData` is the most important API of ProTable, `requestData` takes an array data. Each element of array must have defined properties following with `properties`. `requestData` takes over the `loading` settings and re-executes them when query form is queried.

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
`DrawerConfig` is a format for table drawer defination.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[openWith]` | Render mode | `'drawer' , 'popup'` |
| `[entityName]` | Name  | `string` |
| `[showTitleBasedOnProp]` | Title based on property | `string` |
| `[onOpen]` | Triggered when open drawer | `() => void` |
| `[onClose]` | Triggered when close drawer| `() => void` |
| `[onSave]` | Triggered when submit drawer   | `(data: {[key: string]: any}) => void` |

### TabGroup Configuration
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[tabProperty]` | Property key for tabs filtering | `string` |
| `[tabValueConfig]` | Tab configuration | `TabConfig[]` |

### TabConfig Configuration
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[tabTitle]` | Tab title for rendering | `string` |
| `[tabValue]` | Tab value for configuration | `string` |
| `[tabCondition]` | Condition for filtering | `TabCondition` |
| `[total]` | Total data items with filter | `() => void` |

### ButtonConfig Configuration
`ButtonConfig` is a format for more actions rendering.

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
| `[tableTitle]` | The title of table | `string` | `undefined` |
| `[moreActionConfig]` | The configuration object for more actions rendering | `ButtonConfig[]` |
| `[tabGroupConfig]` | The configuration object for categorys filtering | `TabGroupConfig` |
| `[filterGroupConfig]` | The configuration object for data filtering  | `{ [key: string]: any }[]` |
| `[drawerConfig]` | The configuration object for data filtering  | `DrawerConfig` |
| `[modalDeleteConfig]` | The configuration object for deletion modal  | `ModalDeleteConfig` |
| `[modalUploadConfig]` | The configuration object for uploading modal  | `ModalUploadConfig` |
| `[loading]` | Render loading template, use for server pagination | `boolean` | `false` |
| `[properties]` | Property array to be render headers | `VtsPropertyType[]` |
| `[listData]` | Data array to be rendered | `{ [key: string]: VtsSafeAny }[]` |
| `[requestData]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[getRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[editRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[deleteRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[saveRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[exportRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[configTableRequest]` | The request object for data fetching and auto render data | `VtsRequest` |
| `[listStatus]` | The status array of data item | `StatusConfig[]` |
| `[pageSize]` | Bind current pageSize | `number` | `10` |
| `[onPageSizeChanger]` | Triggered when the request is successed | `EventEmitter<number>()` |
| `[onPageIndexChanger]` | Triggered when the request is successed | `EventEmitter<number>()` |
| `[onSuccessEvent]`| Triggered when the request is successed | `EventEmitter<number>()` |
| `[onErrorEvent]`| Triggered when the request is successed | `EventEmitter<number>()` |