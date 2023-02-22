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
| `[navigation]` | Whether to show the next button and previouse button | `boolean` | `true` | ✅ |
| `[pagination]` | Whether to show the next button and previouse button | `boolean` | `true` | ✅ |
| `[vtsSlidesPerView]` | Number of slides is shown | `boolean` | 1 | ✅ |
| `[vtsSpaceBetween]` | Margin between slides | `number` | 10 | ✅ |

#### Methods

| Name | Description |
| ---- | ----------- |
| `goTo(slideNumber)` | Change current slide to given slide number |
| `next()` | Change current slide to next slide |
| `pre()` | Change current slide to previous slide |

### InjectionToken

| Token | Description | Parameters | Default Value |
| ----- | --- | ---- | --- |
| `NZ_carousel_CUSTOM_STRATEGIES` | Provide custom transitioning strategies | `carouselStrategyRegistryItem[]` | - |

### Customizing transition effects

You can provide strategies that extends `VtscarouselBaseStrategy` to implement custom transition effects.
