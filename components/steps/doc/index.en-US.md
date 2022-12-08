---
category: Components
type: Navigation
cols: 1
title: Steps
cover: https://gw.alipayobjects.com/zos/antfincdn/UZYqMizXHaj/Steps.svg
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When the task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

```ts
import { VtsStepsModule } from '@ui-vts/ng-vts/steps';
```

## API

```html
<vts-steps>
  <vts-step vtsTitle="first step"></vts-step>
  <vts-step vtsTitle="second step"></vts-step>
  <vts-step vtsTitle="third step"></vts-step>
</vts-steps>
```

### vts-steps

The whole of the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsType]` | type of steps, can be set to one of the following values: `default`, `navigation` | `'default' \| 'navigation'` | `default` |
| `[vtsCurrent]` | To set the current step, counting from 0. You can overwrite this state by using `vtsStatus` of `vts-step` | `number` | `0` |
| `[vtsDirection]` | To specify the direction of the step bar, `horizontal` and `vertical` are currently supported | `'vertical' \| 'horizontal'` | `horizontal` |
| `[vtsLabelPlacement]` | Support vertical title and description | `'vertical' \| 'horizontal'` | `horizontal` |
| `[vtsProgressDot]` | Steps with progress dot style, customize the progress dot by setting it with TemplateRef | `boolean \| TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>` | `false` |
| `[vtsSize]` | To specify the size of the step bar, `default` and `small` are currently supported | `'small' \| 'default'` | `'default'` |
| `[vtsStatus]` | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| `[vtsStartIndex]` | To specify the starting number | `number` | `0` |
| `(vtsIndexChange)` | Trigger event when step click | `number` | - |

### vts-step

A single step in the step bar.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsDescription]` | description of the step, optional property | `string \| TemplateRef<void>` | - |
| `[vtsIcon]` | icon of the step, optional property | `string \| string[] \| Set<string> \| { [klass: string]: any; }`  \|  `TemplateRef<void>` | - |
| `[vtsStatus]` | to specify the status. It will be automatically set by `vtsCurrent` of `vts-steps` if not configured. Optional values are: `wait` `process` `finish` `error` | `'wait' \| 'process' \| 'finish' \| 'error'` | `'wait'` |
| `[vtsTitle]` | title of the step | `string \| TemplateRef<void>` | - |
| `[vtsSubtitle]` | subTitle of the step | `string \| TemplateRef<void>` | - |
| `[vtsDisabled]` | disable click | `boolean` | `false` |