---
category: Components
type: Data Display
title: Popover
cover: https://gw.alipayobjects.com/zos/alicdn/1PNL1p_cO/Popover.svg
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

```ts
import { VtsPopoverModule } from '@ui-vts/ng-vts/popover';
```

## API

### [vts-popover]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsPopoverTitle]` | Title of the popover | `string \| TemplateRef<void>` | - |
| `[vtsPopoverContent]` | Content of the popover | `string \| TemplateRef<void>` | - |
| `[vtsPopoverTrigger]` | Popover trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[vtsPopoverPlacement]` | The position of the popover relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'` |
| `[vtsPopoverOrigin]` | Origin of the tooltip | `ElementRef` | - |
| `[vtsPopoverVisible]` | Show or hide popover | `boolean` | `false` |
| `(vtsPopoverVisibleChange)` | Callback of hide or show | `EventEmitter<boolean>` | - |
| `[vtsPopoverMouseEnterDelay]` | Delay in seconds, before popover is shown on mouse enter | `number` | `0.15` |
| `[vtsPopoverMouseLeaveDelay]` | Delay in seconds, before popover is hidden on mouse leave | `number` | `0.1` |
| `[vtsPopoverOverlayClassName]` | Class name of the popover card | `string` | - |
| `[vtsPopoverOverlayStyle]` | Style of the popover card | `object` | - |
Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.
| `[vtsPopoverBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |

## Note

Please ensure that the node of `[vts-popover]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
