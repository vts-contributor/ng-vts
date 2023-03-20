---
category: Components
type: Components
title: Carousel
cols: 1
order: 100
cover: ''
---

```ts
import { VtsCarouselModule } from '@ui-vts/ng-vts/carousel';
```

## API

### vts-carousel

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| vtsNavigation | Navigation options | `boolean \| VtsCarouselNavigationOptions` | `false` |
| vtsPagination | Pagination options | `boolean \| VtsCarouselPaginationOptions` | `false` |
| vtsDirection | Direction of carousel | One of `horizontal` `vertical` | `horizontal` |
| vtsSlidesPerView | Number of slide per view | `number` | `1` |
| vtsSpaceBetween | Space between slides | `number` | `0` |
| vtsLoop | Whether to loop slide | `boolean` | `false` |
| vtsAutoplay | Autoplay options | `boolean \| VtsCarouselAutoplayOptions` | `false` |
| vtsBreakpoints | Breakpoint options | `[string \| number]: VtsCarouselOptions` |
| vtsEffect | Type of transition effect | One of `slide` `fade` `flip` `cube` | `slide` |
| vtsSpeed | Duration of transition | `number` | `300` |
| (vtsActiveIndexChange) | Emit on active index changed | `EventEmitter<number>` |
| (vtsSlidesLengthChange) | Emit on slide number changed | `EventEmitter<number>` |

### VtsCarouselNavigationOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| enabled | Whether to enable | `boolean` |
| hideOnClick | Whether to hide on click | `boolean` |
| prevEl | Custom previous button element | `ElementRef` |
| nextEl | Custom next button element | `ElementRef` |
| disabledClass | CSS class name added to navigation button when it becomes disabled | `string` |

### VtsCarouselPaginationOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| enabled | Whether to enable | `boolean` |
| horizontalClass | CSS class name set to pagination in horizontal carousel | `string` |
| verticalClass | CSS class name set to pagination in vertical carousel | `string` |
| hideOnClick | Whether to hide on click | `boolean` |
| type | Type of pagination style | `bullets \| fraction \| progressbar` | `bullets`
| clickable | Whether to allow click on `bullets` type | `boolean` | `false`
| clickableClass | CSS class name set to pagination when it is clickable | `string` |
| bulletClass | CSS class name of single pagination bullet | `string` |
| bulletActiveClass | CSS class name of active pagination bullet | `string` |
| formatFractionCurrent | Function to format fraction pagination current number | `Function` |
| formatFractionTotal | Function to format fraction pagination total number | `Function` |
| currentClass | CSS class name of the element with currently active index in `fraction` pagination | `string` |
| totalClass | CSS class name of the element with total number in `fraction` pagination | `string` |
| progressbarOpposite | Makes pagination progressbar opposite to carousel's direction | `boolean` |
| progressbarFillClass | CSS class name of pagination progressbar fill element | `string` |
| progressbarOppositeClass | CSS class name of pagination progressbar opposite | `string` |
| renderBullet | Custom bullet render | `Function(index, className)` |
| renderFraction | Custom fraction render | `Function(current, total)` |
| renderProgressbar | Custom progress bar render | `Function(class)` |
| dynamicBullets | Dynamic bullet style for carousel with multiple slides | `boolean` | `false`
| dynamicMainBullets | Number of dynamic bullets to show | `number` | `1`

### VtsCarouselAutoplayOptions
| Property | Description | Type | Default |
| --- | --- | --- | --- |
| enabled | Whether to enable | `boolean` |
| delay | Delay between transitions | `number` | `3000`
| stopOnLastSlide | Whether to stop at last slide | `boolean` | `false`
| disableOnInteraction | Stop after user interactions (swipes) | `boolean` | `false`
| reverseDirection | Play in reversal direction | `boolean` | `false`
| pauseOnMouseEnter | Whether to pause on mouse enter | `boolean` | `false`