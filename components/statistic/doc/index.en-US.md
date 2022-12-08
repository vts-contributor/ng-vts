---
category: Components
type: Data Display
title: Statistic
cover: https://gw.alipayobjects.com/zos/antfincdn/rcBNhLBrKbE/Statistic.svg
---

Display statistic number.

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

```ts
import { VtsStatisticModule } from '@ui-vts/ng-vts/statistic';
```

## API

### vts-statistic

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsPrefix]` | Prefix of Value | `string \| TemplateRef<void>` | - |
| `[vtsSuffix]` | Suffix of Value | `string \| TemplateRef<void>` | - |
| `[vtsTitle]` | Title | `string \| TemplateRef<void>` | - |
| `[vtsValue]` | Value | `string \| number` | - |
| `[vtsValueStyle]` | Value CSS style | `Object` | - |
| `[vtsValueTemplate]` | Custom template to render a number | `TemplateRef<{ $implicit: string \| number }>` | - |

### vts-countdown

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsFormat]` | Format string  | `string` | `"HH:mm:ss"` |
| `[vtsPrefix]` | Prefix of Value | `string \| TemplateRef<void>` | - |
| `[vtsSuffix]` | Suffix of Value | `string \| TemplateRef<void>` | - |
| `[vtsTitle]` | Title | `string \| TemplateRef<void>` | - |
| `[vtsValue]` | Target time in timestamp form | `string \| number` | - |
| `[vtsValueTemplate]` | Custom template to render a time | `TemplateRef<{ $implicit: number }>` | - |
| `(vtsCountdownFinish)` | Emit when countdown finishes | `void` | - |

### vtsFormat

| Token | Description |
| -------- | ----------- |
| `Y` | Year |
| `M` | Month |
| `D` | Date |
| `H` | Hour |
| `m` | Minute |
| `s` | Second |
| `S` | Millisecond |
