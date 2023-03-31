---
category: Components
type: Data Display
title: Tag
cols: 1
order: 100
cover: ''
---

```ts
import { VtsTagModule } from '@ui-vts/ng-vts/tag';
```

## API

### vts-tag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsMode | Mode of tag | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| [(vtsChecked)] | Checked status of Tag, only works when `vtsMode="checkable"` | `boolean` | `false` |
| (vtsOnClose) | Emit on tag closing, only works when `vtsMode="closable"`| `EventEmitter<MouseEvent>` | |
| vtsColor | Custom colors of the Tag | `VtsTagCustomColor` | |

### VtsTagCustomColor
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| background | Background of tag | `string` | |
| color | Color of tag | `string` | |
| checkedBackground | Background of tag on checked, only works when `vtsMode="checkable"` | `string` | |
| checkedColor | Color of tag on checked, only works when `vtsMode="checkable"` | `string` | |
