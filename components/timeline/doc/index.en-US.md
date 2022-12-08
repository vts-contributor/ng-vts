---
category: Components
type: Data Display
title: Timeline
cover: https://gw.alipayobjects.com/zos/antfincdn/vJmo00mmgR/Timeline.svg
---

Vertical display timeline.

## When To Use

- When a series of information needs to be ordered by time (ascend or descend).
- When you need a timeline to make a visual connection.

```ts
import { VtsTimelineModule } from '@ui-vts/ng-vts/timeline';
```

## API

```html
<vts-timeline>
  <vts-timeline-item>step1 2015-09-01</vts-timeline-item>
  <vts-timeline-item>step2 2015-09-01</vts-timeline-item>
  <vts-timeline-item>step3 2015-09-01</vts-timeline-item>
  <vts-timeline-item>step4 2015-09-01</vts-timeline-item>
</vts-timeline>
```

### vts-timeline

Timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsPending]` | Set the last ghost node's existence or its content | `string\|boolean\|TemplateRef<void>` | `false` |
| `[vtsPendingDot]` | Set the dot of the last ghost node when pending is true | `string\|TemplateRef<void>` | `<i vts-icon vtsType="Sync"></i>` |
| `[vtsReverse]` | Reverse nodes or not | `boolean` | `false` |
| `[vtsMode]` | By sending `alternate` the timeline will distribute the nodes to the left and right | `'left' \| 'alternate' \| 'right' \| 'custom'` | - |

### vts-timeline-item

Node of timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsColor]` | Set the circle's color to `'blue' \| 'red' \| 'green' \| 'gray'` or other custom colors (css color) | `string` | `blue` |
| `[vtsDot]` | Customize timeline dot | `string \| TemplateRef<void>` | - |
| `[vtsPosition]` | Customize position, only works when `vtsMode` is `custom` | `'left' \| 'right'` | - |
