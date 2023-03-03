---
category: Components
type: Components
title: Carousel
cols: 1
order: 0.1
cover: https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/carousel.svg
---

A carousel component. Scales with its container.

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

```ts
import { VtsCarouselModule } from '@ui-vts/ng-vts/carousel';
```

## API

### vts-carousel

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsAutoPlay]` | Whether to scroll automatically | `boolean` | `false` | ✅ |
| `[vtsNavigation]` | Whether to show the next button and previouse button | `boolean` | `false` | ✅ |
| `[vtsPagination]` | Whether to show the next button and previouse button | `boolean` | `false` | ✅ |
| `[vtsSlidesPerView]` | Number of slides is shown | `boolean` | 1 | ✅ |
| `[vtsSpaceBetween]` | Margin between slides | `number` | 0 | ✅ |
| `[vtsSpeed]` | Duration of transition between slides (in ms) | `number` | 300 | ✅ |
| `[vtsBreakpoints]` | Allows to set different parameter for different responsive breakpoints (screen sizes). Not all parameters can be changed in breakpoints, only those which do not require different layout and logic, like `vstSlidesPerView`, `vtsSpaceBetween`. Such parameters like `vtsLoop` won't work | `CarouselOptions` |  | ✅ |
| `[vtsLoop]` | Set to `true` to enable continuous loop mode | `boolean` | false | ✅ |

