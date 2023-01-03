---
category: Components
type: Data Display
title: Carousel
cols: 1
order: 18
cover: https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg
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
| `[vtsAutoPlaySpeed]` | Duration (milliseconds), does not scroll when set to 0 | `number` | `3000` | ✅ |
| `[vtsDotRender]` | Dot render template | `TemplateRef<{ $implicit: number }>` | - |
| `[vtsDotPosition]` | The position of the dots, which can be one of `top` `bottom` `left` `right` | `string` | `bottom` | ✅ |
| `[vtsDots]` | Whether to show the dots at the bottom of the gallery | `boolean` | `true` | ✅ |
| `[vtsEffect]` | Transition effect | `'scrollx'\|'fade'` | `'scrollx'` | ✅ |
| `[vtsEnableSwipe]` | Whether to support swipe gesture | `boolean` | `true` | ✅ |
| `[vtsNavigation]` | Whether to show the next button and previouse button | `boolean` | `true` | ✅ |
| `[vtsRtl]` | Whether to scroll from right to left | `boolean` | `true` | ✅ |
| `[vtsItems]` | Number of slides is shown | `boolean` | 1 | ✅ |
| `[vtsSlideMargin]` | Margin between slides | `number` | 10 | ✅ |
| `[vtsVertical]` | Whether to show slides vertical | `boolean` | `false` | ✅ |
| `(vtsAfterChange)` | Callback function called after the current index changes | `EventEmitter<number>` | - |
| `(vtsBeforeChange)` | Callback function called before the current index changes | `EventEmitter{ from: number; to: number }>` | - |

#### Methods

| Name | Description |
| ---- | ----------- |
| `goTo(slideNumber)` | Change current slide to given slide number |
| `next()` | Change current slide to next slide |
| `pre()` | Change current slide to previous slide |

### InjectionToken

| Token | Description | Parameters | Default Value |
| ----- | --- | ---- | --- |
| `NZ_CAROUSEL_CUSTOM_STRATEGIES` | Provide custom transitioning strategies | `CarouselStrategyRegistryItem[]` | - |

### Customizing transition effects

You can provide strategies that extends `VtsCarouselBaseStrategy` to implement custom transition effects.
