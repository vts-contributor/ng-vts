---
category: Components
type: Other
title: Anchor
cover: https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

```ts
import { VtsAnchorModule } from '@ui-vts/ng-vts/anchor';
```

## API

### vts-anchor

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsAffix]` | Fixed mode of Anchor | `boolean` | `true` |
| `[vtsBounds]` | Bounding distance of anchor area, unit: px | `number` | `5` | ✅ |
| `[vtsOffsetTop]` | Pixels to offset from top when calculating position of scroll | `number` | `0` | ✅ |
| `[vtsShowInkInFixed]` | Whether show ink-balls in Fixed mode | `boolean` | `false` | ✅ |
| `[vtsContainer]` | Scrolling container | `string \| HTMLElement` | `window` |
| `(vtsClick)` | Click of Anchor item | `EventEmitter<string>` | - |
| `(vtsScroll)` | The scroll function that is triggered when scrolling to an anchor. | `EventEmitter<VtsAnchorLinkComponent>` | - |

### vts-link

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsHref]` | target of hyperlink | `string` | - |
| `[vtsTitle]` | content of  hyperlink | `string \| TemplateRef<void>` | - |
