---
category: Components
type: Data Entry
title: Switch
cover: https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Switch.svg
---

Switching Selector.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

```ts
import { VtsSwitchModule } from '@ui-vts/ng-vts/switch';
```

## API

### vts-switch

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[ngModel]` | determine whether the `vts-switch` is checked, double binding | `boolean` | `false` |
| `[vtsCheckedChildren]` | content to be shown when the state is checked | `string \| TemplateRef<void>` | - |
| `[vtsUnCheckedChildren]` | content to be shown when the state is unchecked | `string \| TemplateRef<void>` | - |
| `[vtsDisabled]` | Disable switch | `boolean` | `false` |
| `[vtsSize]` | the size of the `vts-switch`, options: `default` `small` | `'small' \| 'default'` | `'default'` | ✅ |
| `[vtsLoading]` | loading state of switch | `boolean` | `false` |
| `[vtsControl]` | determine whether fully control state by user  | `boolean` | `false` |
| `(ngModelChange)` | a callback function, can be executed when the checked state is changing | `EventEmitter<boolean>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
