---
category: Components
type: Navigation
title: Pagination
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/1vqv2bj68/Pagination.svg
---

A long list can be divided into several pages by `Pagination`, and only one page will be loaded at a time.

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

```ts
import { VtsPaginationModule } from '@ui-vts/ng-vts/pagination';
```

## API

```html
<vts-pagination [vtsPageIndex]="1" [vtsTotal]="50"></vts-pagination>
```

### vts-pagination

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsTotal]` | total number of data items | `number` | `0` | - |
| `[vtsPageIndex]` | current page number，double binding | `number` | `1` | - |
| `[vtsPageSize]` | number of data items per page, double binding | `number` | `10`| - |
| `[vtsDisabled]` | disable pagination | `boolean` | `false`| - |
| `[vtsShowQuickJumper]` | determine whether you can jump to pages directly | `boolean` | `false` | ✅ |
| `[vtsShowSizeChanger]` | determine whether `vtsPageSize` can be changed | `boolean` | `false` | ✅ |
| `[vtsSimple]` | whether to use simple mode | `boolean` | - | ✅ |
| `[vtsSize]` | specify the size of `vts-pagination`, can be set to `small` | `'small'` | `'default'` | ✅ |
| `[vtsResponsive]` | `Pagination` would resize according to the width of the window | `boolean` | `false` | - |
| `[vtsPageSizeOptions]` | specify the sizeChanger options | `number[]` | `[10, 20, 30, 40]` | ✅ |
| `[vtsItemRender]` | to customize item | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next'\| 'prev_5'\| 'next_5', page: number }>` | - | - |
| `[vtsShowTotal]` | to display the total number and range | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | - | - |
| `[vtsHidePaginationOnSinglePage]` | Whether to hide pager on single page | `boolean` | `false` | - |
| `(vtsPageIndexChange)` | current page number change callback | `EventEmitter<number>` | - | - |
| `(vtsPageSizeChange)` | number of data items per page change callback | `EventEmitter<number>` | - | - |
