---
category: Components
type: Data Display
title: Image
cover: https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg
---

Previewable image.

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

```ts
import { VtsImageModule } from '@ui-vts/ng-vts/image';
```

## API

### [vts-image]

| Property | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| vtsSrc | Image path | `string` | - | - |
| vtsFallback | Load failure fault-tolerant src | `string` | - | ✅ |
| vtsPlaceholder | Load placeholder src | `string` | - | ✅ |
| vtsDisablePreview | Whether to disable the preview | `boolean` | `false` | ✅ |
| vtsCloseOnNavigation | Whether to close the image preview when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `false` | ✅ |
| vtsDirection | Text directionality | `Direction` | `'ltr'` | ✅ |

Other attributes [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)


### VtsImageService

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| images | Preview images | `VtsImage[]` | - |
| options | Preview options | `VtsImagePreviewOptions` | - |

## Related type definition

### VtsImage

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| src | src | `string` | - |
| alt | alt | `string` | - |
| width | width | `string` | - |
| height | height | `string` | - |

### VtsImagePreviewOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsKeyboard      | Whether support press `esc` to close | `boolean` | `true` |
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
