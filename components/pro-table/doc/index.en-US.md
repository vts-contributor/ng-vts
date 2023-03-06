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

### request

### vts-protable

The pro-table

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[requestData]` | The request object for data fetching and auto render data | `{ url: string, type: "POST" | GET, params: {[key: string]: any}, body: {[key: string]: any} }, onSuccess: (data: {[key: string]: any}) => void, onError: () => void` |
| `[listData]` | Data array to be rendered | `{ [key: string]: VtsSafeAny }[]` |
| `[properties]` | Property array to be render headers | `boolean` | `false`
| `[pageSize]` | Bind current pageSize | `number` | `10`
| `[loading]` | Render loading template, use for server pagination | `boolean` | `false`
