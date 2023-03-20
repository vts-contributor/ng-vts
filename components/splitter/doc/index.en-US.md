---
category: Components
type: Components
cols: 1
title: Splitter
order: 100
cover: ''
---

```ts
import { VtsSplitterModule } from '@ui-vts/ng-vts/splitter';
```

## API

### [vts-splitter]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsPanelSizes | Size of the elements relative to 100% | `number` |
| vtsMinSizes | Minimum size of the elements relative to 100% | `number` |
| vtsLayout | Direction of splitter | `horizontal` or `vertical` | `horizontal`
| vtsGutterSize | Size of the divider in pixels | `number` | `4`
| vtsStyle | Inline style of the splitter wrapper | `NgStyle` | 
| vtsStyleClass | Style class of splitter wrapper | `string` | 
| vtsPanelStyle | Inline style of the splitter panel item | `NgStyle` | 
| vtsPanelStyleClass | Style class of splitter panel item | `string` | 
| vtsOnResizeStart | Emit on start resizing | `EventEmitter<{originalEvent: MouseEvent \| TouchEvent, sizes: number[]}>` |
| vtsOnResizeEnd | Emit on stop resizing | `EventEmitter<{originalEvent: MouseEvent \| TouchEvent, sizes: number[]}>` |

### vts-splitter-item

Declare template for splitter panel