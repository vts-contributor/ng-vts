---
category: Components
type: Components
cols: 1
title: Grid
order: 16
cover: https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg
---

```ts
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
```

## API

### [vts-row]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsAlign | Vertical alignment | One of `top` `middle` `bottom` | |
| vtsGutter | Spacing between grids | `string \| number \| object \| [number, number] \| [object, object<br>&nbsp;Object example: `{xxxs: 1, xxs: 2, sm: 3, xl: 4}` | `0` |
| vtsJustify | Horizontal arrangement | One of `start` `end` `center` `space-around` `space-between` | |

### [vts-col]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFlex | Flex style | `string \| number` | |
| vtsSpan | Number of cells to occupy, 0 corresponds to `display: none` | `number` | |
| vtsOffset | Number of cells to offset Col from the left | `number` | `0` |
| vtsOrder | Cell's order | `number` | `0` |
| vtsPull | Number of cells that raster is moved to the left | `number` | `0` |
| vtsPush | Number of cells that raster is moved to the right | `number` | `0` |
| vtsXXXs | Breakpoint options on screen `<360px` | `number \| object \| 'auto'`<br>&nbsp;Object example: `{span: 1, pull: 1, push: 1, offset: 1, order: 1 }` | |
| vtsXXS | Breakpoint options on screen `≥360px` | Same as `vtsXXXs` | |
| vtsXS | Breakpoint options on screen `≥600px` | Same as `vtsXXXs` | |
| vtsSm | Breakpoint options on screen `≥768px` | Same as `vtsXXXs` | |
| vtsMd | Breakpoint options on screen `≥1024px` | Same as `vtsXXXs` | |
| vtsLg | Breakpoint options on screen `≥1200px` | Same as `vtsXXXs` | |
| vtsXl | Breakpoint options on screen `≥1600px` | Same as `vtsXXXs` | |
