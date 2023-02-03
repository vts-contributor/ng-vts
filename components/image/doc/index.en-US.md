---
category: Components
type: Components
title: Image
cover: ''
---

```ts
import { VtsImageModule } from '@ui-vts/ng-vts/image';
```

## API

### vts-image

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsSrc | Image path | `string` | |
| vtsShape | Image shape | One of `square` `rounded` `circle` | `square` |
| vtsFallback | Load failure fault-tolerant src | `string` |  |
| vtsPlaceholder | Load placeholder src | `string` |  |
| vtsPreview | Whether to enable preview | `boolean` | `false` |
| vtsFit | Image object-fit property | `string` |  |
| vtsCloseOnNavigation | Whether to close the image preview when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `false` |

### VtsImageService

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| images | Preview images | `VtsImage[]` | - |
| options | Preview options | `VtsImagePreviewOptions` | - |

## Related type definition

### VtsImagePreviewOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsKeyboard      | Whether support keyboard buttons to control preview, include `esc` `arrow left` `arrow right` | `boolean` | `true` |
| vtsMaskClosable      | Whether to close the image preview when the mask (area outside the image) is clicked | `boolean` | `true` |
| vtsCloseOnNavigation      | Whether to close the image preview when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` |
| vtsZIndex      | The z-index of the image preview | `number` | 1000 |
| vtsZoom      | Zoom rate | `number` | 1 |
| vtsRotate      | Rotate rate | `number` | 0 |

### VtsImagePreviewRef

| Name | Description |
| --- | --- |
| switchTo(index: number): void | Switch to index |
| prev(): void | Previous image |
| next(): void | Next image |
| close(): void | Close image preview |
