---
category: Components
type: Feedback
title: Popconfirm
cover: https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

```ts
import { VtsPopconfirmModule } from '@ui-vts/ng-vts/popconfirm';
```

## API

### [vts-popconfirm]

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsPopconfirmTitle]` | Title of the confirmation box | `string \| TemplateRef<void>` | - |
| `[vtsPopconfirmTrigger]` | Popconfirm trigger mode. If set to `null` it would not be triggered | `'click' \| 'focus' \| 'hover' \| null` | `'hover'` |
| `[vtsPopconfirmPlacement]` | The position of the popconfirm relative to the target | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom' \| Array<string>` | `'top'` |
| `[vtsPopconfirmOrigin]` | Origin of the popconfirm | `ElementRef` | - |
| `[vtsPopconfirmVisible]` | Show or hide popconfirm | `boolean` | `false` |
| `[vtsPopconfirmShowArrow]` | Whether popconfirm has arrow | `boolean`  | `true` |
| `(vtsPopconfirmVisibleChange)` | Callback of hide or show | `EventEmitter<boolean>` | - |
| `[vtsPopconfirmMouseEnterDelay]` | Delay in seconds, before popconfirm is shown on mouse enter | `number` | `0.15` |
| `[vtsPopconfirmMouseLeaveDelay]` | Delay in seconds, before popconfirm is hidden on mouse leave | `number` | `0.1` |
| `[vtsPopconfirmOverlayClassName]` | Class name of the popconfirm card | `string` | - |
| `[vtsPopconfirmOverlayStyle]` | Style of the popconfirm card | `object` | - |
| `[vtsPopconfirmBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| `[vtsCancelText]` | Text of the Cancel button | `string` | `'Cancel'` |
| `[vtsOkText]` | Text of the Confirm button | `string` | `'Confirm'` |
| `[vtsOkType]` | Button `type` of the Confirm button | `'primary' \| 'ghost' \| 'dashed' \| 'danger' \| 'default'` | `'primary'` |
| `[vtsCondition]` | Whether to directly emit `onConfirm` without showing Popconfirm | `boolean` | `false` |
| `[vtsIcon]` | Customize icon of confirmation  | `string \| TemplateRef<void>` | - |
| `(vtsOnCancel)` | Callback of cancel | `EventEmitter<void>` | - |
| `(vtsOnConfirm)` | Callback of confirmation | `EventEmitter<void>` | - |

Consult [Tooltip's documentation](/components/tooltip/en#api) to find more APIs.

## Note

Please ensure that the node of `[vts-popconfirm]` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
