---
category: Components
type: Data Entry
title: Rate
cover: https://gw.alipayobjects.com/zos/alicdn/R5uiIWmxe/Rate.svg
---

Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

```ts
import { VtsRateModule } from '@ui-vts/ng-vts/rate';
```

## API

### vts-rate

| Property | Description | type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsAllowClear]` | whether to allow clear when click again | `boolean` | `true` | ✅ |
| `[vtsAllowHalf]` | whether to allow semi selection | `boolean` | `false` | ✅ |
| `[vtsAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[vtsCharacter]` | custom character of rate | `TemplateRef<void>` | `<i vts-icon vtsType="star"></i>` |
| `[vtsCount]` | star count | `number` | `5` |
| `[vtsDisabled]` | read only, unable to interact | `boolean` | `false` |
| `[vtsTooltips]` | Customize tooltip by each character | `string[]` | `[]` |
| `[ngModel]` | current value , double binding | `number` | - |
| `(ngModelChange)` | callback when select value | `EventEmitter<number>` | - |
| `(vtsOnBlur)` | callback when component lose focus | `EventEmitter<FocusEvent>` | - |
| `(vtsOnFocus)` | callback when component get focus | `EventEmitter<FocusEvent>` | - |
| `(vtsOnHoverChange)` | callback when hover item | `EventEmitter<number>` | - |
| `(vtsOnKeyDown)` | callback when keydown on component | `EventEmitter<KeyboardEvent>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |
