---
category: Components
type: Components
title: Tooltip
cols: 1
order: 8
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

```ts
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
```

## API

### [vts-tooltip]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsTooltipType | Type of tooltip | One of `sentence` `paragraph` | `sentence`
| vtsTooltipTitle | Content of tooltip | `string` |
| vtsTooltipPlacement | Placement of tooltip | `string` or `string[]` of `topLeft` `top` `topRight` `leftTop` `left` `leftBottom` `rightTop` `right` `rightBottom` `bottomLeft` `bottom` `bottomRight` |  `top`
| vtsTooltipOrigin | Origin of the tooltip	 | `ElementRef` |