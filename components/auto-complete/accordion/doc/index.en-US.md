---
category: Components
type: Components
title: Accordion
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/IxH16B9RD/Collapse.svg
---

A content area which can be collapsed and expanded.

## When To Use

- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

```ts
import { VtsAccordionModule } from '@ui-vts/ng-vts/accordion';
```

## API

### vts-collapse

| Property                  | Description              | Type      | Default | Global Config |
|---------------------------|--------------------------|-----------|--------|---------------|
| `[vtsFlush]`              | Flush mode               | `boolean` | `false` | ✅             |
| `[vtsExpandIconPosition]` | Set expand icon position | `string`  | `left`  | `left`        | - |

### vts-collapse-panel

| Property            | Description                                 | Type                 | Default |
|---------------------|---------------------------------------------|----------------------|---------|
| `[vtsDisabled]`     | If `true`, panel cannot be opened or closed | `boolean`            | `false` |
| `[vtsHeader]`       | Title of the panel                          | `string`             | `null`  | - |
| `[vtsExpandedIcon]` | Customize an icon for toggle                | `string`             | `null`  | - |
| `[vtsExtra]`        | Extra element in the corner                 | `string`             | `null`  | - |
| `[vtsShowArrow]`    | Display arrow or not                        | `boolean`            | `true`  | ✅ |
| `[vtsActive]`       | Active status of panel, double binding      | `boolean`            | -       |
| `(vtsActiveChange)` | Callback function of the active status      | `EventEmitter<boolean>` | -       |
