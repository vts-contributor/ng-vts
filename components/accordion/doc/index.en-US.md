---
category: Components
type: Components
title: Accordion
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/IxH16B9RD/Collapse.svg
---

```ts
import { VtsAccordionModule } from '@ui-vts/ng-vts/accordion';
```

## API

### vts-collapse

| Property                  | Description              | Type      | Default |
|---------------------------|--------------------------|-----------|--------|
| vtsFlush              | Flush mode               | `boolean` | `false` |
| vtsExpandIconPosition | Set expand icon position | One of `left` `right`  | `left`  |
| vtsMultiple           | When enabled, multiple tabs can be activated at the same time | `boolean`  | `false`  |

### vts-accordion-panel

| Property            | Description                                 | Type                 | Default |
|---------------------|---------------------------------------------|----------------------|---------|
| vtsDisabled     | Disable ability to open or close panel      | `boolean`            | `false` |
| vtsHeader       | Title of the panel                          | `string`             | `null`  |
| vtsExpandedIcon | Customize an icon for toggle                | `string`             | `null`  |
| vtsExtra        | Extra element in the corner                 | `string`             | `null`  |
| vtsShowArrow   | Display arrow or not                        | `boolean`            | `true`  |
| vtsActive       | Active status of panel, double binding      | `boolean`            | |
| (vtsActiveChange) | Callback function of the active status      | `EventEmitter<boolean>` | |
