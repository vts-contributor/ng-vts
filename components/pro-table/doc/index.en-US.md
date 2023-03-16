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

### Request
`Request` is a format for request defination for getting data or modifying data.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[url]` | The URL for querying data | `string` ||
| `[type]` | Type of request, HTTP methods | `string` |
| `[params]` | Request params | `{[key: string]: VtsSafeAny}` |
| `[body]` | Request body | `{[key: string]: VtsSafeAny}` |
| `[onSuccess]` | Triggered when the request is successed | `(data: {[key: string]: VtsSafeAny}) => void` |
| `[onError]` | Triggered when the request is error | `(data: {[key: string]: VtsSafeAny}) => void` |

### PropertyType
`PropertyType` is a format for table column defination.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[headerTitle]` | Column name for rendering, if `headerTitle` is `null` or not existed, the property is understood hidden field and not rendered | `string` ||
| `[propertyName]` | Column key, use for query data | `string` |
| `[required]` | Mark field is required | `boolean` |
| `[datatype]` | Type of column data | `string, number, datetime, status` |
| `[checked]` | Mark field is checked for rendering | `boolean` |
| `[align]` | Align data in table | `left, center, right` |
 
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
| `[properties]` | Property array to be render headers | `PropertyType[]` |
| `[listData]` | Data array to be rendered | `{ [key: string]: VtsSafeAny }[]` |
| `[requestData]` | The request object for data fetching and auto render data | `Request` |
| `[getRequest]` | The request object for data fetching and auto render data | `Request` |
| `[editRequest]` | The request object for data fetching and auto render data | `Request` |
| `[deleteRequest]` | The request object for data fetching and auto render data | `Request` |
| `[saveRequest]` | The request object for data fetching and auto render data | `Request` |
| `[exportRequest]` | The request object for data fetching and auto render data | `Request` |
| `[configTableRequest]` | The request object for data fetching and auto render data | `Request` |
| `[listStatus]` | The status array of data item | `StatusConfig[]` |
| `[pageSize]` | Bind current pageSize | `number` | `10` |
| `[onPageSizeChanger]` | Triggered when the request is successed | `EventEmitter<number>()` |
| `[onPageIndexChanger]` | Triggered when the request is successed | `EventEmitter<number>()` |
| `[onSuccessEvent]`| Triggered when the request is successed | `EventEmitter<number>()` |
| `[onErrorEvent]`| Triggered when the request is successed | `EventEmitter<number>()` |