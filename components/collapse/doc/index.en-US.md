---
category: Components
type: Data Display
title: Collapse
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/IxH16B9RD/Collapse.svg
---

A content area which can be collapsed and expanded.

## When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

```ts
import { VtsCollapseModule } from '@ui-vts/ng-vts/collapse';
```

## API

### vts-collapse

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsAccordion]` | Accordion mode | `boolean` | `false`| ✅ |
| `[vtsBordered]` | Set border style | `boolean` | `true` | ✅ |
| `[vtsGhost]` | Make the collapse borderless and its background transparent | `boolean` | `false` | ✅ |
| `[vtsExpandIconPosition]` | Set expand icon position | `'left' \| 'right'` | `left` | - |

### vts-collapse-panel

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsDisabled]` | If `true`, panel cannot be opened or closed | `boolean` | `false` |
| `[vtsHeader]` | Title of the panel | `string \| TemplateRef<void>` | - |
| `[vtsExpandedIcon]` | Customize an icon for toggle | `string \| TemplateRef<void>` | - |
| `[vtsExtra]` | Extra element in the corner | `string \| TemplateRef<void>` | - |
| `[vtsShowArrow]` | Display arrow or not | `boolean` | `true` | ✅ |
| `[vtsActive]` | Active status of panel, double binding | `boolean` | - |
| `(vtsActiveChange)` | Callback function of the active status | `EventEmitter<boolean>` | - |
