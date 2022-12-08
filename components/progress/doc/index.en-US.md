---
category: Components
type: Feedback
title: Progress
cover: https://gw.alipayobjects.com/zos/alicdn/xqsDu4ZyR/Progress.svg
---

Display the current progress of an operation flow.

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

```ts
import { VtsProgressModule } from '@ui-vts/ng-vts/progress';
```

## API

### vts-progress

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsType]` | to set the type | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| `[vtsFormat]` | template function of the content | `(percent: number) => string \| TemplateRef<{ $implicit: number }>` | `percent => percent + '%'` |
| `[vtsPercent]` | to set the completion percentage | `number` | `0` |
| `[vtsShowInfo]` | whether to display the progress value and the status icon | `boolean` | `true` | ✅ |
| `[vtsStatus]` | to set the status of the Progress | `'success' \| 'exception' \| 'active' \| 'normal'` | - |
| `[vtsStrokeLinecap]` | to set the style of the progress linecap | `'round' \| 'square'` | `'round'` | ✅ |
| `[vtsStrokeColor]` | color of progress bar, render linear-gradient when passing an object | `string \| { from: string; to: string: direction: string; [percent: string]: string }` | - | ✅ |
| `[vtsSuccessPercent]` | segmented success percent | `number` | 0 |

### `vtsType="line"`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsStrokeWidth]` | to set the width of the progress bar, unit: `px` | `number` | `8` |
| `[vtsSteps]` | the total step count | `number` | - |

### `vtsType="circle"`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsWidth]` | to set the canvas width of the circular progress bar, unit: `px` | `number` | `132` |
| `[vtsStrokeWidth]` | to set the width of the circular progress bar, unit: percentage of the canvas width | `number` | `6` | ✅ |

### `vtsType="dashboard"`

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsWidth]` | to set the canvas width of the dashboard progress bar, unit: `px` | `number` | `132` |
| `[vtsStrokeWidth]` | to set the width of the dashboard progress bar, unit: percentage of the canvas width | `number` | `6` | ✅ |
| `[vtsGapDegree]` | the gap degree of half circle, 0 ~ 360 | `number` | `0` | ✅ |
| `[vtsGapPosition]` | the gap position | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | ✅ |
