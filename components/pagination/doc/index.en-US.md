---
category: Components
type: Navigation
title: Pagination
cols: 1
cover: ''
---

```ts
import { VtsPaginationModule } from '@ui-vts/ng-vts/pagination';
```

## API

### vts-pagination

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsTotal | Total number of data items | `number` | `0` |
| [(vtsPageIndex)] | Current page number | `number` | `1` |
| [(vtsPageSize)] | Number of data items per page, double binding | `number` | `10` |
| vtsDisabled | Whether to disable pagination | `boolean` | `false` |
| vtsShowQuickJumper | Whether to show input for directly navigation | `boolean` | `false` |
| vtsShowSizeChanger | Whether to show select for `vtsPageSize` | `boolean` | `false` |
| vtsPageSizeOptions | Specify the `vtsPageSize` options | `number[]` | `[10, 20, 30, 40]` |
| vtsMini | Whether to use mini mode | `boolean` | `false` |
| vtsSimple | Whether to use simple mode | `boolean` | `false` |
| vtsResponsive | Whether to toggle `vtsMini` on screen size below `sm` | `boolean` | `false` |
| vtsItemRender | Custom template for item rendering | `TemplateRef<{ $implicit: 'page' \| 'prev' \| 'next'\| 'begin'\| 'last'\| 'prev_5'\| 'next_5', page: number }>` | |
| vtsShowTotal | Custom template for total number and range | `TemplateRef<{ $implicit: number, range: [ number, number ] }>` | |
| vtsHidePaginationOnSinglePage | Whether to hide pagination on single page | `boolean` | `false` |
